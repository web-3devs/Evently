import { extendTheme } from "@chakra-ui/react";

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
        // backgroundColor: "orange.100"
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
});

export default theme;
