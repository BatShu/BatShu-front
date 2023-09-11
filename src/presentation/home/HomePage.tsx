import { ReactElement } from "react";
import { AppTextField } from "../common/components/AppTextField";
import { Box, InputAdornment, css } from "@mui/material";
import { ReactComponent as SearchIcon } from "@/presentation/common/icons/outlined/Search 1.svg";
import { AccidentToggleButton } from "./components/AccidentToggleButton";
import { AppIconButton } from "../common/components/AppIconButton";
import { ReactComponent as Situation1Icon } from "@/presentation/common/icons/outlined/Situation 1.svg";
import { AccidentButton } from "./components/AccidentButton";
import { ReactComponent as AddIcon } from "@/presentation/common/icons/outlined/Add.svg";
import { ReactComponent as MinusIcon } from "@/presentation/common/icons/outlined/Minus.svg";
import { AppBottomNavigationBar } from "../common/components/AppBottmNaviationBar";
import KakaoMap from "../common/temp/KakaoMap";
import { pageContentStyles } from "../common/styles/pageStyles";
import { SerializedStyles } from "@emotion/react";

export const HomePage = (): ReactElement => {
  return (
    <Box css={[styles.container, pageContentStyles]}>
      <KakaoMap />

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
        }}
      />

      <AccidentToggleButton />
      <AccidentButton />

      <AppIconButton size="medium">
        <Situation1Icon />
      </AppIconButton>
      <AppIconButton size="small">
        <AddIcon />
      </AppIconButton>
      <AppIconButton size="small">
        <MinusIcon />
      </AppIconButton>
      <AppBottomNavigationBar />
    </Box>
  );
};

const styles: { [key: string]: SerializedStyles } = {
  container: css({ position: "relative", height: "100vh" }),
};
