import { ReactElement } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// styles
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { GlobalStyles } from "./presentation/common/styles/GlobalStyles";
import {
  MuiDateCalendarOptions,
  snackbarOptions,
} from "./presentation/configs";
import theme from "./presentation/common/styles/theme";
// layout
import Layout from "./presentation/common/layout/Layout";

const queryClient = new QueryClient();

// if (import.meta.env.DEV) {
//   worker.start();
// }

export const App = (): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <SnackbarProvider {...snackbarOptions}>
            <LocalizationProvider {...MuiDateCalendarOptions}>
              <Layout>
                <RouterProvider router={router} />
                <CssBaseline />
                <GlobalStyles />
              </Layout>
            </LocalizationProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </StyledEngineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
