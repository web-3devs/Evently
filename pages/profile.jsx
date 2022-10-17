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
import React from "react";
import EventCard from "../components/EventCard";
import Profilebar from "../components/Profilebar";

export default function Profile() {
  return (
    <Container maxW={"container.xl"}>
      <Profilebar />
      <Tabs isFitted variant="unstyled" border={"1px"} rounded="md" mb={10}>
        <TabList>
          <Tab
            borderBottom={"1px"}
            roundedTopLeft="md"
            _selected={{ color: "white", bg: "black", borderBottom: 0 }}
          >
            Organized Events
          </Tab>
          <Tab
            borderBottom={"1px"}
            roundedTopRight="md"
            _selected={{ color: "white", bg: "black", borderBottom: 0 }}
          >
            Attened Events
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
            <Heading>Attened</Heading>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
