import {
  Center,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import EventCard from "./EventCard";

export default function ProfileEvents() {
  const alleventsdata = useSelector((state) => state.allEvents);
  const user = useSelector((state) => state.userData);

  console.log(alleventsdata);

  return (
    <Tabs isFitted variant="unstyled" border={"1px"} rounded="md" mb={10}>
      <TabList>
        <Tab
          borderBottom={"1px"}
          roundedTopLeft="md"
          _selected={{
            color: "white",
            bg: "black",
            borderBottom: 0,
          }}
        >
          Organized Events
        </Tab>
        <Tab
          borderBottom={"1px"}
          roundedTopRight="md"
          _selected={{
            color: "white",
            bg: "black",
            borderBottom: 0,
          }}
        >
          Attened Events
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Flex flexWrap={"wrap"} justifyContent="center" pb={10}>
            {alleventsdata?.allEvents?.map((item, index) =>
              user.currentUser?.id === item.created_by ? (
                <EventCard
                  key={item.id}
                  index={index}
                  name={item.name}
                  desc={item.description}
                  image={item.image}
                  date={item.date_time}
                  posted={item.created_at}
                />
              ) : null
            )}
          </Flex>
        </TabPanel>
        <TabPanel>
          <Heading>Attened</Heading>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
