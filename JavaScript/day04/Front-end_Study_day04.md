# Front-end Study day04 🌷

# `JavaScript`

## 모듈화

### 자바스크립트 모듈

- 개발하는 애플리케이션의 크기가 커지면 파일을 여러 개로 분리해야 하는 시점이 온다.
- 이 때 분리된 파일을 각각 모듈(module)이라고 부른다
- 모듈은 대개 클래스 하나 혹은 특정한 목적을 가진 복수의 함수로 구성된 라이브러리 하나로 구성된다.
- 모듈은 단지 파일 하나에 불과함. *스크립트 하나는 모듈 하나*이다.

![Untitled](Front-end%20Study%20day04%20%F0%9F%8C%B7%209a15041d557540dc8e1af5b8db468a81/Untitled.png)

<br>

<br>

<br>

## `export`

- 파일이나 모듈 안의 함수나, 객체를 export 하는데 사용된다.
- export 에는 `named import`와 `default export` 두가지 방법이 있다.
    
    ### `named export`
    
    - 여러 값을 export 하는 데 유용하다
    - export된 이름을 사용하여 import 하여 사용할 수 있다.
    
    ```jsx
    export const arrs = [10, 20, 30, 40]; // 개별로 선언해서 export
    
    export { arrs2, getName }; // 묶어서 export
    
    const arrs2 = [100, 200, 300, 400];
    function getName() {
        return "aaaaaaaaa";
    }
    ```
    
    ### `default export`
    
    - 모듈 당 딱 한개의 default export만 있어야 한다.
    - default export로 객체, 함수 클래스 등이 될 수 있다
    - 가장 간단하게 export 할 수 있으며, *딱 한개만 가능*하기 때문에 “메인”이라고 할 수 있는 것을 default export 하는 것이 좋다
    
    ```jsx
    let cube = function cube(x) {
        return x * x * x;
    }
    export default cube;
    ```
    

<br>

<br>

## `import`

- 외부 스크립트 또는 외부 모듈의 export된 함수, 객체를 가져오는데 사용된다

```jsx
// named
import * as name from "module-name";
import name from "module-name";
import { member } from "module-name";
import { member as alias } from "module-name"; // member이름이 길 경우 as 별명 가능
import { member1, member2 } from "module-name";
import { member1, member2 as alias2, [...] } from "module-name";

// default
import defaultMember, { member [, [...]] } from "module-name";
import defaultMember, * as alias from "module-name";
import defaultMember from "module-name";
import "module-name";
/*
   name : 가져온 값을 받을 객체 이름.
   member, memberN : export 된 모듈에서 멤버의 이름
   defaultMember : export 된 모듈의 default 이름
   alias, aliasN : export된 멤버의 이름을 지정한 이름
   module-name : 가져올 모듈 이름 (파일명)
*/
```

<br>

<br>

### `import` 사용법

- 모듈 전체 가져오기

```jsx
import * as myModule from "my-module.js";
// myModule.sayHello()
```

- 하나의 멤버 가져오기

```jsx
import {myMember} from "my-module.js";
```

- 여러 개의 멤버 가져오기

```jsx
import {foo, bar} from"my-module.js";
```

- 다른 이름으로 멤버 가져오기
    - 멤버를 가져올 때 다른 이름으로 멤버를 지정할 수 있다.
    - export된 멤버 이름이 길거나 복잡할 때 임의의 이름으로 멤버를 지정할 수 있음

```jsx
import {reallyReallyLongModuleMemberName as shortName} from "my-module.js";
import {reallyReallyLongModuleMemberName as shortName, anotherLongModuleName as short} from "my-module.js";
```

- 바인딩 없이 모듈만 실행하기
    - 단순히 특정 모듈을 불러와 실행만 할 목적이라면, import만 사용하는 것이 좋다

```jsx
import "my-module.js";
```

- `default export` 값 가져오기
    - default export를 통해 export 된 값들을 가져올 수 있다

```jsx
import myModule from "my-module.js";
```

💡 이때 `{ }` 는 넣지 않는다!!!!

<br>

<br>

### 동적으로 `import` 하기

- 지금까지 다뤘던 export 문이나 import 문은 정적인 방식이다. 문법이 단순하고 제약사항이 있다
    1. 첫 번째 제약은 import문에 동적 매개변수를 사용할 수 없다는 것
        1. 모듈 경로엔 원시 문자열만 들어갈 수 있기 때문에 함수 호출 결과값을 경로로 쓰는 것이 불가능 했음 
    2. 런타임이나 조건부 모듈을 불러올 수 없다는 점 
    
    ```jsx
    // 모듈 경로는 문자열만 허용되기 때문에 에러가 발생합니다.
    import ... from getModuleName(); 
    
    if(...) {
      import ...; // 모듈을 조건부로 불러올 수 없으므로 에러 발생
    }
    {
      import ...; // import 문은 블록 안에 올 수 없으므로 에러 발생
    }
    ```
    

<br>

<br>

### `import(module)`

- `import(module)` 표현식은 모듈을 읽고 이 모듈이 내보내는 것들을 모두 포함하는 객체를 담은 이행된 프라미스를 반환
- 코드 내 어디에서 동적으로 사용할 수도 있다.

```jsx
let modulePath = prompt("어떤 모듈을 불러오고 싶으세요?");

import(modulePath)
  .then(obj => "<모듈 객체>")
  .catch(err => "<로딩 에러, e.g. 해당하는 모듈이 없는 경우>");

// let module = await import(modulePath)
```

- `async` 함수 안에서 다음 같이 사용하는 것도 가능

```jsx
let module = await import(modulePath)
```

- ex) 모듈 `say.js` 를 이용한 예시

```jsx
// 📁 say.js
export function hi() {
  alert(`안녕하세요.`);
}

export function bye() {
  alert(`안녕히 가세요.`);
}

// 모듈을 동적으로 불러오는 방법
let say = await import('./say.js');
say.hi();
say.bye();

let {hi, bye} = await import('./say.js');
hi();
bye();

// say.js에 default export 추가하기
// 📁 say.js
export default function() {
  alert("export default한 모듈을 불러왔습니다!");
}

// default export한 모듈을 사용하려면 아래와 같이 모듈 객체의 default 프로퍼티를 사용하면 된다
let obj = await import('./say.js');
let say = obj.default;
// 위 두 줄을 let {default: say} = await import('./say.js'); 같이 한 줄로 줄일 수 있습니다.

say();
```

<aside>
💡 동적 import는 일반 스크립트에서도 동작한다. `script type=”module”` 이 없어도 된다.

</aside>

<aside>
💡 주의할 점
import() 는 함수 호출과 문법이 유사해 보이기는 하지만 함수 호출은 아니다
super() 처럼 괄호를 쓰는 특별한 문법 중 하나이다
함수가 아니기 때문에 import를 변수에 복사한다거나 call / apply 를 사용하는 것이 불가능함

</aside>

<br>

<br>

### script 파일은 왜 body 가장 하단에 작성되어야 하는가?

- 매우 무거운 자바스크립트 코드들이 포함되어 있다면 그 코드들을 불러오고 실행하느라, 그 밑에 있는 html 코드들이 로딩되지 못하게 될 것 . 이는 브라우저가 렌더링 되는 것에 방해가 될 수 있음. 그래서 사용자는 완성되지 않은 중간 화면을 오랫동안 쳐다보고 있어야 할 수도 있다!
- 자바스크립트 코드를 body 태그 가장 하단에 선언하게 된다면 무거운 코드가 있다고 하더라도 html태그와 css가 모두 동작한 다음 불러오기 때문에 미완성된 화면이 오랫동안 지속되지 않을 것이다. 또한 문서의 DOM 구조가 완료된 시점에서 실행되기 때문에 따로 추가 설정을 할 필요가 없어진다.
- 그렇기 때문에 특별한 사유가 있는 게 아니라면 `<script>` 의 위치는 `<body>` 태그 맨 마지막에 선언하는 것이 올바르다.

<br>

<br>

## FOIT & FOUT

### FOIT & FOUT 란?

![Untitled](Front-end%20Study%20day04%20%F0%9F%8C%B7%209a15041d557540dc8e1af5b8db468a81/Untitled%201.png)

- 우리가 처음 사이트에 진입했을 때, 글자가 늦게 뜨거나 폰트가 나중에 적용되는 현상이 일어난다.
- 이 두 현상은 각각 지칭하여 `FOIT` `FOUT` 라고 부른다.
- `FOIT`(Flash Of Invisible Text) : 브라우저가 폰트를 다운로드 하기 전까지 글자가 보이지 않는 현상
- `FOUT`(Flash Of Unstyled Text) : 브라우저가 폰트를 다운로드하기 전까지 폰트가 적용되지 않는 현상

<br>

<br>

### 이런 현상이 왜 일어나는가?! - 브라우저 동작과 웹 폰트

- 이유를 알기 위해서는 브라우저 동작을 먼저 알아야 한다.
- 아래 그림은 브라우저가 랜더링 할 때 정보를 요청하는 순서를 나타낸 것

![Untitled](Front-end%20Study%20day04%20%F0%9F%8C%B7%209a15041d557540dc8e1af5b8db468a81/Untitled%202.png)

```
🧐 **순서 및 설명**

T0
	- 브라우저가 HTML 문서를 요청한다

T1
	- HTML 응답이 오면 DOM 구성을 시작한다.
	- 브라우저가 CSS, JS 및 기타 리소스를 요청한다.

T2
	- 모든 CSS 콘텐츠를 수신한 뒤, CSSOM을 구성한다.
	- 그 후 CSSOM을 DOM 트리와 결합시켜 렌더링 트리를 구성한다.
	- 이 시점에, 폰트 리소스를 요청한다

T3
	- 콘텐츠를 화면에 그린다
	- 이 때, 폰트를 사용할 수 없는 상태라면 브라우저는 글자를 렌더링하지 않을 수도 있다
	- 하지만 폰트를 사용할 수 있다면 글자를 그린다

✔️ 이처럼 폰트 리소스 요청은 다른 리소스 요청보다 늦게 진행되며
✔️ 콘텐츠를 화면에 그리는 동안 폰트 리소스 응답이 늦어지면 FOIT, FOUT 발생
```

<br>

<br>

> 🧐 그러면 어떻게 해야할까!!?! 👇
> 

### 웹 폰트를 최적화하는 방법

1. 웹 폰트 리소스를 미리 로드하는 방법
    - 폰트 리소스 요청은 다른 리소스 요청보다 늦게 시작한다. 브라우저가 렌더링하는 동안 폰트 리소스 응답이 늦어져 폰트가 적용되지 않는 것.
    - `preload` 를 사용해 폰트 리소스를 초기에 요청하는 방법
    - `<head>` 에서 폰트를 요청할 때, `rel="preload"` 를 추가하면 브라우저가 폰트 리소스를 우선적으로 로드하게 된다
    
    ```jsx
    <link rel="preload" href="/test.woff2"as="font" type="font/woff2" crossorigin />
    ```
    

> 🧐 `preload` 를 사용하면 폰트가 늦게 적용되는 현상이 적어진다. 그럼 이 방법은 항상 좋을까 ?! 아니다!  👇
> 
- 일반적으로 브라우저는 현재 페이지에서 필요한 폰트만 다운로드함
- 하지만 `preload` 를 설정하면 현재 페이지에서 사용하지 않더라도 해당 폰트를 우선적으로 로드하게 됨
- 만약 많은 양의 폰트를 `preload` 하게되면 로딩 시간이 길어져 이 방법의 장점이 없어지는 셈

1. 폰트 로딩 API 를 이용하자
    1. new FontFace 이용하기
        - 폰트 로딩 API는 CSS 폰트를 재정의하여 폰트 로드 동작을 재정의 할 수 있다
        - 만약 폰트 로딩이 완료되어 사용가능할 때, 텍스트를 나타낼 것이라면 아래와 같이 재정의 하면 된다
        - 폰트 로딩 API를 이용하면, 폰트 로딩전까지 텍스트 렌더링을 보류하거나
        - 대체 폰트를 사용하다가 로딩이 끝난 시점에 원하는 폰트로 변경할 수도 있음
        
        ```jsx
        const font = new FontFace('Banana Font', 'url(/fonts/banana.woff2)', {
          style: 'normal',
          unicodeRange: 'U+000-5FF',
          weight: '300',
        });
        
        // 1. DOM 트리 구성을 기다리지 않고, 초기에 즉시 실행
        font.load().then(function() {
        
          // 2. 폰트 다운로드가 끝나면 폰트를 적용
          document.fonts.add(font);
          document.body.style.fontFamily = "Banana Font, serif";
        
          // 3.(콘텐츠를 숨긴 상태) 폰트 랜더링이 끝나면 폰트 사용이 가능하면 콘텐츠를 나타냄
          const content = document.getElementById("content");
          content.style.visibility = "visible";
        });
        ```
        
    
    1. Web font loader 사용하기
        - 만약 `@font-face` 로 폰트를 설정했다면, 이 로더를 사용해 구글 폰트, [Fonts.com](http://Fonts.com) 등을 로드할 수 있다.
        - 다운로드하고 싶은 웹 폰트를 `families` 에 추가만 하면 된다
        
        ```jsx
        <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
        <script>
          WebFont.load({
            google: {
              families: ['Droid Sans', 'Droid Serif']
            }
          });
        </script>
        ```
        
        - 로더가 폰트를 다운로드하면, 로딩 상황에 따라 html 태그에 아래와 같은 클래스가 적용된다
        
        ```jsx
        .wf-loading {}   /* 폰트 로딩중 */
        .wf-active  {}   /* 폰트 로딩완료 */
        .wf-inactive {}
        .wf-<familyname>-<fvd>-loading {} /* 특정 폰트 로딩중 */
        .wf-<familyname>-<fvd>-active  {} /* 특정 폰트 로딩완료 */
        .wf-<familyname>-<fvd>-inactive {}
        ```
        

c. 용량이 작은 웹 폰트 형식을 사용하자

- 웹 폰트의 여러가지 형식
    - 웹 폰트 용량을 줄이는 방법
    - 웹 폰트는 `TTF/OTF` , `WOFF` , `WOFF2`, `SVG` , `EOT` 형식있음
    - 이 중에서 `WOFF` 와 `WOFF2` 가 압축률이 좋은데 기본적으로는 가장 압축률이 좋은 `WOFF2` 를 사용, 지원하지 않는 브라우저에서는 `WOFF` 사용

![Untitled](Front-end%20Study%20day04%20%F0%9F%8C%B7%209a15041d557540dc8e1af5b8db468a81/Untitled%203.png)

d. 서브셋 폰트를 사용하여 최적화

- 서브셋 폰트란, 폰트에서 불필요한 글자를 제거한 폰트 파일을 말한다
- 한글의 경우 모든 자음, 모음을 조합하면 만 개가 넘는다
- 하지만 실제 서비스에서 사용하지 않는 조합도 많다.
- 불필요한 조합을 제거하여 폰트의 용량을 줄이고 폰트 최적화를 할 수 있음

![Untitled](Front-end%20Study%20day04%20%F0%9F%8C%B7%209a15041d557540dc8e1af5b8db468a81/Untitled%204.png)

e. `unicode-range` 속성 사용

- 다국어를 쓸 때 유용한 속성
    - 만약 서비스가 다국어를 제공한다면, 각 나라별로 필요한 웹폰트만 로드하는 것이 좋음
    - `@font-face` 에서 `unicode-range` 속성을 사용하면 나라별로 필요한 폰트만 다운로드 가능

```jsx
@font-face {
  font-family: 'korea font';
  font-weight: 400;
  src: local('korea font'),
    url(woff2-foo-font-ko-path) format('woff2'),
    url(woff-foo-font-ko-path) format('woff'),
  unicode-range: U+1100-U+11FF; /* 한글만 다운로드 */
}

@font-face {
  font-family: 'latin font';
  font-weight: 400;
  src: local('latin font'),
    url(woff2-foo-font-path) format('woff2'),
    url(woff-foo-font-path) format('woff'),
  unicode-range: U+000-5FF;    /* 라틴어만 다운로드 */
}
```

<br>

<br>

## `async` & `defer`

- HTML5에 새로 추가된 `<script>` 속성이다
- 이 두가지 속성은 HTML 파싱과 스크립트 다운로드를 병렬로 진행한다

<br>

<br>

### `script async src`

- `async` 속성은 아래와 같이 `<head>` 에 `<script>` 를 `async` 속성과 함께 사용하게 된다

![Untitled](Front-end%20Study%20day04%20%F0%9F%8C%B7%209a15041d557540dc8e1af5b8db468a81/Untitled%205.png)

- `async` 속성은 파싱과 JS 불러오기를 병렬적으로 진행한다

![Untitled](Front-end%20Study%20day04%20%F0%9F%8C%B7%209a15041d557540dc8e1af5b8db468a81/Untitled%206.png)

- 병렬적으로 진행하기 때문에 기존 방법들보다는 다운로드 받는 시간이 절약되어 효율적이라고 볼 수 있음
- 하지만 JS를 실행하는 단계에서는 파싱을 중지하게 되고 JS 실행이 끝나면 다시 파싱을 재시작하게 되기 때문에 HTML이 모두 실행되기 전에 JS가 실행된다
- 다수의 스크립트 파일을 다운로드 받게 되면 다운로드가 완료되는 순으로 JS파일을 실행하기 때문에 순서에 상관없이 실행하게 된다.
    - 만약 순서에 의존적인 페이지라면 문제가 될 수 있기 때문에 유의해야 함

<br>

<br>

### `script defer src`

- `defer` 속성은 `async` 속성과 마찬가지로 `<head>` 에 `<script>` 를 `defer` 속성과 함께 사용하게 된다.

![Untitled](Front-end%20Study%20day04%20%F0%9F%8C%B7%209a15041d557540dc8e1af5b8db468a81/Untitled%207.png)

- 병렬적으로 파싱과 JS 불러오기를 진행하게 되고 파싱이 모두 끝나면 JS 실행

![Untitled](Front-end%20Study%20day04%20%F0%9F%8C%B7%209a15041d557540dc8e1af5b8db468a81/Untitled%208.png)

- 병렬적으로 진행되기 때문에 다운로드 시간 절약되고 `async` 속성과는 다르게 파싱하는 중에 JS 파일을 모두 다운로드 받아놓고 파싱이 끝난 후 순서대로 JS파일을 실행하기 떄문에 원하는 방향대로 스크립트 실행 가능

<aside>
💡 결론!!!
외부 스크립트를 불러올 때에는 `defer` 속성을 사용하는 것이 최선
만약 스크립트 순서가 상관 없고 빨리 실행하는게 중요할 경우에는 `async`

</aside>

<br>

<br>

## 웹 표준과 웹 접근성

### 웹 표준(Web Standard)이란?

- 웹에서 사용되는 표준 기술이나 규칙
- W3C의 권고안에서 나온 기술들이 여기에 해당한다.

<br>

<br>

### 웹 접근성이란?

- 정상적인 웹 콘텐츠 사용이 가능한 일반 사용자로부터 고령자, 장애인 같은 신체적, 환경적 조건에 제한이 있는 사용자를 포함해 모든 사용자들이 동등하게 접근할 수 있는 웹 콘텐츠를 제작하는 방법을 말한다.
    - 청각 장애인을 위해 영상에 자막을 넣거나, 마우스를 사용할 수 없는 사람들을 위해 키보드를 통해서도 웹을 이용할 수 있게 하거나
    - 이미지에 대체 텍스트를 제공하는 간단한 방법들까지 모두 웹 접근성에 해당

<br>

<br>

### HTML Semantic

- 프로그래밍에서 시맨틱은 코드 조각의 의미를 나타냄

> 이 HTML 엘리먼트가 가진 목적이나 역할은 무엇인가?
이 Javascript 코드를 실행하는 것은 어떤 효과가 있는가?
> 

`<h1>` 태그

```jsx
<h1>This is a top level heading</h1>
```

- HTML에서 `<h1>` 태그는 페이지 내 최상의 제목 텍스트를 감싸는 역할을 수행하며, 태그 자체가 자신의 역할을 의미하는 Semantic 태그이다.

<br>

<br>

### 왜 Semantic 하게 웹을 구성해야할까?

- 검색 엔진 최적화 (SEO, Search Engine Optimization)
    - 검색 엔진을 가지고 있는 사이트는 봇을 사용해 각 사이트의 정보를 수집한다. 시맨틱 태그를 통해 구성된 사이트는 태그 자체가 의미를 가지기 때문에 봇이 정보를 수집하기 용이하다. 즉, 검색 엔진 최적화에 유리하다
- 접근성 (accessibility)
    - 시맨틱 태그를 사용한 사이트는 코드를 보다 쉽게 interpret할 수 있다. 사이트의 접근성이 높아짐. 특히 시각장애인들의 경우에는 사이트 문서를 읽어주는 스크린 리더를 사용하는데, 이 경우에도 시맨틱 태그를 활용한 사이트가 훨씬 유리하다
- 코드의 간결성 & 가독성
    - `<div>` `<span>` 과 같이 의미가 불분명한 태그로 코드를 작성하면 태그가 감싸고 있는 컨텐츠가 어떤 내용인지 바로 이해하기 어려움. 반면 시맨틱 태그는 감싸고 있는 내용이 어떤 의미인지를 내포하고 있다는 점에서 코드를 한눈에 이해하기 쉽다.
    
    <br>
    
    <br>
    

### 크로스 브라우징

- 오늘날 전세계의 영향을 끼치는 정보의 바다 웹 브라우저는 초기 브라우저 시장 점유 전쟁동안 서로 간의 배타적인 기술을 도입하면서 똑같은 웹 페이지도 브라우저에 따라 다르게 보이고 서로 다른 기술로 인해 많은 혼란을 겪어왔다. 따라서 상호 호환 브라우징(cross browsing) 의 미성숙으로 웹 기술이 혼란 상태에 빠지게 됨.

> 정의

웹 사이트 또는 웹 응용 프로그램이 서로 다른 브라우저에서 작동하고 브라우저 기능이 없거나 부족할 때 제한된 기능을 최대한 유지하도록 하는 것
즉, 표준에 따라 브라우저와 관계 없이 웹 페이지 기능을 만들어 모든 웹 브라우저 사용자가 방문했을 때 정보로써의 소외감을 느끼지 않도록 하는 것
> 

<br>

<br>

## WAI-ARIA

### WAI-ARIA란?

- 마우스와 같은 포인팅 장비를 사용하기 힘든, 스크린 리더를 사용하는 사용자들에게 동적 컨텐츠, JS, ajax, react 등과 같이 페이지를 새로고침하지 않아도 페이지의 내용과 데이터가 바뀌는 영역에 역할, 속성, 상태정보를 추가하여 동적인 컨텐츠에 보다 원활하게 접근하고 페이지에 접근성을 높여 여러 사용자들에게 원활한 페이지 이동을 도와줌

> 버튼을 클릭하여 페이지 새로고침이나 링크 이동으로 페이지가 전환되는 것이 아닌 컨텐트 내용이나 구조가 바뀌는 상황에서 페이지 전황 상태나 정보를 WAI-ARIA로 알려준다.
> 
- WAI-ARIA는 단순 HTML로 표현할 수 없는 의미들을 태그에 부여하여 시각적인 불편함이 있는 사용자들에게 일반적인 구조의 HTML에서 필요한 요소에 적절한 정보를 전달받아 원활하게 페이지 탐색 및 이용을 하도록 도와줌

```jsx
<li tabindex="0" class="checkbox" checked>
  Receive promotional offers
</li>

// 예를 들어 위와 같은 태그를 살펴보면 li태그에 .checkbox클래스를 부여하여 
// CSS상으로 체크박스 형태의 모양을 만들어 사용할 때 
// 시각적 불편함이 없는 사용자는 CSS화면을 보고 해당 영역이 체크박스임을 인지
// 하지만 스크린 리더로 화면을 탐색해야 하는 경우 위의 CSS정보를 읽을 수 없다.

💡 이 때 스크린 리더 사용자들을 위한 방법이 WAI-ARIA 이용하는 것
```

<br>

<br>

### Value

| page | 페이지 세트내의 현재 페이지를 나타낸다 |
| --- | --- |
| step | 프로세스 내의 현재 단계를 나타낸다 |
| location | 현재위치(ex. 이동 경로 계층 구조의 현재 페이지)를 나타낸다 |
| date | 날짜 모음 내의 현재 날짜를 나타낸다 |
| time | 시간 집합 내에서 현재 시간을 나타낸다 |
| true | 세트 내의 현재 항목을 나타낸다 |
| false | 세트 내의 현재 항목을 나타내지 않는다 |

<br>

<br>

<br>

# `HTML` , `CSS`

<br>

## 디스플레이

### display 속성

- display 속성은 웹 페이지의 레이아웃(layout)을 결정하는 CSS의 중요한 속성 중 하나
- 이 속성은 해당 HTML 요소가 웹 브라우저에 언제 어떻게 보이는가를 결정

<br>

<br>

### 블록(block)

- display 속성값이 블록(block)인 요소는 언제나 새로운 라인(line)에서 시작하며, 해당 라인의 모든 너비를 차지
- `<div>`, `<h1>`, `<p>`, `<ul>`, `<ol>`, `<form>`

<br>

<br>

### 인라인(inline)

- display 속성값이 인라인(inline)인 요소는 새로운 라인(line)에서 시작하지 않는다
- 요소의 너비도 해당 라인 전체가 아닌 해당 HTML 요소의 내용(content)만큼만 차지
- `<span>`, `<a>`, `<img>`

<br>

<br>

## `table`

### `<table>` 태그의 기본

![Untitled](Front-end%20Study%20day04%20%F0%9F%8C%B7%209a15041d557540dc8e1af5b8db468a81/Untitled%209.png)

- `<table>`: 표를 생성하는 가장 상위 태그
- `<tr>`: 행을 나타내는 태그
- `<td>`: 열을 나타내는 태그
- `<th>`: 표의 제목을 나타내는 태그

```jsx
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
 
<body>
    <table border="1">
      
        <tr>
            <td>1행 1열</td>
            <td>1행 2열</td>
            <td>1행 3열</td>
        </tr>
        <tr>
            <td>2행 1열</td>  
            <td>2행 2열</td>   
            <td>2행 3열</td>  
        </tr>
        <tr>
            <td>3행 1열</td>  
            <td>3행 2열</td>    
            <td>3행 3열</td>    
        </tr>
    </table>
 
</body>
</html>

// 표를 만들기 위해서는 <table></table>안에 정의를 해주면 된다.
// 행을 정의하기 위해 <tr>태그를 이용하고
// 열을 정의하기 위해 <td> 태그를 이용

💡 table border="1"을 안해주게 되면 테이블의 테두리가 보이지 않는데
	 border=""를 이용해서 테이블의 테두리 두께를 표현해주어야 함!
```

- 실행 결과

![Untitled](Front-end%20Study%20day04%20%F0%9F%8C%B7%209a15041d557540dc8e1af5b8db468a81/Untitled%2010.png)

<br>

<br>

### `<table>` 태그 속성 정리

![Untitled](Front-end%20Study%20day04%20%F0%9F%8C%B7%209a15041d557540dc8e1af5b8db468a81/Untitled%2011.png)

<br>

<br>

## `flex`

![Untitled](Front-end%20Study%20day04%20%F0%9F%8C%B7%209a15041d557540dc8e1af5b8db468a81/Untitled%2012.png)

![Untitled](Front-end%20Study%20day04%20%F0%9F%8C%B7%209a15041d557540dc8e1af5b8db468a81/Untitled%2013.png)

![Untitled](Front-end%20Study%20day04%20%F0%9F%8C%B7%209a15041d557540dc8e1af5b8db468a81/Untitled%2014.png)

![Untitled](Front-end%20Study%20day04%20%F0%9F%8C%B7%209a15041d557540dc8e1af5b8db468a81/Untitled%2015.png)

<br>

<br>

## 그리드(grid)

### 그리드란 무엇인가?

- 수평선과 수직선이 교차해서 이루어진 집합체
    - 하나의 집합체는 세로 열을 그리고 다른 하나는 가로 행을 정의

<br>

<br>

### CSS그리드 레이아웃의 기능

- 고정되거나 유연한 트랙 크기
    - 픽셀 단위를 써서 트랙 크기가 고정된 그리드를 만들 수 있다.
    - 이렇게 하면, 원하는 레이아웃에 맞도록 픽셀 크기를 지정해서 그리드를 설정가능
    - 퍼센트 혹은 이런 목적에 적합하도록 설계된 새로운 `fr`단위의 가변 크기를 지정해서, 좀 더 유연한 성질의 그리드를 만들 수도 있다.
- 아이템 배치
    - 아이템은 라인 번호, 이름 또는 그리드 영역을 지정해서 그리드의 정확한 위치에 배치 가능
    - 명확하게 위치가 지정되지 않은 아이템을 알아서 적절히 배치하는 알고리즘도 가지고 있다
- 콘텐츠를 담기 위한 추가 트랙의 생성
    - 그리드 레이아웃으로 그리드를 명시적으로 정의할 수 있지만, 지정된 그리드 밖에 따로 추가되는 콘텐츠에 대응하여 필요에 따라 행과 열을 추가할 수 있도록 표준 문서에서 기술
    - 예로 “컨테이너에 들어갈 수 있는 만큼의 세로 열”을 추가하는 기능이 포함
- 정렬 제어
    - 그리드에는 정렬 기능이 있어서 그리드 영역에 아이템을 배치한 후 어떻게 정렬할지, 그리고 전체 그리드가 정렬되는 방식을 제어 가능
- 겹치는 콘텐츠 제어
    - 그리드 셀에 하나 이상의 아이템을 배치하거나 그리드 영역을 부분적으로 서로 겹치게 할 수 있다.
    - 이렇게 생긴 중첩의 우선순위는 나중에 `[z-index](https://developer.mozilla.org/ko/docs/Web/CSS/z-index)` 프로퍼티로 제어할 수 있다

<aside>
💡 [https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout)

</aside>

<br>

<br>

### `grid` 와 `flex` 의 차이점

|  | grid | flex |
| --- | --- | --- |
|  | 컨테이너 | 컨텐츠 |
|  | 2차원 레이아웃 시스템(수직, 수평 둘다 가능) | 1차원 레이아웃 시스템(수직, 수평 택1) |
| 레이아웃 | 두 방향으로 레이아웃 가능 | 한 방향만 가능 |

<br>

<br>

### `word-break`

- 텍스트가 자신의 콘텐츠 박스 밖으로 오버플로 할 때 줄을 바꿀지 지정하는 것
- 줄바꿈!!!!!!!!!!

```jsx
// normal(기본 값)
// 기본 줄 바꿈 규칙 ( 텍스트가 길면, 박스 밖으로 삐져나온다 )
word-break: normal;

// break-all
// 텍스트가 문자( 글자 하나하나 )단위로 잘려 아래로 줄바꿈된다
💡 글자단위가 의미없다면 주로 이거
word-break: break-all;

// keep-all
// 한중일(CJK) 텍스트에서는 단어단위로 잘려 아래로 줄바꿈된다
💡 단어 단위로 끊어져 있는게 나을 것 같다면 이걸 쓰자
word-break: keep-all;
```

<br>

<br>

### `word-wrap`

- 박스의 가로 영역을 넘친 단어 내에서 임의의 분리 여부를 결정

```jsx
// normal
// 줄바꿈 일어나지 않음
// 박스 밖으로 길게 삐져나온다
word-wrap: normal;

// break-word
// 박스 너비보다 텍스트가 길면, 자동으로 줄바꿈이 일어난다
// 비아시아 언어에서 단어 단위로 줄바꿈
word-wrap: break-word;
```

<br>

<br>

## CSS 미디어 쿼리 (Media Query)

### 미디어 쿼리란?

- 단말기의 유형, 화면 해상도, 뷰포트 너비 등에 따라 사이트의 스타일을 적용할 수 있다.
    - `<style>`, `<link>` , `<source>` , 기타 다른 HTML 요소에 media 특성을 사용해 특정 매체만 사용하도록 할 때
    - CSS `@media` `@import` @ 규칙을 사용해 특정 조건에 따라 스타일을 적용할 때
    - 모든 최신 브라우저에서 미디어 쿼리가 동작하지만, 만약 IE 8이하에서 동작해야하는 경우라면 polyfill 라이브러리 사용

<br>

<br>

### 미디어 유형(Media Type) - 단말기 유형

- all : 모든 장치
- print : 인쇄 결과물 및 출력 미리보기 화면에 표시 중인 문서
- screen : 스크린 화면
- speech : 음성 합성장치
- 그 외 Media Query 3 모듈에서는 tty, tv, projection, handheld, braille, embossed, aural을 정의하였지만 Media Query 4에서 제거되었습니다.

<br>

<br>

### 미디어 특성

- 미디어 특성은 출력 장치, 환경 등의 특징을 정의할 수 있습니다. 미디어 특성 표현식을 사용하여 특성의 존재 여부와 값을 판별하여 조건을 정의할 수 있다
- 각각의 미디어 특성 표현식은 괄호로 감싸야 한다

| width | 스크롤바를 포함한 뷰포트 너비 |
| --- | --- |
| max-width | 뷰포트의 최대 가로 너비 |
| min-width | 뷰포트의 최소 가로 너비 |
| height | 뷰포트의 높이 |
| max-height | 뷰포트의 최대 높이 |
| min-height | 뷰포트의 최소 높이 |
| orientation | 뷰포트의 방향 |
| grid | 장치가 그리드와 비트맵 스크린 중 어느 것을 사용하는지 |
| hover | 사용자 요소 위에 마우스를 올릴 수 있는 환경인지 |

```css
// 뷰포트의 가로너비가 1025px 이상인 경우 적용 : 데스크탑 환경
@media screen and (min-width: 1025px){ .. }

// 뷰포트의 가로너비가 769px 이상 1024px 이하 : 태블릿 환경
@media screen and (min-width: 769px) and (max-width: 1024){ .. }

// 뷰포트의 가로너비가 768px 이하인 경우 적용 : 모바일 환경
@media screen and (min-width: 768px){ .. }

// 장치가 가로 방향인 경우 적용
@media (orientation: landscape){ .. }

// 장치가 세로 방향인 경우 적용
@media (orientation: portrait){ .. }

// 사용자가 요소 위에 마우스 커서를 올릴 수 있는 환경인지 : 터치 스크린 및 키보드 네비게이션은 불가능
@media (hover: hover){ .. }
[출처] [CSS]CSS 미디어 쿼리(Media Query) 사용법 총정리|작성자 로그
```

<br>

<br>

### 논리 연산자

| and | 다수의 미디어 특성을 조합하여 하나의 미디어 쿼리를 만들 때 사용(and 연산자와 같은 동작) |
| --- | --- |
| not | 쿼리가 거짓일 때만 참을 반환, Level3 모듈에서는 not 키워드 사용시 단일 미디어 쿼리에 not 연산을 불가능하며, 전체 쿼리만 not 연산이 가능하다 |
| only | 전체 쿼리가 일치할 경우에만 스타일 적용 |
| , | 다수의 미디어 쿼리를 하나의 규칙으로 조합할 때 사용, 단 하나의 쿼리만 참을 반환해도 규칙 전체가 참(or 연산자와 같은) |

```css
// 논리곱 미디어 쿼리
// screen 유형 + (min-width: 400px) + (orientation: landscape)
// 모두 참이어야 적용
@media screen and (min-width: 400px) and (orientation: landscape){ .. }

// 논리합 미디어 쿼리
// screen and (min-width: 400px) 혹은 screen and (orientation: landscape)
// 둘중 하나라도 참이면 적용
@media screen and (min-width: 400px), screen and (orientation: landscape){ .. }

// 부정 논리 미디어 쿼리
// 보기 방향이 세로일 경우에만 적용
@media not all and (orientation: landscape){ .. }
[출처] [CSS]CSS 미디어 쿼리(Media Query) 사용법 총정리|작성자 로그
```

<br>

<br>

### 미디어 쿼리 적용 방법

1. HTML의 `link` 태그의 media 속성 설정
- `<link>` 요소에 사용하여 특성이 조건에 맞을 때 css 파일을 불러온다

```css
<link href="css파일 경로" rel="stylesheet" type="text/css" 
					media="screen and (max-width: 768px)"/>
// screen : 미디어 타입이 스크린이고,
// (max-width: 768px) : 화면의 최대 너비가 768px 즉, 768px 이하일 때 적용
[출처] [CSS]CSS 미디어 쿼리(Media Query) 사용법 총정리|작성자 로그
```

1. CSS 파일 내에 직접 `@Media` 규칙 설정
- `@Media` 규칙 안에 해당 조건에 맞을 때 적용할 css 스타일을 정의한다

```css
// css 파일
@media screen and (max-width: 768px) {
	body {
		background-color: lightgreen;
	}

	div {
		background-color: black;
	}
}

// 사용할 html 화면
// 1. link 태그 사용시
<link href="css파일 경로" rel="stylesheet" type="text/css"/>
// 2. @import 사용시
@import "css파일 경로";
[출처] [CSS]CSS 미디어 쿼리(Media Query) 사용법 총정리|작성자 로그
```

1. Viewport 정의

```css
<meta name="viewport" content="width=device-width, maximum-scale=1.0, minimum-scale=1
		, user-scalable=yes,initial-scale=1.0" />
```

| name | 메타 태그로 뷰포트 선언 |
| --- | --- |
| content | 메타 태그 내용 |
| width | 컨텐츠를 표현할 넓이(device-width : 디바이스의 크기) |
| initial-scale | 초기 크기 설정(기본 꽉찬 화면) |
| minimun-scale | 최소 크기 설정(0.25 ~ 10.0) |
| maximun-scale | 최대 크기 설정(0 ~ 10.0) |
| user-scalable | 사용자 단말의 확대 기능 사용 유무(yes/no) |

<br>

<br>

## 오버플로우

- 언제 발생하는가?
    - 콘텐츠 내용이 콘텐츠 그릇보다 클 때

<br>

<br>

### 오버플로우의 종류

- overflow
    - 상자, 혹은 웹 페이지를 기준으로 흘러넘치는 콘텐츠 처리 방식
- overflow - x
    - 상자를 가로로 흘러넘치는 콘텐츠 처리 방식
    - 가로축(x축)의 스크롤 바를 정의하는 방식
- overflow - y
    - 상자를 세로로 흘러넘치는 콘텐츠 처리 방식
    - 세로축(y축)의 스크롤 바를 정의하는 방식
    
    <br>
    
    <br>
    

### 오버플로우 처리방식

- `visible` : 기본 값. 콘텐츠가 넘치더라도 잘리지 않고 상자 밖으로 전체 콘텐츠가 보이게 하는 것,
- `hidden` : 패딩 상자 밖으로 넘친 부분은 아예 보이지 않는다.
- `scroll` : 패딩 상자 밖으로 넘친 콘텐츠들이 잘린다. 하지만 스크롤을 통해서  확인 가능
- `auto` : 콘텐츠들이 넘치면 자동으로 스크롤이 생긴다.