import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { unset } from "lodash";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
  const currentEvent = useSelector((state) => state.allEvents);
  const user = useSelector((state) => state.userData);
  const eventdata = currentEvent.allEvents[id];
  const [isRegistered, setIsRegistered] = useState(false);
  const [isloading, setIsloading] = useState(false);

  if (router.isFallback) {
    return <Container>Loading</Container>;
  }

  function checkForRegistered() {
    for (let i = 0; i < eventdata?.participants.length; i++) {
      if (eventdata?.participants[i].email === user.currentUser?.email)
        setIsRegistered(true);
    }
  }

  useEffect(() => {
    checkForRegistered();
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

    try {
      setIsloading(true);
      const body = {
        email: user.currentUser?.email,
        name: user.currentUser?.name,
        event_id: eventdata.id,
      };
      const addparticipent = await fetch("/api/addpartcipent", {
        method: "post",
        headers: {
          "Content-type": "application/json ",
        },
        body: JSON.stringify(body),
      });
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
          event_name: eventdata?.name,
        };
        let mail = await fetch("/api/sendmail", {
          method: "POST",
          headers: {
          "Content-type": "application/json ",
        },
          body: JSON.stringify(bodyoptions),
        });
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

  return (
    <Container maxW={"container.xl"}>
      <Box mt={[6, 12]}>
        <Box h="72">
          <Img src={eventdata?.image} w="full" h="full" objectFit={"contain"} />
        </Box>
        <Flex px="4" py="12" justifyContent={"space-between"} flexWrap="wrap">
          <Box w={"3xl"}>
            <Heading>{eventdata?.name}</Heading>
            <Text textAlign={"justify"}>{eventdata?.description}</Text>
            {isRegistered ? (
              <Button
                my={6}
                px={8}
                colorScheme="white"
                color={"black"}
                border="1px"
                boxShadow="6px 6px 0px black"
                rounded={"sm"}
                size="lg"
                disabled={isRegistered}
                cursor="pointer"
                onClick={() => {
                  registerForEvent();
                }}
                _hover={{
                  bg: "purple.600",
                }}
              >
                <>Already Registered</>
              </Button>
            ) : (
              <Button
                my={6}
                px={8}
                colorScheme="white"
                color={"black"}
                border="1px"
                boxShadow="6px 6px 0px black"
                rounded={"sm"}
                size="lg"
                disabled={isloading}
                cursor="pointer"
                onClick={() => {
                  registerForEvent();
                }}
                _hover={{
                  bg: "purple.600",
                }}
              >
                {isloading ? (
                  <>
                    <Spinner
                      thickness="2px"
                      speed="0.75s"
                      emptyColor="gray.200"
                      color="black"
                      size="md"
                    />{" "}
                    <Text mx={2}>Registering...</Text>
                  </>
                ) : (
                  <>Register Now</>
                )}
              </Button>
            )}
            <Button
              my={6}
              mx={[0, null, 4]}
              width={["full", "auto"]}
              px={8}
              colorScheme="white"
              color={"black"}
              border="1px"
              boxShadow="3px 3px 0px black"
              rounded={"sm"}
              size="lg"
              cursor="pointer"
              onClick={onOpen}
            >
              <HStack justifyContent={"center"} alignItems={"center"} gap={4}>
                <Text>Share Via</Text>
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
              <Text fontSize={"md"}>
                {eventdata?.date_time
                  ? convertDate(eventdata?.date_time)
                  : null}
              </Text>
            </HStack>
            <HStack mt={4}>
              <Box w="24">
                <Text fontSize={"md"} fontWeight="semibold">
                  Time
                </Text>
              </Box>
              <Text fontSize={"md"}>
                {eventdata?.date_time ? getTime(eventdata?.date_time) : null}
              </Text>
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
      {/* <Box border={"1px"} rounded="sm" my={4}>
        <HStack justifyContent={"space-between"} px={[1, 5]}>
          <Heading>All Participents</Heading>
          <Heading>Total: {eventdata?.participants.length}</Heading>
        </HStack>
        <Box>
          <HStack
            w="full"
            justifyContent={"center"}
            borderBottom={"1px"}
            borderColor={"black"}
          >
            <Text flex={"0.3"} fontSize={["lg", "xl"]} fontWeight={"bold"}>
              Id
            </Text>
            <Text flex={"0.3"} fontSize={["lg", "xl"]} fontWeight={"bold"}>
              name
            </Text>
            <Text flex={"0.3"} fontSize={["lg", "xl"]} fontWeight={"bold"}>
              email
            </Text>
          </HStack>
          {eventdata?.participants.map((item, index) => (
            <ListItem id={index} name={item.name} email={item.email} />
          ))}
        </Box>
      </Box> */}
    </Container>
  );
}

const ListItem = ({ id, name, email }) => (
  <HStack w={"full"} justifyContent={"center"}>
    <Text
      flex={["0.1", "0.3"]}
      mx={1}
      fontSize={["sm", "xl"]}
      fontWeight={"bold"}
    >
      {id + 1}
    </Text>
    <Text flex={["1", "0.3"]} fontSize={["sm", "xl"]} fontWeight={"bold"}>
      {name}
    </Text>
    <Text flex={["1", "0.3"]} fontSize={["sm", "xl"]} fontWeight={"bold"}>
      {email}
    </Text>
  </HStack>
);
