import {
	Avatar,
	Button,
	Container,
	Flex,
	HStack,
	Text,
	VStack,
} from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
	const user = useSelector((state) => state.userData)
	return (
		<Container
			maxW={'container.lg'}
			p={'6'}
		>
			<HStack
				alignItems={'center'}
				justifyContent={'space-around'}
			>
				<Avatar
					src={user?.currentUser?.picture}
					size={36}
				/>
				<Text
					mr='4'
					fontSize={'2xl'}
					fontWeight={'medium'}
				>
					Welcome {user?.currentUser?.name}
				</Text>
				<Button
					title='Sign Out'
					justifySelf={'flex-end'}
				>
					Sign Out
				</Button>
			</HStack>
			<VStack
				p={10}
				my={4}
			>
				<Text
					fontSize={'2xl'}
					fontWeight={'medium'}
				>
					Attanded Events :
				</Text>
				<Text>You have not attened any event on Evently</Text>
			</VStack>
		</Container>
	)
}
