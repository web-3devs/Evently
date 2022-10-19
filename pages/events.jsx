import {
  Container,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventCard from "../components/EventCard";
import { allEvents } from "../context/slices/alleventsSlice";
export default function Events() {
  const alleventsdata = useSelector((state) => state.allEvents);
  const dispatch = useDispatch();
  // useEffect(() => {
  // 	getAllEvents()
  // }, [])

  const getAllEvents = async () => {
    const fetchAllEvents = await fetch("/api/getallevents");
    const eventsdata = await fetchAllEvents.json();
    console.log(eventsdata);
    if (!fetchAllEvents.ok) return;
    dispatch(allEvents(eventsdata));
    console.log(alleventsdata);
  };

  return (
    <Container maxW={"container.xl"} p={0}>
      <Tabs isFitted variant="unstyled" >
        <TabList mt={12} maxW={'3xl'} mx='auto' >
          <Tab
            border={"1px"}
            
            roundedTopLeft={"lg"}
            roundedBottomLeft={'md'}
            _selected={{ color: "white", bg: "purple.500", border: 0 }}
          >
            Upcoming Events
          </Tab>
          <Tab
            border={"1px"}
            roundedTopRight={"md"}
            roundedBottomRight={'md'}
            _selected={{ color: "white", bg: "purple.500", border: 0 }}
          >
            Previous Events
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex flexWrap={"wrap"} justifyContent="center" pb={10}>
              <EventCard />
              <EventCard />
              <EventCard />
              <EventCard />
              <EventCard />
              <EventCard />
            </Flex>
          </TabPanel>
          <TabPanel>
            <Heading>Previous</Heading>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
