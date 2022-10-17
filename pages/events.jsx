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
import EventCard from "../components/EventCard";

export default function Events() {
  return (
    <Container maxW={"container.xl"}>
      <Tabs isFitted variant="unstyled">
        <TabList mt={12}>
          <Tab
            border={"1px"}
            _selected={{ color: "white", bg: "black", border: 0 }}
          >
            Upcoming Events
          </Tab>
          <Tab
            border={"1px"}
            _selected={{ color: "white", bg: "black", border: 0 }}
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
