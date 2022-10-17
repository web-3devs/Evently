import { Container, Flex } from "@chakra-ui/react";
import EventCard from "../components/EventCard";
import EventDetail from "../components/EventDetail";

export default function Events() {
  return (
    <Container maxW={"container.xl"}>
      <Flex flexWrap={"wrap"} justifyContent="center" pb={10}>
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </Flex>
      <EventDetail />
    </Container>
  );
}
