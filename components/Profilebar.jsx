import { SmallCloseIcon } from '@chakra-ui/icons'
import {
	Avatar,
	AvatarBadge,
	Box,
	Button,
	Center,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	FormControl,
	Heading,
	IconButton,
	Input,
	Skeleton,
	Stack,
	Text,
	Textarea,
	useDisclosure,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentUser } from '../context/slices/userSlice'

export default function Profilebar() {
	const [editProfile, seteditProfile] = useState(false)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const user = useSelector((state) => state.userData)
	const drawer = useRef()
	const dispacth = useDispatch()
	const [data, setData] = useState({
		name: '',
		description: '',
		email: '',
	})
	const [event, setEvent] = useState({
		name: '',
		description: '',
		date_time: '',
		created_by: '',
		username: '',
	})

	const handleChange = (e) => {
		const key = e.target.name
		const value = e.target.value
		if (editProfile) {
			setData({ ...data, [key]: value })
		} else {
			setEvent({ ...event, [key]: value })
		}
	}

	const handleSubmit = async () => {
		if (editProfile) {
			data.email = user.currentUser?.email
			const update = await fetch('/api/updateprofile', {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(data),
			})
			const updatedData = await update.json()
			dispacth(currentUser(updatedData.user))
		} else {
			event.created_by = user.currentUser?.email;
			event.username = user.currentUser?.name;
			const addEvent = await fetch("/api/setevent", {
			  method: "POST",
			  headers: {
			    "Content-type": "application/json ",
			  },
			  body: JSON.stringify(event),
			});
			const eventData = await addEvent.json();
			console.log(eventData);
			// dispacth(currentUser(eventData));
			// let headersList = {
			// 	'Content-Type': 'application/json',
			// }

			// let bodyContent = JSON.stringify({
			// 	created_by: user.currentUser?.email,
			// 	name: event.name,
			// 	description:event.description,
			// 	username: user.currentUser?.name,
			// })

			// let response = await fetch('http://localhost:3000/api/setevent', {
			// 	method: 'POST',
			// 	body: bodyContent,
			// 	headers: headersList,
			// })

			// let data = await response.text()
			// console.log(data)

		}
	}

	return (
		<Flex
			flexDir={['column', 'column', 'row']}
			border={'1px'}
			rounded='md'
			py={4}
			px={[4, 10]}
			justifyContent='space-between'
			flexWrap={'wrap'}
			my={[6, 12]}
		>
			<Flex
				flexDir={['column', 'column', 'row']}
				alignItems='center'
			>
				<Avatar
					src={user.currentUser?.image}
					name={user.currentUser?.name}
					size={'xl'}
				/>
				<Box
					ml={['unset', 4]}
					mt={[4, 4, 'unset']}
				>
					<Heading
						fontSize={'2xl'}
						textAlign={['center', 'center', 'start']}
					>
						{user.currentUser?.name}
					</Heading>
					<Text textAlign={['center', 'center', 'start']}>
						{user.currentUser?.description}
					</Text>
				</Box>
			</Flex>
			<Stack
				mt={[4, 4, 'unset']}
				justifyContent='space-between'
			>
				<Button
					colorScheme='white'
					color={'black'}
					border='1px'
					boxShadow='6px 6px 0px black'
					rounded={'sm'}
					size='md'
					cursor='pointer'
					ref={drawer}
					onClick={() => {
						seteditProfile(true)
						onOpen()
					}}
				>
					Edit profile
				</Button>
				<Button
					colorScheme='white'
					color={'black'}
					border='1px'
					boxShadow='6px 6px 0px black'
					rounded={'sm'}
					size='md'
					cursor='pointer'
					ref={drawer}
					onClick={() => {
						seteditProfile(false)
						onOpen()
					}}
				>
					Add events
				</Button>
			</Stack>
			<Drawer
				isOpen={isOpen}
				placement='right'
				onClose={onClose}
				finalFocusRef={drawer}
				size={['full', 'xs']}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton
						bg={'transparent'}
						_hover={{
							border: '1px',
							rounded: 'sm',
						}}
						_focus={{
							bg: 'transparent',
						}}
					/>
					<DrawerHeader>
						{editProfile ? 'Edit Profile' : 'Add Event'}
					</DrawerHeader>
					<DrawerBody>
						{editProfile ? (
							<>
								<FormControl id='userName'>
									<Stack
										direction={['column', 'row']}
										spacing={6}
									>
										<Center>
											<Avatar
												size='xl'
												src={user.currentUser?.image}
											>
												<AvatarBadge
													as={IconButton}
													size='sm'
													rounded='full'
													top='-10px'
													colorScheme='red'
													aria-label='remove Image'
													icon={<SmallCloseIcon />}
												/>
											</Avatar>
										</Center>
										<Center w='full'>
											<Button
												colorScheme={'white'}
												border={'1px'}
												rounded='sm'
												color={'black'}
												w='full'
											>
												Change icon
											</Button>
										</Center>
									</Stack>
								</FormControl>
								<Stack
									spacing={5}
									mt={5}
								>
									<FormControl isRequired>
										<Input
											placeholder='Name'
											_placeholder={{ color: 'gray.500' }}
											type='text'
											border={'1px'}
											name='name'
											borderColor='black'
											rounded='sm'
											outline={'none'}
											onChange={handleChange}
										/>
									</FormControl>
									<FormControl isRequired>
										<Input
											placeholder='Description'
											_placeholder={{ color: 'gray.500' }}
											type='text'
											name='description'
											border={'1px'}
											borderColor='black'
											rounded='sm'
											onChange={handleChange}
										/>
									</FormControl>
								</Stack>
							</>
						) : (
							<Stack
								spacing={5}
								mt={5}
							>
								<Input
									placeholder='Name'
									_placeholder={{ color: 'gray.500' }}
									type='text'
									border={'1px'}
									borderColor='black'
									rounded='sm'
									name='name'
									onChange={handleChange}
								/>
								<Textarea
									placeholder='Description'
									_placeholder={{ color: 'gray.500' }}
									type='text'
									border={'1px'}
									borderColor='black'
									rounded='sm'
									name='description'
									onChange={handleChange}
								/>
								<Input
									placeholder='Select Date and Time'
									size='md'
									type='datetime-local'
									border={'1px'}
									borderColor='black'
									rounded='sm'
									name='date_time'
									onChange={handleChange}
								/>
							</Stack>
						)}
					</DrawerBody>

					<DrawerFooter>
						<Button
							colorScheme={'white'}
							border={'1px'}
							rounded='sm'
							color={'black'}
							mr={3}
							onClick={onClose}
						>
							Cancel
						</Button>
						<Button
							colorScheme={'white'}
							border={'1px'}
							rounded='sm'
							color={'black'}
							onClick={() => {
								handleSubmit()
								onClose()
							}}
						>
							Save
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</Flex>
	)
}