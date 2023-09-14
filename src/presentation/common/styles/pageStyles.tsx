import { css } from "@emotion/react";

export const pageContentStyles = css({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  padding: "20px 28px",
});

export const svgFill = css({
  "& svg, path, rect": {
    fill: "currentColor",
  },
});
