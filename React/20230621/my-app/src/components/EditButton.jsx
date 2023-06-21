const style = {
  width: "100px",
  padding: "6px",
  borderRadius: "8px"
}

export const EditButton = props => {
  const { isAdmin } = props;

  // isAdmin이 false일 때(관리자가 아닐 때) 버튼을 비활성화 한다.
  return (
    <button style={style} disabled={!isAdmin}>
      수정
    </button>
  );
};