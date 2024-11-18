import Link from "next/link";
import styled from "styled-components";

export default function LandingPage() {
  return (
    <>
      <Cardcontainer>
        <Card>
          <StyledLink href={"/create"}>
            <p>Create New Plant</p>
          </StyledLink>
        </Card>
        <Card>
          <StyledLink href={"/plants/"}>
            <p>My Plant List</p>
          </StyledLink>
        </Card>
        <Card>
          <StyledLink href={"/favourites"}>
            <p>My Owned Plants</p>
          </StyledLink>
        </Card>
      </Cardcontainer>
      <Cardcontainer>
        <Weathercard>
          <StyledLink href={"/"}>Weather Data for Plants</StyledLink>
        </Weathercard>
      </Cardcontainer>
      <Cardcontainer>
        <Caretipcard>Care Tip of the Day</Caretipcard>
      </Cardcontainer>
    </>
  );
}

const Cardcontainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const Card = styled.article`
  width: 25%;
  text-align: center;
  height: 100px;
  justify-content: center;
`;

const Weathercard = styled.article`
  margin-top: 35px;
  width: 80%;
  height: 150px;
  justify-content: center;
`;

const Caretipcard = styled.article`
  margin-top: 35px;
  width: 80%;
  height: 150px;
  justify-content: center;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--color-text-primary);
`;
