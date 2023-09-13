import { keyframes } from "@emotion/react";

export const splashB = keyframes`
  0%, 30% {
    transform: rotate(-90deg);
    opacity:1;
  }
  40% {
    transform: rotate(0);
    opacity:1;
  }
  50% {
    opacity:1;
  }
  50.1% {
    opacity:0;
    display: none;
  }
  100% {
    opacity:0;
    display: none;
  }
`;

export const splashEye = keyframes`
  0%, 50.1% {
    display: none;
    opacity: 0;
  }
  70% {
    opacity:1;
  }
  100% {
    opacity:1;
  }
`;
