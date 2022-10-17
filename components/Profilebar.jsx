import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function Profilebar() {
  const user = useSelector((state) => state.userData);

  return (
    <Flex
      flexDir={["column", "column", "row"]}
      border={"1px"}
      rounded="md"
      py={4}
      px={[4, 10]}
      justifyContent="space-between"
      flexWrap={"wrap"}
      my={[6, 12]}
    >
      <Flex flexDir={["column", "column", "row"]} alignItems="center">
        <Avatar src={user.currentUser?.image} size={"xl"} />
        <Box ml={["unset", 4]} mt={[4, 4, "unset"]}>
          <Heading fontSize={"2xl"} textAlign={["center", "center", "start"]}>
            Harsh Sachaniya
          </Heading>
          <Text textAlign={["center", "center", "start"]}>Web Developer</Text>
        </Box>
      </Flex>
      <Stack mt={[4, 4, "unset"]}>
        <Button
          colorScheme="white"
          color={"black"}
          border="1px"
          boxShadow="6px 6px 0px black"
          rounded={"sm"}
          size="md"
          cursor="pointer"
        >
          Edit profile
        </Button>
        <Button
          colorScheme="white"
          color={"black"}
          border="1px"
          boxShadow="6px 6px 0px black"
          rounded={"sm"}
          size="md"
          cursor="pointer"
        >
          Add events
        </Button>
      </Stack>
    </Flex>
  );
}
