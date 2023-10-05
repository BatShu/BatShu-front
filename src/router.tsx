import { createBrowserRouter } from "react-router-dom";
import { HOME_PATH, SEARCH_PATH, WRITE_PATH } from "./domain/paths";
import { HomePage } from "./presentation/home";
import { SearchPage } from "./presentation/search";
import { WritePage } from "./presentation/write";

export const router = createBrowserRouter([
  {
    path: HOME_PATH,
    element: <HomePage />,
  },
  {
    path: SEARCH_PATH,
    element: <SearchPage />,
  },
  {
    path: WRITE_PATH,
    element: <WritePage />,
  },
]);
