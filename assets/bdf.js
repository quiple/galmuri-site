/**
 * This script is licensed under the Mozilla Public License 2.0.
 * https://github.com/misterhat/bdf/blob/master/LICENSE
 */

class BDF {
    constructor(data) {
        this.meta = {};
        this.glyphs = {};

        if (data && data.length) {
            this.load(data);
        }
    }

    load(data) {
        this.meta = {};
        this.glyphs = {};

        const fontLines = data.split('\n');
        const declarationStack = [];
        let currentChar = null;

        for (let i = 0; i < fontLines.length; i++) {
            const line = fontLines[i];
            const data = line.split(/\s+/);
            const declaration = data[0];

            switch (declaration) {
                case 'STARTFONT':
                    declarationStack.push(declaration);
                    this.meta.version = data[1];
                    break;
                case 'FONT':
                    this.meta.name = data[1];
                    break;
                case 'SIZE':
                    this.meta.size = {
                        points: +data[1],
                        resolutionX: +data[2],
                        resolutionY: +data[3]
                    };
                    break;
                case 'FONTBOUNDINGBOX':
                    this.meta.boundingBox = {
                        width: +data[1],
                        height: +data[2],
                        x: +data[3],
                        y: +data[4]
                    };
                    break;
                case 'STARTPROPERTIES':
                    declarationStack.push(declaration);
                    this.meta.properties = {};
                    break;
                case 'FONT_ASCENT':
                    this.meta.properties.fontAscent = +data[1];
                    break;
                case 'FONT_DESCENT':
                    this.meta.properties.fontDescent = +data[1];
                    break;
                case 'POINT_SIZE':
                    this.meta.properties.pointSize = +data[1];
                    break;
                case 'DEFAULT_CHAR':
                    this.meta.properties.defaultChar = +data[1];
                    break;
                case 'ENDPROPERTIES':
                    declarationStack.pop();
                    break;
                case 'CHARS':
                    this.meta.totalChars = +data[1];
                    break;
                case 'STARTCHAR':
                    declarationStack.push(declaration);

                    currentChar = {
                        name: data[1],
                        bytes: [],
                        bitmap: []
                    };
                    break;
                case 'ENCODING':
                    currentChar.code = +data[1];
                    currentChar.char = String.fromCharCode(+data[1]);
                    break;
                case 'SWIDTH':
                    currentChar.scalableWidthX = +data[1];
                    currentChar.scalableWidthY = +data[2];
                    break;
                case 'DWIDTH':
                    currentChar.deviceWidthX = +data[1];
                    currentChar.deviceWidthY = +data[2];
                    break;
                case 'BBX':
                    currentChar.boundingBox = {
                        x: +data[3],
                        y: +data[4],
                        width: +data[1],
                        height: +data[2]
                    };
                    break;
                case 'BITMAP': {
                    const bytesPerLine = Math.ceil(
                        currentChar.boundingBox.width / 8
                    );

                    for (
                        let row = 0;
                        row < currentChar.boundingBox.height;
                        row++, i++
                    ) {
                        const bytesLine = fontLines[i + 1];
                        currentChar.bitmap[row] = [];

                        for (const byteString of bytesLine.match(/.{1,2}/g)) {
                            const byte = Number.parseInt(byteString, 16);

                            currentChar.bytes.push(byte);

                            currentChar.bitmap[row].push(...byte
                                .toString(2)
                                .padStart(8, '0')
                                .split('')
                                .map(Number));
                        }
                    }
                    break;
                }
                case 'ENDCHAR':
                    declarationStack.pop();
                    this.glyphs[currentChar.code] = currentChar;
                    currentChar = null;
                    break;
                case 'ENDFONT':
                    declarationStack.pop();
                    break;
            }
        }

        // A property wasn't ended
        if (declarationStack.length) {
            throw new Error("Couldn't correctly parse font");
        }
    }

    writeText(text, options = {}, _bitmap) {
        if (!this.meta.properties.pointSize) {
            throw new Error('POINT_SIZE not defined');
        }

        const kerningBias = options.kerningBias || 0;

        const height = this.meta.properties.pointSize;
        const yOffset = -1;
        const baseline = height + yOffset;

        let xPosition = 0;

        if (!_bitmap) {
            _bitmap = {};
            _bitmap = { grid: [] };
            _bitmap.width = 0;
            _bitmap.height = height;

            for (let row = 0; row < height; row++) {
                _bitmap.grid.push([]);
            }
        }

        for (let i = 0; i < text.length; i++) {
            let charCode = text[i].charCodeAt(0);
            let glyphData = this.glyphs[charCode];

            // Replace missing characters with:
            // 1: default char
            // 2: '?'
            // 3: the first character in the font
            if (!glyphData) {
                charCode = this.meta.properties.defaultChar;
                glyphData = this.glyphs[charCode];
            }

            if (!glyphData) {
                charCode = '?'.charCodeAt(0);
                glyphData = this.glyphs[charCode];
            }

            if (!glyphData) {
                const keys = Object.keys(this.glyphs);
                glyphData = this.glyphs[keys[0]];
            }

            // Index into the destination bitmap for the top row of the font
            const rowStart =
                baseline -
                glyphData.boundingBox.y -
                glyphData.boundingBox.height;

            // This character will need this many columns
            const columnsToAdd = 0;

            // Make room for offset bounding box, adjust xpos accordingly
            if (_bitmap.width < -glyphData.boundingBox.x) {
                xPosition = -glyphData.boundingBox.x + kerningBias;
                columnsToAdd += xPosition;
            }

            // Extend bitmap to the right with zeros
            for (let row = 0; row < height; row++) {
                for (
                    let glyphColumn = 0;
                    glyphColumn < columnsToAdd;
                    glyphColumn++
                ) {
                    const column = glyphColumn + _bitmap.width;
                    _bitmap.grid[row][column] = 0;
                }
            }

            _bitmap.width += columnsToAdd;

            // Draw the glyph
            for (let y = 0; y < glyphData.boundingBox.height; y++) {
                for (let x = 0; x < glyphData.boundingBox.width; x++) {
                    const row = rowStart + y;
                    const column = xPosition + glyphData.boundingBox.x + x;

                    _bitmap.grid[row][column] |= glyphData.bitmap[y][x];
                }
            }

            xPosition += glyphData.deviceWidthX + kerningBias;
        }

        return _bitmap;
    }

    drawText(text, canvas, options) {
        const colour = options.colour || '#000';
        const xOffset = options.x || 0;
        const yOffset = options.y || 0;
        const scale = options.scale || 1;

        const context = canvas.getContext('2d');

        context.fillStyle = colour;

        const _bitmap = this.writeText(text, options);
        const { grid } = _bitmap;

        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[0].length; x++) {
                if (grid[y][x]) {
                    context.fillRect(
                        x * scale + xOffset,
                        y * scale + yOffset,
                        scale,
                        scale
                    );
                }
            }
        }

        return _bitmap;
    }

    getCharacters() {
        return Object.keys(this.glyphs).map((charCode) =>
            String.fromCharCode(charCode)
        );
    }

    toString() {
        const { size, boundingBox: bounds, properties } = this.meta;

        const lines = [];

        lines.push(`STARTFONT ${this.meta.version}`);
        lines.push(`FONT ${this.meta.name}`);

        lines.push(
            `SIZE ${size.points} ${size.resolutionX} ${size.resolutionY}`
        );

        lines.push(
            'FONTBOUNDINGBOX ' +
                `${bounds.width} ${bounds.height} ${bounds.x} ${bounds.y}`
        );

        lines.push(
            `STARTPROPERTIES ${Object.keys(this.meta.properties).length}`
        );

        if (properties.fontDescent) {
            lines.push(`FONT_DESCENT ${properties.fontDescent}`);
        }

        if (properties.fontAscent) {
            lines.push(`FONT_ASCENT ${properties.fontAscent}`);
        }

        if (properties.defaultChar) {
            lines.push(`DEFAULT_CHAR ${properties.defaultChar}`);
        }

        lines.push('ENDPROPERTIES');

        lines.push(`CHARS ${this.meta.totalChars}`);

        for (const glyph of Object.values(this.glyphs)) {
            const { boundingBox: bounds } = glyph;

            lines.push(`STARTCHAR ${glyph.name}`);

            lines.push(`ENCODING ${glyph.code}`);

            lines.push(
                `SWIDTH ${glyph.scalableWidthX} ${glyph.scalableWidthY}`
            );

            lines.push(`DWIDTH ${glyph.deviceWidthX} ${glyph.deviceWidthY}`);

            lines.push(
                `BBX ${bounds.width} ${bounds.height} ${bounds.x} ${bounds.y}`
            );

            lines.push('BITMAP');

            let byteIndex = 0;

            for (const row of glyph.bitmap) {
                let rowString = '';

                const bytesPerLine = Math.ceil(row.length / 8);

                for (let i = 0; i < bytesPerLine; i++) {
                    rowString += glyph.bytes[byteIndex]
                        .toString(16)
                        .toUpperCase()
                        .padStart(2, '0');

                    byteIndex += 1;
                }

                lines.push(rowString);
            }

            lines.push('ENDCHAR');
        }

        lines.push('ENDFONT');

        return lines.join('\n').trim();
    }
}

// export default BDF;
