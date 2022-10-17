import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Container,
  Text,
  Heading,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function Navbar() {
  const user = useSelector((state) => state.userData);
  console.log(user);
  const router = useRouter();

  return (
    <Box px={4}>
      <Container maxW={"container.xl"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Button
            colorScheme="whiteAlpha"
            onClick={() => {
              router.push("/");
            }}
          >
            <Heading textColor={"black"}>Web3Devs</Heading>
          </Button>
          {user.authenticated ? (
            <Flex alignItems={"center"}>
              <Text mr="4" fontSize={"md"} fontWeight="medium">
                {user.currentUser?.name}
              </Text>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={user.currentUser?.image}
                    name={user.currentUser?.name}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      router.push("/profile");
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem
                    onClick={() => {
                      router.push("/api/auth/logout");
                    }}
                  >
                    Signout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ) : (
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
                router.push("/api/auth/login");
              }}
              w={{
                base: "full",
                sm: "auto",
              }}
              size="md"
              cursor="pointer"
            >
              Get Started
            </Button>
          )}
        </Flex>
      </Container>
    </Box>
  );
}
