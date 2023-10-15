import { createTheme } from "@mui/material/styles";
import { drawerTheme } from "./drawerTheme";

const theme = createTheme({
  components: { MuiDrawer: drawerTheme },
  typography: { fontFamily: "Pretendard" },
});

export default theme;
