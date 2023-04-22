// 예제 1
function greet(who: string){
    console.log('Hello', who);
}


// 예제 2
// 'tollppercase' 속성이 'string' 형식에 없습니다.
// ' toUpperCase' 을 (를) 사용하시겠습니까?
let city = 'new york city';
console.log(city.toUpperCase());


// 예제 3
// ------ 'capitol' 속성이 ... 형식에 없습니다.
// 'capital'을（를） 사용하시겠습니까?
const states = [
    {name: 'Alabama', capital: 'Montgomery'},
    {name: 'Alaska', capital: 'Juneau'},
    {name: 'Arizona', capital: 'Phoenix'}
];
for (const state of states){
    console.log(state.capital);
}

// 예제 4
// 출력값 : 23 , string 타입
const x = 2 + '3';
const y = '2' + 3;
console.log(x);
console.log(y);

// 예제5
const names = ['Alice', 'Bob'];
console.log(names[2].toUpperCase());