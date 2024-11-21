import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { caretips } from "@/assets/caretips";

export default function RandomCareTips() {
  const [randomTip, setRandomTip] = useState("");

  function getRandomTip() {
    const randomIndex = Math.floor(Math.random() * caretips.length);
    return caretips[randomIndex].tip;
  }

  useEffect(function () {
    setRandomTip(getRandomTip());

    function updateTip() {
      setRandomTip(getRandomTip());
    }

    const interval = setInterval(updateTip, 20000);

    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  return (
    <TipContainer>
      <h2>{randomTip}</h2>
    </TipContainer>
  );
}

const TipContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: pink;
  width: 100%;
  height: 100%;
`;
