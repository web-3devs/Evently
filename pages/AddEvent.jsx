import React from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Img,
  Input,
  Stack,
  Switch,
} from "@chakra-ui/react";
import { useState } from "react";

function AddEvent() {
  const [isOffline, setisOffline] = useState(false);

  return (
    <Container minH={"100vh"} maxW={"4xl"}>
      <Box p={[0, 8]} border={"1px"} my={[4, 8]}>
        <Flex
          gap={[10, 20]}
          alignItems={["ceter", "center", "row"]}
          flexDirection={["column", "column", "row"]}
        >
          <Box
            boxShadow={["6px 6px 0 black", "24px 24px 0 black"]}
            bg="purple.500"
          >
            <Img
              src="https://res.cloudinary.com/djkwixcg8/image/upload/v1666601171/so38fubz7ku0xesa0znv.png"
              boxSize={"80"}
              minW={["unset", "unset", "80"]}
              objectFit={"contain"}
            />
          </Box>
          <Stack w="full" spacing={5} py={[0, 10]}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Name"
                _placeholder={{ color: "gray.500" }}
                type="text"
                border={"1px"}
                name="name"
                borderColor="black"
                rounded="sm"
                outline={"none"}
                w="full"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Date</FormLabel>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
                border={"1px"}
                borderColor="black"
                rounded="sm"
                name="date"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Venue</FormLabel>
              <Input
                placeholder={
                  isOffline ? "Enter an address" : "Enter a meeting link"
                }
                _placeholder={{ color: "gray.500" }}
                type="text"
                border={"1px"}
                name="name"
                borderColor="black"
                rounded="sm"
                outline={"none"}
                w="full"
              />
            </FormControl>
            <HStack>
              <Heading fontSize={"md"}>ONLINE</Heading>
              <Switch
                colorScheme={"purple"}
                size="md"
                onChange={() => {
                  setisOffline(!isOffline);
                }}
              />
              <Heading fontSize={"md"}>OFFLINE</Heading>
            </HStack>
            <Center w="full">
              <label
                htmlFor="event-image"
                style={{
                  backgroundColor: "transparent",
                  textAlign: "center",
                  width: "100%",
                  padding: "10px",
                  fontWeight: "500",
                  borderRadius: "2px",
                  marginTop: "18px",
                  color: "black",
                  cursor: "pointer",
                  border: "1px solid black",
                }}
              >
                Upload an image
              </label>
              <input
                type="file"
                id="event-image"
                style={{ display: "none" }}
                // onChange={(e) => {
                //   setEventImage(e.target.files[0]);
                //   setPreviewURL(URL.createObjectURL(e.target.files[0]));
                // }}
              />
            </Center>
          </Stack>
        </Flex>
        <Box mt={[5, 10]}>
          <Heading>Add event Details</Heading>
          <Box mt={[4, 8]}>Rich text editor</Box>
          <HStack spacing={5} mt={5}>
            <Button
              colorScheme={"white"}
              border={"1px"}
              rounded="sm"
              color={"black"}
              boxShadow={"4px 4px 0 black"}
            >
              Save
            </Button>
            <Button
              colorScheme={"white"}
              border={"1px"}
              rounded="sm"
              color={"black"}
              boxShadow={"4px 4px 0 black"}
            >
              Clear
            </Button>
          </HStack>
        </Box>
      </Box>
    </Container>
  );
}

export default AddEvent;
