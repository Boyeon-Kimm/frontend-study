# Front-end Study day02 ✨

# `JavaScript`

## 함수

### 콜백함수(Callback Function)란?

- 간단히 말하면 함수 안에서 실행하는 또 다른 함수
- 또 다른 함수를 만들 때 인풋(파라미터)를 함수로 받아서 사용할 수 있는데, 이 때 인자로 사용되는 함수를 말한다
    - 파라미터로 변수가 아닌 함수를 전달하는 것을 말함.
    - 함수 이름 없이 익명으로도 전달 가능한 함수를 일컫는다.
- 콜백 함수만을 바꿔줌으로서 하나의 함수를 여러가지로 응용 가능

```java
function introduce (lastName, firstName, callback) {
    var fullName = lastName + firstName;
    
    callback(fullName);
}

function say_hello (name) {
    console.log("안녕하세요 제 이름은 " + name + "입니다");
}

function say_bye (name) {
    console.log("지금까지 " + name + "이었습니다. 안녕히계세요");
}

introduce("홍", "길동", say_hello);
// 결과 -> 안녕하세요 제 이름은 홍길동입니다

introduce("홍", "길동", say_bye);
// 결과 -> 지금까지 홍길동이었습니다. 안녕히계세요
```

- 위와 같이 다른 동작을 수행하는 함수 `say_hello` 와 `say_bye` 를 정의해두고 `introduce` 함수에 인풋으로 사용해주면, `introduce` 라는 함수에서 받아들이는 같은 인풋들을 가지고 다른 동작을 수행하는 것이 가능해진다.

✔️ 함수를 나눠줌으로써 코드를 재활용 할 수 있고, 관리도 용이

✔️ 콜백 자체는 코드를 더 읽기 편하게 해주지만 너무 많은 콜백을 연결하면 오히려 나중에 디버깅 하기가 힘들어지기 때문에 적당하게 나누어서 사용하는 것이 좋다

### 콜백함수 사용 원칙

- 익명의 함수 사용
    - 이름이 없는 ‘익명의 함수’ 를 사용한다.
    - 함수의 내부에서 실행되기 때문에 이름을 붙이지 않아도 된다
    
    ```jsx
    let number = [1, 2, 3, 4, 5];
    
    number.forEach(function(x) {
        console.log(x * 2);
    });
    ```
    
- 함수의 이름(만) 넘기기
    - 자바스크립트는 null과 undefined 타입을 제외하고 모든 것을 객체로 다룬다
    - 함수를 변수 또는 다른 함수의 변수처럼 사용할 수 있다
    - 함수를 콜백함수로 사용할 경우, 함수의 이름만 넘겨주면 된다
    
    ```jsx
    function whatYourName(name, callback) {
        console.log('name: ', name);
        callback();
    }
    
    function finishFunc() {
        console.log('finish function');
    }
    
    whatYourName('boyeon', finishFunc);
    
    /*
    name: boyeon
    finish function
    */
    ```
    
    ✔️ 함수를 인자로 사용할 때, `callback`, `finishFunc` 처럼 `( )` 를 붙일 필요가 없다
    
- 전역변수, 지역변수를 콜백함수의 파라미터로 전달

```jsx
let fruit = 'apple';	// Global Variable

function callbackFunc(callback) {
    let vegetable = 'tomato';	// Local Variable
    callback(vegetable);
}

function eat(vegetable) {
    console.log(`fruit: ${fruit} / vegetable: ${vegetable}`);
}

callbackFunc(eat);

// fruit: apple / vegetable: tomato
```

### 콜백함수 사용 시 주의할 점

1. `this` 를 사용한 콜백함수
    - 첫 번째 콘솔의 값이 KIM BOYEON이 아닌 Not Set이 출력된다
    - `setName()` 에서 사용된 `this` 객체가 `window` 라는 글로벌 객체를 가리키기 때문
        - 따라서 `this` 를 보호할 수 있도록 콜백함수를 만들어야한다

```jsx
let userData = {
    signUp: '2023-03-04 18:12:00',
    id: 'boyeon',
    name: 'Not Set',
    setName: function(firstName, lastName) {
        this.name = firstName + ' ' + lastName;
    }
}

function getUserName(firstName, lastName, callback) {
    callback(firstName, lastName);
}

getUserName('KIM', 'BOYEON', userData.setName);

console.log('1: ', userData.name); // Not Set
console.log('2: ', window.name); // KIM BOYEON
```

🏁 `this` 를 보호할 수 있는 방법

- `call()` `apply()` 를 사용한다
    - ( 2 )에서 마지막 인자에 담긴 userData는 ( 1 )에서 call 함수의 첫번째 인자로 전달된다
    - 즉, `call()` 에 의해서 userData에 `this` 객체가 매핑된다

```jsx

function getUserName(firstName, lastName, callback, obj) {
    callback.call(obj, firstName, lastName); // - (1)
}

getUserName('KIM', 'BOYEON', userData.setName, userData); //	- (2)

console.log(userData.name);

<output>
KIM BOYEON
```

- `apply()` 도 인자를 배열로 전달한다는 점만 다르고 동일하게 작동한다

```jsx
function getUserName(firstName, lastName, callback, obj) {
    callback.apply(obj, [firstName, lastName]); // 인자가 배열
}

getUserName('KIM', 'BOYEON', userData.setName, userData);

console.log(userData.name);

<output>
KIM BOYEON
```

1. 콜백지옥(Callback Hell)
    - 비동기 호출이 자주 일어나는 프로그램의 경우 콜백 지옥 발생
    - 콜백지옥이란 함수의 *매개변수로 넘겨지는 콜백 함수가 반복*되어 코드의 들여쓰기 수준이 감당하기 힘들어질 정도로 깊어지는 현상이다

![Untitled](Front-end%20Study%20day02%20%E2%9C%A8%2097ea55070bc54f43b32eec9d9bc70126/Untitled.png)

## 클로저(closure)

- 내부 함수가 외부 함수의 맥락(context)에 접근할 수 있는 것
- 내부 함수는 외부 함수의 지역 변수에 접근할 수 있는데, 외부 함수의 실행이 끝나서 외부 함수가 소멸된 이후에도 내부 함수가 외부 함수의 변수에 접근할 수 있는 메커니즘이 클로저

```jsx
function factory_movie(title){
    return {
        get_title : function (){
            return title;
        },
        set_title : function(_title){
            title = _title
        }
    }
}
potter = factory_movie('Harry Potter');
matrix = factory_movie('Matrix');
 
alert(potter.get_title());
alert(matrix.get_title());
 
potter.set_title('마녀1');
 
alert(potter.get_title());
alert(matrix.get_title());

// 실행결과
// Harry Potter -> Matrix -> 마녀1 -> Matrix
```

- 클로저는 객체의 메소드에서도 사용 가능
    - 위의 예제는 함수의 리턴 값으로 객체를 반환하고 있다. 이 객체는 메소드 get_title과 set_title을 가지고 있다. 이 메소드들은 외부 함수인 factory_movie의 인자 값으로 전달된 지역변수 title을 사용하고 있다.
- 동일한 외부 함수 안에서 만들어진 내부 함수나 메소드는 외부 함수의 지역 변수를 공유한다
    - 17행에서 실행된 set_title은 외부 함수 factory_movie의 지역변수 title의 값을 '마녀1'로 변경했다. 19행에서 potter.get_title();의 값이 '마녀1'인 것은 set_title와 get_title 함수가 title의 값을 공유하고 있다는 의미다.
- 그런데 똑같은 외부함수 factory_movie를 공유하고 있는 potter와 matrix의 get_title의 결과는 서로 각각 다르다. 그것은 외부함수가 실행될 때마다 새로운 지역변수를 포함하는 클로저가 생성되기 때문에 potter와 matrix는 서로 완전히 독립된 객체가 된다.
- factory_movie의 지역변수 title은 2행에서 정의된 객체의 메소드에서만 접근 할 수 있는 값이다. 이 말은 title의 값을 읽고 수정 할 수 있는 것은 factory_movie 메소드를 통해서 만들어진 객체 뿐이라는 의미다.

✔️ 기본적으로 private한 속성을 지원하지 않는 자바스크립트에서, 클로저의 이러한 특성을 이용하여 private한 속성을 사용할 수 있게 된다.

## 일반 함수 `this` , 화살표 함수 `this` 차이점

### 일반 함수에서의 `this`

- 함수를 호출할 때 어떻게 호출되었느냐에 따라 `this` 에 바인딩할 객체가 동적으로 결정된다

```jsx
// ES5
var obj = {
  id: 42,
  counter: function counter() {
    setTimeout(function() {
      console.log(this.id);
    }.bind(this), 1000);
  }
};

obj.counter() // 42 (1000ms, 1초 뒤)
```

- ES5 예제를 보면 setTimeout() 함수를 통해 obj.counter() 함수를 호출할 경우 브라우저의 콘솔창으로 42가 반환되는 코드이다. setTimeout() 함수는 인자로 전달받은 함수를 호출할 때, this에 window 객체를 바인딩하게된다. 그런 특성덕분에 내장 메서드인 .bind()를 사용하여 할당해주었다.
- `.bind()` 가 없을 경우
    - `.bind()` 메소드를 사용하지 않을 경우 `this` 가 가리키는 것은 window객체가 된다. 즉 obj.id가 아닌 [window.id](http://window.id)가 되어 결과값 undefined가 반환된다

```jsx
// ES5
var obj = {
  id: 42,
  counter: function counter() {
    setTimeout(function() {
      console.log(this.id);
    }, 1000);
  }
};

obj.counter() // undefined
```

### 화살표 함수에서의 `this`

- 화살표 함수는 일반 함수와는 반대로 함수를 선언할 때 `this` 에 바인딩할 객체가 정적으로 결정된다. 동적으로 결정되는 일반 함수와는 달리 화살표 함수의 `this` 는 언제나 상위 스코프의 `this` 를 가리킨다.

```jsx
let arrowThis = () => console.log(this)

arrowThis() // Window......
```

- 첫 번째 예제에서의 this 는 window 객체를 가리키고 있다.

```jsx
// ES5
var obj = {
  id: 42,
  counter: function counter() {
    setTimeout(() => {
      console.log(this.id);
    }, 1000);
  }
};

obj.counter() // 42
```

- 위에서 setTimeout() 함수는 콜백을 인자값을 받아 호출할 경우 항상 window객체를 바인딩한다고 했는데, 이번에는 화살표 함수를통해 상위 컨텍스트인 자신을 소유한 obj를 바인딩하기 때문에 결과는 42가 출력된다.

## 고차 함수(Higher - Order Function)

### 고차함수란?

- 함수를 파라미터로 전달받거나 연산의 결과로 반환해주는 메서드
- 함수형 프로그래밍의 핵심, 자바스크립트를 함수형 프로그래밍에 알맞은 언어로 만들어주는 특성
    - 함수형 프로그래밍이란? 함수를 다른 함수의 파라미터로 넘길 수도 있고 반환 값으로 함수를 받을 수도 있는 프로그래밍 형태

### `.forEach()`

- `for` 문을 대체하는 고차 함수
- 반복문을 추상화하여 구현된 메소드이고 내부에서 주어진 배열을 순회하면서 연산 수행

```jsx
arr.forEach((item, index, thisArr) => {

});

/*
	item : 배열요소값
	index : 배열 인덱스
	thisArr : 참조한 배열

	리턴 값 : 없음
*/

const numberArr = [1, 2, 3, 4, 5];
let total = 0;
 
numberArr.forEach((item) => {
    total += item;
});
 
console.log(total); // 15
```

### `.map()`

- `forEach` 와 같이 순회하면서, 콜백함수에서의 실행 결과를 리턴한 값으로 이루어진 배열을 만들어 반환

```jsx
arr.map((currentValue, index, array) => {

}, thisArg);

/*
	currentValue : 현재 배열요소값
	index : 배열 인덱스
	array : 참조한 배열
	thisArg : 콜백함수에서 this로 사용할 값

	리턴 값 : 반환 타입은 찾은 요소의 타입 / 없다면 undefined
*/

const numberArr = [1, 2, 3, 4, 5];
const numberMapArr = numberArr.map((item) => {
    return (item % 2 === 0) ? 'even' : 'odd'; // 연산한 결과값을 넣어 배열 반환
});
 
console.log(numberMapArr); // ['odd', 'even', 'odd', 'even', 'odd']
```

🏁 `forEach` 와 `map` 의 차이

- 두 메소드 모두 배열을 순회하는 것은 동일
- `forEach` 는 각 요소를 참조한 연산이 이루어지고
- `map` 은 각 요소를 다른 값으로 맵핑한 새로운 배열이 반환되는 점에 차이가 있다

✔️ `forEach()` 는 for문을 대체하여 사용, `map()` 은 연산의 결과로 새로운 배열을 생성하고자 할 때 사용 

### `.find()`

- 찾고자 하는 값을 그대로 반환
    - `indexOf()` : 찾고자 하는 값을 인덱스로 반환
    - `include()` : 찾고자 하는 값을 bool로 반환
- 주어진 배열을 순회하면서 콜백 함수 실행의 반환값이 true에 해당하는 첫번째 요소를 반환

```jsx
arr.find((element, index, array) => {

}, thisArg);

/*
	element : 현재 배열요소값
	index : 배열 인덱스
	array : 참조한 배열
	thisArg : 콜백함수에서 this로 사용할 값

	리턴 값 : 반환 타입은 찾은 요소의 타입 / 없다면 undefined
*/

const numberArr = [1, 3, 3, 5, 7];
const objectArr = [
    { name: 'Harry', age: 20 },
    { name: 'Kim', age: 30 },
    { name: 'Steve', age: 40 }
];
 
console.log(objectArr.find(item => {
   return item.age === 20 // 해당조건에 부합하면 item값 반환
}); // {name: "Harry", age: 20}

// find는 하나만 찾음. 뒤에서 배울 filter은 여러개를 배열로
console.log(numberArr.find(item => item === 3));  // 3
console.log(numberArr.filter(item => item === 3));  // [3, 3]
```

### `.findIndex()`

- 배열 메소드 `indexOf()` 의 콜백 함수 버전
- 고차함수 `find()` 의전

```jsx
arr.findIndex((element, index, array) => {

}, thisArg);

/*
	element : 현재 배열요소값
	index : 배열 인덱스
	array : 참조한 배열
	thisArg : 콜백함수에서 this로 사용할 값

	리턴 값 : 요소가 테스트를 통과하면 배열의 인덱스 / 그렇지 않으면 -1
*/

const objectArr = [
    { name: 'Harry', age: 20 },
    { name: 'Kim', age: 30 },
    { name: 'Steve', age: 40 }
];
 
console.log(objectArr.findIndex(item => {
   return item.age === 20 // 해당조건에 부합하면 item의 인덱스를 반환
}); // 0

console.log(objectArr.findIndex(item => item.name === 'Kim')); // 1
```

### `.filter()`

- 주어진 배열을 순회하면서 콜백 함수의 반환 값이 true에 해당하는 요소로만 구성된 새로운 배열을 생성하여 반환
- 한마디로 `find()` 를 찾아서 값을 반환하는 기능과 `map()` 의 배열 생성 기능의 융합 버전

```jsx
arr.findIndex((element, index, array) => {

}, thisArg);

/*
	element : 현재 배열요소값
	index : 배열 인덱스
	array : 참조한 배열
	thisArg : 콜백함수에서 this로 사용할 값

	리턴 값 : 테스트를 통과한 요소로 이루어진 새로운 배열
						/ 어떤 요소도 테스트를 통과하지 못했다면 빈 배열을 반환
*/

const numberArr = [1, 2, 3, 4, 5];

const numberFilterArr = numberArr.filter((item) => {
    return item % 2 === 0; // 해당조건에 부합으면 item을 넣어 배열 반환
});

console.log(numberFilterArr); // [2, 4]
```

### `.reduce()`

- 콜백 함수의 실행된 반환 값(initialValue)를 전달 받아 연산의 결과값이 반환
- 첫번째 인자(accumulator)에서부터 시작하여 배열 값인 두번째 인자(currentvalue)를 순회하며 `accumulator += currentvalue` 실행
- 사실상 `forEach` , `map` , `filter` 기능을 `reduce` 로 모두 구현해서 쓸 수 있어 고차함수의 부모라고 불림

```jsx
arr.reduce((accumulator, currentValue, index, array) => {

}, initialValue);

/*
	accumulator : 누산기. 순회하면서 계속 더해서 합쳐지는 값
	currentValue : 현재 값
	index : 배열 인덱스
	array : 참조한 배열
	initialValue : 콜백 최초 호출에서 acc 누산기에 제공하는 값.
								초기값을 제공하지 않으면 배열의 첫번째 요소를 사용
								빈 배열에서 초기값 없이 호출하면 에러.

	리턴 값 : 누적 계산의 결과값
*/

const numberArr = [1, 2, 3, 4, 5];
 
const sum = numberArr.reduce((previousValue, currentValue, currentIndex, thisArray) => {
    console.log('Current Index: ' + currentIndex + ' / Previous Value: ' + previousValue + ' / Current Value: ' + currentValue);
    
    return previousValue + currentValue; // 연산한 결과값을 누산기previousValue에 넣어 최종값을 얻는다.
}, 0);
 
console.log('Sum: ' + sum);
/*
Current Index: 0 / Previous Value: 0 / Current Value: 1
Current Index: 1 / Previous Value: 1 / Current Value: 2
Current Index: 2 / Previous Value: 3 / Current Value: 3
Current Index: 3 / Previous Value: 6 / Current Value: 4
Current Index: 4 / Previous Value: 10 / Current Value: 5
Sum: 15
*/
```

🏁 `reduce()` 함수 호출 시 initial 값이 **없는** 경우

- accumulator : 배열의 첫번째 값
- currentValue : 배열의 두번째 값

🏁 `reduce()` 함수 호출시 initial 값이 **있는** 경우

- accumulator : initialValue가 지정한 값
- currentValue : 배열의 첫번째 값

### `.sort()`

- 배열 정렬
- 단, 복사본이 만들어지는게 아니라 원 배열이 정렬됨
- 콜백 함수를 통해 배열의 원소들을 어느 기준으로 정렬할지 지정해야함(번거롭다)

```jsx
arr.sort(function (a, b) {

}, thisArg);
/*
	compareFunction : 정렬 순서를 정의하는 함수
	(이 값이 생략되면, 배열의 element들을 문자열로 취급되어, 유니코드 값 순서로 정렬)

	리턴 값 : sorting 된 값
*/

var arr = ['red', 'blue', 'green', 'white', 'black'];
arr.sort(); // [ 'black', 'blue', 'green', 'red', 'white' ]
```

✔️ 위와 같이 문자를 정렬할때는 문제가 없지만, 숫자를 정렬하는 경우에도 ABC 순으로 정렬되기 때문에 콜백함수를 넣어 조작이 필요. 콜백함수에서 인자 두개를 받아, 두 수의 차가 양수값(큰값)이냐 음수값(작은값)이냐를 이용하여 정렬한다.

```jsx
var arr2 = [1,2,3,10,50,70,8,4];
arr2.sort(); // [ 1, 10, 2, 3, 4, 50, 70, 8 ]

arr2.sort(function(a, b)  {
  console.log(a,b);
});
/*
10 1
2 10
3 2
4 3
50 4
70 50
8 70
*/

arr.sort(function(a, b)  {
  if(a > b) return 1;
  if(a === b) return 0;
  if(a < b) return -1;
}); // [ 1, 2, 3, 4, 8, 10, 50, 70 ]
```

**🏁 숫자 정렬**

```jsx
const arr = [2, 1, 3, 10];

arr.sort(function(a, b)  {
  return a - b;
});  // [1, 2, 3, 10] 오름차순

arr.sort(function(a, b)  {
  return b - a;
}); // [10, 3, 2, 1] 내립차순
```

🏁 **문자 정렬**

```jsx
const arr = ['banana', 'b', 'boy'];

arr.sort(); // ['b', 'banana', 'boy']

arr.sort(function(a, b) {
  if(a < b) return 1;
  if(a > b) return -1;
  if(a === b) return 0;
});  // ['boy', 'banana', 'b'] 내림차순
```

🏁 **문자(대소문자 구없이) 정렬**

```jsx
const arr = ['banana', 'b', 'Boy'];

arr.sort();  // ['Boy','b','banana']
// sort() 함수로 문자열을 정렬하면, 대문자가 소문자보다 앞에 오도록 정렬이 됩니다.
// 유니코드가 대문자가 소문자보다 앞서기 때문입니다.

arr.sort(function(a, b) {
  const upperCaseA = a.toUpperCase();
  const upperCaseB = b.toUpperCase();
  
  if(upperCaseA > upperCaseB) return 1;
  if(upperCaseA < upperCaseB) return -1;
  if(upperCaseA === upperCaseB) return 0;
}); // ['b', 'banana', 'Boy'] 오름차순

arr.sort(function(a, b) {
  const upperCaseA = a.toUpperCase();
  const upperCaseB = b.toUpperCase();
  
  if(upperCaseA < upperCaseB) return 1;
  if(upperCaseA > upperCaseB) return -1;
  if(upperCaseA === upperCaseB) return 0;
}); // ['Boy', 'banana', 'b'] 내림차순
```

🏁 **객체 정렬**

```jsx
const arr = [
  {name: 'banana', price: 3000}, 
  {name: 'apple', price: 1000},
  {name: 'orange', price: 500}
];

arr.sort(function(a, b) {
  return a.price - b.price; // price 숫자값을 기준으로 정렬
});
/*
{"name":"orange","price":500}
{"name":"apple","price":1000}
{"name":"banana","price":3000}
*/
```

### `.some()`

- 배열 메소드인 `include()` 의 콜백함수 버전
- `include()` 는 값이 있냐에 따른 bool이면, `some` 은 함수의 로직에 따른 bool
- 배열의 요소들을 주어진 함수(조건)을 통과하는데 *한개라도 통과되면 true, 아닐때에는 false 출력*
- 빈 배열로 함수(조건)을 통과하면 무조건 false 출력
- 이와같이 some이라는 이름은, 함수(조건)에 부합한 갯수가 some 이면 true 라는 뜻에서 비롯됨

```jsx
arr.some((currentValue, index, array) => {

}, thisArg);
/*
	currentValue : 현재 배열요소값
	index : 배열 인덱스
	array : 참조한 배열
	thisArg : 콜백함수에서 this로 사용할 값

	리턴 값 : callback이 어떤 배열 요소라도 참인 값을 반환하는 경우 true, 외엔 false
*/

const array = [1, 3, 5];

// 짝수인지 체크
const result = array.some((currentValue) => {
	return currentValue % 2 === 0;
})

console.log(result); // 리턴 값 : false
// 그 이유는 array의 3개의 요소 모두 2로 나눌때 나머지가 0이 아니기 때문이다.
// 하나라도 부합한 조건에 맞으면 true, 모두 부합하지 않으면 false

// -----------------------------------------------

const array2 = [1, 2, 3, 5];

const result2 = array2.some((currentValue) => {
	return currentValue % 2 === 0;
})
console.log(result2); // 리턴 값 : true
// 그 이유는 array의 4개의 요소 모두 2로 나눌때 나머지가 0인 요소가 하나라도 있기 때문이다.
// 하나라도 부합한 조건에 맞으면 true, 모두 부합하지 않으면 false
```

### `.every()`

- `some()` 의 반대 버전
- 배열 안의 모든 요소가 주어진 함수(조건)을 모두 통과하면 true, 한 요소라도 통과하지 못하면 false
- 빈 배열을 함수에 적용시키면 무조건 true 반환
- 이와같이 every 라는 이름은, 함수(조건)에 부합한 갯수가 every이면 true 라는 뜻에서 비롯됨.

```jsx
arr.every((currentValue, index, array) => {

}, thisArg);
/*
	currentValue : 현재 배열요소값
	index : 배열 인덱스
	array : 참조한 배열
	thisArg : 콜백함수에서 this로 사용할 값

	리턴 값 : callback이 모든 배열 요소에 대 참인 값을 반환하는 경우 true, 외엔 false
*/

const array = [1, 30, 39, 29, 13];

const result = array.every((currentValue) => {
	return currentValue < 40;
})

console.log(result); // 리턴 값 : true
// 그 이유는 array의 모든 요소가 40보다 작기 때문이다.
// 하나라도 부합한 조건에 맞지 안으면 false, 모두 부합하면 true

// -----------------------------------------------

const array2 = [1, 30, 39, 29, 100, 13];

const result2 = array2.every((currentValue) => {
	return currentValue < 40;
})
console.log(result2); // 리턴 값 : false
// 그 이유는 array의 1개의 요소 100이 40보다 크기 때문이다.
// 하나라도 부합한 조건에 맞지 안으면 false, 모두 부합하면 true
```

## 객체(object)

### 객체란?

- 자바스크립트의 기본 타입(data type)은 객체(object)
- 객체란 이름(name)과 값(value)로 구성된 프로퍼티(property)의 정렬되지 않은 집합이다
    - 프로퍼티의 값으로 함수가 올 수도 있는데, 이러한 프로퍼티를 메소드(method)라고 한다

```jsx
var cat = "나비"; // 일반적인 변수의 선언

// 객체도 많은 값을 가지는 변수의 하나임.
var kitty = { name: "나비", family: "코리안 숏 헤어", age: 1, weight: 0.1 };
cat          // 나비
kitty.name   // 나비
```

✔️ 자바스크립트에서는 숫자, 문자열, 불리언, undefined 타입을 제외한 모든 것이 객체

- 하지만 숫자, 문자열, 불리언과 같은 원시 타입은 값이 정해진 객체로 취급되어, 객체로서의 특징도 함께 가지게 됩니다.

### 객체의 프로퍼티 참조

```jsx
// 문법
객체이름.프로퍼티이름
또는
객체이름["프로퍼티이름"]

// 예제
var person = {
    name: "홍길동",      // 이름 프로퍼티를 정의함.
    birthday: "030219",  // 생년월일 프로퍼티를 정의함.
    pId: "1234567",      // 개인 id 프로퍼티를 정의함.
    fullId: function() { // 생년월일과 개인 id를 합쳐서 주민등록번호를 반환함.
        return this.birthday + this.pId;
    }
};
person.name    // 홍길동
person["name"] // 홍길동
```

### 객체의 메소드 참조

```jsx
// 문법
객체이름.메소드이름()

// 예제
var person = {
    name: "홍길동",
    birthday: "030219",
    pId: "1234567",
    fullId: function() {
        return this.birthday + this.pId;
    }
};
person.fullId() // 0302191234567
person.fullId;  // function () { return this.birthday + this.pId; }
```

<aside>
💡 메소드를 참조할 때 메소드 이름 뒤에 괄호 `()` 를 붙이지 않으면, 메소드가 아닌 프로퍼티 그 자체를 참조하게 된다. 따라서 괄호를 사용하지 않고 프로퍼티 그 자체를 참조하게 되면 해당 메소드의 정의 그 자체가 반환된다.

</aside>

### 자바의 클래스와 자바스크립트의 객체는 무엇이 다른가?

🏁 **자바의 클래스와 객체** : 연관된 메소드 및 변수들을 모아놓은 집합

```java
class student {
    String name;
    int age;
    int number;
}
```

- 위의 'student'라는 클래스는 'name', 'age', 'number'를 갖는다
- 이러한 클래스를 이용하면 코드의 양을 줄일 뿐 아니라 대형 프로젝트도 훨씬 쉽게 진행할 수 있다. 이러한 클래스를 활용하기 위해선 자바에선 객체(Object)를 이용
- 클래스가 원본이라면 객체는 클래스의 복사본과 같은 것, 그래서 객체는 클래스의 구성 요소들을 쓸 수 있음은 물론이고 자신이 자신 요소를 수정이 가능했다. 이렇게 클래스, 객체를 이용하는 것이 자바의 기본적인 프로그래밍 기법이다.

🏁 **자바스크립트의 클래스와 객체**

- 연관 있는 데이터들을 한군데 모아 놓는 컨테이너 같은 역할

```jsx
// 클래스 선언
class person {
    name; // 프로퍼티(혹은 속성(filed))
    age; // 프로퍼티(혹은 속성(filed))
    speak(); // 메소드
}

// 객체 생성
// 객체를 생성할 때는 클래스앞에 new라는 키워드를 사용한다.
const mike = new Person('mike', 20);
console.log(mike.name);
console.log(mike.age);
```

- 자바스크립트에서 클래스는 ES6에서 소개 됨
    - 그 전에는 클래스를 정의하지 않고 객체를 정의해서 사용하는 방법
    - 객체를 만들 때 함수를 이용해서 템플릿(클래스 같은 역할)을 만드는 방법이 있었다
- 클래스
    - template, 즉 틀 같은 역할을 한다.
    - 한번만 선언한다.
    - 클래스 안에는 데이터가 없다.
    - 메모리에 올라가지 않는다.
- 객체
    - instanc of a class, 클래스의 인스턴스이다.
    - 1개의 클래스로 여러개의 객체를 만들수 있다.
    - 객체 안에는 데이터가 있다.
    - 메모리에 올라간다.

### 자바스크립트는 객체지향 언어라고 할 수 있을까?

✔️ 자바스크립트는 멀티-패러다임 언어로 *명령형(imperative), 함수형(functional), 프로토타입 기반(prototype-based) 객체지향 언어*다. 비록 다른 객체지향 언어들과의 차이점에 대한 논쟁들이 있긴 하지만, 자바스크립트는 강력한 객체지향 프로그래밍 능력들을 지니고 있다. 간혹 클래스가 없어서 객체지향이 아니라고 생각하는 사람들도 있으나 프로토타입 기반의 객체지향 언어다.

- 자바스크립트는 클래스 개념이 없고 별도의 객체 생성 방법이 존재한다
    - 객체 리터럴
    - Object() 생성자 함수
    - 생성자 함수
- 자바스크립트는 이미 생성된 인스턴스의 자료구조와 기능을 동적으로 변경할 수 있다는 특징이 있다. 객체 지향의 상속, 캡슐화(정보 은닉) 등의 개념은 프로토타입 체인과 클로저 등으로 구현할 수 있다.
- 클래스 기반 언어에 익숙한 프로그래머들은 이러한 프로토타입 기반의 특성으로 인해 혼란을 느낀다. 자바스크립트에서는 함수 객체로 많은 것을 할 수 있는데 클래스, 생성자, 메소드도 모두 함수로 구현이 가능하다

### 반복문 `for in` `for of`

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
    

## 기본형 변수 vs 참조형 변수

### 기본형 변수

- 값을 그대로 할당하는 자료형으로, `Number`, `String`, `Boolean`, `null`, `undefined`, `Symbol`(ES6에 추가, 객체 속성을 만드는 데이터 타입)
- 기본형의 변수는 특정 메모리의 주소를 가지고 해당 메모리에 값을 저장
    - 변수에 새로운 값을 대입하는 것은 값을 변경하는 것이 아닌 새로 덮어쓰는 행위

✔️ 기본형 데이터는 값을 그대로 할당하는 것. 메모리상에 고정된 크기로 저장되며 원시 데이터 값 자체를 보관하므로 불변적이다. 기본적으로는 같은 데이터는 하나의 메모리를 사용. (재사용)

### 참조형 변수

- 값이 저장된 주소값을 할당하는 자료형으로, 주로 객체가 이에 해당하며 대표적으로 ****`Array`, `Function`, `RegExp` , `Object` , `Date`
- 객체는 프로퍼티를 가지고 있는 데, 이러한 프로퍼티의 명과 주소를 매치하기 위해서 새로운 주소공간을 할당한다. 이후 각 프로퍼티의 값이 지정될 새로운 주소 공간을 할당하여 이를 각 프로퍼티 명에 매칭한다.
- 참조형 객체는 객체에 대한 정보는 어딘가 따로 저장하고 있으며 이에 대한 주소정보를 저장한다. 떄문에 서로 다른 변수에서 같은 객체를 가리키는 것이 가능

✔️ 값이 저장된 주소값을 할당. 비어있는 데이터 공간 확보하고, 객체 속 프로퍼티에 대한 공간을 다시 확보한다. 객체의 프로퍼티 명과 주소를 매칭하고 확보했던 두번째 주소에 데이터를 할당한다 

<aside>
💡 **얕은 복사 vs 깊은 복사**

✔️ 얕은 복사 : 참조(주소) 값을 복사, 주소를 복사해 오기 때문에 메모리를 공유. 하나의 객체(참조형)를 변경하면 두 개의 객체(참조형) 모두 값이 동일하게 변경된다

✔️ 깊은 복사 : 값을 복사한다. 즉, 주소 값 메모리에 깊이 들어가 값을 복사하는 느낌, 값을 복사해오기 때문에 독립적인 메모리에 값 할당 

또한, 변수는 기본형과 참조형이 있는데, 기본형은 값을 담고 있고 참조형은 값을 갖고 있는 메모리의 주소 값을 갖고 있다.
그래서 기본형은 얕은 복사를 한다고 하더라도 값 자체가 복사되기 때문에 의미가 없다! 즉, *기본형은 얕은, 깊은 복사의 의미가 없고 참조형만 의미가 있다.*

</aside>

## 일급 객체(first-class object)

### 일급객체란?

- 사용할 때 다른 요소들과 아무런 차별이 없다는 것을 뜻한다

### 일급 객체의 조건

- 모든 일급 객체는 변수나 데이터에 담을 수 있어야 한다
- 함수의 파라미터로 전달할 수 있어야 한다
- 함수의 리턴 값으로 사용할 수 있어야 한다

<aside>
💡 우리가 많이 사용하는 언어중 Javascript, Python이 일급객체 언어이고 c, pascal, c++가 아니라고 보면 된다. (Java는 람다로 지원)

그렇다고 이것이 뭐 좋고 나쁘고 이런 개념은 아니다. 다만 일급 객체의 특성은 특히 함수형 언어들에서 중요한 포인트가 된다.

</aside>

### 자바의 메소드와 자바스크립트 함수의 일급 객체

- 자바의 메소드도 결국은 함수인데 왜 이것을 일급 객체라고 부르지 않는 것인지, 자바스크립트의 함수는 왜 일급 객체인지?
1. 변수나 데이터에 담을 수 있어야 한다 
    1. 자바의 메소드는 변수에 할당할 순 없다
    2. 자바스크립트는 함수 표현식으로 자유롭게 대입 가능
    
    ```jsx
    // 자바
    public class Main {
    
        public static void hello(){
            System.out.println("Hello World");
        }
    
        public static void main(String[] args) {
    		Object a = hello; // !! 메서드를 변수에 할당 불가능
        }
    }
    
    // 자바스크립트
    const hello = function() {
    	console.log("Hello World");
    }
    ```
    

1. 함수의 파라미터로 전달할 수 있어야 한다.
    1. 자바의 메소드를 메소드 입력값으로 보내는 행위는 불가능하다 
    2. 자바스크립트는 콜백 함수 형태로 자유롭게 전달이 가능 
    
    ```jsx
    // 자바
    public class Main {
        public static void hello(){
            System.out.println("Hello World");
        }
        public static void print(Object func) {
        	func();
        }
        public static void main(String[] args) {
    		print((Object) hello) // !! static 메서드를 함수 매개변수로 전달 불가능
        }
    }
    
    // 자바스크립트
    const hello = function() {
    	console.log("Hello World");
    }
    
    function print(func) {
    	func();
    }
    
    print(hello);
    ```
    

1. 함수의 리턴값으로 사용할 수 있어야 한다.
    1. 자바의 메소드의 리턴값을 메소드 자체를 반환 행휘는 불가능하다.
    2. 자바스크립트는 클로저(Closure) 기법을 통해 구성할 수 있다.
    
    ```jsx
    const hello = function() {
    	console.log("Hello World");
        return function() {
        	console.log("Hello World 22");
        }
    }
    
    const hello2 = hello();
    hello2();
    ```
    

## 배열

### 자바의 배열과 자바스크립트의 배열의 차이점

- 자바의 배열
    - 동일한 크기의 메모리 공간이 빈틈없이 연속적으로 나열된 자료구조
    - 밀집 배열 (dense array)
- 자바스크립트의 배열
    - 배열이 아닌 객체. 더 정확하게는 일반적인 배열의 동작을 흉내낸 특수한 객체
    - JS의 배열은 요소를 위한 각각의 메모리 공간은 동일한 크기를 갖지 않아도 되며, 연속적으로 이어져 있지 않을 수도 있다.
    - 희소 배열(sparse array)
- 객체와 배열의 차이

| 구분 | 객체 | 배열 |
| --- | --- | --- |
| 구조 | 프로퍼티 키와 프로퍼티 값 | 인덱스와 요소 |
| 값의 참조 | 프로퍼티 키 | 인덱스 |
| 값의 순서 | X | O |
| length 프로퍼티 | X | O |

✔️ 가장 명확한 차이는 `값의 순서`와 `length 프로퍼티`

```jsx
console.log(Object.getOwnPropertyDescriptors([1, 2, 3]));
/*
{
  '0': { value: 1, writable: true, enumerable: true, configurable: true },
  '1': { value: 2, writable: true, enumerable: true, configurable: true },
  '2': { value: 3, writable: true, enumerable: true, configurable: true },
  length: { value: 3, writable: true, enumerable: false, configurable: false }
}
*/
```

- 위의 코드의 결과처럼 자바스크립트 배열은 인덱스를 나타내는 문자열을 프로퍼티 `key`
로 가지며, length 프로퍼티를 갖는 특수한 객체다.
    - 자바스크립트 배열의 요소는 사실 `value`값이다.
- 자바스크립트에서는 모든 값이 객체의 프로퍼티 값이 될 수 있으므로 어떠한 타입의 값이라도 배열의 요소가 될 수 있다
    - 일반적인 배열
        - 인덱스로 요소에 빠르게 접근 가능
        - 특정 요소를 검색하거나 삽입 또는 삭제의 경우 효율적이지 않음
    - 자바스크립트의 배열
        - 해시 테이블로 구현된 객체이므로 인덱스로 요소에 접근하는 경우 일반적인 배열보다 성능적으로 느림
        - 특정 요소를 검색하거나 삽입 또는 삭제하는 경우에는 일반적인 배열보다 성능적으로 빠름

### `length` 프로퍼티와 희소배열

- length 프로퍼티는 배열의 길이를 나타내는 0 이상의 정수 값
- length 프로퍼티에 임의의 값을 할당할 수도 있다
    - 아래 코드에 출력 결과에서 확인할 수 있는 empty items는 실제로 추가되지는 않는다. 현재 length 프로퍼티 값보다 큰 숫자를 할당하게 되면 length는 변경되지만 실제 배열에는 아무 변화가 없다.

```jsx
const arr = [1, 2, 3];
console.log(arr.length);  // 3

arr.push(4);
console.log(arr.length);  // 4

arr.pop();
console.log(arr.length); // 3

const arr = [1, 2, 3, 4, 5];

arr.length = 3;
console.log(arr); // [1, 2, 3]
const arr = [1, 2];

arr.length = 4;

console.log(arr.length); // 4
console.log(arr);  // [ 1, 2, <2 empty items> ]

console.log(Object.getOwnPropertyDescriptors(arr));
/*
{
  '0': { value: 1, writable: true, enumerable: true, configurable: true },
  '1': { value: 2, writable: true, enumerable: true, configurable: true },
  length: { value: 4, writable: true, enumerable: false, configurable: false }
}
*/
```

- 값이 없는 요소를 위해 메모리 공간을 확보하지 않음
    - 배열의 요소가 연속적으로 위치하고 일부가 비어있는 배열을 `희소배열`

### `Array.isArray()`

- 배열인지 확인
- 자바스크립트에서는 배열은 객체로 만들어져있기 때문에 보통 사용하는 `typeof` 로는 배열인지 알 수 없음

```jsx
const arr = [1, 2, 3];

console.log(typeof arr);  // object
console.log(Array.isArray(arr));  // true
```

### 내장 메소드

### `pop()`

- 배열의 마지막 요소 제거

```jsx
const a = [1,2,3,4,5];
  
a.pop();
console.log(a); // 출력: [1,2,3,4]
```

### `shift()`

- 배열의 첫번째 요소 제거

```jsx
const a = [1,2,3,4,5];
  
a.shift(); 
console.log(a); // 출력: [2,3,4,5]
```

### `push()`

- 배열의 마지막 요소에 추가

```jsx
const a = [1,2,3,4,5];
 
a.push(11);
console.log(a); // 출력: [1,2,3,4,5,11]
```

### `unshift()`

- 배열의 첫번째 요소에 추가

```jsx
const a = [1,2,3,4,5];
  
a.unshift(10);
console.log(a); // 출력: [10,1,2,3,4,5]
```

### `map()`

- callback 함수를 실행한 결과를 가지고 *새로운 배열을 만들 때 사용*
- 아래 예시 : square라는 callback 함수를 만들어 map을 통해 제곱된 수들로 배열을 반환

```jsx
const square = n => n * n;
const squared = array.map(square);
```

- 조금 더 간단하게 map 함수 안에 callback 함수 직접 선언

```jsx
const squred = array.map(n => n * n);
```

- 객체에 대해서 map 함수 사용

```jsx
const items = [
    {
        id: 1,
        text: 'hello'
    },
    {
        id: 2,
        text: 'bye'
    }
];

const texts = items.map(item => item.text);
console.log(texts);

// 출력
hello bye
```

![Untitled](Front-end%20Study%20day02%20%E2%9C%A8%2097ea55070bc54f43b32eec9d9bc70126/Untitled%201.png)

🏁 먼저 items.map 은 items 배열에서 한 개의 원소(객체)를 한개씩 차례로 불러온다. 불러온 객체를 map() 함수 내부 함수의 파라미터(item)로 받고 그 파라미터의 text를 추출해 texts라는 새로운 배열에 저장한다. 이 과정은 items의 모든 원소(객체)를 거칠 때까지 진행

### `forEach()`

- forEach 함수는 for문과 마찬가지로 반복적인 기능을 수행할 때 사용
- 하지만 for문처럼 index와 조건식, 증감 등을 정의하지 않아도 callback 함수를 통해 기능을 수행할 수 있다
- forEach 함수를 이용해 원소를 hero라는 파라미터로 받아 출력하는 방법

```jsx
const superHeros = ['아이언맨', '캡틴 아메리카', '토르', '닥터 스트레인지'];
function print(hero) {
    console.log(hero);
}

superHeros.forEach(print);

// 출력
아이언맨
캡틴 아메리카
토르
닥터 스트레인지 
```

- 아래 방법은 forEach 함수안에 직접 함수를 선언함으로써 간단하게 만드는 방법입니다. 출력값은 위의 출력값과 동일

```jsx
superHeros.forEach(function(hero) {
    console.log(hero);
});
```

- 아래 방법은 forEach 내부에 있던 함수 마저도 간략화한 arrow function(화살표 함수)으로 변경한 방법

```jsx
superHeros.forEach(hero => {
    console.log(hero);
});
```

### `splice()`

- 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 기존 배열의 내용을 변경하고 삭제한 데이터들을 배열로 반환

```jsx
const a = [1,2,3,4,5]; 
const b = a.splice(0,2); 

console.log(b); // 출력: [1,2]
console.log(a); // 출력: [3,4,5]
```

### `slice()`

- 시작할 인덱스와 끝나는 인덱스를 입력하면 배열을 잘라준다
- 배열의 원하는 시작점부터 원하는 마지막 시점까지 값에 대한 얕은 복사본을 새로운 배열 객체로 반환한다. 원본 배열은 바뀌지 않다.

```jsx
const arr6 = [1, 3, 4, 5, 612, 2];
console.log(arr6.slice(0, 2));

// 출력
1, 3
```

**🏁 `splice` `slice` 차이점**

- slice는 기존 배열을 변경하지 않지만, splice는 기존 배열이 변경
- slice는 배열에서 원하는 데이터만 추출하는 게 목적이지만, splice는 해당 배열을 원하는 데이터를 추가, 수정, 삭제가 목적
- slice는 두 번째 인자가 종료 인덱스이지만, splice는 두 번째 인자가 삭제 개수

### `concat`

- 다른 배열을 합쳐준다

```jsx
const arr7 = [1, 3, 4];
const arr8 = [11, 13];
 

console.log(arr7.concat(arr8));

// 출력
1, 3, 4, 11, 13
```

### `join`

- 배열의 내용을 문자 하나로 합쳐준다. " " 공백을 join 인풋 값으로 넣으면서 배열의 값 사이에 공백이 들어간 것을 확인할 수 있다

```jsx
const arr10 = ["프론트엔드", "과제", "많다"];
console.log(arr10.join(" "));

//출력
프론트엔드 과제 많다 
```

### `includes()`

- 배열이 특정 요소를 포함하고 있는지 판별
- `arr.includes(valueToFind[, fromIndex])`
    - valueToFind는 탐색할 요소, fromIndex는 어디서부터 검색을 시작할지 정하는 매개변수
        - 만약 fromIndex가 음수이면 전체 검색을 시작
        - fromIndex가 배열의 크기보다 크면 false 반

```jsx
const array1 = [1, 2, 3];

console.log(array1.includes(2));
// expected output: true

const pets = ['cat', 'dog', 'bat'];

console.log(pets.includes('cat'));
// expected output: true

console.log(pets.includes('at'));
// expected output: false
```

### `reverse()`

- 배열의 원소 순서를 반대로 만든다 (기존 배열의 순서를 바꿈)

```jsx
const arr = [1, 2, 3, 4, 5];

const reverse = arr.reverse();
console.log(arr);      // [5, 4, 3, 2, 1]
console.log(reverse);  // [5, 4, 3, 2, 1]
```

## 배열과 객체의 구조분해 및 구조분해할당(destructuring assignment)

### 구조분해할당이란?

- 배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 자바스크립트 표현식(expression)
- 간단하게 정리하면 배열 [], 혹은 객체 {} 안의 값을 편하게 꺼내 쓸 수 있는 문법

### 기본 문법 - 배열

```jsx
var [a1, a2, ...rest_a] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(a1); // 1
console.log(a2); // 2
console.log(rest_a); // [3, 4, 5, 6, 7, 8, 9]
```

- 좌항이 호출될 변수명 집합, 우항이 할당할 값
- 좌항의 각 요소에는 같은 index를 가지는 배열값이 할당
- 또한 전개 연산자( ... )를 사용하여 좌항에서 명시적으로 할당되지 않은 나머지 배열 값들을 사용할 수 있다
- 그리고 var, let, const를 사용해 변수들의 유효 범위를 명시적으로 선언할 수 있다

- 임의의 인덱스 값만 가져오기

```jsx
cons arr = [1,2,3,4,5];

const [x,y,,,z] = arr;

console.log(x); // 1
console.log(y); // 2
console.log(z); // 5
```

- 전개 연산자 이후 변수를 입력하거나 좌 우항이 다른 속성일 경우 에러 발생

```jsx
[a1, a2, ...rest_a, a3] = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // error
[a1, a2, ...rest_a] = {a1 : 10, a2: 20}; // error
```

### 기본 문법 - 객체

```jsx
var { a1, a2, ...rest_a } = { a1 : 10, a2 : 20, a3 : 30, a4 : 40 };

console.log(a1); // 10
console.log(a2); // 20
console.log(rest_a); // { a3: 30, a4: 40 }
```

- 객체의 경우에는 우항의 key 값이 좌항의 변수명과 매칭된다
- 배열과 마찬가지로 var, let, const가 적용 가능.

✔️ key이름 대신 다른 이름으로 변수명 사용하기

```jsx
var { a1 : awesome_name, a2 : dumb , ...rest_a } = { a1 : 10, a2 : 20, a3 : 30, a4 : 40 };

console.log(awesome_name); // 10
console.log(dumb); // 20
console.log(a1); // Error : a1 is not defined
```

- 나머지 값을 뜻하는 전개 연산자는 우항의 key에 영향을 받지 않기 때문에 rest_a : blah 와 같은 표현식은 무의미하며, 실제로 에러가 발생.
- 또한 우항의 key값에 변수명으로 사용 불가능한 문자열이 있을경우 아래와 같은 방식으로 구조분해 할 수 있다
- if is key 같은 경우 key값으로서는 문자열이니 상관없지만, 변수명으로서는 사용 못하기 때문

```jsx
var key = 'it is key'; //띄어쓰기 문자열 일경우 변수로 사용 못한다.
var { 'an-apple':apple, [key]:is_key } = { 'an-apple' : 10, 'it is key' : 20};

console.log(apple); // 10
console.log(is_key); // 20
```

- 중첩된 객체 꺼내오기

```jsx
const example = { a : 13, b : { C : 135, d : 146 } };

const { a, b : { d } } = example;

console.log(a); // 13
console.log(d); // 146
```

✔️ `this`가 있는 객체 메소드를 구조분해로 꺼내면 문제 발생!!

- 왜냐하면 구조분해는 객체값을 복사해서 넣는것이기 때문. 그래서 getCandy메서드 내용이 복사되어 구조분해 되니 그안의 this는 windows를 가리키게 된다

```jsx
var candyMachine = {
	status : {
    	name : 'node',
        count : 5,
    },
    getCandy() {
    	this.status.count--;
    	return this.status.count;
    }
}

candyMachine.getCandy();
var count = candyMachine.status.count;
console.log(count); // 5-- 되서 4가 된다.

var { getCandy, status: { count } } = candyMachine;
getCandy();
console.log(count); // 여전히 4가 된다.
```

### 구조분해할당에서 주의할 점

- 변수 선언에 대한 명시 (`var` , `let` , `const`) 가 없을 경우 괄호를 사용하여 묶어주어야 함

```jsx
({ a, b } = { a : 10, b : 20});
console.log(a); // 10
console.log(b); // 20

{ c, d } = { c : 30, d : 40}; // error
```