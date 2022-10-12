import { Container, Text } from '@chakra-ui/react'
import Head from 'next/head'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'

export default function Home() {
	return (
		<>
			<Navbar/>
			<Hero/>
		</>
	)
}
