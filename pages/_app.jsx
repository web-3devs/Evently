import { UserProvider } from '@auth0/nextjs-auth0'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import Layout from '../components/Layout'
import theme from '../styles/theme'
import store from '../context/store'
import { CloudinaryContext } from 'cloudinary-react'

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<UserProvider>
					<Layout bg={'yellow'}>
						<CloudinaryContext cloudName='djkwixcg8'>
							<Component {...pageProps} />
						</CloudinaryContext>
					</Layout>
				</UserProvider>
			</ChakraProvider>
		</Provider>
	)
}

export default MyApp
