import { SerializedStyles } from "@emotion/react";

export type CssObject = Record<
  string,
  SerializedStyles | ((param?: any) => SerializedStyles)
>;
