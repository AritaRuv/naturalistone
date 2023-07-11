import { radioAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(radioAnatomy.keys);


const variants = {
  checkbox: definePartsStyle({
    control: {
      borderRadius: 0,
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "blackAlpha.500",
      background: "white",

      _checked: {
        background: "orange",
        borderColor: "orange",

        _hover: {
          bg: "red",
          borderColor: "red"
        }
      },
      _hover: {
        bg: "orange.700",
        borderColor: "orange.700"
      }
    }
  })
};

// export the component theme
export const radioTheme = defineMultiStyleConfig({
  variants,
});