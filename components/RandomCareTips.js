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
    <TipContainer>
      <h2>Your Plant Tip of the Day</h2>

      {randomTip && (
        <Typewriter
          key={randomTip}
          onInit={(typewriter) => {
            typewriter.changeDelay(65).typeString(randomTip).start();
          }}
        />
      )}
    </TipContainer>
  );
}

const TipContainer = styled.section`
  display: flex;
  text-align: center;
  align-items: center;
  padding: 10px;
  flex-direction: column;
`;
