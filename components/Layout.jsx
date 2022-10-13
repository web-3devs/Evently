import { useUser } from '@auth0/nextjs-auth0'
import Navbar from './Navbar'
import { useDispatch } from 'react-redux'
import { currentUser } from '../context/slices/userSlice'
import { useEffect } from 'react'

export default function Layout({ children }) {
	const { user, error, isLoading } = useUser()
	const dispatch = useDispatch()

	async function fetchData() {
		const data = await fetch('/api/setuser', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				name: user.name,
				email: user.email,
				image: user.picture,
			}),
		})
		console.log(data)
		const jsondata = await data.json()
		console.log(jsondata)
	}

	useEffect(() => {
		if (user) {
			// console.log(user)
			dispatch(currentUser(user))
			fetchData()
		}
	}, [dispatch, user])

	return (
		<>
			<Navbar />
			{children}
		</>
	)
}
