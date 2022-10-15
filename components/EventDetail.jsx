import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Img,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

function EventDetail() {
  return (
    <Box mt={[6, 12]}>
      <Box h="72">
        <Img src="vercel.svg" w="full" h="full" />
      </Box>
      <Flex px="4" py="12" justifyContent={"space-between"} flexWrap="wrap">
        <Box w={"3xl"}>
          <Heading>Changing the way art is valued</Heading>
          <Text textAlign={"justify"}>
            The easiest way to deploy your Next.js app is to use the Vercel
            Platform The easiest way to deploy your Next.js app is to use the
            Vercel Platform The easiest way to deploy your Next.js app is to use
            the Vercel Platform The easiest way to deploy your Next.js app is to
            use the Vercel Platform The easiest way to deploy your Next.js app
            is to use the Vercel Platform The easiest way to deploy your Next.js
            Platform is to use the Vercel Platform The easiest way to deploy
          </Text>
          <Button
            my={6}
            px={8}
            colorScheme="white"
            color={"black"}
            border="1px"
            boxShadow="6px 6px 0px black"
            rounded={"sm"}
            size="lg"
            cursor="pointer"
            _hover={{
              bg: "purple.600",
            }}
          >
            Register now
          </Button>
        </Box>
        <Box
          w={"xs"}
          bg="white"
          ml={["unset"]}
          rounded="lg"
          border="1px"
          boxShadow="6px 6px 0px black"
          p="4"
          h={"max-content"}
        >
          <Box py="2" borderBottom={"1px"}>
            <Heading fontSize={"2xl"}>OverView</Heading>
          </Box>
          <HStack mt={4}>
            <Box w="24">
              <Text fontSize={"md"} fontWeight="semibold">
                Type
              </Text>
            </Box>
            <Text fontSize={"md"}>Offline</Text>
          </HStack>
          <HStack mt={4}>
            <Box w="24">
              <Text fontSize={"md"} fontWeight="semibold">
                Date
              </Text>
            </Box>
            <Text fontSize={"md"}>22 Jun 2022</Text>
          </HStack>
          <HStack mt={4}>
            <Box w="24">
              <Text fontSize={"md"} fontWeight="semibold">
                Time
              </Text>
            </Box>
            <Text fontSize={"md"}>10:30 PM</Text>
          </HStack>
          <HStack mt={4}>
            <Box w="24">
              <Text fontSize={"md"} fontWeight="semibold">
                Venue
              </Text>
            </Box>
            <Text fontSize={"md"}>Something</Text>
          </HStack>
        </Box>
      </Flex>
    </Box>
  );
}

export default EventDetail;
