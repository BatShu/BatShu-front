import { createBrowserRouter } from "react-router-dom";
import { HOME_PATH } from "./domain/paths";
import { HomePage } from "./presentation/home/HomePage";

export const router = createBrowserRouter([
  {
    path: HOME_PATH,
    element: <HomePage />,
  },
]);
