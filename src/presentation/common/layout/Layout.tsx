import { ReactNode } from "react";
// mui
import { Container } from "@mui/material";
// hook
import useUserLocation from "@/hooks/useUserLocation";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useUserLocation();

  return (
    <Container
      fixed
      disableGutters
      maxWidth="xs"
      sx={{ overflow: "hidden", height: "100vh", bgcolor: "var(--background)" }}
    >
      {children}
    </Container>
  );
};

export default Layout;
