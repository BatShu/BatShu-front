import { css } from "@emotion/react";
import { ReactElement, useEffect, useRef } from "react";
import { ReactComponent as Left1 } from "@/presentation/common/icons/outlined/Left 1.svg";
import { pageContentStyles } from "@/presentation/common/styles/pageStyles";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { LOGIN_PATH } from "@/domain/paths";
import { AppTextField } from "@/presentation/common/components/AppTextField";
import { useForm } from "react-hook-form";
import AppButton from "@/presentation/common/components/AppButton";
import { auth } from "@/data/firebase";
import { enqueueSnackbar } from "notistack";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
interface SignUpFormProps {
  id: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  phoneNumber: string;
  isPhoneNumberVerified: boolean;
}

const useSignUpForm = () => {
  return useForm<SignUpFormProps>({
    mode: "onChange",
    reValidateMode: "onChange",
  });
};

export const SignUpPage = (): ReactElement => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    trigger,
  } = useSignUpForm();
  const onSubmit = (data: SignUpFormProps) => {
    console.log(data);
  };

  useEffect(() => {
    trigger("phoneNumber");
  }, [trigger]);
  const phoneNumber = watch("phoneNumber");
  const isPhoneNumberValid = errors.phoneNumber == null;
  const ref = useRef<HTMLDivElement | null>(null);
  const onPhoneVerify = async () => {
    if (!isPhoneNumberValid) {
      enqueueSnackbar("휴대폰 번호를 확인해주세요.", { variant: "error" });
      return;
    }
    if (ref.current == null) return;
    const globalNumber = `+82${phoneNumber.substring(1)}`;
    const recaptcha = new RecaptchaVerifier(auth, ref.current);
    signInWithPhoneNumber(auth, globalNumber, recaptcha)
      .then((confirmationResult) => {
        console.log(confirmationResult);
      })
      .catch(() => {
        // Error; SMS not sent
        // ...
      });
  };
  return (
    <form css={styles.pageWrapper} onSubmit={handleSubmit(onSubmit)}>
      <Box css={pageContentStyles}>
        <Box css={styles.topArea}>
          <Link to={LOGIN_PATH}>
            <IconButton css={styles.link}>
              <Left1 />
            </IconButton>
          </Link>
        </Box>

        <Box css={styles.content}>
          <Typography css={styles.title}>회원가입</Typography>
          <Box css={styles.formFieldContainer}>
            <Typography css={styles.formLabel}>아이디</Typography>
            <AppTextField
              placeholder="아이디를 입력해주세요."
              type="id"
              inputProps={{
                maxLength: 20,
              }}
              {...register("id", {
                required: true,
                minLength: 4,
                maxLength: 20,
              })}
            />
          </Box>
          <Box css={styles.formFieldContainer}>
            <Typography css={styles.formLabel}>비밀번호</Typography>
            <AppTextField
              placeholder="비밀번호를 입력해주세요."
              type="password"
              inputProps={{
                maxLength: 20,
              }}
              {...register("password", {
                required: true,
                minLength: 8,
                maxLength: 20,
              })}
            />
          </Box>
          <Box css={styles.formFieldContainer}>
            <Typography css={styles.formLabel}>이름</Typography>
            <AppTextField placeholder="이름을 입력해주세요." type="name" />
          </Box>
          <Box css={styles.formFieldContainer}>
            <Typography css={styles.formLabel}>휴대폰 번호</Typography>
            <Box css={styles.phoneContainer} ref={ref}>
              <AppTextField
                placeholder="휴대폰 번호를 입력해주세요(숫자만)"
                type="phone"
                css={css`
                  flex: 1;
                `}
                inputProps={{
                  maxLength: 11,
                  inputMode: "numeric",
                }}
                {...register("phoneNumber", {
                  required: true,
                  maxLength: 11,
                  minLength: 11,
                  pattern: /^010\d{8}$/,
                })}
              />
              <Button
                variant="outlined"
                css={styles.phoneButton}
                disabled={!isPhoneNumberValid}
                onClick={onPhoneVerify}
              >
                인증번호 전송
              </Button>
            </Box>
            <AppTextField placeholder="인증 번호를 입력해주세요." />
          </Box>
        </Box>
        <input
          hidden
          {...register("isPhoneNumberVerified", {
            required: true,
          })}
        />
        <AppButton type="submit" disabled={!isValid}>
          가입하기
        </AppButton>
      </Box>
    </form>
  );
};

const styles = {
  pageWrapper: css({
    position: "relative",
    height: "100vh",
    backgroundColor: "var(--background)",
  }),
  link: css({
    textDecoration: "none",
    color: "#000000",
  }),
  topArea: css({ display: "flex" }),
  content: css({
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "30px",
    gap: "20px",
  }),
  title: css({
    color: "#000",
    fontFamily: "Pretendard",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "normal",
    letterSpacing: "-0.48px",
    alignSelf: "center",
  }),
  formLabel: css({
    color: "#808080",
    fontFamily: "Pretendard",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "normal",
    letterSpacing: "-0.32px",
  }),
  formFieldContainer: css({
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%",
  }),
  phoneContainer: css({
    display: "flex",
    flexDirection: "row",
    gap: "8px",
    width: "100%",
  }),
  phoneButton: css({
    display: "inline-flex",
    padding: "8px 13px 7px 12px",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "16px",
    border: "1px solid #c0c0c0",
    background: "#FFF",
    color: "#666666",
    fontFamily: "Pretendard",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
    letterSpacing: "-0.28px",
  }),
};
