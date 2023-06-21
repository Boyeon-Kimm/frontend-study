import { useState, memo } from "react";
import { Child1 } from "./components/Child1";
import { Child4 } from "./components/Child4";
import { useCallback } from "react";

export const App = memo(() => {
  console.log("App 렌더링");

  const [num, setNum] = useState(0);

  const onClickButton = () => {
    setNum(num + 1);
  }

  // const onClickReset = () => {
  //   setNum(0);
  // };

  const onClickReset = useCallback(() => {
    setNum(0);
  }, []);

  return (
    <>
      <button onClick={onClickButton}>버튼</button>
      <p>{num}</p>
      {/* <Child1 /> */}
      <Child1 onClickReset={onClickReset} />
      <Child4 />
    </>
  )
});