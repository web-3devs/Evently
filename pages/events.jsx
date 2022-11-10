import {
  Container,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/EventCard";
import EventSkleton from "../components/EventSkleton";

export default function Events() {
  const alleventsdata = useSelector((state) => state.allEvents);
  let pastEvents = [];
  let upcomigEvents = [];

  alleventsdata.allEvents?.map((event) => {
    let current_date = new Date();
    let event_date = new Date(event.date_time);
    event_date > current_date
      ? upcomigEvents.push(event)
      : pastEvents.push(event);
  });

  return (
    <Container maxW={"container.xl"} p={0}>
      <Tabs isFitted variant="unstyled">
        <TabList mt={12} maxW={"3xl"} mx={"auto"}>
          <Tab
            border={"1px"}
            _selected={{
              color: "white",
              bg: "purple.500",
              border: 0,
            }}
            roundedTopLeft={"sm"}
            roundedBottomLeft={"sm"}
          >
            Upcoming Events
          </Tab>
          <Tab
            border={"1px"}
            _selected={{
              color: "white",
              bg: "purple.500",
              border: 0,
            }}
            roundedTopRight={"sm"}
            roundedBottomRight={"sm"}
          >
            Previous Events
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex flexWrap={"wrap"} justifyContent="center" pb={10}>
              {!alleventsdata.allEvents ? (
                <>
                  <EventSkleton />
                  <EventSkleton />
                  <EventSkleton />
                  <EventSkleton />
                  <EventSkleton />
                  <EventSkleton />
                </>
              ) : (
                <>
                  {upcomigEvents?.map((item, index) => {
                    return (
                      <EventCard
                        key={item.id}
                        index={item.id}
                        name={item.name}
                        desc={item.description}
                        image={item.image}
                        date={item.date_time}
                        posted={item.created_at}
                        item={item}
                      />
                    );
                  })}
                </>
              )}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex flexWrap={"wrap"} justifyContent="center" pb={10}>
              {!alleventsdata.allEvents ? (
                <>
                  <EventSkleton />
                  <EventSkleton />
                  <EventSkleton />
                  <EventSkleton />
                  <EventSkleton />
                  <EventSkleton />
                </>
              ) : (
                <>
                  {pastEvents?.map((item, index) => {
                    return (
                      <EventCard
                        key={item.id}
                        index={item.id}
                        name={item.name}
                        desc={item.description}
                        image={item.image}
                        date={item.date_time}
                        posted={item.created_at}
                        isCompleted
                      />
                    );
                  })}
                </>
              )}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
