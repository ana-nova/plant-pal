import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { caretips } from "@/assets/caretips";
import LightbulbIcon from "@/public/Icons/lightbulb.svg";
import Typewriter from "typewriter-effect";

export default function RandomCareTips() {
  const [randomTip, setRandomTip] = useState("");

  function getRandomTip() {
    const randomIndex = Math.floor(Math.random() * caretips.length);
    return caretips[randomIndex].tip;
  }

  useEffect(() => {
    setRandomTip(getRandomTip()); // Set the first tip

    const interval = setInterval(() => {
      setRandomTip(getRandomTip()); // Update to a new random tip every 10 seconds
    }, 23000); // 10 seconds for displaying the tip + 3 seconds delay

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <TipContainer>
      <IconContainer>
        <StyledIcon />
        <h3>Title</h3>
        {randomTip && (
          <Typewriter
            key={randomTip}
            onInit={(typewriter) => {
              typewriter
                .changeDelay(65)
                .typeString(randomTip) // Show the current random tip
                .start();
            }}
          />
        )}
      </IconContainer>
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

const IconContainer = styled.div`
  position: relative;
`;

const StyledIcon = styled(LightbulbIcon)`
  position: relative;
  float: right;
`;
