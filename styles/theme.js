import { switchAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, extendTheme } from "@chakra-ui/react";
const {
  definePartsStyle,
  defineMultiStyleConfig,
} = createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    border: "1px",
  },
  thumb: {
    bg: "black",
    borderRadius: "none",
  },
  track: {
    bg: "white",
    borderRadius: "sm",
    _checked: {
      bg: "transparent",
    },
  },
});
const switchTheme = defineMultiStyleConfig({ baseStyle });

const config = {
  defaultColorMode: "light",
  useSystemColorMode: false,
};

const fonts = {
  heading: "Syne",
  body: "Work sans",
};

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        scrollBehavior: "smooth",
        // backgroundColor: "#F5EFE6",
      },
      "&::-webkit-scrollbar": {
        width: "1",
        borderRadius: "8px",
        backgroundColor: "transparent",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "black",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "whitesmoke",
      },
    },
  },
  config,
  fonts,
  components: {
    Switch: switchTheme,
    Button: {
      baseStyle: {
        borderRadius: "sm",
      },
    },
  },
});

export default theme;
