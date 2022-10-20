import {
	Box,
	Container,
	Flex,
	Heading,
	Skeleton,
	SkeletonCircle,
	SkeletonText,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EventCard from '../components/EventCard'
import EventSkleton from '../components/EventSkleton'
import { allEvents } from '../context/slices/alleventsSlice'
export default function Events() {
	const [isLoading, setisLoading] = useState(true)
	const alleventsdata = useSelector((state) => state.allEvents)
	const dispatch = useDispatch()
	useEffect(() => {
		if (!alleventsdata) return
		getAllEvents().then((res) => {
			dispatch(allEvents(res))
			setisLoading(false)
		})
	}, [])
	console.log(alleventsdata)

	const getAllEvents = async () => {
		try {
			const fetchAllEvents = await fetch('/api/getallevents')
			const eventsdata = await fetchAllEvents.json()
			console.log(eventsdata)
			if (!fetchAllEvents.ok) return
			return eventsdata
		} catch (err) {
			setisLoading(true)
		}
	}

	return (
		<Container
			maxW={'container.xl'}
			p={0}
		>
			<Tabs
				isFitted
				variant='unstyled'
			>
				<TabList
					mt={12}
					maxW={'3xl'}
					mx={'auto'}
				>
					<Tab
						border={'1px'}
						_selected={{
							color: 'white',
							bg: 'purple.500',
							border: 0,
						}}
						roundedTopLeft={'md'}
						roundedBottomLeft={'md'}
					>
						Upcoming Events
					</Tab>
					<Tab
						border={'1px'}
						_selected={{
							color: 'white',
							bg: 'purple.500',
							border: 0,
						}}
						roundedTopRight={'md'}
						roundedBottomRight={'md'}
					>
						Previous Events
					</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<Flex
							flexWrap={'wrap'}
							justifyContent='center'
							pb={10}
						>
							{isLoading ? (
								<>
									<EventSkleton />
									<EventSkleton />
									<EventSkleton />
									<EventSkleton />
									<EventSkleton />
								</>
							) : (
								<>
									{alleventsdata.allEvents?.events?.map(
										(item, index) => {
											return (
												<EventCard
													index={index}
													name={item.name}
													desc={item.description}
													image={item.image}
													date={item.date_time}
													posted={item.created_at}
												/>
											)
										}
									)}
								</>
							)}
						</Flex>
					</TabPanel>
					<TabPanel>
						<Heading>Previous</Heading>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Container>
	)
}
