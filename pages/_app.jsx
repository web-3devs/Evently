import { UserProvider } from "@auth0/nextjs-auth0";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import Layout from "../components/Layout";
import theme from "../styles/theme";
import store from "../context/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <UserProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
