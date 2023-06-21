import { EditButton } from "./EditButton";

const style = {
  width: "300px",
  height: "200px",
  margin: "8px",
  borderRadius: "8px",
  backgroundColor: "pink",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
};

export const Card = props => {
  // props로 관리자 플래그를 받는다
  const { isAdmin } = props;

  return (
    <div style={style}>
      <p>김보연</p>
      <EditButton isAdmin={isAdmin} />
    </div>
  )
}