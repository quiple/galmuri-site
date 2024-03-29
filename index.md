---
layout: home
---

<div id="title">
  <h1>Galmuri</h1>
  <div class="sub">
    <span>작은 크기에서도</span>
    <span>가독성 좋고 균형 있는</span>
    <span>한글 비트맵 폰트</span>
  </div>
  <div class="btns">
    <a class="btn" href="#다운로드">다운로드</a>
    <a class="btn new outline" href="https://github.com/{{ site.github_username }}/{{ site.github_reponame }}" target="_blank" rel="noreferrer noopener" aria-label="GitHub에서 보기 (새 탭에서 열림)">GitHub에서 보기</a>
  </div>
  <small>아래로 스크롤하여 더 많은 내용 확인하기</small>
</div>

Galmuri는 닌텐도 DS 본체와 소프트웨어에 사용되었던 폰트 디자인에서 영감을 받은 비트맵 폰트입니다. 2019년 10월 9일 한글날에 처음 공개되었으며, Galmuri의 이름은 2008년 6월 사용자 한글화 커뮤니티인 [한식구](https://cafe.naver.com/hansicgu){:class="new" target="_blank" rel="noreferrer noopener" aria-label="한식구 (새 탭에서 열림)"}에서 김동한 님께서 만들어 배포하신 비트맵 폰트 ‘[갈무리M](https://cafe.naver.com/hansicgu/174){:class="new" target="_blank" rel="noreferrer noopener" aria-label="갈무리M (새 탭에서 열림)"}’에서 유래하였습니다.

<div class="btns">
  <a class="btn" href="./charsets">문자 집합별 지원 현황</a>
  <a class="btn" href="./generator">폰트 이미지 생성기</a>
</div>

<div id="test-control">
  <select id="test-family" aria-label="폰트 선택">
    {% for font in site.fonts %}
      <option value="{{ font.name | replace: " ", "-" }}"{% if font.name == "Galmuri11" %} selected{% endif %}>{{ font.name }}</option>
    {% endfor %}
  </select>
  <div>
    <input type="range" id="test-size" min="8" max="160" value="48">
    <label for="test-size" id="test-size-indicator">48px</label>
  </div>
  <button type="button" class="btn outline" onclick="shuffle()">예문 셔플</button>
</div>

<textarea id="test" aria-label="테스트 입력" spellcheck="false"></textarea>

## 라이선스

&copy; {{ site.copyright_date }} {{ site.author }} (<{{ site.email }}>)

Galmuri는 [SIL 오픈 폰트 라이선스 1.1](https://openfontlicense.org){:class="new" target="_blank" rel="noreferrer noopener" aria-label="SIL 오픈 폰트 라이선스 1.1 (새 탭에서 열림)"}에 따라 사용할 수 있으며, 폰트가 자체적으로 판매되지 않는 한 자유롭게 사용·연구·수정·재배포할 수 있습니다.

OFL 1.1을 한국어로 번역한 내용은 [이곳](/galmuri/ofl-ko)에서 확인할 수 있으며, 라이선스 원문은 [이곳](/galmuri/ofl)에서 확인할 수 있습니다.

## 다운로드

<section class="download">
  {% for font in site.fonts %}
    <div class="item">
      <h3>{{ font.name }}</h3>
      <div class="btns">
        <a download class="btn" href="../galmuri/dist/{{ font.name | replace: " ", "-" }}.ttf">TTF</a>
        <a download class="btn" href="../galmuri/dist/{{ font.name | replace: " ", "-" }}.woff2">WOFF2</a>
        <a download class="btn" href="../galmuri/dist/{{ font.name | replace: " ", "-" }}.bdf">BDF</a>
        <a class="btn new outline" href="https://lsfont.quiple.dev#https://galmuri.quiple.dev/galmuri/dist/{{ font.name | replace: " ", "-" }}.ttf" target="_blank" rel="noreferrer noopener" aria-label="{{ font.name }} 전체 글리프 목록 보기 (새 탭에서 열림)">전체 글리프 목록 보기</a>
      </div>
    </div>
  {% endfor %}
</section>

<div class="btns">
  <a class="btn new outline" href="https://github.com/{{ site.github_username }}/{{ site.github_reponame }}/releases/latest" target="_blank" rel="noreferrer noopener" aria-label="GitHub 릴리스 페이지에서 다운로드하기 (새 탭에서 열림)">GitHub 릴리스 페이지에서 다운로드하기</a>
</div>

Galmuri14는 15px (11pt), Galmuri11은 12px (9pt), Galmuri9는 10px (7.5pt), Galmuri7은 8px (6pt) 크기와 그 배수에서 가장 명확하게 표시됩니다.

## 웹폰트로 사용

### HTML

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/galmuri/dist/galmuri.css">
```

### CSS

```css
@import url("https://cdn.jsdelivr.net/npm/galmuri/dist/galmuri.css");
```

### CSS 규칙

```css
{% for font in site.fonts %} /* {{ font.name }}을(를) 사용하려면 */
  font-family: "{{ font.family }}", {% if font.style == "Monospaced" %}monospace{% else %}sans-serif{% endif %};
  {% case font.style %}
  {% when "Bold" %} font-weight: bold;
  {% when "Condensed" %} font-stretch: condensed;
  {% endcase %}
{% endfor %}```

## 사용할 수 있는 OpenType 기능

### 커닝 (kern)

<div class="fea kern">
  <pre>Test TV/Audio Million LTE</pre>
  <pre><span>Te</span>st T<span>V/A</span>udio M<span>illi</span>on <span>LT</span>E</pre>
</div>

커닝은 일부 지원하지 않는 환경을 제외한 대부분의 환경에서 기본적으로 사용 설정됩니다.

### 고정폭 숫자 (tnum)

<div class="fea tnum">
  <pre>1,879,425원<br>2,624,560원<br>1,751,853원</pre>
  <pre><span>1,879,425</span>원<br><span>2,624,560</span>원<br><span>1,751,853</span>원</pre>
</div>

```css
font-variant-numeric: tabular-nums; /* 또는 */ font-feature-settings: "tnum" 1;
```

### 슬래시 0 (zero)

<div class="fea zero">
  <pre>0123456789</pre>
  <pre><span>0</span>123456789</pre>
</div>

```css
font-variant-numeric: slashed-zero; /* 또는 */ font-feature-settings: "zero" 1;
```

## 쇼케이스

<section class="splide" aria-label="Galmuri 쇼케이스">
  <div class="splide__track">
    <div class="splide__list">
      {% for game in site.showcase %}
        <div class="splide__slide img-{{ game.file | slice: 0, 6 }}">
          <img src="./assets/showcase/{{ game.file }}" alt="{{ game.title }}" height="480">
          <p><a href="{% if game.type == "steam" %}https://store.steampowered.com/app/{% elsif game.type == 'appstore' %}https://apps.apple.com/kr/app/dungeonsquad/id{% else %}https://{% endif %}{{ game.link }}" class="new" target="_blank" rel="noreferrer noopener" aria-label="{{ game.title }} (새 탭에서 열림)">{{ game.title }}</a> {% if game.type == "patch" %}(사용자 패치) by{% else %}&copy;{% endif %} {{ game.author }}</p>
        </div>
      {% endfor %}
    </div>
  </div>
</section>

### Galmuri를 포함하여 파생된 폰트

* [Fusion Pixel Font](https://github.com/TakWolf/fusion-pixel-font){:class="new" target="_blank" rel="noreferrer noopener" aria-label="Fusion Pixel Font (새 탭에서 열림)"} by TakWolf  
  SIL 오픈 폰트 라이선스 1.1 • 포함 폰트: [Ark Pixel Font](https://github.com/TakWolf/ark-pixel-font){:class="new" target="_blank" rel="noreferrer noopener" aria-label="Ark Pixel Font (새 탭에서 열림)"}, [MisakiGothic](https://littlelimit.net/misaki.htm){:class="new" target="_blank" rel="noreferrer noopener" aria-label="MisakiGothic (새 탭에서 열림)"}, [Chill-Bitmap](https://github.com/Warren2060/Chill-Bitmap){:class="new" target="_blank" rel="noreferrer noopener" aria-label="Chill-Bitmap (새 탭에서 열림)"}, [BoutiqueBitmap7x7](https://github.com/scott0107000/BoutiqueBitmap7x7){:class="new" target="_blank" rel="noreferrer noopener" aria-label="BoutiqueBitmap7x7 (새 탭에서 열림)"}, [Cubic 11](https://github.com/ACh-K/Cubic-11){:class="new" target="_blank" rel="noreferrer noopener" aria-label="Cubic 11 (새 탭에서 열림)"}, Galmuri11, Galmuri9, Galmuri7
* [QuanPixel](https://diaowinner.itch.io/galmuri-extended){:class="new" target="_blank" rel="noreferrer noopener" aria-label="QuanPixel (새 탭에서 열림)"} by diaowinner  
  SIL 오픈 폰트 라이선스 1.1 • 포함 폰트: Galmuri7, [Chill-Bitmap](https://github.com/Warren2060/Chill-Bitmap){:class="new" target="_blank" rel="noreferrer noopener" aria-label="Chill-Bitmap (새 탭에서 열림)"} ([MisakiGothic](https://littlelimit.net/misaki.htm){:class="new" target="_blank" rel="noreferrer noopener" aria-label="MisakiGothic (새 탭에서 열림)"}, [BoutiqueBitmap7x7](https://github.com/scott0107000/BoutiqueBitmap7x7){:class="new" target="_blank" rel="noreferrer noopener" aria-label="BoutiqueBitmap7x7 (새 탭에서 열림)"}, [Guanzhi 8px](https://bbs.themex.net/showthread.php?t=16850810){:class="new" target="_blank" rel="noreferrer noopener" aria-label="Guanzhi 8px (새 탭에서 열림)"})

## 사용한 도구

* 바이너리 문자 집합 추출: [CrystalTile2](https://www.romhacking.net/utilities/818/){:class="new" target="_blank" rel="noreferrer noopener" aria-label="CrystalTile2 (새 탭에서 열림)"} by angel-team
* GNU Unifont .hex 형식 폰트 변환: [Unifont Utilities](http://unifoundry.com/unifont/unifont-utilities.html){:class="new" target="_blank" rel="noreferrer noopener" aria-label="Unifont Utilities (새 탭에서 열림)"} by Unifoundry.com
* 비트맵 폰트 편집 및 TrueType 윤곽선 폰트 생성: [Bits'N'Picas](https://github.com/kreativekorp/bitsnpicas){:class="new" target="_blank" rel="noreferrer noopener" aria-label="Bits'N'Picas (새 탭에서 열림)"} by Kreative Software
* 폰트 재작성 및 OpenType 기능 추가: [Adobe Font Development Kit for OpenType](https://github.com/adobe-type-tools/afdko){:class="new" target="_blank" rel="noreferrer noopener" aria-label="Adobe Font Development Kit for OpenType (새 탭에서 열림)"} by Adobe
* WOFF2 압축 및 TrueType 콜렉션 생성: [fontTools](https://github.com/fonttools/fonttools){:class="new" target="_blank" rel="noreferrer noopener" aria-label="fontTools (새 탭에서 열림)"} by Just van Rossum

## 후원

<div id="donate">
  <a href="https://toss.me/quiple" target="_blank" rel="noreferrer noopener" aria-label="토스로 후원 (새 탭에서 열림)">
    <img src="/galmuri/files/toss.svg" loading="lazy" width="256" height="256" alt="토스로 후원">
  </a>
  <a href="https://qr.kakaopay.com/Ej8JN15fH" target="_blank" rel="noreferrer noopener" aria-label="카카오페이로 후원 (새 탭에서 열림)">
    <img src="/galmuri/files/kakao.svg" loading="lazy" width="256" height="256" alt="카카오페이로 후원">
  </a>
</div>
