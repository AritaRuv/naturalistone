import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    logo: {
      gray: "#686868",
      orange: "rgb(227, 116, 37)"
    },
    site: {
      lightGrey: "#E5E4E3"
    },
    
    buttons: {
    }
  },
  fonts: {
    heading: "Roboto, sans-serif",
    body: "Roboto, sans-serif",
  },
  sizes: {
    menuButton: "0.4 rem",
  }
});

export default theme;

