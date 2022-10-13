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
  useColorModeValue,
  Container,
  chakra,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function Navbar() {
  const user = useSelector((state) => state.userData);

  console.log(user);

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Container maxW={"container.xl"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>Web3Devs</Box>
          {user.currentUser ? (
            <Flex alignItems={"center"}>
              <Box mr="2">{user.currentUser?.name}</Box>
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
                    src={user.currentUser?.picture}
                    name={user.currentUser?.name}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>Profile</MenuItem>
                  <MenuDivider />
                  <MenuItem>Sign out</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ) : (
            <chakra.a href="/api/auth/login">
              <Button
                colorScheme="green"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                w={{
                  base: "full",
                  sm: "auto",
                }}
                size="md"
                cursor="pointer"
              >
                Get Started
              </Button>
            </chakra.a>
          )}
        </Flex>
      </Container>
    </Box>
  );
}
