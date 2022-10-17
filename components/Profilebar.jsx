import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  Heading,
  IconButton,
  Input,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function Profilebar() {
  const [editProfile, seteditProfile] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector((state) => state.userData);
  const drawer = useRef();

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
      <Stack mt={[4, 4, "unset"]} justifyContent="space-between">
        <Button
          colorScheme="white"
          color={"black"}
          border="1px"
          boxShadow="6px 6px 0px black"
          rounded={"sm"}
          size="md"
          cursor="pointer"
          ref={drawer}
          onClick={() => {
            seteditProfile(true);
            onOpen();
          }}
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
          ref={drawer}
          onClick={() => {
            seteditProfile(false);
            onOpen();
          }}
        >
          Add events
        </Button>
      </Stack>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={drawer}
        size={["full", "xs"]}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton
            bg={"transparent"}
            _hover={{
              border: "1px",
              rounded: "sm",
            }}
            _focus={{
              bg: "transparent",
            }}
          />
          <DrawerHeader>
            {editProfile ? "Edit Profile" : "Add Event"}
          </DrawerHeader>
          <DrawerBody>
            {editProfile ? (
              <>
                <FormControl id="userName">
                  <Stack direction={["column", "row"]} spacing={6}>
                    <Center>
                      <Avatar size="xl" src={user.currentUser?.image}>
                        <AvatarBadge
                          as={IconButton}
                          size="sm"
                          rounded="full"
                          top="-10px"
                          colorScheme="red"
                          aria-label="remove Image"
                          icon={<SmallCloseIcon />}
                        />
                      </Avatar>
                    </Center>
                    <Center w="full">
                      <Button
                        colorScheme={"white"}
                        border={"1px"}
                        rounded="sm"
                        color={"black"}
                        w="full"
                      >
                        Change icon
                      </Button>
                    </Center>
                  </Stack>
                </FormControl>
                <Stack spacing={5} mt={5}>
                  <FormControl isRequired>
                    <Input
                      placeholder="Name"
                      _placeholder={{ color: "gray.500" }}
                      type="text"
                      border={"1px"}
                      borderColor="black"
                      rounded="sm"
                      outline={"none"}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <Input
                      placeholder="Description"
                      _placeholder={{ color: "gray.500" }}
                      type="text"
                      border={"1px"}
                      borderColor="black"
                      rounded="sm"
                    />
                  </FormControl>
                </Stack>
              </>
            ) : (
              <Stack spacing={5} mt={5}>
                <Input
                  placeholder="Name"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  border={"1px"}
                  borderColor="black"
                  rounded="sm"
                />
                <Textarea
                  placeholder="Description"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  border={"1px"}
                  borderColor="black"
                  rounded="sm"
                />
              </Stack>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button
              colorScheme={"white"}
              border={"1px"}
              rounded="sm"
              color={"black"}
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              colorScheme={"white"}
              border={"1px"}
              rounded="sm"
              color={"black"}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
