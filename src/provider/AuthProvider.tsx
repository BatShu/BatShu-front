import { HOME_PATH, LOGIN_PATH, SIGNUP_PATH } from "@/domain/constants/paths";
import { useAuthStore } from "@/store/authStore";
import { Backdrop, CircularProgress, css } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const AuthProvider = () => {
  const { fbUser: user, setUser, init } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user);
    if (!init) return;
    if (location.pathname === LOGIN_PATH || location.pathname === SIGNUP_PATH) {
      if (user == null) return;
      navigate(HOME_PATH, { replace: true });
      return;
    }
    if (user != null) return;
    navigate(LOGIN_PATH, { replace: true });
  }, [user, location, navigate, setUser, init]);

  return (
    <>
      <Outlet />
      <Backdrop open={!init} css={styles.backdrop}>
        <CircularProgress />
      </Backdrop>
    </>
  );
};

const styles = {
  backdrop: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
};
