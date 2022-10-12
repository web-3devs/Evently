import { UserProvider } from "@auth0/nextjs-auth0";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
      <ChakraProvider>
        <UserProvider>
            <Component {...pageProps} />
        </UserProvider>
      </ChakraProvider>
  );
}

export default MyApp;
