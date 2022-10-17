import { useSelector } from 'react-redux'
import Hero from '../components/Hero'
import Events from './events'

export default function Home() {
	const user = useSelector((state) => state.userData)
	return user.authenticated ? <Events /> : <Hero />
}
