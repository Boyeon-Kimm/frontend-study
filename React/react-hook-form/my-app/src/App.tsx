import ReactDOM from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import "./App.css";

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

interface IFormInput {
  firstName: String;
  gender: GenderEnum;
}

export default function App() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="submitForm">
      <label>이름</label>
      <input {...register("firstName")} />
      <label>성별</label>
      <select {...register("gender")}>
        <option value="female">여자</option>
        <option value="male">남자</option>
        <option value="other">기타</option>
      </select>
      <input type="submit" className="btn" />
    </form>
  );
}
