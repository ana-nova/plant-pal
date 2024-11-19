import styled from "styled-components";

function getWeatherDescription(code) {
  const weatherDescriptions = {
    61: "Light rain",
    3: "Overcast",
    55: "Heavy drizzle",
    56: "Light freezing drizzle",
    57: "Heavy freezing drizzle",
    65: "Heavy rain",
    67: "Heavy freezing rain",
    75: "Heavy snowfall",
    77: "Snow grains",
    82: "Heavy rain showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with light hail",
    99: "Thunderstorm with heavy hail",
  };

  return weatherDescriptions[code] || "Unknown conditions";
}
export default function WeatherModal({ onClose, code }) {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>Weather Alert</h2>
        <p>Weather Condition: {code ? getWeatherDescription(code) : "Upsi"}</p>

        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  position: relative;
`;

const CloseButton = styled.button`
  margin-top: 10px;
  background-color: var(--color-button-cancel);
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
