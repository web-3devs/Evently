import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Img,
  Spinner,
  Text,
  useDisclosure,
  useToast,
  Avatar,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Select,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import convertDate, { getTime } from "../../utils/formatDate";

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default function EventDetail() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();
  const { id } = router.query;
  const events = useSelector((state) => state.allEvents);
  const user = useSelector((state) => state.userData);
  const allUser = user?.allUsers;
  const eventdata = events.allEvents?.find((project) => project.id === id);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [organizerName, setOrganizerName] = useState("");
  const [organizerImg, setOrganizerImg] = useState(null);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [data, setData] = useState({
    name: "",
    email: "",
    department: "",
    enrollmentno: "",
    course: "",
  });
  console.log('the data is ', data);
  if (router.isFallback) {
    return <Container>Loading</Container>;
  }

  function checkForRegistered() {
    for (let i = 0; i < eventdata?.participants.length; i++) {
      if (eventdata?.participants[i].email === user.currentUser?.email)
        setIsRegistered(true);
    }
  }
  async function register() {
    try {
      const body = {
        email: data?.email,
        name: data?.name,
        event_id: eventdata.id,
        department: data?.department,
        course: data?.course,
        enrollment: data?.enrollmentno,
      };
      const addparticipent = await fetch("/api/addnewparticipant", {
        method: "post",
        headers: {
          "Content-type": "application/json ",
        },
        body: JSON.stringify(body),
      });
      const p_data = await addparticipent.json();
      if (addparticipent.status === 406) {
        toast({
          title: "You already registered for event",
          status: "warning",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
      }
      if (addparticipent.ok) {
        toast({
          title: "Succesfully registered for event",
          status: "success",
          position: "top",
          duration: 4000,
          isClosable: true,
        });
    }
    } catch (error) {
      console.log(error.name);
      toast({
        title: "Something went wrong,Try again",
        status: "error",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
    }
  }
  function organizerInfo() {
    allUser?.map((user) => {
      if (user?.id == eventdata?.created_by) {
        setOrganizerName(user?.name);
        setOrganizerImg(user?.image);
      }
    });
  }
  useEffect(() => {
    checkForRegistered();
    organizerInfo();
  });

  async function registerForEvent() {
    if (!user.authenticated) {
      toast({
        title: "Please Login to register",
        status: "error",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    let date = new Date();
    let eventDate = new Date(eventdata.date_time);
    if (date > eventDate) {
      setIsDone((prev) => !prev);
    }

    try {
      setIsloading(true);
      const body = {
        email: user.currentUser?.email,
        name: user.currentUser?.name,
        event_id: eventdata.id,
      };
      const addparticipent = await fetch(
        "https://www.evently.club/api/addpartcipent",
        {
          method: "post",
          headers: {
            "Content-type": "application/json ",
          },
          body: JSON.stringify(body),
        }
      );
      const p_data = await addparticipent.json();
      if (addparticipent.status === 406) {
        toast({
          title: "You already registered for event",
          status: "warning",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
      }
      if (addparticipent.ok) {
        toast({
          title: "Succesfully registered for event",
          status: "success",
          position: "top",
          duration: 4000,
          isClosable: true,
        });
        let bodyoptions = {
          sendTo: user.currentUser?.email,
          user_name: user.currentUser?.name,
          participent_id: p_data.participent_data.id,
          event_name: eventdata?.name,
        };
        let mail = await fetch("https://www.evently.club/api/sendmail", {
          method: "POST",
          headers: {
            "Content-type": "application/json ",
          },
          body: JSON.stringify(bodyoptions),
        });
        if (mail.ok) {
          toast({
            title: "An Email has been sent to your mail",
            status: "success",
            position: "top",
            duration: 4000,
            isClosable: true,
          });
        }
      }
    } catch (err) {
      console.log(err.name);
      toast({
        title: "Something went wrong,Try again",
        status: "error",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsloading(false);
    }
  }

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setData({ ...data, [key]: value });
  };

  return (
    <Container maxW={"5xl"} p={0}>
      <Box mt={[6, 12]}>
        <Box w={"full"} h="52" bg={"purple.400"} borderTopRadius={"md"}>
          <Img
            src={eventdata?.image}
            w="full"
            h="full"
            objectFit={"contain"}
            display={["block", "none"]}
          />
        </Box>
        <Flex>
          <Box
            h="xs"
            w="sm"
            mt={"-36"}
            ml={8}
            bgColor={"#bdb2ff"}
            borderRadius={4}
            display={["none", "block"]}
          >
            <Img
              src={eventdata?.image}
              w="full"
              h="full"
              objectFit={"contain"}
            />
          </Box>
          <Box mt={8} ml={[4, 8]}>
            <Flex alignItems="center">
              <Img src={"/calendar.svg"} w={8} h={8} mr={2} />
              <Text fontSize={"lg"}>
                {eventdata?.date_time
                  ? convertDate(eventdata?.date_time)
                  : null}{" "}
                , {eventdata?.date_time ? "10:00 AM" : null}
              </Text>
            </Flex>
            <Flex mt={4} alignItems={"start"}>
              <Img src={"/locate.svg"} w={8} h={8} mr={2} />
              <Text fontSize={"lg"}>IT Seminar Hall, SVIT, Vasad</Text>
            </Flex>
          </Box>
        </Flex>
        <Flex
          px="4"
          py="12"
          justifyContent={"space-between"}
          flexDirection={["column", "column", "row"]}
        >
          <Box minW={["xs", "md"]} maxW={["xs", "xl", "lg"]}>
            <Text
              fontWeight={500}
              fontSize={"xl"}
              borderBottom={"4px"}
              borderColor={"purple.400"}
              w={"fit-content"}
            >
              Event Details
            </Text>
            <Heading fontWeight={"bold"} fontSize={"5xl"} mt={2}>
              {eventdata?.name}
            </Heading>
            <Text textAlign={"justify"} fontSize={["xl", "2xl"]} my={2}>
              {eventdata?.description}
            </Text>
            <Text fontSize={"md"}>Offline Event</Text>

            {isRegistered ? (
              <Button
                mb={8}
                mt={4}
                px={8}
                colorScheme="black"
                color={"black"}
                border="1px"
                boxShadow="6px 6px 0px black"
                rounded={"sm"}
                size="lg"
                disabled={isRegistered}
                cursor="pointer"
                bg={"purple.400"}
                onClick={() => {
                  registerForEvent();
                }}
                _hover={{
                  bg: "purple.200",
                }}
              >
                <>Already Registered</>
              </Button>
            ) : (
              <Button
                mb={8}
                px={8}
                mt={4}
                colorScheme="black"
                color={"black"}
                border="1px"
                boxShadow="6px 6px 0px black"
                rounded={"sm"}
                size="lg"
                disabled={isloading}
                cursor="pointer"
                onClick={() => {
                  // registerForEvent();
                  onOpen();
                }}
                _hover={{
                  bg: "purple.200",
                }}
                bg={"purple.400"}
              >
                {isloading ? (
                  <>
                    <Spinner
                      thickness="2px"
                      speed="0.75s"
                      emptyColor="gray.200"
                      color="white"
                      size="md"
                    />
                    <Text mx={2}>Registering...</Text>
                  </>
                ) : (
                  <>Register Now</>
                )}
              </Button>
            )}
            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Register for the event</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <Flex
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                    gap={4}
                  >
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
                        placeholder="Email"
                        _placeholder={{ color: "gray.500" }}
                        type="email"
                        border={"1px"}
                        name="email"
                        borderColor="black"
                        rounded="sm"
                        outline={"none"}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <Input
                        placeholder="Enrollment No."
                        _placeholder={{ color: "gray.500" }}
                        type="email"
                        border={"1px"}
                        name="enrollmentno"
                        borderColor="black"
                        rounded="sm"
                        outline={"none"}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <Select name="course" placeholder="Course" borderRadius={0} onChange={handleChange} border={"1px"} borderColor={"black"} >
                        <option value="Cyber Security">Cyber Security</option>
                        <option value="Mobile Development">Mobile Development</option>
                        <option value="Data Science">Data Science</option>
                      </Select>
                    </FormControl>
                    <FormControl isRequired>
                      <Select name="department" placeholder="Department" borderRadius={0} onChange={handleChange} border={"1px"} borderColor={"black"} >
                        <option value="IT">IT</option>
                        <option value="Computer">Computer</option>
                        <option value="MCA">MCA</option>
                      </Select>
                    </FormControl>
                  </Flex>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="black" bg={"purple.500"} mr={3} onClick={async()=>{await register()}} >
                    Register
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
          <Flex
            flexDirection={["column", "row", "column"]}
            justifyContent={["center", "space-between", "center"]}
          >
            <Box
              w={["full", "xs"]}
              bg="white"
              ml={["unset"]}
              rounded="lg"
              border="1px"
              borderColor={"purple.400"}
              p="4"
              h={"max-content"}
              textAlign={"left"}
            >
              <Box py="1">
                <Heading fontSize={"2xl"} py={2}>
                  Organizer
                </Heading>
                <Divider borderColor={"purple.400"} />
              </Box>
              <HStack>
                <Box w="14">
                  <Avatar size={"md"} src={organizerImg} name={organizerName} />
                </Box>
                <Text fontSize={"xl"} fontWeight={500}>
                  {organizerName}
                </Text>
              </HStack>
            </Box>
            <Box
              w={["full", "xs"]}
              bg="white"
              mt={[4, 0, 4]}
              ml={["unset"]}
              rounded="lg"
              border="1px"
              borderColor={"purple.400"}
              p="4"
              h={"max-content"}
              textAlign={"left"}
            >
              <Heading fontSize={"2xl"} py={2}>
                Share
              </Heading>
              <Divider />
              <Flex mt={4}>
                <Flex
                  height={10}
                  width={10}
                  border={"1px"}
                  borderColor={"black"}
                  boxShadow="3px 3px 0px black"
                  bgColor={"purple.400"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  mr={4}
                >
                  <a
                    rel="noopener noreferer"
                    target={"_blank"}
                    href={`https://twitter.com/compose/tweet/?text=I am attending ${eventdata?.name}, Don't forgot to register at Evetly\n Register now:https://evently-delta.vercel.app  `}
                  >
                    <Img src="/instagram.svg" height={6} width={6} />
                  </a>
                </Flex>
                <Flex
                  height={10}
                  width={10}
                  border={"1px"}
                  borderColor={"black"}
                  boxShadow="3px 3px 0px black"
                  bgColor={"purple.400"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  mr={4}
                >
                  <a>
                    <Img src="/linkedin.svg" height={6} width={6} />
                  </a>
                </Flex>
                <Flex
                  height={10}
                  width={10}
                  border={"1px"}
                  borderColor={"black"}
                  boxShadow="3px 3px 0px black"
                  bgColor={"purple.400"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  mr={4}
                >
                  <a>
                    <Img src="/whatsapp.svg" height={6} width={6} />
                  </a>
                </Flex>
                {/* <a><Img src='/linkedin.svg' height={44} width={44} /></a>
                <a><Img src='/whatsapp.svg' height={44} width={44} /></a> */}
              </Flex>
            </Box>
            {/* <Button
              cursor="pointer"
              onClick={onOpen}
              mt={4}
            >
              <HStack justifyContent={"center"} alignItems={"center"} gap={4}>
                <a
                  rel="noopener noreferer"
                  target={"_blank"}
                  href={`https://twitter.com/compose/tweet/?text=I am attending ${eventdata?.name}, Don't forgot to register at Evetly\n Register now:https://evently-delta.vercel.app  `}
                >
                  <Image
                    src="/twitter-logo.svg"
                    height={38}
                    width={38}
                    objectFit={"contain"}
                  />
                </a>
                <a
                  rel="noopener noreferer"
                  target={"_blank"}
                  href={`mailto:?subject=Attend ${eventdata?.name}&body=I am attending ${eventdata?.name}, Don't forgot to register at Evetly\n Register now:https://evently-delta.vercel.app `}
                >
                  <Image
                    src="/gmail.png"
                    height={35}
                    width={35}
                    objectFit={"contain"}
                  />
                </a>
                <a
                  rel="noopener noreferer"
                  target={"_blank"}
                  href={`whatsapp://send?text=I am attending ${eventdata?.name}, Don't forgot to register at Evetly\n Register now:https://evently-delta.vercel.app  `}
                  data-action="share/whatsapp/share"
                >
                  <Image
                    src="/WhatsApp.svg.png"
                    height={35}
                    width={35}
                    objectFit={"contain"}
                  />
                </a>
              </HStack>
            </Button> */}
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
}
