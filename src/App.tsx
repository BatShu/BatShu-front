import { ReactElement } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { worker } from "./mocks/browser";
// styles
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { GlobalStyles } from "./presentation/common/atoms/GlobalStyles";
// layout
import Layout from "./presentation/layout/Layout";

const queryClient = new QueryClient();

if (import.meta.env.DEV) {
  worker.start();
}

export const App = (): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <Layout>
          <RouterProvider router={router} />
          <CssBaseline />
          <GlobalStyles />
        </Layout>
      </StyledEngineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
