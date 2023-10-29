import { ObserveDetailPage } from "./pages/ObserveDetailPage";
import { AccdientDetailPage } from "./pages/AccidentDetailPage";
import { useLocation } from "react-router-dom";

export const ObserveDetailPageFallback = () => {
  const location = useLocation();
  const observe = location.state;

  return <ObserveDetailPage observe={observe} />;
};

export const AccidentDetailPageFallback = () => {
  const location = useLocation();
  const accident = location.state;

  return <AccdientDetailPage accident={accident} />;
};
