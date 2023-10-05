import { AppTextField } from "@/presentation/common/components/AppTextField";
import { css } from "@emotion/react";
import { Box } from "@mui/material";
import { ReactElement } from "react";
import { ReactComponent as LongLogo } from "@/presentation/common/icons/logo-long.svg";
import { useForm } from "react-hook-form";
import AppButton from "@/presentation/common/components/AppButton";
import { font20px500 } from "@/presentation/common/styles/font";

interface LoginForm {
  id: string;
  password: string;
}

const useLoginForm = () => {
  return useForm<LoginForm>();
};
export const LoginPage = (): ReactElement => {
  const { handleSubmit } = useLoginForm();
  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };
  return (
    <form css={styles.pageWrapper} onSubmit={handleSubmit(onSubmit)}>
      <Box css={styles.headerContainer}>
        <LongLogo />
      </Box>
      <Box css={styles.contentContainer}>
        <AppTextField type="text" css={styles.textField} />
        <AppTextField type="password" css={styles.textField} />
        <AppButton css={[styles.button, styles.loginButton]}>로그인</AppButton>
        <AppButton css={styles.button}>회원가입</AppButton>
      </Box>
    </form>
  );
};

const styles = {
  pageWrapper: css({
    position: "relative",
    height: "100vh",
  }),
  headerContainer: css({
    backgroundColor: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "end",
    height: "353px",
    paddingBottom: "50px",
    width: "100%",
    borderRadius: "0 0 60% 60%",
  }),
  contentContainer: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    padding: "32px 45px",
    gap: "12px",
  }),
  textField: css({
    width: "100%",
  }),
  button: css(
    {
      width: "100%",
      display: "flex",
      padding: "13px 0px",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "30px",
      backgroundColor: "#FFF",
      color: "#7B7B7B",
    },
    font20px500
  ),
  loginButton: css({
    backgroundColor: "#000",
    boxShadow: "4px 4px 6px 0px rgba(75, 75, 75, 0.03)",
    color: "#FFF",
  }),
};
