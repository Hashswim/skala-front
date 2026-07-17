# SY Universe — SKALA Full-Stack Engineering 종합 과제

SKALA `Full-Stack Engineering (HTML, CSS, JavaScript)` 과정에서 배운 내용을 바탕으로 만든 개인 포털 허브 사이트입니다.
내 소개, 수업 시간표, 휴일 일과, 여행 앨범, 회원가입 기능을 하나의 사이트로 묶었습니다.

## 실행 방법

1. VS Code의 **Live Server** 확장으로 `html/index.html`을 엽니다. (또는 원하는 정적 서버로 프로젝트 루트를 서빙)
2. `index.html`의 위치 정보 / 실시간 날씨 기능은 `http://localhost`(또는 `127.0.0.1`) 환경에서 정상 동작합니다.
   `file://`로 직접 여는 경우 브라우저에 따라 위치 정보(Geolocation) API가 차단될 수 있습니다.

## 폴더 구조

```
skala-front/
├── html/       # 페이지별 HTML
├── css/        # 전역 스타일시트 (style.css 하나로 전체 페이지 관리)
├── script/     # 페이지별/기능별 JavaScript
└── media/      # 이미지 · 오디오 · 비디오 리소스
```

## 페이지 구성

| 페이지 | 설명 |
|---|---|
| `index.html` | 메인 허브. 다른 페이지로 가는 바로가기, 실시간 위치/날씨 위젯, 미니게임 4종(업다운 게임 / 성적 계산기 / 내 가방 보기 / 숫자 야구) |
| `myProfile.html` | 자기소개 — 좋아하는 음식(`ul`), 올해 할 일(`ol`), 나를 표현하는 단어(`dl`) |
| `myClass.html` | 강의 시간표 — `colspan`/`rowspan`으로 병합된 표, 강의 칸에 마우스를 올리면 설명 툴팁 표시 |
| `myHoliday.html` | 휴일 일과 — 텍스트 일정(왼쪽)과 24시간 원형 시간표(오른쪽, `conic-gradient`)를 나란히 배치 |
| `myTrip.html` | 여행 앨범 — `audio`/`video`/`img`, Grid 3열 카드 레이아웃 |
| `signUp.html` / `signUpResult.html` | 회원가입 폼과 제출 완료 페이지 |

## 과제 요구사항 반영 내용

### HTML
- 시맨틱 태그: `header`/`nav`/`main`/`aside`/`footer`/`section`/`article`/`figure`
- 목록: `ul`(좋아하는 음식), `ol`(할 일), `dl`/`dt`/`dd`(나를 표현하는 단어)
- 표: `table`/`thead`/`tbody`, `colspan`/`rowspan`으로 2시간 이상 강의·점심시간 병합
- 폼: `form`(`action`/`method`), `fieldset`/`legend`/`label`, 다양한 `input` 타입(`text`/`password`/`tel`/`date`/`file`/`radio`/`checkbox`), `select`/`option`, `textarea`, `required`/`placeholder`/`pattern` 등 검증 속성
- 미디어: `audio`+`source`, `video`+`source`, `img`

### CSS
- 구글 폰트(Montserrat) 로드 및 전체 타이포그래피 설정
- Flexbox: 내비게이션 메뉴, 본문/사이드바 배치, 회원가입 폼 카드
- Grid: 여행 앨범 3열 카드, 나를 표현하는 단어 카드
- `conic-gradient`를 활용한 24시간 원형 시간표
- CSS 변수(`:root`)로 60-30-10 컬러 팔레트 관리
- `@media (max-width: 768px)` 반응형 레이아웃 (모바일에서 1열로 전환)
- `transition`/`:hover`/`@keyframes`를 활용한 등장 애니메이션과 마이크로 인터랙션

### JavaScript
- DOM 조작 및 이벤트 처리 (`addEventListener`, `change`, `click`)
- `fetch` + `async`/`await`로 외부 API 비동기 호출 (Open-Meteo 날씨, OpenStreetMap Nominatim 역지오코딩, IP 기반 위치)
- ES 모듈 (`import`/`export`)로 `weatherAPI.js`(데이터)와 `realtimeInfo.js`(화면) 역할 분리
- `Math.random()`, 배열/반복문, 조건문을 활용한 미니게임 3종 + 추가 구현한 숫자 야구 게임

## 사용 기술

- HTML5 / CSS3 (Flexbox, Grid, CSS 변수, 반응형 미디어 쿼리)
- Vanilla JavaScript (ES Modules, Fetch API, async/await)
- [Google Fonts](https://fonts.google.com/) — Montserrat
- [Open-Meteo](https://open-meteo.com/) — 실시간 날씨 API
- [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org/) — 역지오코딩
- [geojs.io](https://www.geojs.io/) — IP 기반 위치 조회 (Geolocation 실패 시 대체)
