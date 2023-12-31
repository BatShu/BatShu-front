import { useState, useEffect } from "react";
// styles
import { Box } from "@mui/material";
import { css } from "@emotion/react";
import { splashB, splashEye } from "../styles/keyframes";
// icons
import { ReactComponent as B } from "@/presentation/common/icons/splash/B.svg";
import { ReactComponent as ATSHU } from "@/presentation/common/icons/splash/ATSHU.svg";
import { ReactComponent as Eye } from "@/presentation/common/icons/splash/Eye.svg";

const Splash = () => {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const hasShownSplash = sessionStorage.getItem("splashShown");

    if (hasShownSplash) {
      setShowSplash(false);
      return;
    }

    setShowSplash(true);
    setTimeout(() => {
      setShowSplash(false);
      sessionStorage.setItem("splashShown", "true");
    }, 2500);
  }, []);

  if (!showSplash) return null;

  return (
    <Box css={styles.container}>
      <B css={styles.B} />
      <Eye css={styles.Eye} />
      <ATSHU />
    </Box>
  );
};

export default Splash;

const styles = {
  container: css({
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
    backgroundColor: "#000",
    "& path": {
      fill: "#fff",
    },
  }),
  B: css({
    animation: `${splashB} 3s linear`,
  }),
  Eye: css({ animation: `${splashEye} 3s linear` }),
};
