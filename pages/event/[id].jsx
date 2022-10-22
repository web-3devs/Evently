import {
	Box,
	Button,
	Container,
	Flex,
	Heading,
	HStack,
	Img,
	Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import convertDate, { getTime } from '../../utils/formatDate'

export default function id() {
	const currentEvent = useSelector((state) => state.allEvents)
	const router = useRouter()
	const id = router.query
	const eventdata = currentEvent.allEvents[id?.id]
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
							cursor='pointer'
							_hover={{
								bg: 'purple.600',
							}}
						>
							Register now
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

