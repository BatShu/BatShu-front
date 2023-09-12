import { Box } from "@mui/material";

interface SpacerProps {
  x?: number;
  y?: number;
}

export default function Spacer({ x = 0, y = 0 }: SpacerProps) {
  return <Box marginLeft={`${x}px`} marginTop={`${y}px`} />;
}
