import { ReactElement } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { SnackbarProvider } from "notistack";
import dayjs from "dayjs";
import "dayjs/locale/ko";
// styles
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { GlobalStyles } from "./presentation/common/atoms/GlobalStyles";
import { snackbarOptions } from "./presentation/configs";
// layout
import Layout from "./presentation/layout/Layout";

dayjs.locale("ko");

export const App = (): ReactElement => {
  return (
    <StyledEngineProvider injectFirst>
      <SnackbarProvider {...snackbarOptions}>
        <Layout>
          <RouterProvider router={router} />
          <CssBaseline />
          <GlobalStyles />
        </Layout>
      </SnackbarProvider>
    </StyledEngineProvider>
  );
};
