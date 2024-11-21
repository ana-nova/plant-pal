import styled from "styled-components";
import { getWeatherDescription } from "@/utils/getweatherdeatails";

export default function WeatherModal({ onClose, code }) {
  const alertWeatherCodes = [55, 56, 57, 65, 67, 75, 77, 82, 86, 95, 96, 99];
  const isAlertCondition = alertWeatherCodes.includes(code);

  return (
    <ModalContainer onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>Weather Alert</h2>
        <p>
          {code
            ? getWeatherDescription(code)
            : "Something went wrong, hold onto your leaves"}
        </p>

        {isAlertCondition && <WeatherAlertIcon />}

        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalContainer>
  );
}

const WeatherAlertIcon = styled.div`
  width: 50px;
  height: 50px;
  background: url("/icons/weather-alert.png") no-repeat center center;
  background-size: contain;
  margin: 10px auto;
`;

const ModalContainer = styled.div`
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
  display: flex;
  justify-content: center;
  position: relative;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.button`
  margin-top: 10px;
  background-color: var(--color-button-cancel);
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
`;
