// 예제 1
function greet(who) {
    console.log('Hello', who);
}
// 예제 2
// 'tollppercase' 속성이 'string' 형식에 없습니다.
// ' toUpperCase' 을 (를) 사용하시겠습니까?
var city = 'new york city';
console.log(city.toUpperCase());
// 예제 3
// ------ 'capitol' 속성이 ... 형식에 없습니다.
// 'capital'을（를） 사용하시겠습니까?
var states = [
    { name: 'Alabama', capital: 'Montgomery' },
    { name: 'Alaska', capital: 'Juneau' },
    { name: 'Arizona', capital: 'Phoenix' }
];
for (var _i = 0, states_1 = states; _i < states_1.length; _i++) {
    var state = states_1[_i];
    console.log(state.capital);
}
// 예제 4
// 출력값 : 23 , string 타입
var x = 2 + '3';
var y = '2' + 3;
console.log(x);
console.log(y);
// 예제5
var names = ['Alice', 'Bob'];
console.log(names[2].toUpperCase());
