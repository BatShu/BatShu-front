import { css } from "@emotion/react";
import { ReactElement } from "react";

interface SignUpFormProps {}

export const SignUpPage = (): ReactElement => {
  return <form css={styles.pageWrapper}></form>;
};

const styles = {
  pageWrapper: css({
    position: "relative",
    height: "100vh",
  }),
};
