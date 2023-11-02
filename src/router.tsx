import { createBrowserRouter } from "react-router-dom";
import {
  SIGNUP_PATH,
  HOME_PATH,
  SEARCH_PATH,
  SEARCH_RESULT_PATH,
  WRITE_PATH,
  LOGIN_PATH,
  ACCIDENT_DETAIL_PATH,
  OBSERVE_DETAIL_PATH,
} from "./domain/constants/paths";
import { HomePage } from "./presentation/home";
import { SearchPage } from "./presentation/search";
import { SearchResultPage } from "./presentation/search/pages/SearchResultPage";
import { WritePage } from "./presentation/write";
import { SignUpPage } from "./presentation/auth/pages/SignUp";
import { LoginPage } from "./presentation/auth/pages/Login";
import { AuthProvider } from "./provider/AuthProvider";
import {
  AccidentDetailPageFallback,
  ObserveDetailPageFallback,
} from "./presentation/detail";

export const router = createBrowserRouter([
  {
    element: <AuthProvider />,
    children: [
      {
        path: HOME_PATH,
        element: <HomePage />,
      },
      {
        path: SEARCH_PATH,
        element: <SearchPage />,
      },
      {
        path: SEARCH_RESULT_PATH,
        element: <SearchResultPage />,
      },
      {
        path: WRITE_PATH,
        element: <WritePage />,
      },
      {
        path: SIGNUP_PATH,
        element: <SignUpPage />,
      },
      {
        path: LOGIN_PATH,
        element: <LoginPage />,
      },
      {
        path: ACCIDENT_DETAIL_PATH,
        element: <AccidentDetailPageFallback />,
      },
      {
        path: OBSERVE_DETAIL_PATH,
        element: <ObserveDetailPageFallback />,
      },
    ],
  },
]);
