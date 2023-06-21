import { useContext } from "react";
// 작성한 Context를 import
import { AdminFlagContext } from "./providers/AdminFlagProvider";

const style = {
  width: "100px",
  padding: "6px",
  borderRadius: "8px"
}

export const EditButton = props => {
  // Context 안의 isAdmin을 얻는다
  const { isAdmin } = useContext(AdminFlagContext);

  // useContext의 인수에 참조할 Context를 지정
  // const contextValue = useContext(AdminFlagContext);
  // console.log(contextValue); // {sampleValue: "테스트"}

  // isAdmin이 false일 때(관리자가 아닐 때) 버튼을 비활성화 한다.
  return (
    <button style={style} disabled={!isAdmin}>
      수정
    </button>
  );
};