import { Player } from "@lottiefiles/react-lottie-player";
import Link from "next/link";
import styled, { keyframes, css } from "styled-components";

const weatherAnimation = "/animation/weather.json";
const careTipAnimation = "/animation/caretip.json";
const fixedPlantAnimation = "/animation/plantgrowing.json";

export default function LandingPage() {
  return (
    <>
      <Cardcontainer>
        <Card
          $animation={css`
            ${gradientMoveTopLeftToBottomRight}
          `}
        >
          <StyledLink href={"/create"}>
            <p>Create New Plant</p>
          </StyledLink>
        </Card>
        <Card
          $animation={css`
            ${gradientMoveTopToBottom}
          `}
        >
          <StyledLink href={"/plants/"}>
            <p>My Plant List</p>
          </StyledLink>
        </Card>
        <Card
          $animation={css`
            ${gradientMoveTopRightToBottomLeft}
          `}
        >
          <StyledLink href={"/favourites"}>
            <p>My Owned Plants</p>
          </StyledLink>
        </Card>
      </Cardcontainer>

      <Cardcontainer>
        <Weathercard>
          <StyledWeatherLink href={"/"}>
            Hold onto your leaves! Weather feature sprouting soon ... 🌤️
            <div>
              <Player
                autoplay
                loop
                src={weatherAnimation}
                style={{ height: "100px", width: "100px" }}
              />
            </div>
          </StyledWeatherLink>
        </Weathercard>
      </Cardcontainer>
      <Cardcontainer>
        <Caretipcard>
          <div>
            <Player
              autoplay
              loop
              src={careTipAnimation}
              style={{ height: "100px", width: "100px" }}
            />
          </div>
          Leaf it to us! Daily tips are budding ... 🪴
        </Caretipcard>
      </Cardcontainer>

      <FixedAnimation>
        <Player
          autoplay
          loop
          src={fixedPlantAnimation}
          style={{ height: "150px", width: "150px" }}
        />
      </FixedAnimation>
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
  display: flex;
  align-items: center;
  border-radius: 10px;
  background: linear-gradient(135deg, #b5cbb2, #1f3528);
  background-size: 200% 200%;
  animation: ${({ $animation }) => $animation} 6s ease infinite;
`;

const gradientMoveTopLeftToBottomRight = keyframes`
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
`;

const gradientMoveTopToBottom = keyframes`
  0% { background-position: 50% 0%; }
  50% { background-position: 50% 100%; }
  100% { background-position: 50% 0%; }
`;

const gradientMoveTopRightToBottomLeft = keyframes`
  0% { background-position: 100% 0%; }
  50% { background-position: 0% 100%; }
  100% { background-position: 100% 0%; }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
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
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const StyledWeatherLink = styled(Link)`
  text-decoration: none;
  color: var(--color-text-primary);
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px;
`;

const FixedAnimation = styled.div`
  position: fixed;
  bottom: 50px;
  right: -35px;
  z-index: 100;
  pointer-events: none;
`;
