// export const ColoredMessage = () => {

// export const ColoredMessage = (props) => {

export const ColoredMessage = ({ color, children }) => {
  // Props 분할 대입
  // const { color, children } = props;

  const ContentStyle = {
    // color: "blue",
    // color: color, // props. 불필요
    color,
    fontSize: "20px"
  };

  // return <p style={ContentStyle}>{props.message}</p>
  return <p style={ContentStyle}>{children}</p>
}