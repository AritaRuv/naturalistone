import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    logo: {
      grey: "#686868",
      orange: "rgb(227, 116, 37)"
    },
    site: {
      lightGrey: "#E5E4E3",
      lightBg: "#f2f2f2",
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
          },
          _disabled: {
            borderColor: "gray",
            borderWidth: "0.85px",
            borderRadius: "0",
            backgroundColor: "lightgray", // Cambiar el color de fondo cuando está deshabilitado
            color: "gray", // Cambiar el color del texto cuando está deshabilitado
            textDecoration: "line-through", // Agregar texto tachado
            cursor: "not-allowed", // Cambiar el cursor cuando está deshabilitado
          }
        },
      },
    },

  }
});

export default theme;

