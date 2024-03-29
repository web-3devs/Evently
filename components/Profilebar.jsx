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
  HStack,
  IconButton,
  Input,
  Stack,
  Switch,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewEvent, allEvents } from "../context/slices/alleventsSlice";
import { currentUser } from "../context/slices/userSlice";
import uploadImage from "../utils/uploadImage";

export default function Profilebar() {
  const [editProfile, seteditProfile] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector((state) => state.userData);
  const drawer = useRef();
  const dispacth = useDispatch();
  const toast = useToast();
  const [image, setImage] = useState(null);
  const [previewurl, setpreviewurl] = useState("");

  const [data, setData] = useState({
    name: "",
    description: "",
    user_id: "",
  });

  const [event, setEvent] = useState({
    name: "",
    description: "",
    date: null,
    image: "",
    user_id: "",
    type: "Offline",
    location: "",
  });

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    if (editProfile) {
      setData({ ...data, [key]: value });
    } else {
      setEvent({ ...event, [key]: value });
    }
  };

  const handleSubmit = async () => {
    if (editProfile) {
      data.user_id = user.currentUser?.id;
      const update = await fetch("https://www.evently.club/api/updateprofile", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const updatedData = await update.json();
      if (update.ok) {
        dispacth(currentUser(updatedData.user));
        toast({
          title: "Profile updated succesfully.",
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Some errored occured !",
          status: "error",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      event.user_id = user.currentUser?.id;
      const imageLink = await uploadImage(image);
      event.image = imageLink;
      const addEvent = await fetch("https://www.evently.club/api/setevent", {
        method: "POST",
        headers: {
          "Content-type": "application/json ",
        },
        body: JSON.stringify(event),
      });
      const eventData = await addEvent.json();
      console.log(eventData);
      if (addEvent.ok) {
        dispacth(addNewEvent(eventData.event));
        toast({
          title: "event added succesfully.",
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
        let headersList = {
          Accept: "*/*",
          "Content-Type": "application/json",
        };

        let bodyContent = JSON.stringify({
          event_id: eventData.event.id,
          email: user.currentUser?.email,
        });

        let response = await fetch("https://www.evently.club/api/generatecred", {
          method: "POST",
          body: bodyContent,
          headers: headersList,
        });

        let id_pass = await response.json();
        console.log(id_pass);
        let creddata = {
          sendTo: user.currentUser?.email,
          user_name: user.currentUser?.name,
          event_name: eventData.event.name,
          pass: id_pass.data.password,
        };
        let mailresponse = await fetch("https://www.evently.club/api/sendcred", {
          method: "POST",
          body: JSON.stringify(creddata),
          headers: headersList,
        });
        if (mailresponse.ok) {
          toast({
          title: "An email has been sent to your mail",
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
        }
        
      } else {
        toast({
          title: "Some errored occured !",
          status: "error",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

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
        <Avatar
          src={user.currentUser?.image}
          name={user.currentUser?.name}
          size={"xl"}
        />
        <Box ml={["unset", 4]} mt={[4, 4, "unset"]}>
          <Heading fontSize={"2xl"} textAlign={["center", "center", "start"]}>
            {user.currentUser?.name}
          </Heading>
          <Text textAlign={["center", "center", "start"]}>
            {user.currentUser?.description}
          </Text>
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
                      <Avatar
                        size="xl"
                        src={user.currentUser?.image}
                        name={user.currentUser?.name}
                      >
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
                      name="name"
                      borderColor="black"
                      rounded="sm"
                      outline={"none"}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <Input
                      placeholder="Description"
                      _placeholder={{ color: "gray.500" }}
                      type="text"
                      name="description"
                      border={"1px"}
                      borderColor="black"
                      rounded="sm"
                      onChange={handleChange}
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
                  name="name"
                  onChange={handleChange}
                />
                <Textarea
                  placeholder="Description"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  border={"1px"}
                  borderColor="black"
                  rounded="sm"
                  name="description"
                  onChange={handleChange}
                />
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                  border={"1px"}
                  borderColor="black"
                  rounded="sm"
                  name="date"
                  onChange={handleChange}
                />

                <Input
                  placeholder="Venue"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  border={"1px"}
                  borderColor="black"
                  rounded="sm"
                  name="location"
                  onChange={handleChange}
                />
                <HStack>
                  <Text color={event.type === "Offline" ? "black" : "gray.500"}>
                    Offline
                  </Text>
                  <Switch
                    colorScheme={"purple"}
                    size="md"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setEvent({
                          ...event,
                          ["type"]: "Online",
                        });
                      } else {
                        setEvent({
                          ...event,
                          ["type"]: "Offline",
                        });
                      }
                    }}
                  />
                  <Text color={event.type === "Online" ? "black" : "gray.500"}>
                    Online
                  </Text>
                </HStack>
                <Input
                  placeholder="Select Image event"
                  size={"md"}
                  type="file"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setpreviewurl(URL.createObjectURL(e.target.files[0]));
                  }}
                />
                {previewurl && (
                  <Image
                    src={previewurl}
                    width={"52"}
                    height={"200"}
                    alt="preview image"
                    style={{
                      marginBlock: 2,
                      borderRadius: 8,
                    }}
                  />
                )}
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
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
                onClose();
              }}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
