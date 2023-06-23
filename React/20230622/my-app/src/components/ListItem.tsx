import type { FC } from "react";
import type { User } from "../types/user";

// type User = {
//   id: number;
//   name: string;
//   age: number;
//   personalColor: string;
// };

// export const ListItem = props => {
// export const ListItem = (props: User) => {
export const ListItem: FC<User> = props => {
  const { id, name, age, personalColor, hobbies } = props;
  // const { id, name, age, personalColor = "grey" } = props;
  return (
    // <p>
    <p style={{ color: personalColor }}>
      {/* {id} : {name}({age}) */}
      {id} : {name}({age}) {hobbies?.join("/")}
    </p>
  );
};

ListItem.defaultProps = {
  personalColor: "grey"
};