// button 태그 생성
// const buttonEl = document.createElement("button");

// 버튼 라벨 설정
// buttonEl.textContent = "버튼";

// // 영역 1의 div 태그 얻기
// const divEl = document.querySelector(".container");

// // div 태그 아래에 button 태그를 추가
// divEl.appendChild(buttonEl);

// // h1 태그 삭제
// const h1El = document.getElementById('title');

// // body 태그 얻기
// const bodyEl = document.querySelector("body");

// // body 태그 아래부터 삭제
// bodyEl.removeChild(h1El);

// bodyEl.textContent = null;


// 추가 버튼 클릭 시 실행하는 함수
const onClickAdd = () => {
  // 텍스트 박스의 엘리먼트를 얻는다
  const textEl = document.getElementById("add-text");

  // 텍스트 박스의 값을 얻는다.
  const text = textEl.value;

  // 텍스트 박스를 초기화한다(공백)
  textEl.value = '';

  const li = document.createElement('li');

  const div = document.createElement('div');

  const p = document.createElement('p');
  p.textContent = text;

  const button = document.createElement('button');
  button.textContent = "삭제";

  button.addEventListener('click', () => {
    // 삭제 대상 행(li)를 얻는다.
    // closest는 부모 요소와 일치하는 문자열을 찾는 메소드.
    const deleteTarget = button.closest('li');

    // ul 태그 아래에서 앞서 특정한 행을 삭제
    document.getElementById("memo-list").removeChild(deleteTarget);
  });

  div.appendChild(p);
  div.appendChild(button);

  li.appendChild(div);

  document.getElementById("memo-list").appendChild(li);
};

// 버튼 클릭 시 onClickAdd 함수를 실행하도록 등록
document
  .getElementById('add-button')
  .addEventListener('click', () => onClickAdd());
