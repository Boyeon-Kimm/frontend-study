import { css, jsx } from "@emotion/react"
import styled from "@emotion/styled";

export const Emotion = () => {

  // scss 와 동일하게 작성 가능
  const containerStyle = css`
    border: solid 1px #aaa;
    border-radius: 20px;
    padding: 8px;
    margin: 8px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  `;

  // 인라인 스타일 작성 방법
  const titleStyle = css({
    margin: 0,
    color: "#aaa"
  });


  return (
    <div css={containerStyle}>
      <p css={titleStyle}>Emotion 입니다</p>
      {/* <SButton>버튼</SButton> */}
      <button>버튼</button>
    </div>
  );
};

  // styled-components 작성 방법
  // const SButton = styled.button`
  //   background-color: #ddd;
  //   border: none;
  //   padding: 8px;
  //   border-radius: 8px;
  //   &:hover {
  //     background-color: #aaa;
  //     color: #fff;
  //     cursor: pointer;
  //   }
  // `;