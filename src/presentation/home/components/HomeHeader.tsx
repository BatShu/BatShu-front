import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
// styles
import { Box, InputAdornment, IconButton, css } from "@mui/material";
// icons
import { ReactComponent as SearchIcon } from "@/presentation/common/icons/outlined/Search 1.svg";
// constants
import { SEARCH_PATH } from "@/domain/paths";
// components
import { AppTextField } from "@/presentation/common/components/AppTextField";

interface HomeHeaderProps {
  isBatshu: boolean;
  setIsBatshu: Dispatch<SetStateAction<boolean>>;
}

const HomeHeader = ({ isBatshu = true, setIsBatshu }: HomeHeaderProps) => {
  const navigate = useNavigate();

  return (
    <Box css={styles.topMenu}>
      <AppTextField
        placeholder={"무엇을 봣슈~?"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon
                css={css`
                  color: var(--icon-color);
                `}
              />
            </InputAdornment>
          ),
          readOnly: true,
        }}
        css={styles.input}
        onClick={() => navigate(SEARCH_PATH)}
      />

      <IconButton
        css={styles.icon(isBatshu)}
        onClick={() => {
          setIsBatshu((prev) => {
            enqueueSnackbar(`${!prev ? "목격" : "사고"}글을 보여드릴게요!`);
            return !prev;
          });
        }}
      >
        {isBatshu ? "B" : "N"}
      </IconButton>
    </Box>
  );
};
export default HomeHeader;

const styles = {
  topMenu: css({
    display: "flex",
    justifyContent: "space-between",
  }),
  input: css({
    width: "85%",
    height: "44px",
  }),
  icon: (isBatshu: boolean) =>
    css({
      display: "flex",
      width: 44,
      height: 44,
      justifyContent: "center",
      alignItems: "center",
      flexShrink: 0,
      fontWeight: 600,
      borderRadius: 8,
      color: isBatshu ? "#fff" : "#000",
      background: isBatshu ? "#000" : "#2FC1E1",
      boxShadow: "4px 4px 6px 0px rgba(75, 75, 75, 0.03)",
      "& .MuiTouchRipple-root span": {
        borderRadius: 8,
      },
      "&:hover": {
        background: isBatshu ? "#000" : "#2FC1E1",
      },
      zIndex: 1,
    }),
};
