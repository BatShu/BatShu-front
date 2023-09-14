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
    width:auto;
    height:auto;
  }
  50.1% {
    opacity:0;
    visibility: hidden;
    width:0;
    height:0;
  }
  100% {
    opacity:0;
    visibility: hidden;
    width:0;
    height:0;
  }
`;

export const splashEye = keyframes`
  0%, 50.1% {
    visibility: hidden;
    width:0;
    height:0;
    opacity: 0;
  }
  50.2%{
    width:auto;
    height:auto;
  }
  70% {
    opacity:1;
  }
  100% {
    opacity:1;
  }
`;
