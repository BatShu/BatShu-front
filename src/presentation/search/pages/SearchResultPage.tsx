import { useNavigate } from "react-router-dom";
import { Box, css } from "@mui/material";
// styles
import { pageContentStyles } from "@/presentation/common/styles/pageStyles";
// constants
import { HOME_PATH } from "@/domain/constants/paths";
// components
import SearchResultMap from "../components/SearchResultMap";
import HomeHeader from "@/presentation/home/components/HomeHeader";
import AppButton from "@/presentation/common/components/AppButton";

export const SearchResultPage = () => {
  const navigate = useNavigate();

  return (
    <Box css={styles.pageWrapper}>
      <SearchResultMap />

      <Box css={pageContentStyles}>
        <HomeHeader />

        <Box css={styles.bottomMenu}>
          <AppButton css={styles.button} onClick={() => navigate(HOME_PATH)}>
            홈으로
          </AppButton>
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  pageWrapper: css({
    position: "relative",
    height: "100vh",
  }),
  bottomMenu: css({
    position: "relative",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    "& > button": { pointerEvents: "auto" },
  }),
  button: css({
    position: "absolute",
    width: "100%",
    bottom: 28,
    left: 0,
    fontSize: "20px",
    color: "#fff",
  }),
};
