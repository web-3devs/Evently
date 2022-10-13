import { UserProvider } from "@auth0/nextjs-auth0";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </ChakraProvider>
  );
}

export default MyApp;
