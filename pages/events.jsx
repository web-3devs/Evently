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
import { useSelector } from "react-redux";
import EventCard from "../components/EventCard";
import EventSkleton from "../components/EventSkleton";

export default function Events() {
  const alleventsdata = useSelector((state) => state.allEvents);

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
                  {alleventsdata.allEvents?.map((item, index) => {
                    return (
                      <EventCard
                        key={item.id}
                        index={index}
                        name={item.name}
                        desc={item.description}
                        image={item.image}
                        date={item.date_time}
                        posted={item.created_at}
                      />
                    );
                  })}
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
  );
}
