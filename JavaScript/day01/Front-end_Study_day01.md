# Front-end Study day01 ✨

## About JavaScript

### 자바스크립트는 웹에서 어떤 역할을 하는가?

- 객체(Object) 기반의 스크립트 언어
- HTML로는 웹의 내용을 작성, CSS로 웹 디자인, JavaScript로는 웹의 동작을 구현한다
    - 웹 페이지에서 복잡한 기능을 구현할 수 있도록 하는 스크립팅 / 프로그래밍 언어
    - 주기적으로 갱신되거나, 사용자와 상호작용이 가능하거나, 애니메이션이 적용된 2D, 3D 그래픽을 볼 수 있다면 자바스크립트가 관여하고 있을 것이라고 생각해도 좋다.
- DOM(Document Object Model) API를 통해 HTML과 CSS를 동적으로 수정, 사용자 인터페이스를 업데이트하는 일에 가장 많이 쓰인다.
- 자바스크립트는 주로 웹 브라우저에서 사용되나, Node.js와 같은 프레임워크와 사용한다면 서버 측 프로그래밍에서도 사용 가능

## `;`

### 세미콜론의 역할

- 다른 프로그래밍 언어들과 같이 기본적으로 문장을 구분하기 위해 사용

### 세미콜론이 없어도 될 때(써도 되지만 필수적이지 않은 경우, 선택)

- 줄바꿈(개행)
- 한줄짜리 중괄호 `{ }`를 사용할 때

```jsx
var i = 0
i++

if  (...) {...} else {...}
for (...) {...}
while (...) {...}
function (arg) { ... }
```

### 세미콜론이 필요할 때

- 2개 이상의 구문을 한 줄에 작성할 때

```jsx
var i = 0; i++; 

do {...} while (...); // 안써도 됨. 오류를 범할 가능성이 크기 때문에.. 쓰는 것을 권장!
```

✔️ ASI (Automatic Semicolon Insertion : 자동 세미콜론 삽입) 라는 자바스크립트 엔진에 내장된 기능이 있어 쓰지 않아도 될 때가 있지만, ASI 오류나 `do while ( )` 구문 뒤에 연달아 다른 코드가 작성될 수 있는 상황에 대비해서 `;` 쓰는 것이 오류를 범할 가능성이 낮기 때문에 사용하는 것을 권장!

## 주석

### `//` : 한 줄 주석

```jsx
// single line comment

var abc = 'hi'; // 앞은 코드, 뒤에만 주석처리 가능
```

### `/* */` : 여러 줄 주석

```jsx
/*
	Comment 1
	Comment 1
*/
```

```jsx
/*
 *  읽기 좋게
 *  이렇게도 사용합니다
 */
```

✔️ HTML 문서에 넣은 JS 주석은 소스보기를 하면 다 보이기 때문에 개발 과정에서 작성했지만 공개되면 안되는 주석들은 삭제를 하는 것이 좋다.

## 자료형

### `Number`

- 64비트 이진 형식 IEEE 754
- -(2⁵³-1) 부터 2⁵³-1 까지는 정확히 IEEE-754로 표현 가능하지만 그 초과와 이하는 가까운 수나 0 (배정밀도 부동 소수점 근사값)으로 반올림
    - 보다 큰 양수 값은 `Number.MAX_VALUE` 로 변환된다 `+Infinity`
    - 보다 작은 양수 값은 `Number.MIN_VALUE` 로 변환된다 `+0`
    - 보다 작은 음수 값은 `Number.MAX_VALUE` 로 변환된다 `-Infinity`
    - 보다 큰 양수 값은 `Number.MIN_VALUE` 로 변환된다 `+0`

```jsx
var a = Number.MAX_SAFE_INTEGER || 9007199254740991;
var b = a + 1
console.log( Number.isSafeInteger(a) );
// true;
console.log( Number.isSafeInteger(b) );
// false

var c = 18437736874454810627;
console.log( c );
// 18437736874454810000
```

✔️ `.` 를 사용하여 숫자가 안전한 정수 범위 내에 있는지 확인 가능하다 

`Number.MIN_VALUE` `Number.MAX_VALUE` `Number.MIN_SAFE_INTEGER` `Number.MAX_SAFE_INTEGER` `Number.isSafeInteger()`

- 부동소수점 : 소수 정의시 `.` 뒤에 숫자만 존재하면 가능하지만 숫자가 없다면 무시되고 정수로 표현

```jsx
console.log( 1.0 );
// 1

console.log( 1. );
// 1

console.log( .1 );
// 1

console.log( 1.11111111111111111111111111111111111 );
// 1.1111111111111112

console.log( 1111111.11111111111111111111111 );
// 1111111.111111111
```

### `String`

- 텍스트를 저장하고 조작하기 위한 것
- `' '` `" "` 사용 가능
- `length` : 문자열의 길이 찾기
- `\` : 백슬래시 이스케이프 문자 사용 (잘리는 문제 발생)

| Code | Result | Description |
| --- | --- | --- |
| \’ | ‘ | 작은 따옴표 |
| \” | “ | 큰 따옴표 |
| \\ | \ | 백슬래시 |
| \b | Backspace | 백스페이스 |
| \f | Form Feed | 양식 피드  |
| \n |  | 개행  |
| \r |  | 캐리지 리턴 |
| \t |  | 탭  |
| \v |  | 세로 탭  |

```jsx
let text = "We are the so-called "Vikings" from the north.";   // X
let text = "We are the so-called \"Vikings\" from the north."; // O
let text= 'It\'s alright.';
let text = "The character \\ is called backslash.";
```

- 객체로서의 문자열
    - 일반적으로 JS에서의 문자열을 리터럴에서 생성된 기본 값이다
    
    ```jsx
    let x = "John";
    ```
    
    - 문자열을 객체로도 정의 가능하다
    
    ```jsx
    let y = new String("John");
    ```
    
- 긴 리터럴 문자열
    - 코드에 매우 긴 문자열이 포함될 수 있다. 줄이 끝없이 이어지거나 줄바꿈하는 대신 실제 문자열 내용에 영향을 주지 않고 소스 코드에서 문자열을 여러 줄로 구체적으로 나누고 싶다면 연산자 `+`
    
    ```jsx
    const longString =
      "This is a very long string which needs " +
      "to wrap across multiple lines because " +
      "otherwise my code is unreadable.";
    ```
    
    - `\` 또는 각 줄 끝에 백슬래시 문자 ( ) 사용 가능. 단 `\` 또는 들여쓰기 뒤에 공백이나 다른 문자가 없는지 확인해야함. 그렇지 않으면 작동하지 않는다.
    
    ```jsx
    const longString =
      "This is a very long string which needs \
    to wrap across multiple lines because \
    otherwise my code is unreadable.";
    ```
    
- 인스턴스 메소드
    - `String.prototype.concat()` : 두 개 이상 문자열의 텍스트를 결합하고 새 문자열 반환
    - `String.prototype.includes()` : 호출 문자열에 .. 가 포함되어 있는지 여부 결정
    - `String.prototype.padEnd()` : 지정된 문자열로 끝에서 현재 문자열을 채우고 길이의 새 문자열을 반환
    - `String.prototype.padStart()` : 지정된 문자열로 시작부터 현재 문자열을 채우고 길이의 새 문자열을 반환
    - `String.prototype.replace()` , `String.prototype.replaceAll()` : 항목 대체

### `Boolean`

- 진리값을 나타낸다. `true` 또는 `false`
- 함수를 사용하여 `Boolean()` 식 (또는 변수)이 참인지 확인할 수 있다.

```jsx
Boolean(10 > 9)
(10 > 9)
10 > 9
```

- “Value”가 있는 모든 항목은 `true`

```jsx
100
3.14 + 7 + 1
-15
"Hello"
"false"
```

- “Value”가 없는 모든 것은 `false`

```jsx
let x = 0;            // 0 
let x = -0;           // -0
let x = "";           // 빈 문자열
let x;                // 정의되지 않은 값
let x = null;         // null
let x = false;        // false
let x = 10 / "Hello"; // NaN
```

- 객체로 정의 가능하다.

```jsx
let x = false;
let y = new Boolean(false);

// typeof x returns boolean
// typeof y returns object
```

✔️ boolean 객체는 예기치 않은 결과를 생성할 수 있다. `new` 키워드는 코드를 복잡하게 만들고 실행 속도를 늦추기 때문에 권장하지 않는다.

```jsx
const good = Boolean(expression);    // use this
const good2 = !!(expression);        // or this
const bad = new Boolean(expression); // don't use this!
```

✔️ `boolean` 값으로 변환하기 위해 `Boolean()` 생성자 사용 X . 대신 함수 또는 이중 NOT(`!!x`)을 사용 

### `undefined`

- 전역 객체의 속성, 전역 범위에서의 변수
    - `undefined` 는 예약어가 아니기 때문에 전역 범위 의외의 모든 범위에서 식별자(변수 이름)으로 사용 가능하나 추후 코드를 유지보수하고 디버깅하기 어려워지기 때문에 피하는 것이 좋다
- 값을 할당하지 않은 변수
    - 메서드나 선언도 평가할 변수가 값을 할당받지 않은 경우, undefined 반환
    - 함수는 값을 명시적으로 반환하지 않으면 undefined 반환
- `typeof` 연산자와 `undefined`
    - `typeof` 를 사용하는 이유는 변수가 선언되지 않은 경우, 오류를 발생시키지 않기 때문

```jsx
// x를 선언한 적 없음
// 오류 없이 true로 평가
if (typeof x === 'undefined') {
   // 이 문이 실행됨
}

// ReferenceError 발생
if(x === undefined) {

}
```

- 엄격한 일치 연산과 `undefined`
    - `!==` `===` 엄격한 일치, 불일치 연산자를 사용하여 변수에 값이 있는지 확인 가능

```jsx
let x;
if (x === undefined) {
   // 이 문이 실행됨 = true
}
else {
   // 이 문이 실행되지 않음
}
```

✔️ `x == undefined` 는 `x` 가 `null` 일 때도 참이기 때문에, 엄격한 동등 연산자를 사용해야한다. `null` 과 `undefined` 는 동일하지 않기 때문.

- `void` 연산자와 `undefined`

```jsx
let x;
if (x === void 0) {
  // 이 문이 실행됨
}

// y를 이전에 선언하지 않음
if (y === void 0) {
  // throws Uncaught ReferenceError: y is not defined
}
```

### `NaN`

- Not - A - Number (숫자가 아님)을 나타낸다
- `Number.NaN` 과 동일한 숫자 값이다
- `NaN` 을 반환하는 연산 5가지
    - 숫자로 변환 실패 : `parseInt("blabla")`, `Number(undefined)`와 같은 명시적인 것, `Math.abs(undefined)`와 같은 암시적인 것
    - 결과가 허수인 수학 계산식 : `Math.sqrt(-1)`
    - 정의할 수 없는 계산식 : `0 * Infinity`, `1 ** Infinity`, `Infinity / Infinity`, `Infinity - Infinity`
    - 피연산자가 `NaN` 이거나 `NaN`으로 강제 변환되는 메서드 또는 표현식 : `7 ** NaN` , `7 * "blabla"`
        - `NaN` 이 전염성이 있다는 것을 의미한다.
    - 유효하지 않은 값이 숫자로 표시되는 기타 경우 : 잘못된 날짜 `new Date("blabla").getTime()` , `"".charCodeAt(1)`
- `NaN`의 동작
    - 수학 연산에 포함된 경우 결과도 일반적으로 `NaN`
    - 관계 비교 `>` `<` `>=` `<=` 중 하나인 경우 결과는 항상 `false`
    - `==` `!=` `===` `!==` 을 통해 다른 `NaN` 값을 포함하여 다른 값과 같지 않은 것으로 비교
- `NaN` 판별 방법
    - `Number.isNaN()` 또는 `isNaN()` 사용하여 `NaN` 인지 여부 확인 가능함.
    - 자신과 같지 않다고 비교되는 유일한 값
        - `x !== x` 와 같은 자체 비교 수행 가능

```jsx
NaN === NaN;        // false
Number.NaN === NaN; // false
isNaN(NaN);         // true
isNaN(Number.NaN);  // true

function valueIsNaN(v) {
  return v !== v;
}

valueIsNaN(1);          // false
valueIsNaN(NaN);        // true
valueIsNaN(Number.NaN); // true
```

✔️ `**isNaN`** 은 현재 값이 `NaN` 이거나, 숫자로 변환했을 때 `NaN` 이 되면 `true` 반환

`**Number.isNaN**` 은 현재 값이 `NaN` 이어야만 `true` 반환하기 때문에 차이점 유의해야 한다.

```jsx
isNaN('hello world'); // true
Number.isNaN('hello world'); // false
```

같은 이유로 BigInt 값을 사용하면 `Number.isNaN()` 이 아닌 `isNaN()` 에서 오류 발생

```jsx
isNaN(1n); // TypeError: Conversion from 'BigInt' to 'number' is not allowed.
Number.isNaN(1n); // false
```

✔️ 일부 배열 메서드  `indexOf()` , `lastIndexOf()`는 `NaN` 을 찾을 수 없지만 `includes()` 는 찾을 수 있다.

```jsx
const arr = [2, 4, NaN, 12];
arr.indexOf(NaN); // -1
arr.includes(NaN); // true

// 적절하게 정의된 조건자를 허용하는 메서드는 항상 NaN을 찾을 수 있다.
arr.findIndex((n) => Number.isNaN(n)); // 2
```

✔️ `NaN` 탈출 : `NaN` 은 수학적 연산을 통해 전파되므로 일반적으로 오류 조건을 감지하기 위해 계산이 끝날 때 한 번 `NaN` 테스트를 하는 것으로 충분하다. `NaN` 이 자동적으로 escape되는 유일한 경우는 지수가 `0` 인 거듭제곱을 사용할 때이다. 그러면 기본 값을 검사하지 않고 즉시 `1` 반환

```jsx
NaN ** 0 === 1; // true
```

### `null`

- 전역 객체
- 컴퓨터 과학에서 `null` 값은 일반적으로 존재하지 않거나 유효하지 않은 object 또는 주소를 의도적으로 가리키는 참조를 나타낸다
- JS에서 `null` 은 동작이 원시적으로 보이기 때문에 primitive values 중 하나로 표시된다. 하지만 `typeof` 연산자를 사용할 때에는 `object` 반환
    - primitive values (원시값 또는 원시 자료형) : 객체가 아니면서 메서드도 가지지 않는 데이터
        - `string` `number` `bigint` `boolean` `undefined` `symbol` `null`

```jsx
console.log(typeof null); // "object"
```

✔️ 이는 버그로 여겨지지만 수정하면 많은 스크립트에 문제가 발생할 수 있어서 고칠 수 없다 

## 변수

### `var`

- 재선언, 재할당 가능
    - 변수 선언을 여러 번 해도 에러 없이 각기 다른 값이 출력될 수 있음
    - 필요할 때마다 변수 사용 가능, 편리하다는 장점이 있지만 같은 이름의 변수명을 남용하는 문제를 야기할 가능성 높아지기에 단점
- ES6 이전에 변수 선언 시 사용하였다. 위의 문제점을 보완하기 위해 let, const 추가됨.
- 호이스팅(Hoisting) 특성이 있다
- 함수 스코프 : `var` 은 전역 변수 또는 함수의 지역 변수로 사용

### `let`

- 재선언 불가, 재할당 가능
- 블록 스코프 : 자바의 변수와 유사함 = 선언된 블록 안에서만 접근 가능함

### `const`

- 재선언, 재할당 불가 (상수)
- 블록 스코프 : 자바의 변수와 유사함 = 선언된 블록 안에서만 접근 가능함

|  | 재선언 | 재할당 | 유효 범위 |
| --- | --- | --- | --- |
| var | O | O | 함수 스코프 |
| let | X | O | 함수 스코프 / 블록 스코프 |
| const | X | X | 함수 스코프 / 블록 스코프 |

✔️ 재할당이 필요없는 경우, `const` 를 사용하여 불필요한 변수의 재사용 방지하고, 재할당이 필요한 경우에는 `let` 을 사용하는 것이 좋다.

## 호이스팅(hoisting)

### 호이스팅이란?

- 인터프리터가 변수와 함수의 메모리 공간을 선언 전에 미리 할당하는 것
- 자바스크립트의 실행 단계
    1. 사전 준비 단계 : 소스 코드 평가
        
        `var` 로 선언된 모든 변수들이 메모리에 올라가고, `undefined` 로 초기화 된다
        
    2. runtime
        
        소스 코드가 한줄씩 순차적으로 실행되는 시점인 런타임으로 바로 들어가지 않는다
        

```jsx
myName("철수"); // 첫 번째 myName 호출
myName(name); // 두 번째 myName 호출

function myName(name) {
  console.log("제 이름은 " + name + "입니다");
}
var name = "영희";

/*
결과:
"제 이름은 철수입니다"
"제 이름은 undefined입니다"
*/
```

## 스코프(Scope)

### 스코프란?

- 식별자(변수, 함수, 클래스) 접근 규칙에 따른 유효 범위
- 범위는 중괄호(블록) - Block Scope 또는 함수 - Function Scope에 의해 나눠진다
- JS에서 함수를 선언할 때마다 새로운 스코프를 생성하게 된다.
    - 함수 몸체에 선언한 변수는 해당 함수 안에서만 접근 가능함. = 함수 스코프(function-scoped) = 지역스코프

### 스코프의 종류

- 블록 스코프
    - 화살표 함수
- 함수 스코프

### 스코프의 주요 규칙

- 안쪽 스코프에서 바깥쪽 스코프로 접근 가능, 반대는 불가능
    - 바깥쪽 스코프에서 선언한 식별자는 안쪽 스코프에서 사용가능
    - 안쪽 스코프에서 선언한 식별자는 바깥쪽 스코프에서는 사용 불가
- 중첩이 가능하다
    - 중첩된 울타리와도 같다
- 가장 바깥쪽의 스코프 == 전역스코프 / 전역이 아닌 다른 스코프는 전부 지역스코프
- 지역 변수는 전역 변수보다 우선순위가 높다

### 전역 변수(Global)

✔️ 전역 변수는 최소화 하기 !

- 전역에 선언되어있어 어느 곳에서든지 해당 변수에 접근 가능
- 가장 바깥 스코프에 정의한 변수
- 전역 변수를 최소화 하면 side effect(의도하지 않은 로직에 의해 문제 발생)을 줄일 수 있다.
- 그러한 전역 변수를 `var` 로 선언하는 경우 문제 발생 가능성 높아짐
    - 어디서나 접근 가능한 전역 변수를 블록 스코프를 무시하는 `var` 키워드로 선언한다면 브라우저의 내장 기능을 못하게 만들 수도 있다.

### 지역 변수(Local)

- 해당 지역에서만 접근 가능하여 지역에서 벗어난 곳에서는 접근 불가능

```jsx
var a = 1; // 전역 스코프
function print() { // 지역(함수) 스코프
 var a = 111;
 console.log(a);
}
print(); // 111
console.log(a); // 1
```

print 함수 안에 변수 a의 선언을 지운다면 console엔 어떤 값이 출력될까?

```jsx

var a = 1; // 전역 스코프
function print() { // 함수 스코프
 console.log(a);
}
print(); // 1
```

✔️ Scope Chain에 의해 일어나는 현상 : 현재 자신의 스코프에서 사용하고자 하는 변수가 없다면 Scope Chain을 통해 해당 변수를 찾게 된다

## 함수

### 함수 선언식(function declartion)

- `function 함수명(parameter) { 함수 내용 }` : 이름과 함께 정의
- 호이스팅 가능 : 함수 선언 이전에 호출 가
- 함수명이 정의되어 있고, 별도의 할당 명령이 없는 것

```jsx
function func() {
	console.log('선언식');
}

func();
```

✔️ 함수 선언식으로 작성한 함수는, 함수 전체가 호이스팅 되기 때문에 전역적으로 선언하게 된다면 중복적으로 동명의 함수를 쓰게 된다면 원치 않는 결과를 초래할 수 있음. 함수 표현식을 이용하여 이를 방

### 함수 표현식(function expression)

- `let 함수명 = function() { 함수 내용 }` : 익명 함수로 정의
- 호이스팅 불가
- 화살표 함수 사용 가능
- 정의한 function을 별도의 변수에 할당하는 것

```jsx
let func = function () {
	console.log('표현식');
};

func();
```

### 화살표 함수(arrow function)

- `(매개변수) => {명령어}`
- ES6에서 추가된 개념이다
- 함수 표현식보다 단순하고 간결한 문법으로 함수를 만들 수 있다
- 작성 순서
    1. function 키워드 삭제
    2. `( )` 안에 함수가 사용할 파라미터 이름 작성
    3. 화살표 `=>` 사용
    4. `{ }` 작성하고 블록 안에 함수가 실행할 코드 작성
    
    ```jsx
    function f() { }
    const f = () => { };
    ```
    
- 매개변수 지정 방법

```jsx
		() => { ... } // 매개변수가 없을 경우
     x => { ... } // 매개변수가 한 개인 경우, 소괄호를 생략할 수 있다.
(x, y) => { ... } // 매개변수가 여러 개인 경우, 소괄호를 생략할 수 없다.
```

- 함수 몸체 지정 방법

```jsx
x => { return x * x }  // single line block
x => x * x  // 함수 몸체가 한줄의 구문이라면 중괄호를 생략할 수 있으며 암묵적으로 return된다.
// 위 표현과 동일하다.

() => { return { a: 1 }; }
() => ({ a: 1 })  // 위 표현과 동일하다. 객체 반환시 소괄호를 사용한다.
                  // 왜냐하면 { }만 쓰면 얘가 함수 블록인지 객체 블록인지 판단할수 없기 때문이다.

() => {           // multi line block.
  const x = 10;
  return x * x;
};
```

- 함수 표현식과 같은 방법으로 사용한 예제 (함수를 동적으로 만들 수 있다)

```jsx
let age = prompt("나이를 알려주세요.", 18);

let welcome = (age < 18) ?
  () => alert('안녕') :
  () => alert("안녕하세요!");

welcome();
```

✔️ 화살표 함수를 사용하면 타이핑을 적게 해도 함수를 만들 수 있다는 장점이 있다.

- 화살표 함수를 남용해선 안되는 경우
    - 메소드 정의 X
    - `new` 생성자 함수 X
        - 생성자 함수로 사용할 수 없다. 화살표 함수는 prototype 프로퍼티를 가지고 있지 않다
    - `addEventListener` 함수의 콜백 함수
        - 해당 함수를 화살표 함수로 정의하면 `this` 가 전역 객체 `window` 를 가리키게 된다
    - `call` `apply` `bind` 메소드를 사용하여 `this` 를 변경할 수 없다

## 즉시 실행 함수 표현(IIFE, Immediately Invoked Function Expression)

### IIFE란?

- 정의되자마자 즉시 실행되는 JS Function
    - 생성된 후 즉시 실행되고 재사용되지 않기 때문에 보통 익명 함수 형태

```jsx
(function () {
    statements
})();
```

- 크게 두 부분으로 구성
    - `( )` 괄호로 둘러싸인 **익명함수**
        - 전역 스코프에 불필요한 변수를 추가해서 오염시키는 것을 방지할 수 있다
        - IIFE 내부 안으로 다른 변수들이 접근하는 것을 막을 수 있다(전역 변수 충돌 방지)
    - 즉시 **실행 함수**를 생성하는 `( )` 괄호
        - 이를 통해 자바스크립트 엔진은 함수를 즉시 해석해서 실행한다

### 예제

```jsx
(function () {
    var aName = "Barry";
})();
// IIFE 내부에서 정의된 변수는 외부 범위에서 접근이 불가능하다.
aName // throws "Uncaught ReferenceError: aName is not defined"

var result = (function () {
    var name = "Barry";
    return name;
})();
// 즉시 결과를 생성한다.
result; // "Barry"
```

✔️ 표현 내부의 변수는 외부로부터의 접근이 불가

✔️ IIFE를 변수에 할당하면 IIFE 자체는 저장되지 않고, 함수가 실행된 결과만 저장된다.

## 매개변수(parameter)

### 매개변수란?

- 함수 정의에 나열된 이름

```jsx
function functionName(parameter1, parameter2, parameter3) {
  // code to be executed
}
```

- 함수의 매개변수는 `undefined` 가 기본이다
    - 허용되지만 매개 변수에 기본값을 할당하는 것이 더 나은 경우도 있다
    - 함수 호출 시 함수의 정의보다 적은 수의 인수가 전달되더라도, 다른 언어와는 달리 오류를 발생시키지 않는다. 전달되지 않은 나머지 매개변수에 자동으로 `undefined` 값을 설정한다.

```jsx
function myFunction(x, y) {
  if (y === undefined) {
    y = 2;
  }
}

function f(x=1, y) {
  return [x, y];
}

f()   // [1, undefined]
f(2)  // [2, undefined]
```

- 앞쪽 매개변수는 뒷쪽의 매개변수 기본값에 사용할 수 있다
    - 매개변수가 여러개일 때 앞쪽에(왼쪽 부분) 정의된 매개변수는 뒷쪽에 정의된 매개변수의 기본값에 바로 사용할 수 있다.

```jsx
function greet(name, greeting, message = greeting + ' ' + name) {
  return [name, greeting, message]
}

greet('David', 'Hi')                      // ["David", "Hi", "HiDavid"]
greet('David', 'Hi', 'Happy Birthday!')   // ["David", "Hi", "Happy Birthday!"]
```

### 매개변수의 규칙

- 함수 정의는 매개변수에 대한 데이터 유형(타입)을 명시하지 않는다
- 함수를 호출할 때에도 인수로 전달된 값에 대해 어떠한 타입 검사 수행하지 않는다
- 수신된 인수의 수를 확인하지 않는다

### 디폴트 매개변수(default parameter)

- 함수를 호출할 때 명시된 인수를 전달하지 않았을 경우에 사용하게 될 기본값을 의미한다

```jsx
function mul(a, b) {
    // 인수가 한 개만 전달되었을 때 나머지 매개변수의 값을 undefined 값이 아닌 1로 설정함.
    b = (typeof b !== 'undefined')  ? b : 1;
    return a * b;
}
mul(3, 4); // 12
mul(3);    // 3
```

- 하지만 디폴트 매개변수를 이용하면 이러한 매개변수의 기본 값을 바꿀 수 있다

```jsx
function mul(a, b = 1) { // 인수가 한 개만 전달되면 나머지 매개변수의 값을 언제나 1로 설정해 줌.
    return a * b;
}
mul(3, 4); // 12
mul(3);    // 3
```

✔️ 디폴트 매개변수는 익스플로러, 사파리, 오페라에서 지원하지 않는다

### 나머지 매개변수(rest parameter)

- 생략 접두사 `(…)` 를 사용하여 특정 위치의 인수부터 마지막 인수까지를 한번에 지정할 수 있다.
    
    ↓ 첫 번째 인수에서 두 번째 인수부터 마지막 인수까지를 뺀 후 그 결과를 반환하는 예제
    

```jsx
function sub() {
    var firstNum = arguments[0];                  // 첫 번째 인수에서
    for(var i = 0; i < arguments.length-1; i++) { // 두 번째부터 마지막 인수까지를
        firstNum -= arguments[i+1];               // 뺌.
    }
    return firstNum;
}
sub(10, 2, 3);    // 10 - 2 - 3 = 5
sub(10, 1, 5, 8); // 10 - 1 - 5 - 8 = -4
```

- 하지만 나머지 매개변수를 이용하면 `sub()` 함수를 좀 더 직관적으로 정의 가능

```jsx
// 첫 번째 인수를 변수 firstNum에 저장하고 나머지 인수들은 배열 restArgs에 저장함.
function sub(firstNum, ...restArgs) {
    for(var i = 0; i < restArgs.length; i++) {
        firstNum -= restArgs[i];
    }
    return firstNum;
}
sub(10, 2, 3);    // 10 - 2 - 3 = 5
sub(10, 1, 5, 8); // 10 - 1 - 5 - 8 = -4
```

✔️ 나머지 매개변수는 익스플로러, 사파리에서 지원하지 않는

## 인수(arguments)

### 인수란?

- 지역변수이다.
- 함수가 호출될 때 함수로 값을 전달해주는 값

```jsx
function addNum(x, y, z) { // x, y, z라는 3개의 매개변수를 가지는 함수 addNum()을 정의함.
    return x + y + z;
}
addNum(1, 2, 3); // 인수로 1, 2, 3을 전달하여 함수를 호출함. -> 6
addNum(1, 2);    // 인수로 1, 2을 전달하여 함수를 호출함. -> NaN
addNum(1);       // 인수로 1을 전달하여 함수를 호출함. -> NaN
addNum();        // 인수로 아무것도 전달하지 않고 함수를 호출함. -> NaN
```

✔️ 위의 예제에서 addNum() 함수를 호출할 때 인수가 세 개보다 적게 전달되면, 계산할 수 없다는 의미인 `NaN` 반환한다. 그 이유는 전달되지 않은 나머지 값이 자동으로 `undefined` 값으로 설정되어, 산술 연산을 수행할 수 없기 때문

### arguments 객체

- 만약 함수의 정의보다 더 많은 수의 인수가 전달되면, 매개변수에 대입되지 못한 인수들은 참조할 방법이 없게 된다.
    - arguments 객체를 이용하면 함수로 전달된 인수의 총 개수를 확인하는 것이 가능
    - 각각의 인수에도 바로 접근 가능
- 함수가 호출될 때 전달된 인수를 배열의 형태로 저장하고 있다.
    - 첫 번째 인수는 `arguments[0]` 에 저장, 다음 인수는 `arguments[1]` 에 저장
    - 인수의 총 개수는 `arguments.length` 프로퍼티에 저장됨

```jsx
function addNum() {
    var sum = 0;                                // 합을 저장할 변수 sum을 선언함.
    for(var i = 0; i < arguments.length; i++) { // 전달받은 인수의 총 수만큼 반복함.
        sum += arguments[i];                    // 전달받은 각각의 인수를 sum에 더함.
    }
    return sum;
}

addNum(1, 2, 3); // 6
addNum(1, 2);    // 3
addNum(1);       // 1
addNum();        // 0
addNum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10); // 55
```

✔️ arguments 객체는 배열과 비슷할 뿐, 실제로 Array 객체는 아니다. 숫자로 된 인덱스와 length 프로퍼티만 가지고 있을 뿐, 모든 것을 배열처럼 다룰 수는 없다

✔️ 매개변수 개수가 정확하게 정해지지 않은 함수를 구현하거나 전달된 인자의 개수에 따라 서로 다른 처리를 해줘야 하는 함수를 생성할 때 유용하다.

## 연산자

### 연산자의 류

| 연산자 | 이름 | 목적 | 예시 |
| --- | --- | --- | --- |
| + | 더하기 | 두 개의 숫자를 더한다 | 6 + 9 |
| - | 빼기 | 왼쪽에 있는 수를 오른쪽 수로 빼기 | 20 - 15 |
| * | 곱하기 | 두 개의 숫자를 곱 | 3 * 7 |
| / | 나누기 | 왼쪽의 숫자를 오른쪽 숫자로 나눠서 몫 구하기  | 10 / 5 |
| % | 나머지 | 왼쪽의 숫자를 오른쪽 숫자로 나눠서 나머지 구하기 | 8 % 3 |
| ** | 지수 | 왼쪽의 숫자를 오른쪽 숫자만큼 제곱 | 5 ** 2 |
| ( ) | 괄호(묶음) | 가장 먼저 계산  | (5 + 2) |
| ! | 논리 NOT 연산자 | 반대를 리턴 | !false |
| typeof | typeof | 자료형을 나타내는 문자열 반환 | typeof "bla" |
| == | 동등연산자 | 값이 동일한지(자료형 비교 x) | 2 == '2' |
| != | 부등연산자 | 값이 다른지(자료형 비교 x) | 3 != 0 |
| === | 일치연산자 | 값과 값의 데이터 유형이 모두 동일한지 | 5 === 2 + 4 |
| !== | 불일치연산자 | 값과 값의 데이터 유형이 다른지 | 5 !== 2 + 3 |
| && | 논리곱 | 논리 AND 연산자 | apple && banana |
| || | 논리합  | 논리 OR 연산 | apple || banana |
| = | 대입연산자 | 오른쪽 피연산자를 왼쪽 피연산자에 대 | x = 3; |
| ++ | 증감연산자 | 1씩 더하기 | cnt++ |
| -- | 감소연산자 | 1씩 빼기  | cnt-- |
| += | 더하기 대입 | x = x + 4 | x += 4; |
| -= | 빼기 대입 | x = x - 3 | x -= 3; |
| *= | 곱하기 대입 | x = x * 3 | x *= 3; |
| /= | 나누기 대입 | x = x / 5 | x /= 5; |
| %= | 나머지 대입 | x = x % 3 | x %= 3; |
| < | ~보다 작음 | 왼쪽 값이 오른쪽 값보다 작은지 | 10 < 6 |
| > | ~보다 큼 | 왼쪽 값이 오른쪽 값보다 큰지 | 10 > 20 |
| <= | ~보다 작거나 큼 | 왼쪽 값이 오른쪽 값보다 작거나 같은지 여부 | 3 <= 2 |
| >= | ~보다 크거나 같 | 왼쪽 값이 오른쪽 값보다 크거나 같은지 여부 | 5 >= 4 |

✔️ `NaN` 은 어떤 것과도 같지 않다는 것을 기억해야 한다!

✔️ 가능하면 `==` 연산자를 지양하고 `===` 연산자 사용을 권장한다 

### 연산자 우선순위

괄호 → 증감 연산자 → 산술 연산자 → 비교 연산자 → 논리 연산자 → 대입 연산자 

### 다른 타입끼리 연산된다면?

- 문자열 `+` 숫자 = 문자열
- 문자열과 숫자 타입의 `+` 이외 연산 = 숫자

```jsx
console.log(1 + "20");   // 120
console.log("1" + "20"); // 120
console.log("1" + 20);   // 120
console.log("100" - 8);  // 92
console.log("100" * 8);  // 800
```

### 명시적 형변환

- 개발자의 의도에 따라 : 데이터타입 변환
- `Object()` , `Number()` , `String()` , `Boolean()` , `parseInt()` , `parseFloat()`

### 묵시적 형변환(implicit type conversion)

- 자바스크립트 엔진의 필요에 따라 : 특정 타입의 값을 기대하는 곳에 다른 타입의 값이 오면, 자동으로 타입을 변환하여 사용한다
    - 문자열 값이 오길 기대하는 곳에 숫자가 오더라도 자바스크립트는 알아서 숫자를 문자열로 변환하여 사용한다

## `console.log()`

### `console.log`란?

- `( )` 괄호 안의 메시지를 웹 콘솔창에 메시지를 출력하는 함수
- 가장 대표적인 디버깅 방법으로 쉽게 말해 자바스크립트가 출력하도록 도와주는 기능
- 콘솔창 내에는 문자, 숫자, true 등 여러 값 넣을 수 있다
- 콘솔 중에서도 log라는 함수를 이용해 화면에 원하는 텍스트를 출력한 것

```jsx
console.log("안녕하세요");
```

![Untitled](Front-end%20Study%20day01%20%E2%9C%A8%202a226bf880bc459b838c07b8fe64d2a1/Untitled.png)

### `console.log()` 사용 시 `undefined` 가 출력되는 이유

- `undefined` 는 반환할 결과값이 없을 때 나오는 것.
- 어떠한 값도 담기지 않아 자료형을 알 수 없는 경우
- cmd에서 자바스크립트를 사용하기 위해 node를 실행하고 console에 대한 결과값과 undefined가 동시에 나오는 이유
    - REPL의 특성 때문
    - REPL 이란? Read, Evaluate(평가), Print, Loop 의 약자
    - JS를 사용할 때 ‘node’로 액세스하듯이 스크립팅 언어 간의 공통 기능인 코딩 환경 도구, 탐색기 같은 것
    - 여기서 루프는 일단 모든 명령문이나 코드를 읽고 평가하고 정보를 인쇄해주면 컴퓨터가 더 많은 입력을 받을 준비가 된 상태로 만든다
    
    ```
    C:\Users >node
    Welcome to Node.js v17.8.0.
    Type ".help" for more information.
    >console.log("test")
    test
    undefined
    
    1. Read(읽기)
    	- console.log("test")를 JS로 읽기
    
    2. Evaluate(평가)
    	- 명령의 일부를 평가
    	- 만약, 평가 단계에서 2 + 2와 같은 합을 평가한 후 반환하지만
    	> 2 + 2
    	4
    	- console.log의 경우 표현식을 평가하고 결과를 출력함
    		ㄴ 평가할 것이 없어 undefined 반환
    
    3. Print(출력)
    	- REPL에서 test를 인쇄하도록 지시
    
    4. Loop
    	- 출력 후 다시 입력받을 준비 
    ```
    

### `return` 이란?

- return 명령문은 함수 실행을 종료하고 주어진 값을 함수 호출 지점으로 반환한다
- 결과값을 저장(호출 지점으로 반환)을 하지만 출력을 하진 않는다

```jsx
// console.log가 사용되지 않았기 때문에 console 창에는 아무것도 나타나지 않지만
// 호출 지점으로 반환된 상태
function sayHello() {
	let greeting = "안녕하세요!";
	return greeting;
}
sayHello()

// console 창에 결과 값이 나타나게 된다
console.log(sayHello());
```

### `console.log()` 와 `return` 의 차이점

- return으로 저장된 함수 sayHello()는 저장만 된 상황이라 console창에 나타나지 않지만, console.log()는 출력 가능한 메소드이기 때문에 console창에 문자열이 나타나게 된다
- console.log()는 console창에 결과값을 나타나게만 사용할 수 있다
- return은 함수 선언할 때 사용 가능하다

✔️ 쉽게 말해서 콘솔은 단순히 출력을 위함, return은 값을 반환, 저장!

## 조건문(conditional statements)

### 조건문이란?

- 프로그램 내에서 주어진 표현식의 결과에 따라 별도의 명령을 수행하도록 제어하는 수행문
- 조건문 중에서 가장 기본이 되는 실행문은 if문이다

### 조건문의 형태

- `if`
- `if` `else`
- `if` `else if` `else`
- `switch`

## 반복문(iteration statements)

### 반복문이란?

- 프로그램 내에서 똑같은 명령을 일정 횟수만큼 반복하여 수행하도록 제어하는 실행문
- 프로그램이 처리하는 대부분의 코드는 반복적인 형태가 많으므로, 가장 많이 사용되는 실행문 중 하나이다.

### 반복문의 형태

- `while`
- `do` `while`
- `for`
- `for` `in`
    - 일반적인 for문과는 전혀 다른 형태의 반복문이다
    - 해당 객체의 모든 열거할 수 있는 프로퍼티를 순회할 수 있도록 해준다
    - 열거할 수 있는 프로퍼티란 내부적으로 enumerable 플래그가 true로 설정된 프로퍼티를 의미한다
    - 이 반복문은 루프마다 객체의 열거할 수 있는 프로퍼티의 이름을 지정된 변수에 대입한다
    - 이렇게 대입받은 변수를 이용하면 루프 안에서 객체의 열거할 수 있는 프로퍼티에 순차적으로 접근 가능하다
    
    ```jsx
    for (변수 in 객체) {
        // 객체의 모든 열거할 수 있는 프로퍼티의 개수만큼 반복적으로 실행하고자 하는 실행문;
    }
    
    // for in 문을 사용하여 배열의 요소에 접근하는 예제
    var arr = [3, 4, 5];
    for (var i = 0; i < arr.length; i++) { // 배열 arr의 모든 요소의 인덱스(index)를 출력.
        document.write(i + " ");
    }
    for (var i in arr) { // 위와 같은 동작을 하는 for / in 
        document.write(i + " ");
    }
    
    // for in 문을 사용하여 객체의 프로퍼티에 접근하는 예제
    var obj = { name : "이순신", age : 20 };
    for (var i in obj) {
        document.write(i + "<br>");
    }
    ```
    
    ✔️ for / in 문은 해당 객체가 가진 모든 프로퍼티를 반환하는 것이 아닌 오직 열거할 수 있는 프로퍼티만을 반환한다.
    
- `for` `of`
    - 반복할 수 있는 객체를 순회할 수 있도록 해주는 반복문
    - JS에서 반복할 수 있는 객체에는 `Array` `Map` `Set` `arguments` 객체 등이 있다.
    - 이 반복문은 루프마다 객체의 열거할 수 있는 프로퍼티의 값을 지정된 변수에 대입한다.
    
    ```jsx
    // 문법
    for (변수 of 객체) {
        //객체의 모든 열거할 수 있는 프로퍼티의 개수만큼 반복적으로 실행하고자 하는 실행문;
    }
    
    // for of 문을 사용하여 배열의 요소에 접근하는 예제
    var arr = [3, 4, 5];
    for (var i = 0; i < arr.length; i++) { // 배열 arr의 모든 요소의 인덱스(index)를 출력함.
        document.write(arr[i] + " ");
    }
    for (var value of arr) { // 위와 같은 동작을 하는 for / of 문
        document.write(value + " ");
    }
    
    // for of 문을 사용하여 Set 객체의 프로퍼티에 접근하는 예제
    var arr = new Set([1, 1, 2, 2, 3, 3]);
    for (var value of arr) {
        document.write(value + " ");
    }
    ```
    
    ✔️ for / of 문은 익스플로러에서 지원하지 않는다. 
    

## `try ~ catch ~ finally`

### `try ~ catch`

- 실행할 코드블럭을 표시하고 예외가 발생할 경우 응답을 지정한다

```jsx
// 문법
try {
      try_statements
    }
    [catch (exception_var) {
      catch_statements
    }]
    [finally {
      finally_statements
    }]

try {
  nonExistentFunction();
} catch (error) {
  console.error(error);
  // Expected output: ReferenceError: nonExistentFunction is not defined
  // (Note: the exact output may be browser-dependent)
}
```

### 문법

- `try_statements` : 실행될 선언들
- `catch_statements` : try 블록에서 예외가 발생했을 때 실행될 선언들
- `exception_var` : catch 블록과 관련된 예외 객체를 담기 위한 식별자
- `finally_statements` : try 선언이 완료된 이후에 실행된 선언들. 예외 발생 여부와 상관없이 실행

### try 선언의 3가지 형식

- `try ~ catch` : catch 블록은 try 블록 안에서 예외 발생하는 경우 무엇을 할지 명시하는 코드를 포함. 예외가 발생하지 않으면 catch 블록 건너뜀
- `try ~ finally` : try블록과 catch 블록이 실행을 마친 후 예외 발생 여부 상관없이 항상 실행된다.
- `try ~ catch ~ finally`

## 템플릿 리터럴(Template literals)

### 템플릿 리터럴이란?

- 자바스크립트에서 문자열을 입력하는 선진적인 방식
- 표현식 / 문자열 삽입, 여러 줄 문자열, 문자열 형식화, 문자열 태깅 등 다양한 기능 제공
- 여러 개행 줄의 문자열도 나눠서 작성할 필요가 없이 한번에 작성 가능

```jsx
console.log("string text line 1\n" + "string text line 2");

//템플릿 리터럴
console.log(`string text line 1
string text line 2`);
```

### 기본 문법

```jsx
`string text` // 문자열 표현
`string text line 1
 string text line 2` // 개행된 문자열 표현

var expression;
`string text ${expression} string text` // 변수값 문자열 조합

function tag() { };
tag `string text ${expression} string text` // 함수 호출 아규먼트
```

✔️ 템플릿 리터럴은 작은따옴표 `'` 나 큰따옴표 `"` 대신 백틱 ` 으로 감싸준다 

### 표현식 삽입법(expression interpolation)

- `$` 와 `{ }` 사용하여 표현식 표기 가능

```jsx
let a = 20;
let b = 8;
let c = "자바스크립트";
let str = `저는 ${a+b}살이고 ${c}를 좋아합니다.`;
console.log(str);   //저는 28살이고 자바스크립트를 좋아합니다.
```

✔️ `+` 연산자로 문자열을 연결해주는 것보다 가독성이 더 좋다 

### 태그드 템플릿(tagged templates)

- 템플릿 리터럴의 발전된 형태의 하나
- 태그를 사용하여 템플릿 리터럴을 함수로 파싱할 수 있다

```jsx
let person = 'Lee';
let age = 28;

let tag = function(strings, personExp, ageExp) {   
    console.log(strings); // 첫 인수는 배열이 들어오고
    console.log(personExp); // 나머지 인수는 ${person}값이 들어온다.
    console.log(ageExp); // 나머지 인수는 ${age}값이 들어온다.
};

let output = tag`that ${person} is a ${age}`;

function fn(strings, brand, items) {
    if(undefined === items) {
        return brand + "의 라면은 재고가 없습니다!";
    } else {
        return strings[0] + brand + strings[1] + items;
    }
}

console.log(fn`구매가능한 ${ramenList[0].brand}의 라면 : ${ramenList[0].items}`);
//구매가능한 농심의 라면 : 신라면,짜파게티,참치마요,둥지냉면
console.log(fn`구매가능한 ${ramenList[1].brand}의 라면 : ${ramenList[1].items}`);
//구매가능한 삼양의 라면 : 삼양라면,불닭볶음면
console.log(fn`구매가능한 ${ramenList[2].brand}의 라면 : ${ramenList[2].items}`);
//오뚜기의 라면은 재고가 없습니다!
```

### 중첩 템플릿(nesting templates)

- 특정 조건을 만족하는 경우마다 다른 문자열을 변수에 저장하고 싶을 때, 템플릿을 중첩해서 작성하는 것이 가독성이 더 좋을 때가 있다고 한다.

```jsx
//ES6, Used nesting templates
const classes = `header ${ isLargeScreen() ? '' :
                `icon-${item.isCollapsed ? 
                'expander' : 'collapser'}` }`;
```

### 원래 문자열(raw strings)

- 이스케이프 문자를 해석하지 않은 일반 문자열이다.
- String.raw 태그함수를 사용하면 템플릿 문자열을 입력한 대로 출력할 수 있다.
- 태그 함수를 만들어 원래의 문자열을 반환하려면 첫 번째 인자의 raw 프로퍼티를 사용하면 된다.

```jsx
let tag = function(strings) {
    console.log(strings);
    return strings.raw[0];
}

let str = tag`Hello\nWorld.`;
console.log(str);       //Hello\nWorld.
```