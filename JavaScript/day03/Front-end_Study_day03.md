# Front-end Study day03🤹‍♂️

# `JavaScript`

## 이벤트

### DOM, 문서 객체 모델(Document Object Model)

- DOM은 XML이나 HTML문서에 접근하기 위한 일종의 인터페이스이다.
- 이 객체 모델은 문서 내의 모든 요소를 정의하고 각각의 요소에 접근하는 방법을 제공한다
- 넓은 의미로 웹 브라우저가 HTML 페이지를 인식하는 방식을 의미, 좁은 의미로 본다면 document 객체와 관련된 객체의 집합을 의미

![Untitled](Front-end%20Study%20day03%F0%9F%A4%B9%E2%80%8D%E2%99%82%EF%B8%8F%206f81d84c962f4e119fbd9bdab61e92f1/Untitled.png)

<br>

<br>

### DOM의 종류

- Core DOM : 모든 문서 타입을 위한 DOM 모델
- HTML DOM : HTML 문서를 위한 DOM 모델
    - HTML문서를 조작하고 접근하는 표준화된 방법을 정의한다
- XML DOM : XML 문서를 위한 DOM 모델
    - XML 문서에 접근하여 그 문서를 다루는 표준화된 방법을 정의한다

<br>

<br>

<br>

## HTML element

### 선택

### `getElementById()`

- 파라미터로 찾으려는 id를 전달하여, 해당 element를 찾을 수 있다
- id는 유일한 값이므로, 하나의 element만 리턴한다

```jsx
// HTML
<div id='div_1'>
  Div1입니다.
</div>
<div id='div_2'>
  Div2입니다.
</div>
<input type='button'
       value='getElementById() - id로 찾기'
       onclick='getDiv1()'/>

// JS
function getDiv1() {
  const div1 = document.getElementById('div_1');
  alert(div1.innerText);
}
```

<br>

<br>

### `getElementsByClassName()`

- 클래스 이름으로 element를 찾아서, 이 클래스 이름을 가지는 모든 element 목록을 리턴
- 함수의 이름을 자세히 보면 getElementsByClassName으로 Elements가 복수의 형태인 것은 이 함수가 목록을 리턴하기 때문이다

```jsx
// HTML
<div id='div_1' class='my_class'>
  Div1입니다.
</div>
<div id='div_2' class='my_class'>
  Div2입니다.
</div>
<div id='div_3' class='your_class'>
  Div3입니다.
</div>
<input type='button'
       value='getElementsByClassName() - class이름으로 찾기'
       onclick='getMyClass()'/>

// JS
function getMyClass() {
  const div_list 
    = document.getElementsByClassName('my_class');
  
  // class가 'my_class'인 element 개수 출력
  const div_list_length = div_list.length;
  alert(div_list_length);
  
  // class가 'my_class'인 element 목록 출력
  for(let i = 0; i < div_list_length; i++)  {
    alert(div_list[i].innerText);
  }
}
```

- 다수의 클래스 이름을 모두 포함하고 있는 element를 찾을 때는 파라미터로 클래스 이름을 스페이스로 구분하여 넘겨준다.
- 아래 코드는 클래스 이름에 ‘red’ 와 ‘blue’ 모두를 포함하는 element를 찾아준다

```jsx
// document.getElementsByClassName('red blue');

// HTML
<div id='div_1' class='red blue yellow'>
  red blue yellow
</div>
<div id='div_2' class='green blue red'>
  green blue red
</div>
<div id='div_3' class='yellow green red'>
  yellow green red
</div>
<input type='button'
       value='getElementsByClassName() - class이름으로 찾기'
       onclick='getMyClass()'/>

// JS
function getMyClass() {
  const div_list 
    = document.getElementsByClassName('red blue');
  
  // class가 'my_class'인 element 개수 출력
  const div_list_length = div_list.length;
  alert(div_list_length);
  
  // class가 'my_class'인 element 목록 출력
  for(let i = 0; i < div_list_length; i++)  {
    alert(div_list[i].innerText);
  }
}
```

<br>

<br>

### `getElementsByTagName()`

- ‘ ‘ 태그를 가진 모든 element 목록을 찾아준다

```jsx
// HTML
<div id='div_1' class='my_class'>
  Div1입니다.
</div>
<div id='div_2' class='my_class'>
  Div2입니다.
</div>
<div id='div_3' class='your_class'>
  Div3입니다.
</div>
<input type='button'
       value='getElementsByTagName() - Tag Name으로 찾기'
       onclick='getElementsByTagNameDiv()'/>

// JS
function getElementsByTagNameDiv() {
  const div_list 
    = document.getElementsByTagName('div');
  
  // tag name이 'div'인 element 개수 출력
  const div_list_length = div_list.length;
  alert(div_list_length);
  
  // tag name이 'div'인 element 목록 출력
  for(let i = 0; i < div_list_length; i++)  {
    alert(div_list[i].innerText);
  }
}
```

<br>

<br>

### `querySelector()`

- 이 함수는 파라미터로 입력받은 CSS 선택자를 사용해서, element를 찾아준다
- 파라미터로 입력받은 CSS 선택자로 찾은 여러개의 element 중 첫번째 element를 리턴

```jsx
// HTML
<div id='div_1' class='my_class'>
  Div1입니다.
</div>
<div id='div_2' class='my_class'>
  Div2입니다.
</div>
<div id='div_3' class='your_class'>
  Div3입니다.
</div>
<input type='button'
       value='querySelector() - Class로 찾기'
       onclick='querySelectorByClassName()'/>

// JS
function querySelectorByClassName() {
  const div
    = document.querySelector('.my_class');
  
  alert(div.innerText);
}
```

<br>

<br>

### `querySelectorAll()`

- 사용법은 `querySelector()`과 같다
- 다만, 이름에서 알 수 있듯 CSS선택자(파라미터로 넘겨준)로 찾은 모든 element 목록을 리턴한다

```jsx
// HTML
<div id='div_1' class='my_class'>
  Div1입니다.
</div>
<div id='div_2' class='my_class'>
  Div2입니다.
</div>
<div id='div_3' class='your_class'>
  Div3입니다.
</div>
<input type='button'
       value='querySelectorAll() - Id 전체 찾기'
       onclick='querySelectorAllById()'/>

// JS
function querySelectorAllById() {
  const div_list 
    = document.querySelectorAll('#div_1');
  
  // id가 'div_1'인 element 개수 출력
  const div_list_length = div_list.length;
  alert(div_list_length);
  
  // id가 'div_1'인 element 목록 출력
  for(let i = 0; i < div_list_length; i++)  {
    alert(div_list[i].innerText);
  }
}
```

<br>

<br>

### 생성

### `createElement()`

- 파라미터로 입력받은 tagName의 element를 생성하여 리턴

```jsx
let element = document.createElement(tagName);
```

<br>

<br>

### `createTextNode()`

- text node를 생성하는 함수이다
- 파라미터로 전달받은 텍스트 데이터를 텍스트 노드로 변환하여 Text노드를 리턴

```jsx
let textNode = document.createTextNode(data);
```

<br>

<br>

### 추가

```jsx
<!-- before() -->
<div>
    <!-- prepend() -->
    안녕?
    <!-- append() -->
</div>
<!-- after() -->

// HTML
<div>목록</div>
<ul id='list'>
  <li id='first'>1</li>
  <li id='second'>2</li>
  <li id='third'>3</li>
</ul>
<div>목록 끝</div>

<input type='button' onclick=' before()' value='before()' />
<input type='button' onclick=' after()' value='after()' />
<input type='button' onclick=' prepend()' value='prepend()' />
<input type='button' onclick=' append()' value='append()' />

// JS
const list = document.getElementById('list');
  
  // list(<ul>) 앞에 'before' 텍스트 추가
  list.before('before');
}

function after() {
  const list = document.getElementById('list');
  
  // list(<ul>) 뒤에 'after' 텍스트 추가
  list.after('after');
}

function prepend() {
  const list = document.getElementById('list');
  
  // list(<ul>)의 첫번째 자식 노드 뒤에 <li> 노드 추가
  const prepend = document.createElement('li');
  prepend.innerHTML = 'prepend';
  list.prepend(prepend);
}

function append() {
  const list = document.getElementById('list');
  
  // list(<ul>)의 마지막 자식 노드 뒤에 <li> 노드 추가
  const append = document.createElement('li');
  append.innerHTML = 'append';
  list.append(append);
}
```

### `before()`

- 노드 또는 문자열을 선택된 노드의 앞에 추가

<br>

<br>

### `after()`

- 노드 또는 문자열을 선택된 노드의 뒤에 추가

<br>

<br>

### `prepend()`

- 노드 또는 문자열을 선택된 노드의 첫 번째 자식 element 앞에 추가

<br>

<br>

### `append()`

- 노드 또는 문자열을 선택된 노드의 마지막 자식 element 뒤에 추가

<br>

<br>

### `insertAdjacentHTML()`

- 파라미터로 입력받은 htmlText(HTML 또는 XML)을 파싱하여 노드로 변환하고 이 노드를 position으로 입력받은 위치에 삽입

```jsx
insertAdjacentHTML(position, htmlText);
```

<br>

<br>

### `insertAdjacentElement()`

- 파라미터로 입력받은 요소를 position으로 입력받은 위치에 삽입

```jsx
insertAdjacentElement(position, element);
```

<br>

<br>

### `insertAdjacentText()`

- 파라미터로 입력받은 text를 position으로 입력받은 위치에 삽입

```jsx
insertAdjacentText(position, text);
```

<br>

<br>

🏁 위 세가지 경우의 position 값에는 어떤 값을 넣어주어야 할까?

- beforebegin - 선택된 노드의 앞
- afterend - 선택된 노드의 뒤
- afterbegin - 선택된 노드의 첫 번째 자식 노드 앞
- beforeend - 선택된 노드의 마지막 자식 노드

```jsx
<!-- beforebegin -->
<div>
   <!-- afterbegin -->
   안녕?
   <!-- beforeend -->
</div>
<!-- afterend -->

// HTML
<div>목록</div>
<ul id='list'>
  <li id='first'>1</li>
  <li id='second'>2</li>
  <li id='third'>3</li>
</ul>
<div>목록 끝</div>

<input type='button' 
       onclick=' beforebegin()' 
       value='beforebegin()' />
<input type='button' 
       onclick='afterend()' 
       value='afterend()' />
<input type='button'
       onclick='afterbegin()' 
       value='afterbegin()' />
<input type='button'
       onclick=' beforeend()' 
       value='beforeend()' />

// JS
// list(<ul>) 앞에 '<div>beforebegin</div>' HTML 추가
function beforebegin() {
  const list = document.getElementById('list');
  
  const htmlText = '<div>beforebegin</div>';
  list.insertAdjacentHTML('beforebegin', htmlText);
}

// list(<ul>) 뒤에 '<div>afterend</div>' HTML 추가
function afterend() {
  const list = document.getElementById('list');
  
  const htmlText = '<div>afterend</div>';
  list.insertAdjacentHTML('afterend', htmlText);
}

// list(<ul>)의 첫번째 자식 노드 뒤에 <li> 노드 추가
function afterbegin() {
  const list = document.getElementById('list');
  
  const htmlText = '<li>afterbegin</li>';
  list.insertAdjacentHTML('afterbegin', htmlText);
}

// list(<ul>)의 마지막 자식 노드 뒤에 <li> 노드 추가
function beforeend() {
  const list = document.getElementById('list');
  
  const htmlText = '<li>beforeend</li>';
  list.insertAdjacentHTML('beforeend', htmlText);
}
```

<br>

<br>

### `appendChild()`

- 선택한 노드의 마지막 자식 노드 뒤에 파라미터로 전달받은 노드를 붙인다.
- `append()` 함수와 비슷하게 동작한다

```jsx
let child = element.appendChild(child);
```

🏁 `appendChild()` vs `append()` 비교

|  | appendChild() | append() |
| --- | --- | --- |
| 파라미터 | node 객체만 | node 객체, text |
| 리턴 값 | 추가한 자식 노드 리턴 | X |
| 노드 추가 | 하나의 노드만 추가 | 여러 노드 추가 |

<br>

<br>

### `insertBefore()`

- newNode를 parentNode의 자식 노드 중 하나인 referenceNode 앞에 추가한다

```jsx
let insertedNode = parentNode.insertBefore(newNode, referenceNode);
```

- 파라미터
    - newNode : 추가할 노드
    - referenceNode
        - parentNode의 자식노드이며 newNode는 referenceNode의 앞에 추가된다
        - referenceNode가 null이면, newNode는 자식 노드의 끝에 추가된다

```jsx
// HTML
<div>목록</div>
<ul id='list'>
  <li id='first'>1</li>
  <li id='second'>2</li>
  <li id='third'>3</li>
</ul>
<div>목록 끝</div>

<input type='button' onclick='insertBefore2()' value='insertBefore(node, refNode)' />
<input type='button' onclick='insertEnd()' value='insertBefore(node, null)' />

// JS
// <li>2</li> 앞에 노드 추가
function insertBefore2() {
  const list = document.getElementById('list');
  
  // newNode
  const newNode = document.createElement('li');
  newNode.innerHTML = '1.5';
  
  // referenceNode
  const referenceNode = document.getElementById('second');
  
  // insertBefore
  list.insertBefore(newNode, referenceNode);
}

// <ul>의 자식 노드 맨 뒤에 추가
function insertEnd() {
  const list = document.getElementById('list');
  
  // newNode
  const newNode = document.createElement('li');
  newNode.innerHTML = '4';
  
  // insertBefore
  list.insertBefore(newNode, null);
}
```

<br>

<br>

### 변경

### `replaceWith()`

- node를 새로운 노드나 문자열(param1, … , paramN) 로 대체한다

```jsx
node.replaceWith(param1);
node.replaceWith(param1,....,paramN);

// HTML
<div>목록</div>
<ul id='list'>
  <li id='first'>1</li>
  <li id='second'>2</li>
  <li id='third'>3</li>
</ul>
<div>목록 끝</div>

<input type='button' onclick='replaceWithEx()' value='replaceWith()' />

// JS
// <li>2</li> 노드 교체
function replaceWithEx() {
  // 교체할 기존 노드, <li>2</li>
  const oldNode = document.getElementById('second');
  
  // 교체할 새 노드, <li>2(new)</li>
  const newNode = document.createElement('li');
  newNode.id='second';
  newNode.innerHTML = '2(new)';
  
  // replaceWith()
  oldNode.replaceWith(newNode);

}
```

<br>

<br>

### `replaceChild()`

- parentNode의 자식 노드 중 oldChild를 newChild로 교체
- 이 함수는 교체된 노드, 즉 oldChild 노드와 동일한 노드를 리턴한다
- parentNode가 oldChild의 부모 노드가 아닐 경우 exception(NotFoundError)이 발생

```jsx
let replaceNode = parentNode.replaceChild(newChild, oldChild);

// HTML
<div>목록</div>
<ul id='list'>
  <li id='first'>1</li>
  <li id='second'>2</li>
  <li id='third'>3</li>
</ul>
<div>목록 끝</div>

<input type='button' onclick='replaceChildEx()' value='replaceChild()' />

// JS
// <li>2</li> 노드 교체
function replaceChildEx() {
  // 교체할 기존 노드, <li>2</li>
  const oldNode = document.getElementById('second');
  
  // 교체할 기존 노드의 parent 노드
  const parent = oldNode.parentNode;
  
  // 교체할 새 노드, <li>2(new)</li>
  const newNode = document.createElement('li');
  newNode.id='second';
  newNode.innerHTML = '2(new)';
  
  // replaceChild()
  parent.replaceChild(newNode, oldNode);

}
```

<br>

<br>

### 삭제

### `remove()`

- 선택된 노드 삭제

```jsx
node.remove()

// HTML
<div>목록</div>
<ul id='list'>
  <li id='first'>1</li>
  <li id='second'>2</li>
  <li id='third'>3</li>
</ul>
<div>목록 끝</div>

<input type='button' onclick='removeEx()' value='remove()' />

// JS
// <li>2</li> 노드 삭제
function removeEx() {
  
  // 삭제할 기존 노드, <li>2</li>
  const child = document.getElementById('second');
  
  // 삭제 : remove()
  child.remove();

}
```

<br>

<br>

### `removeChild()`

- 파라미터로 전달받은 child 노드 삭제
- 이때, 파라미터로 전달한 child 노드는 parentNode의 자식 노드여야한다.

```jsx
parentNode.removeChild(child);

// HTML
<div>목록</div>
<ul id='list'>
  <li id='first'>1</li>
  <li id='second'>2</li>
  <li id='third'>3</li>
</ul>
<div>목록 끝</div>

<input type='button' onclick='removeChildEx()' value='removeChild()' />

// JS
// <li>2</li> 노드 삭제
function removeChildEx() {
  // 삭제할 기존 노드, <li>2</li>
  const child = document.getElementById('second');
  
  // 삭제할 기존 노드의 parent 노드
  const parent = child.parentNode;
  
  // 삭제 : removeChild()
  parent.removeChild(child);

}
```

<br>

<br>

### 복사

### `clondNode()`

- 호출한 node의 복사본을 리턴

```jsx
let dupNode = node.cloneNode(deep);
```

- 파라미터 deep
    - true : node의 children까지 복사
    - false : 해당 노드만 복사
    - default 값은 브라우저의 버전에 따라 다르므로 ,deep 값을 반드시 써 주는 것이 좋다

```jsx
// HTML
<div id='hello'>
  <p style='color: red'>안녕하세요</p>
</div>

<input type='button' value='복사/붙여넣기' onclick='cloneNodeEx()' />

// JS
// 'hello' 노드 복사하여 붙여넣기
function cloneNodeEx() {
  
  // 복사할 노드 선택
  const hello = document.getElementById('hello');
  
  // 복사
  const helloCopy = hello.cloneNode(true);
  
  // id 변경
  helloCopy.id = 'hello2';
  
  // 붙여넣기
  document.body.append(helloCopy);
}
```

<br>

<br>

## `attribute`

- 요소의 속성에 접근하여 값을 변경, 추가할 수 있다
- element.attribute = “값” 의 형태로 사용된다

```jsx
const img = document.getElementById("img");
img.src = "./아무사진1.png";

var el = document.getElementById('menu');
// - 속성의 추가 : 엘리먼트에 새로운 속성과 속성값을 추가한다.
el.setAttribute(속성명, 속성값);
// - 속성의 변경 : 엘리먼트에 지정된 속성명을 새로운 속성값으로 바꾼다.
el.setAttribute(속성명, 속성값);
// - 속성의 삭제 : 엘리먼트에서 지정된 속성명과 일치하는 속성을 삭제한다.
el.removeAttribute(속성명);
// - 속성값 조회 : 엘리먼트에서 지정된 속성명의 속성값을 가져간다.
el.getAttribute(속성명);
```

- 위의 코드를 사용하면 `<img src="" id="img">` 인 태그를 `<img src="./아무사진1.png" id="img">`로 변경 한다.

<br>

<br>

### `setAttribute()`

- 요소의 속성에 접근하여 값을 변경, 추가할 수 있다
- `element.setAttribute('속성', '값')` 의 형태로 사용한다

```jsx
const img = document.getElementById("img");
 img.setAttribute('src', '아무사진1.png');
```

<br>

<br>

<br>

## DOM의 CSS Style 변경

### Style 속성값 변경

1. `style` 속성 사용하기 - CSS 속성 하나씩 추가하기

```jsx
// HTML
<div id='greeting'> 안녕하세요 </div>
<input type='button' 
       value='텍스트 색상 변경(Blue)' 
       onclick='changeTextColor()'
/>
<input type='button' 
       value='배경 색상 변경(Yellow)' 
       onclick='changeBgColor()'
/>

// JS
function changeTextColor() {
  
  // 1. 대상 element 선택
  const element = document.getElementById('greeting');
  
  // 2. style 변경
  element.style.color = 'blue';
}

function changeBgColor() {
  
  // 1. 대상 element 선택
  const element = document.getElementById('greeting');
  
  // 2. style 변경
  element.style.backgroundColor = 'yellow';
}
```

- 위 예제는 style 속성을 이용하여 글자 색상과 배경 색을 변경하는 예제

✔️ 주의할 점은 style 속성에 지정하는 css 속성 이름은 carmel case, ‘background-color’ 는 ‘backgroundcolor’ 로 작성한다. ‘-’가 들어가서는 안됨 

1. `style.cssText` 사용하기 - css 속성 한번에 여러개 추가하기

```jsx
// HTML
<div id='greeting'> 안녕하세요 </div>
<input type='button' 
       value='텍스트/배경 색상 변경(Blue/Yellow)' 
       onclick='changeColor()'
/>

// JS
function changeColor() {
  
  // 1. 대상 element 선택
  const element = document.getElementById('greeting');
  
  // 2. style 변경
  element.style.cssText  = 'color: blue; background-color: yellow';
}
```

- 위 예제는 한꺼번에 글자의 색상과 배경색을 지정해주기 위해서 style의 cssText 속성을 사용

✔️ cssText 속성을 지정할 때는, ‘-’를 사용한 css 속성명을 사용한다

<br>

<br>

🏁 `style`, `style.cssText` 사용 시 주의할 점

- `style.css 속성명` - 기존에 정의된 style에 새로운 속성을 추가
- `style.cssText` - 기존에 정의된 style을 지우고, cssText로 덮어 쓴다

```jsx
// HTML
<div id='greeting'> 안녕하세요 </div>
<input type='button' 
       value='텍스트/배경 색상 변경(Blue/Yellow)' 
       onclick='change()'
/>

// JS
function change() {
  
  // 1. 대상 element 선택
  const element = document.getElementById('greeting');
  
  // 2. Style 속성 지정 
  element.style.fontWeight='bold';
  
  // 3. cssText 지정(덮어쓴다)
  element.style.cssText  = 'color: blue; background-color: yellow';
}
```

✔️ 위 예제에서는 `style.fontWeight='bold'` 를 지정하였지만 `element.style.cssText` 구문이 앞에서 지정한 ‘fontWeight’ 속성을 모두 덮어쓴 것을 확인할 수 있다.

```jsx
// HTML
<div id='greeting'> 안녕하세요 </div>
<input type='button' 
       value='텍스트/배경 색상 변경(Blue/Yellow)' 
       onclick='change()'
/>

// JS
function change() {
  
  // 1. 대상 element 선택
  const element = document.getElementById('greeting');

  // 2. cssText 지정(덮어쓴다)
  element.style.cssText  = 'color: blue; background-color: yellow';
  
  // 3. Style 속성 지정(추가된다)
  element.style.fontWeight='bold';
}
```

✔️ 이번 예제에서는 cssText 속성을 먼저 지정하고 element.style.fontWeight 속성을 나중에 정의, cssText 속성에 정의된 style에 fontWeight가 추가된 것을 확인할 수 있다. 

<br>

<br>

<br>

## throttling과 debouncing

> 두 가지 방법 모두 DOM 이벤트를 기반으로 실행하는 자바스크립트를 성능상의 이유로 JS의 양적인 측면, 즉 이벤트(event)를 제어(제한)하는 프로그래밍 기법이다.
> 

```
◾ setTimeout() - 함수의 실행을 예약하는 타이머 기능
◾ clearTimeout() - 타이머의 실행을 취소하는 기능
◾ 디바운싱 - 빈번하게 발생하는 이벤트를 '특정 시간 이후에 한번만' 실행 시키는 최적화 기법
◾ 쓰로틀링 - 빈번하게 발생하는 이벤트를 '일정한 간격으로 한번만' 실행 시키는 최적화 기법
```

예를 들어, 웹/앱 사용자가 스크롤(scroll wheel), 트랙패드, 스크롤 막대를 드래깅 한다고 가정해보자.

사용자는 크게 느끼지 못할 수 있으나 이 행위로 인해 수많은 스크롤 이벤트가 발생하게 된다.

이 때 매번 스크롤 이벤트에 대한 콜백(callback)이 발생하고 그 콜백이 수행하는 일은 매우 큰 리소스를 잡아먹게 될 것이다.

✔️ Throttle 과 Debounce 는 이벤트가 과도한 횟수로 발생하여 이벤트 핸들러가 무거운 연산을 수 없이 많이 수행하는 경우에 제약을 걸어 제어할 수 있는 수준으로 이벤트를 발생시키는 것을 목표로하는 기술

✔️ `underscore` 나 `lodash` 의 메소드를 사용하면 편리

<br>

<br>

### 디바운싱(debouncing)

- 연이어 호출되는 함수들 중 마지막 함수(또는 제일 처음)만 호출하도록 하는 것

```jsx
<input id="input" />
document.querySelector('#input').addEventListener('input', function(e) {
  console.log(`api 요청 : ${e.target.value}`);
});
```

- 만약 “시그널” 을 엔터 없이도 검색 결과가 바로 나오는 검색창에 친다고 해보자. 엔터 없이도 결과를 즉시 보여주려면 항상 input 이벤트에 대기하고 있어야 한다.
    - 문제는 한 글자 칠 때마다 api 요청이 실행됨
    - 예제로 본다면 7번이나 요청 함.
    - 한글같은 조합형 언어는 사진처럼 7번보다 더 많이 이벤트가 발생할 수도 있음

![Untitled](Front-end%20Study%20day03%F0%9F%A4%B9%E2%80%8D%E2%99%82%EF%B8%8F%206f81d84c962f4e119fbd9bdab61e92f1/Untitled%201.png)

- 이와 같은 낭비는 유료 API 를 사용했을 때 큰 문제 발생(비용적인 문제)
    - 만약 구글지도 API 같은 것을 사용할 때 위와 같이 쿼리를 10번 날리면 큰 손해를 입게 됨

🏁 어떻게 해결해야할까?

- 보통 사람들은 타자를 연달아친다. 중간에 잠시 생각하느라 몇 초 쉴 수는 있겠지만 대부분 한 번에 검색어를 입력한다. 따라서 입력이 다 끝난 후에 요청을 보내고 싶다. 즉, 타자를 칠 때 (input 이벤트 발생)마다 타이머를 설정하고, 200ms동안 입력이 없으면 입력이 끝난 것으로 친다.(시간은 적당히 설정) 그리고 *200ms 이전에 타자 입력이 발생하면 이전 타이머는 취소하고 새로운 타이머를 다시 설정*하는 것

```jsx
var timer;
document.querySelector('#input').addEventListener('input', function(e) {
  // 아직 타이머 수행되지 않았으면(직전 입력으로부터 200ms가 지나지 않았다면) 타이머 취소
  // (타이머가 존재하면, 즉 직전 입력에서 타이머를 생성했다면)
  if (timer) {
    clearTimeout(timer);
  }
  // 타이머 설정
  timer = setTimeout(function() {
    console.log(`api 요청 : ${e.target.value}`);
  }, 200);
});
```

![Untitled](Front-end%20Study%20day03%F0%9F%A4%B9%E2%80%8D%E2%99%82%EF%B8%8F%206f81d84c962f4e119fbd9bdab61e92f1/Untitled%202.png)

<br>

<br>

### 쓰로틀링(throttling)

- 마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는 것
- 쓰로틀링은 보통 성능 문제 때문에 많이 사용한다. 특성 자체가 실행 횟수에 제한을 거는 것이기도 함
- 스크롤을 올리거나 내릴 때 scroll 이벤트가 매우 많이 발생, scroll 이벤트가 발생할 때 뭔가 복잡한 작업을 하도록 설정했다면 매우 빈번하게 실행되기 때문에 렉이 걸릴 것.
- 그럴 때 쓰로틀링을 걸어서 몇 초에 한 번, 또는 몇 밀리초에 한 번씩만 실행되도록 제한을 두면 된다.

🏁 어떻게 해결해야 할까?

- 디바운싱으로 구현했던 검색을 쓰로틀링으로 대체해도 됨. 똑같이 200ms초 제한 걸어두었다.
- 타이머가 설정되어 있으면 아무 동작도 하지 않고 타이머가 없다면 타이머를 설정한다
- 타이머는 일정 시간 후에 스스로를 해제하고 api 요청을 날린다
- 이제 최소 200밀리초마다 한 번씩만 요청을 보내게다

```jsx
var timer;
document.querySelector('#input').addEventListener('input', function (e) {
   // 타이머가 없을 때만 타이머 설정.
   // 만약 200ms가 지나서 해당 함수를 실행하면 타이머는 사라진다. (timer = null)
   // 만약 타이머 설정 후 200ms가 지나지 않았다면 아무 일도 일어나지 않는다.
   // 따라서 최소 200ms 마다 한번씩만 아래의 코드가 실행된다.
   if (!timer) {
      timer = setTimeout(function() {
          timer = null;
          console.log(`api 요청 : ${e.target.value}`);
      }, 200);
   }
});
```

![Untitled](Front-end%20Study%20day03%F0%9F%A4%B9%E2%80%8D%E2%99%82%EF%B8%8F%206f81d84c962f4e119fbd9bdab61e92f1/Untitled%203.png)

✔️ `underscore` 의 `*.debounce` 와* `.throttle` 을 쓴다고 함! 

<br>

<br>

<br>

## 이벤트 버블링 & 캡쳐링 & 위임

### HTML 이벤트의 흐름

- HTML 문서의 각 엘리먼트들은 아래와 같이 태그 안의 태그가 위치하는 식으로 계층적으로 이루어져있다. 이러한 특징 때문에 만약 HTML 요소에 이벤트가 발생할 경우 연쇄적 이벤트 흐름이 일어나게된다.

```html
<form onclick="alert('form')">FORM
    <div onclick="alert('div')">DIV
    	<p onclick="alert('p')">P</p>
    </div>
</form>
```

- 예를들어 아래 3개가 중첩된 박스 영역에서 가장 자신 엘리먼트인 p 박스를 클릭하면 onclick 이벤트 스크립트가 p 뿐만 아니라 그의 부모인 div와 form 엘리먼트도 발생
- 이러한 현상을 이벤트 전파(Event Propagation)이라고 부르며, 전파 방향에 따라 버블링과 캡쳐링으로 구분

![Untitled](Front-end%20Study%20day03%F0%9F%A4%B9%E2%80%8D%E2%99%82%EF%B8%8F%206f81d84c962f4e119fbd9bdab61e92f1/Untitled%204.png)

 

<br>

<br>

### 버블링(Bubbling)

- 자식 요소에서 발생한 이벤트가 바깥 부모 요소로 전파(기본값)
- 이벤트가 제일 깊은 곳에 있는 요소에서 시작해 부모 요소를 거슬러 올라가며 발생하는 모양이 마치 물속 거품(bubble)과 닮았기 때문에 지어진 이름

![Untitled](Front-end%20Study%20day03%F0%9F%A4%B9%E2%80%8D%E2%99%82%EF%B8%8F%206f81d84c962f4e119fbd9bdab61e92f1/Untitled%205.png)

<br>

<br>

### 버블링 등록

- 브라우저의 이벤트는 기본적으로 버블링 방식으로 이벤트가 전파된다
- 자바스크립트 `addEventListener()`
 함수로 요소의 이벤트를 등록하면 기본적으로 버블링 전파 방식으로 이벤트가 흐르게 되어, 만일 자식 요소에 이벤트가 발생하면 부모 요소도 버블링 통해 이벤트가 전파되어 리스너가 호출

![Untitled](Front-end%20Study%20day03%F0%9F%A4%B9%E2%80%8D%E2%99%82%EF%B8%8F%206f81d84c962f4e119fbd9bdab61e92f1/Untitled%206.png)

```jsx
// 버블링 동작 (false 생략 해도됨)
element.addEventListener('click', (e) => { ... }, false);
```

✔️ 거의 모든 이벤트는 버블링이 된다고 보면 된다. 다만 `focus` 이벤트와 같이 버블링이 되지 않는 이벤트도 존재하기도 한다.

<br>

<br>

### 캡쳐링(Capturing)

- 한 요소에 이벤트가 발생되면, 그 요소의 자손 요소의 이벤트도 같이 발생되는 이벤트 전파

![Untitled](Front-end%20Study%20day03%F0%9F%A4%B9%E2%80%8D%E2%99%82%EF%B8%8F%206f81d84c962f4e119fbd9bdab61e92f1/Untitled%207.png)

<br>

<br>

### 캡쳐링 등록

- 브라우저의 이벤트 전파 방식은 버블링이 기본값이기 때문에 캡처링으로 설정하기 위해선 별도의 옵션을 함수에 주어야 한다. 자바스크립트 `addEventListener()`
 함수의 3번째 매개변수로 true 값을 주면 이 이벤트 타겟은 캡처링을 통해 이벤트를 전파받아 호출하게 된다.

![Untitled](Front-end%20Study%20day03%F0%9F%A4%B9%E2%80%8D%E2%99%82%EF%B8%8F%206f81d84c962f4e119fbd9bdab61e92f1/Untitled%208.png)

```jsx
// 캡처링 동작
element.addEventListener('click', (e) => { ... }, true);
element.addEventListener('click', (e) => { ... }, {capture: true});
```

<aside>
💡 이렇게 옵션 설정을 통해 버블링 or 캡처링 이벤트 전파 동작으로 등록하는 이유는, 브라우저는 캡쳐링으로 탐색하고 버블링으로 돌아오는데 갔다가 돌아오는 과정에서 이벤트가 똑같이 두번 실행하기 때문

</aside>

<br>

<br>

### **🏁 버블링 & 캡쳐링 문제점**

- 만약 부모와 자식 둘 다 이벤트를 등록한 상태에서, 자식 요소만 클릭했을 때 이벤트를 발생하고 부모 요소는 이벤트를 발생시키고 싶지 않은 상황에서는 ?
- 이벤트 전파를 방지 처리하는 식으로 해결해야함.
- `stopPropagation()` 메소드 호출하면 버블링 또는 캡처링 설정에 따라 상위, 하위로 가는 이벤트 전파를 막을 수 있다.
- `stopImmediatePropagation()` 메소드를 호출하면, 이벤트 전파와 더불어 형제 이벤트 실행을 중지한다. 같이 동일한 child 요소의 이벤트 리스너가 2개 등록 되어 있을때, 어떠한 조건에서 클릭 이벤트를 두번 실행하지 않고 한번만 실행토록 하길 원한다면 유용

<br>

<br>

### 이벤트 위임 (Event Delegation)

- 하위 요소에 각각 이벤트를 붙이지 않고 상위 요소에서 하위 요소의 이벤트들을 제어하는 방식
- 리스트 아이템이 많아지면 많아질수록 이벤트 리스너를 다는 작업 자체가 매우 번거롭다. 이벤트 위임은 이 번거로운 작업을 해결할 수 있는 방법이다.

```jsx
var itemList = document.querySelector('.itemList');
itemList.addEventListener('click', function(event) {
	alert('clicked');
});
```

- 화면의 모든 인풋 박스에 일일이 이벤트 리스너를 추가하는 대신 이제는 인풋 박스의 상위 요소인 ul 태그, `.itemList`에 이벤트 리스너를 달아놓고 하위에서 발생한 클릭 이벤트를 감지한다. 이 부분이 이벤트 버블링.

<br>

<br>

<br>

## 통신 및 비동기

### XMLHttpRequest 객체

- Ajax의 가장 핵심적인 구성 요소는 XMLHttpRequest 객체이고, 웹 브라우저가 서버와 데이터를 교환할 때 사용된다.
- 웹 브라우저가 백그라운드에서 계속해서 서버와 통신할 수 있는 것은 바로 이 객체를 사용하기 때문.

<br>

<br>

### XMLHttpRequest 객체의 생성

- 현재 대부분의 주요 웹 브라우저는 XMLHttpRequest 객체를 내장하고 있다.
- 브라우저의 종류에 따라 객체 생성 방법이 2가지로 나뉜다.
    - XMLHttpRequest 객체를 이용한 방법
        - 익스플로러7, 그 이상, 크롬, 파이어폭스, 사파리, 오페라
    - ActiveXObject 객체를 이용한 방법
        - 익스플로러 5, 6

```jsx
var httpRequest;
function createRequest() {
    if (window.XMLHttpRequest) { // 익스플로러 7과 그 이상의 버전, 크롬, 파이어폭스, 사파리, 오페라 등
        return new XMLHttpRequest();
    } else {                     // 익스플로러 6과 그 이하의 버전
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}

// 하지만 현재 익스플로러 6과 그 이하 버전을 사용하는 사용자는 거의 없으므로
// XMLHttpRequest 객체를 일반적으로 사용한다
var httpRequest = new XMLHttpRequest(); 
```

<br>

<br>

### 서버에 요청(request)하기

- Ajax에서는 XMLHttpRequest 객체를 사용하여 서버와 데이터를 교환
- 따라서 서버 요청을 보내기 위해서는 우선 XMLHttpRequest 인스턴스 생성
    - `open()` 메소드 : 서버로 보낼 Ajax 요청의 형식 설정
        - 전달 방식은 요청을 전달할 방식으로 `GET` 방식과 `POST` 방식 중 선택
        - URL 주소는 요청을 처리할 서버의 파일 주소 전달
        - 동기 여부는 요청을 동기식으로 전달할지 비동기식으로 전달할지달
    
    ```jsx
    open(전달방식, URL주소, 동기여부);
    ```
    
    - `send()` 메소드 : 작성된 AJax 요청을 서버로 전달
        - 전달 방식에 따라 인수를 가질 수도 안가질 수도 있다
    
    ```jsx
    send();       // GET 방식
    send(문자열); // POST 방식
    ```
    

<br>

<br>

🏁 **`GET` 방식과 `POST` 방식**

`GET`

- 주소에 데이터를 추가하여 전달
- GET방식의 HTTP 요청은 브라우저에 의해 캐시되어(cached) 저장됨
- GET 방식은 보통 쿼리 문자열(query string)에 포함되어 전송되므로 길이의 제한이 있음

`POST`

- 데이터를 별도로 첨부하여 전달
- 브라우저에 의해 캐시되지 않으므로 브라우저 히스토리에 남지 않는다
- 쿼리 문자열과는 별도로 전송
- 데이터 길이 제한 없고 GET방식보다 보안성이 높다

<aside>
💡 Ajax에서는 주로 GET방식보다는 POST방식을 사용하여 요청을 전송다

</aside>

<br>

<br>

🏁 **URI 와 URL 의 차이**

![Untitled](Front-end%20Study%20day03%F0%9F%A4%B9%E2%80%8D%E2%99%82%EF%B8%8F%206f81d84c962f4e119fbd9bdab61e92f1/Untitled%209.png)

`URL` (Uniform Resource Identifier) : 인터넷에 있는 자원을 나타내는 유일한 주소

<br>

<br>

### `GET` 방식으로 요청

- 서버로 전송하고자 하는 데이터는 URI에 포함되어 전송

```jsx
// GET 방식으로 요청을 보내면서 데이터를 동시에 전달함.
httpRequest.open("GET", "/examples/media/request_ajax.php?city=Seoul&zipcode=06141", true);
httpRequest.send();

if (httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status == 200 ) {
    ...
}
```

- eadyState 프로퍼티의 값이 XMLHttpRequest.DONE이면, 서버에 요청한 데이터의 처리가 완료되어 응답할 준비가 완료되었다는 의미
- status 프로퍼티의 값이 200이면, 요청한 문서가 서버 상에 존재한다는 의미

<br>

<br>

### `POST` 방식으로 요청

- 서버로 전송하고자 하는 데이터는 HTTP 헤더에 포함되어 전송
- 따라서 `setRequestHeader()` 메소드를 이용하여 먼저 헤더 작성한 후 `send()` 메소드로 데이터 전송

```jsx
// POST 방식의 요청은 데이터를 Http 헤더에 포함시켜 전송함.
httpRequest.open("POST", "/examples/media/request_ajax.php", true);
httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
httpRequest.send("city=Seoul&zipcode=06141");
```

<br>

<br>

### 서버로부터의 응답(response)

- Ajax에서 서버로부터의 응답을 확인하기 위해 사용하는 XMLHttpRequest 객체의 프로퍼티는 다음과 같다
    - `readyState` 프로퍼티 : XMLHttpRequest 객체의 현재 상태를 나타냄
        - UNSENT (숫자 0) : XMLHttpRequest 객체가 생성됨.
        - OPENED (숫자 1) : open() 메소드가 성공적으로 실행
        - HEADERS_RECEIVED (숫자 2) : 모든 요청에 대한 응답이 도착
        - LOADING (숫자 3) : 요청한 데이터를 처리 중
        - DONE (숫자 4) : 요청한 데이터의 처리가 완료되어 응답할 준비 완료
    - `status` 프로퍼티 : 서버의 문서 상태를 나타냄
        - 200 : 서버에 문서가 존재
        - 404 : 서버에 문서가 존재하지 않음
    - `onreadystatechange` 프로퍼티 : XMLHttpRequest 객체의 readyState 프로퍼티 값이 변할 때마다 자동으로 호출되는 함수를 설정
        - 이 함수는 서버에서 응답이 도착할 때까지 readyState 프로퍼티 값의 변화에 따라 총 5번 호출
        - 이 프로퍼티를 이용하면 서버에 요청한 데이터가 존재하고, 서버로부터 응답이 도착하는 순간을 특정할 수 있다.

```jsx

switch (httpRequest.readyState) {
    case XMLHttpRequest.UNSET:
        currentState += "현재 XMLHttpRequest 객체의 상태는 UNSET 입니다.<br>";
        break;
    case XMLHttpRequest.OPENED:
        currentState += "현재 XMLHttpRequest 객체의 상태는 OPENED 입니다.<br>";
        break;
    case XMLHttpRequest.HEADERS_RECIEVED:
        currentState += "현재 XMLHttpRequest 객체의 상태는 HEADERS_RECEIVED 입니다.<br>";
        break;
    case XMLHttpRequest.LOADING:
        currentState += "현재 XMLHttpRequest 객체의 상태는 LOADING 입니다.<br>";
        break;
    case XMLHttpRequest.DONE:
        currentState += "현재 XMLHttpRequest 객체의 상태는 DONE 입니다.<br>";
        break;
}
document.getElementById("status").innerHTML = currentState;
if (httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status == 200 ) {
document.getElementById("text").innerHTML = httpRequest.responseText;
}
```

<br>

<br>

### HTTP 헤더

- 클라이언트와 서버 사이에 이루어지는 HTTP 요청과 응답은 HTTP 헤더를 사용하여 수행
- HTTP 헤더는 클라이언트와 서버가 서로에게 전달해야 할 다양한 종류의 데이터를 포함할 수 있다.

<br>

<br>

### HTTP 요청 헤더

- Ajax에서는 요청을 보내기 전에 `setRequestHeader()` 메소드를 사용하여 HTTP 요청 헤더를 작성할 수 있다.

```jsx
XMLHttpRequest인스턴스.setRequestHeader(헤더이름, 헤더값);

// 예제
var httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status == 200 ) {
        document.getElementById("text").innerHTML = httpRequest.responseText;
    }
};
httpRequest.open("GET", "/examples/media/ajax_request_header.php", true)
httpRequest.setRequestHeader("testheader", "123");
httpRequest.send();
```

✔️ HTTP 규약에서 사용하는 헤더 이름은 모두 첫 글자가 영문 대문자이다. 

<br>

<br>

### HTTP 응답 헤더

- `getAllResponseHeaders()` 메소드 : HTTP 응답 헤더의 모든 헤더를 *문자열로* 반환
- `getResponseHeader()` 메소드 : HTTP 응답 헤더 중 인수로 전달받은 이름과 *일치하는* 헤더의 값을 문자열로 반환

```jsx
var httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status == 200 ) {
        document.getElementById("text").innerHTML = httpRequest.responseText;
				document.getElementById("header").innerHTML = httpRequest.getAllResponseHeaders();
        document.getElementById("user").innerHTML =
            "testheader: " + httpRequest.getResponseHeader("testheader");
    }
};
httpRequest.open("GET", "/examples/media/ajax_response_header.php", true);
httpRequest.send();
```

<br>

<br>

<br>

### CORS(Cross-Origin Resource Sharing) 교차 출처 리소스 공유 정책

- 다른 출처의 리소스 공유에 대한 허용 / 비허용 정책
- 아무리 보안이 중요하지만, 개발을 하다 보면 기능상 어쩔 수 없이 다른 출처 간의 상호작용을 해야하는 케이스도 있으며, 실무적으로 다른 회사의 서버 API를 이용해야 하는 상황 존재
- 따라서 이와 같은 예외 사항을 두기 위해 CORS 정책을 허용하는 리소스에 한해 다른 출처라도 받아들인다는 것

🏁 **CORS를 해결하는 방법**

- Chrome 확장 프로그램 이용
    - 크롬에서는 CORS 문제를 해결하기 위한 확장 프로그램을 제공해준다.
    - 서버 테스트 환경에서 고민하지 않고 빠르게 CORS를 해결하는데 좋은 선택지일 것.
- 프록시 사이트 이용하기
    - 프록시(Proxy)란 클라이언트와 서버 사이의 중계 대리점이라고 보면 된다.
    - 즉, 프론트에서 직접 서버에 리소스를 요청 했더니 서버에서 따로 설정을 안해줘서 CORS에러가 뜬다면, 모든 출처를 허용한 서버 대리점을 통해 요청하면 되는 것.
    - 다만 현재 무료 프록시 서버 대여 서비스들은 모두 악용 사례 떄문에 api 요청 횟수 제한을 두어 실전에서는 사용하기 무리. 따라서 테스트용이나 맛보기용으로 사용하되, 실전에서는 직접 프록시 서버를 구축하여 사용해야 한다.
- 서버에서 Access-Control-Allow-Origin 헤더 세팅하기
    - 직접 서버에서 HTTP 헤더 설정을 통해 출처를 허용하게 설정하는 가장 정석적인 해결책

<br>

<br>

<br>

## `Promise`

### promise란?

- 비동기 처리에 사용되는 객체.
    - 특정 코드의 실행이 완료될 때까지 기다리지 않고 다음 코드를 먼저 수행하는 자바스크립트의 특성

<br>

<br>

### promise가 왜 필요한가?

- 프로미스는 주로 서버에서 받아온 데이터를 화면에 표시할 때 사용한다
- 일반적으로 웹 애플리케이션을 구현할 때 서버에서 데이터를 요청하고 받아오기 위해 아래와 같은 API를 사용

```jsx
$.get('url 주소/products/1', function(response) {
  // ...
});
```

```jsx
function getData() {
  return new Promise(function(resolve, reject) {
    $.get('url 주소/products/1', function(response) {
      if (response) {
        resolve(response);
      }
      reject(new Error("Request is failed"));
    });
  });
}

// 위 $.get() 호출 결과에 따라 'response' 또는 'Error' 출력
getData().then(function(data) {
  console.log(data); // response 값 출력
}).catch(function(err) {
  console.error(err); // Error 출력
});
```

- 위 코드는 서버에서 제대로 응답을 받아오면 `resolve()` 메서드 호출
- 응답 없으면 `reject()` 호출, 호출된 메서드에 따라 `then()` 이나 `catch()` 로 분기하여 응답 결과 또는 오류 출력

<br>

<br>

### `fetch` `then` 밖으로 데이터를 꺼내려면?!

> JS 에서는 `fetch()` 함수를 이용해서 resource를 비동기 요청할 수 있다
주로 API를 호출하고 응답 데이터를 받아오는데 사용한다
> 

```jsx
fetch('https://jsonplaceholder.typicode.com/posts/1')
.then(response => response.json())
.then(json => console.log(json))

// 출력
{
  "userId": 1,
  "id": 1,
  "title": '.....',
  "body": '....'
}
```

1. `fetch()` 안에는 기본적으로 요청할 url을 넣는다.
2. get,post,put,delete중 default값으로는 get으로 동작한다.
3. 해당 주소에 요청을 하고 응답객체(object response)를 받는다.
4. 첫번째 `.then()`에서 응답을 받고 `.json()` 메소드로 파싱한 `json()`값을 리턴
5. 두번째 `.then()`에서 리턴받은 json값을 받고, 원하는대로 처리가 가능!

<br>

<br>

<br>

## API

### API란?

- Application Programming Interface
- 애플리케이션이나 디바이스가 서로 간에 연결하여 통신할 수 있는 방법을 정의하는 규칙

<br>

<br>

### REST API란?

- REST를 기반으로 서비스 API를 구현한 것
    - REST란? Representational State Transfer : HTTP를 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍터
- 작동 방식

![Untitled](Front-end%20Study%20day03%F0%9F%A4%B9%E2%80%8D%E2%99%82%EF%B8%8F%206f81d84c962f4e119fbd9bdab61e92f1/Untitled%2010.png)