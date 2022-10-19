import { Center, Container, Heading } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import Profilebar from "../components/Profilebar";
import ProfileEvents from "../components/ProfileEvents";

export default function Profile() {
  const user = useSelector((state) => state.userData);

  return (
    <Container maxW={"container.xl"}>
      {user.authenticated ? (
        <>
          <Profilebar />
          <ProfileEvents />
        </>
      ) : (
        <Center minH="80vh">
          <Heading>Please login to see profile</Heading>
        </Center>
      )}
    </Container>
  );
}
