import React from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  font-size: 28px;
  margin-top: 20px;
`;

const LoadingAnimation = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const StretchBar = keyframes`
  0%,
  40%,
  100% {
    transform: none;
  }
  20% {
    transform: scale(1.5, 1.5);
  }
`;

const Bar = styled.span`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  display: inline-block;
  margin: 10px;
  animation: ${StretchBar};
  animation-delay: ${props => props.delay};
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
`;

export default () => (
  <Container>
    <LoadingAnimation>
      <Bar delay=".0s" />
      <Bar delay=".1s" />
      <Bar delay=".2s" />
      <Bar delay=".3s" />
      <Bar delay=".4s" />
    </LoadingAnimation>
  </Container>
);
