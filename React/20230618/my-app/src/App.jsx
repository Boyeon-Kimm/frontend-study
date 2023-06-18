import { ColoredMessage } from "./components/ColoredMessage";
import { useState } from "react";
import { useEffect } from "react";

// const App = () => {
export const App = () => {
  // console.log("렌더링");

  // State 정의
  const [num, setNum] = useState(0);

  // 버튼 클릭 시 실행되는 함수 정의
  const onClickButton = () => {
    // alert();
    // setNum(num + 1);
    setNum((prev) => prev + 1);
  }

  // CSS 객체
  // const contentStyle= {
  //   color: "blue",
  //   fontSize: "20px"
  // }

  // 분홍색 용으로 추가
  // const contentPinkStyle = {
  //   color: "pink",
  //   fontSize: "20px"
  // }

  // useEffect(() => {
  //   alert();
  // }, [num]);

  return (
    <>
      {console.log("TEST")}
      <h1 style={{ color: "red" }}>안녕하세요!</h1>
      {/* <p style={contentStyle}>잘 지내시죠?</p> */}
      {/* <ColoredMessage /> */}
      {/* <ColoredMessage color="blue" message="잘 지내시죠?" /> */}
      <ColoredMessage color="blue">잘 지내시죠?</ColoredMessage>
      {/* <p style={contentPinkStyle}>잘 지냅니다!</p> */}
      {/* <ColoredMessage color="pink" message="잘 지냅니다!" /> */}
      <ColoredMessage color="pink">잘 지냅니다!</ColoredMessage>
      <button onClick={onClickButton}>버튼</button>
      <p>{num}</p>
    </>
  );
}