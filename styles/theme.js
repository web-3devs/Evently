import { extendTheme } from "@chakra-ui/react";

const config = {
  defaultColorMode: "dark",
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
      },
      "&::-webkit-scrollbar": {
        width: "1",
        borderRadius: "8px",
        backgroundColor: "transparent",
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: "5",
        backgroundColor: "white",
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
