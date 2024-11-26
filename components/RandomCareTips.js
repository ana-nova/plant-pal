import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { caretips } from "@/assets/caretips";
import Typewriter from "typewriter-effect";

export default function RandomCareTips() {
  const [randomTip, setRandomTip] = useState("");

  function getRandomTip() {
    const randomIndex = Math.floor(Math.random() * caretips.length);
    return caretips[randomIndex].tip;
  }

  useEffect(() => {
    setRandomTip(getRandomTip());

    const interval = setInterval(() => {
      setRandomTip(getRandomTip());
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Caretipcard>
      <TipContainer>
        <Title>Your Plant Tip of the Day</Title>
        {randomTip && (
          <Typewriter
            key={randomTip}
            onInit={(typewriter) => {
              typewriter.changeDelay(65).typeString(randomTip).start();
            }}
          />
        )}
      </TipContainer>
    </Caretipcard>
  );
}

const Caretipcard = styled.article`
  margin-top: 35px;
  width: 80%;
  height: 200px;
  padding: 10px;
  display: flex;
  flex-direction: column; /* Stack content vertically */
  justify-content: flex-start; /* Ensure items are aligned at the top */
  align-items: center; /* Center items horizontally */
`;

const TipContainer = styled.section`
  display: flex;
  flex-direction: column; /* Stack content vertically */
  text-align: center;
  justify-content: flex-start; /* Align content at the top */
  align-items: center; /* Center horizontally */
  width: 100%;
`;

const Title = styled.h2`
  margin: 0;
  padding: 20px;
  text-align: center;
  position: relative; /* Keeps it in normal flow, but can be adjusted independently */
`;
