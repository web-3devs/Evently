import {
	Container,
	Flex,
	Heading,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EventCard from '../components/EventCard'
import { allEvents } from '../context/slices/alleventsSlice'
export default function Events() {
	const alleventsdata = useSelector((state) => state.allEvents)
	const dispatch = useDispatch()
	useEffect(() => {
		if (!alleventsdata) return
		getAllEvents().then((res) => {
			dispatch(allEvents(res))
		})
	}, [])
	console.log(alleventsdata)

	const getAllEvents = async () => {
		const fetchAllEvents = await fetch('/api/getallevents')
		const eventsdata = await fetchAllEvents.json()
		console.log(eventsdata)
		if (!fetchAllEvents.ok) return
		return eventsdata
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
				<TabList mt={12}>
					<Tab
						border={'1px'}
						_selected={{ color: 'white', bg: 'black', border: 0 }}
					>
						Upcoming Events
					</Tab>
					<Tab
						border={'1px'}
						_selected={{ color: 'white', bg: 'black', border: 0 }}
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
