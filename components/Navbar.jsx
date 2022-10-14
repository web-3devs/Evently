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
          <Box>Web3Devs</Box>
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
              colorScheme="teal"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              rounded={"md"}
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
