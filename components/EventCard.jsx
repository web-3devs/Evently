import { Box, Text, Button, Img, Flex, Heading } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";

export default function EventCard() {
  return (
    <Box
      maxW="xs"
      bg="white"
      boxShadow="lg"
      rounded="lg"
      mt={10}
      mx={["unset", 4]}
      border="1px"
      _hover={{
        boxShadow: "6px 6px 0px black",
      }}
    >
      <Img
        h={48}
        w="full"
        fit="cover"
        mb={2}
        roundedTop="lg"
        src={"vercel.svg"}
        alt={""}
        borderBottom={"1px"}
      />
      <Box p={4}>
        <Flex mb={2} alignItems="center">
          <CalendarIcon />
          <Text fontSize={"md"} fontWeight="semibold" ml={2}>
            22 June 2022
          </Text>
        </Flex>
        <Heading color="gray.800" fontWeight="bold" fontSize="2xl">
          Event
        </Heading>
        <Text fontSize="sm" color="gray.600" noOfLines={3} textAlign="justify">
          The easiest way to deploy your Next.js app is to use the Vercel
          Platform
          https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme
          from the creators of Next.js.
        </Text>
        <Button
          my={4}
          w="full"
          colorScheme="white"
          color={"black"}
          border="1px"
          boxShadow="6px 6px 0px black"
          rounded={"sm"}
          size="md"
          cursor="pointer"
          _hover={{
            bg: "purple.600",
          }}
        >
          View more
        </Button>
      </Box>
    </Box>
  );
}
