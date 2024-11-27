import Logo from "@/public/assets/logo.svg";
import styled from "styled-components";

export default function Header() {
  return (
    <StyledHeader>
      <StyledLogo />
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  margin: 0px;
  padding: 0px;
  background-color: none;
`;

const StyledLogo = styled(Logo)`
  margin-top: -30px;
`;
