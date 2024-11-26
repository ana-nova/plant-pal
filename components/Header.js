import Logo from "@/public/assets/logo.svg";
import styled from "styled-components";

export default function Header() {
  return (
    <StyledHeader>
      <StyledLog />
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  margin: 0px;
  padding: 0px;
  background-color: none;
`;

const StyledLog = styled(Logo)`
  margin-top: -30px;
`;
