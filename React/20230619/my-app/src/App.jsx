import { CssModules } from "./components/CssModules";
import { StyledJsx } from "./components/StyledJsx";
import { Emotion } from "./components/Emotion";
import { TailwindCss } from "./components/TailwindCss";

export const App = () => {

  return (
    <>
      <CssModules />
      <StyledJsx />
      <Emotion />
      <TailwindCss />
    </>
  )

}