import { ThemeOptions } from "@mui/material";
import { defaultTheme } from "react-admin";

export const theme: ThemeOptions = {
  ...defaultTheme,
  components: {
    ...defaultTheme.components,

    // make "standard" the default variant, not "filled"
    MuiTextField: {
      ...defaultTheme.components.MuiTextField,
      defaultProps: {
        ...defaultTheme.components.MuiTextField.defaultProps,
        variant: "standard",
      },
    },
    MuiFormControl: {
      ...defaultTheme.components.MuiFormControl,
      defaultProps: {
        ...defaultTheme.components.MuiFormControl.defaultProps,
        variant: "standard",
      },
    },

    // make disabled inputs look more like fields
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            color: "rgba(0, 0, 0, 0.6)",
            cursor: "text",
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            color: "rgba(0, 0, 0, 0.87)",
          },
        },
        input: {
          "&.Mui-disabled": {
            WebkitTextFillColor: "unset",
            cursor: "text",
          },
        },
      },
    },
  },
};
