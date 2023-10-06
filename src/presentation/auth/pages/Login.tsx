import { AppTextField } from "@/presentation/common/components/AppTextField";
import { css } from "@emotion/react";
import { Box, Button, InputAdornment } from "@mui/material";
import { ReactElement } from "react";
import { ReactComponent as LongLogo } from "@/presentation/common/icons/logo-long.svg";
import { useForm } from "react-hook-form";
import AppButton from "@/presentation/common/components/AppButton";
import { font16px600, font20px500 } from "@/presentation/common/styles/font";
import { ReactComponent as Profile1Icon } from "@/presentation/common/icons/outlined/Profile 1.svg";
import { ReactComponent as Lock2Icon } from "@/presentation/common/icons/outlined/Lock 2.svg";
import { ReactComponent as GoogleLogoIcon } from "@/presentation/common/icons/asset/google-logo.svg";
import { Link } from "react-router-dom";
import { SIGNUP_PATH } from "@/domain/paths";
import { useSignInWithGoogle } from "@/data/hooks/auth";
interface LoginForm {
  id: string;
  password: string;
}

const useLoginForm = () => {
  return useForm<LoginForm>();
};
export const LoginPage = (): ReactElement => {
  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useLoginForm();
  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };

  const { mutate: onGoogleLogin, isLoading: isGoogleLogining } =
    useSignInWithGoogle();

  return (
    <form css={styles.pageWrapper} onSubmit={handleSubmit(onSubmit)}>
      <Box css={styles.headerContainer}>
        <LongLogo />
      </Box>
      <Box css={styles.contentContainer}>
        <AppTextField
          type="text"
          css={styles.textField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Profile1Icon css={styles.icon} />
              </InputAdornment>
            ),
          }}
          placeholder="아이디를 입력해주세요"
          {...register("id", {
            required: true,
            minLength: 4,
          })}
        />
        <AppTextField
          type="password"
          css={styles.textField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock2Icon css={styles.icon} />
              </InputAdornment>
            ),
          }}
          placeholder="비밀번호를 입력해주세요"
          {...register("password", {
            required: true,
            minLength: 8,
          })}
        />
        <Button variant="text" css={styles.textButton}>
          비밀번호를 잊으셨나요?
        </Button>
        <AppButton
          css={[styles.button, styles.loginButton]}
          type="submit"
          disabled={!isValid}
        >
          로그인
        </AppButton>
        <Link to={SIGNUP_PATH} css={styles.link}>
          <AppButton css={styles.button}>회원가입</AppButton>
        </Link>
        <AppButton
          css={[styles.button, styles.googleLoginButton]}
          onClick={() => {
            onGoogleLogin();
          }}
          loading={isGoogleLogining}
        >
          <GoogleLogoIcon />
          구글로 로그인
        </AppButton>
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
  textField: css(
    {
      width: "100%",
    },
    font16px600
  ),
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
      maxWidth: "250px",
      "&:hover": {
        backgroundColor: "#eee",
      },
    },
    font20px500
  ),
  loginButton: css({
    backgroundColor: "#000",
    boxShadow: "4px 4px 6px 0px rgba(75, 75, 75, 0.03)",
    color: "#FFF",
    "&:hover": {
      backgroundColor: "#333",
    },
  }),
  googleLoginButton: css({
    gap: "22px",
  }),
  icon: css({
    width: "24px",
    height: "24px",
    color: "#7B7B7B",
  }),
  textButton: css({
    color: "#949494",
    textAlign: "right",
    fontFamily: "Pretendard",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
    letterSpacing: "-0.41px",
    textDecorationLine: "underline",
    marginBottom: "20px",
  }),
  link: css({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    textDecoration: "none",
  }),
};
