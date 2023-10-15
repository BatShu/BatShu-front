import { Components, Theme } from "@mui/material";

export const drawerTheme: Components<Omit<Theme, "components">>["MuiDrawer"] = {
  defaultProps: {},
  styleOverrides: {
    root: ({ ownerState: { anchor } }) => {
      const getAlignItems = {
        left: "flex-start",
        right: "flex-end",
        top: "center",
        bottom: "center",
      };

      return {
        "&, > *": {
          maxWidth: "444px",
          margin: "0 auto",
        },
        "& > .MuiBackdrop-root": {
          maxWidth: "unset",
        },
        "> *:not(.MuiBackdrop-root)": {
          maxWidth: "inherit",
          width: "100%",
          backgroundColor: "transparent",
          display: "flex",
          alignItems: getAlignItems[anchor ?? "bottom"],
          left: "unset",
          right: "unset",
          boxShadow: "none",
        },
      };
    },
  },
};
