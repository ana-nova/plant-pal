import { Player } from "@lottiefiles/react-lottie-player";
import Link from "next/link";
import styled, { keyframes, css } from "styled-components";
import WeatherIcon from "@/components/WeatherIcon";

function getAllWeatherDescription(code) {
  const weatherDescriptions = {
    0: "Clear sky",
    1: "Mostly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Heavy drizzle",
    56: "Light freezing drizzle",
    57: "Heavy freezing drizzle",
    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Light snowfall",
    73: "Moderate snowfall",
    75: "Heavy snowfall",
    77: "Snow grains",
    80: "Light rain showers",
    81: "Moderate rain showers",
    82: "Heavy rain showers",
    85: "Light snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with light hail",
    99: "Thunderstorm with heavy hail",
  };
  return weatherDescriptions[code] || "Unknown conditions";
}

const weatherAnimation = "/animation/weather.json";
const careTipAnimation = "/animation/caretip.json";
const fixedPlantAnimation = "/animation/plantgrowing.json";

export default function LandingPage({ weatherData }) {
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
            <WeatherHeaderContainer>
              <h2>Current Weather Of Your Location</h2>
              <p> {weatherData?.temperature}°C</p>
            </WeatherHeaderContainer>
            <HumdityWindContainer>
              <p>Humidity: {weatherData?.humidity}%</p>
              <p>Wind: {weatherData?.windspeed} km/h</p>
            </HumdityWindContainer>
            <WindWeatherContainer>
              <p>{getAllWeatherDescription(weatherData?.weathercode)}</p>
              <WeatherIcon weatherData={weatherData?.weathercode} />
            </WindWeatherContainer>
            <div>
              <PlayerWeatherCare
                autoplay
                loop
                src={weatherAnimation}
                aria-hidden="true"
              />
            </div>
          </StyledWeatherLink>
        </Weathercard>
      </Cardcontainer>
      <Cardcontainer>
        <Caretipcard>
          <div>
            <PlayerWeatherCare
              autoplay
              loop
              src={careTipAnimation}
              aria-hidden="true"
            />
          </div>
          Leaf it to us! Daily tips are budding ... 🪴
        </Caretipcard>
      </Cardcontainer>

      <FixedAnimation>
        <PlayerPlant
          autoplay
          loop
          src={fixedPlantAnimation}
          aria-hidden="true"
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
  display: flex;
  flex-direction: column;
`;

const FixedAnimation = styled.div`
  position: fixed;
  bottom: 50px;
  right: -35px;
  z-index: 100;
  pointer-events: none;
`;

const PlayerWeatherCare = styled(Player)`
  height: 100px;
  width: 100px;
`;

const PlayerPlant = styled(Player)`
  height: 150px;
  width: 150px;
`;

const WindWeatherContainer = styled.section`
  text-decoration: none;
  color: var(--color-text-primary);
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  padding: 20px;
  display: flex;
`;

const Temperature = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
`;

const WeatherHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

const HumdityWindContainer = styled.section`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;
