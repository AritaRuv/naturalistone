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
    sampleItemCart: {
      gray: "#f4f4f4"
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
  },
  components: {
    Checkbox: {
      baseStyle: {
        control: {
          borderColor: "#686868",
          borderWidth: "0.85px",
          borderRadius: "0",
          _checked: {
            borderColor: "#686868",
            borderWidth: "0.85px",
            borderRadius: "0",
            _focus: {
              borderColor: "#686868",
              borderWidth: "0.85px",
              borderRadius: "0",
            },
            _hover: {
              borderColor: "#686868",
              borderWidth: "0.85px",
              borderRadius: "0",
            }
          },
          _hover: {
            borderColor: "#686868",
            borderWidth: "0.85px",
            borderRadius: "0",
          },
          _focus: {
            borderColor: "black",
            borderWidth: "0.85px",
            borderRadius: "0",
          }

        },
      },
    },
  },
});

export default theme;

