//@ts-nocheck
import styled from "@emotion/styled";

const DemoStyled = styled.div`
  outline: 1px solid green;
  color: ${(props) => {
    return props.primary ? props.theme.myColor : "darkblue";
  }};
`;

const Demo = ({ message, ...rest }) => {
  return <DemoStyled {...rest}>{message}</DemoStyled>;
};

const ThemeDemo = (props) => {
  return (
    <div>
      <Demo message="hello, world" />
      <br />
      <Demo message="foobarbaz (prop-driven styling)" primary />
    </div>
  );
};

export default ThemeDemo;
