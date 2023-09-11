import { ReactNode } from "react";
// mui
import { Container } from "@mui/material";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container fixed disableGutters maxWidth="xs" sx={{ overflow: "hidden" }}>
      {children}
    </Container>
  );
};

export default Layout;
