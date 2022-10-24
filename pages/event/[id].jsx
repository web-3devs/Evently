import {
	Box,
	Button,
	Container,
	Flex,
	Heading,
	HStack,
	Img,
	Text,
	useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import convertDate, { getTime } from '../../utils/formatDate'

export default function id() {
	const router = useRouter()
	const toast = useToast()
	const { id } = router.query
	const currentEvent = useSelector((state) => state.allEvents)
	const user = useSelector((state) => state.userData)
	const eventdata = currentEvent.allEvents[id]
	console.log(eventdata.participants)

	const [isRegistered, setIsRegistered] = useState(false)

	function checkForRegistered() {
		for (let i = 0; i < eventdata?.participants.length; i++) {
			if (eventdata?.participants[i].email === user.currentUser?.email)
				setIsRegistered(true)
		}
	}

	useEffect(() => {
		checkForRegistered()
	}, [])
	async function registerForEvent() {
		try {
			const body = {
				email: user.currentUser?.email,
				name: user.currentUser?.name,
				event_id: eventdata.id,
			}
			const addparticipent = await fetch('/api/addpartcipent', {
				method: 'post',
				headers: {
					'Content-type': 'application/json ',
				},
				body: JSON.stringify(body),
			})
			if (addparticipent.status === 406) {
				toast({
					title: 'You already registered for event',
					status: 'warning',
					position: 'top',
					duration: 3000,
					isClosable: true,
				})
			}
			if (addparticipent.ok) {
				toast({
					title: 'Succesfully registered for event',
					status: 'success',
					position: 'top',
					duration: 4000,
					isClosable: true,
				})
			}
		} catch (err) {
			console.log(err.name)
		}
	}

	return (
		<Container maxW={'container.xl'}>
			<Box mt={[6, 12]}>
				<Box h='72'>
					<Img
						src={eventdata?.image}
						w='full'
						h='full'
						objectFit={'contain'}
					/>
				</Box>
				<Flex
					px='4'
					py='12'
					justifyContent={'space-between'}
					flexWrap='wrap'
				>
					<Box w={'3xl'}>
						<Heading>{eventdata?.name}</Heading>
						<Text textAlign={'justify'}>
							{eventdata?.description}
						</Text>
						<Button
							my={6}
							px={8}
							colorScheme='white'
							color={'black'}
							border='1px'
							boxShadow='6px 6px 0px black'
							rounded={'sm'}
							size='lg'
							disabled={isRegistered}
							cursor='pointer'
							onClick={() => {
								registerForEvent()
							}}
							_hover={{
								bg: 'purple.600',
							}}
						>
							{isRegistered ? (
								<>Already Registered</>
							) : (
								<>Register now</>
							)}
						</Button>
					</Box>
					<Box
						w={'xs'}
						bg='white'
						ml={['unset']}
						rounded='lg'
						border='1px'
						boxShadow='6px 6px 0px black'
						p='4'
						h={'max-content'}
					>
						<Box
							py='2'
							borderBottom={'1px'}
						>
							<Heading fontSize={'2xl'}>OverView</Heading>
						</Box>
						<HStack mt={4}>
							<Box w='24'>
								<Text
									fontSize={'md'}
									fontWeight='semibold'
								>
									Type
								</Text>
							</Box>
							<Text fontSize={'md'}>Offline</Text>
						</HStack>
						<HStack mt={4}>
							<Box w='24'>
								<Text
									fontSize={'md'}
									fontWeight='semibold'
								>
									Date
								</Text>
							</Box>
							<Text fontSize={'md'}>
								{eventdata?.date_time
									? convertDate(eventdata?.date_time)
									: null}
							</Text>
						</HStack>
						<HStack mt={4}>
							<Box w='24'>
								<Text
									fontSize={'md'}
									fontWeight='semibold'
								>
									Time
								</Text>
							</Box>
							<Text fontSize={'md'}>
								{eventdata?.date_time
									? getTime(eventdata?.date_time)
									: null}
							</Text>
						</HStack>
						<HStack mt={4}>
							<Box w='24'>
								<Text
									fontSize={'md'}
									fontWeight='semibold'
								>
									Venue
								</Text>
							</Box>
							<Text fontSize={'md'}>Something</Text>
						</HStack>
					</Box>
				</Flex>
			</Box>
		</Container>
	)
}
