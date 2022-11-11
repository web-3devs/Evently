import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  Img,
  Box,
  Center,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Navbar from "../components/Navbar";
import Image from "next/image";

export default function Custom404() {
  const router = useRouter();
  return (
    <>
      <Box
        bgImage={"/Mesh.svg"}
        bgRepeat={"no-repeat"}
        s
        bgPosition={"top"}
        bgSize={"cover"}
        bgAttachment={"fixed"}
        minH="calc(100vh - 64px)"
      >
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <img src="/404.svg" />
          <Text fontSize={["2xl", null, "4xl"]} my={[2, 4, 6]} p={[4, null, 2]}>
            Looks like our development team has messed some thing...
          </Text>
          <Button
            colorScheme="white"
            color={"black"}
            border="1px"
            boxShadow="6px 6px 0px black"
            _hover={{
              boxShadow: "0px 0px 0px black",
            }}
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            rounded={"sm"}
            onClick={() => {
              router.push("/");
            }}
            w={{
              base: "48",
              sm: "auto",
            }}
            size="md"
            cursor="pointer"
          >
            Back to Home
          </Button>
        </Flex>
      </Box>
    </>
  );
}
