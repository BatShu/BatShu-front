import { ReactElement } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { SnackbarProvider } from "notistack";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { worker } from "./mocks/browser";
// styles
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { GlobalStyles } from "./presentation/common/atoms/GlobalStyles";
import { snackbarOptions } from "./presentation/configs";
// layout
import Layout from "./presentation/layout/Layout";

const queryClient = new QueryClient();

if (import.meta.env.DEV) {
  worker.start();
}

dayjs.locale("ko");

export const App = (): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <SnackbarProvider {...snackbarOptions}>
          <Layout>
            <RouterProvider router={router} />
            <CssBaseline />
            <GlobalStyles />
          </Layout>
        </SnackbarProvider>
      </StyledEngineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
