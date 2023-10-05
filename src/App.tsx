import { ReactElement } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { worker } from "./mocks/browser";
// styles
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { GlobalStyles } from "./presentation/common/atoms/GlobalStyles";
import {
  MuiDateCalendarOptions,
  snackbarOptions,
} from "./presentation/configs";
// layout
import Layout from "./presentation/common/layout/Layout";

const queryClient = new QueryClient();

if (import.meta.env.DEV) {
  worker.start();
}

export const App = (): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <SnackbarProvider {...snackbarOptions}>
          <LocalizationProvider {...MuiDateCalendarOptions}>
            <Layout>
              <RouterProvider router={router} />
              <CssBaseline />
              <GlobalStyles />
            </Layout>
          </LocalizationProvider>
        </SnackbarProvider>
      </StyledEngineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
