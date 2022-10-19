import { Box, Text, Button, Img, Flex, Heading } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import ShadowBtn from "./ShadowBtn";

export default function EventCard() {
  return (
    <Box
      maxW="xs"
      bg="white"
      rounded="lg"
      mt={10}
      mx={["unset", 4]}
      border="1px"
      boxShadow="6px 6px 0px purple"
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
          Platform The easiest way to deploy your Next.js app is to use the
          Vercel Platform
        </Text>
        <ShadowBtn
          title="View more"
          w={"full"}
          hoverBG={"purple.500"}
          animate
        />
      </Box>
    </Box>
  );
}
