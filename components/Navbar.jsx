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
  Img,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogFooter,
  useDisclosure
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { deleteUser } from "../context/slices/userSlice";
import { useRef } from "react";


export default function Navbar() {
  const dispacth = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const toast = useToast();
  const user = useSelector((state) => state.userData);
  const router = useRouter();

  const handleDelete = async () => {
    const data = { user_id: user.currentUser?.id };
    const deleted = await fetch("/api/deleteProfile", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const deletedData = await deleted.json();
    if (!deletedData.ok) {
      toast({
        title: "Profile deleted succesfully.",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      dispacth(deleteUser());
      router.push("/api/auth/logout");
    } else {
      dispacth(deleteUser());
      toast({
        title: "Profile deleted succesfully.",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      px={4}
      bgImg={router.pathname === "/" ? "/Mesh.svg" : "transparent"}
      bgColor={"transparent"}
      bgRepeat={"no-repeat"}
      bgSize={"cover"}
    >
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Account
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={() => {
                      handleDelete();
                      onClose();
                    }} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Container maxW={"container.xl"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Img
            h={"32"}
            ml={{ base: "-12px", md: "0" }}
            src="/logo.svg"
            onClick={() => {
              router.push("/");
            }}
            cursor="pointer"
          />
          {user.authenticated ? (
            <Flex alignItems={"center"}>
              <Text
                mr="4"
                fontSize={"md"}
                fontWeight="medium"
                display={["none", "block"]}
              >
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
                <MenuList rounded={"lg"} boxShadow="6px 6px 0 black" p={0}>
                  <MenuItem
                    onClick={() => {
                      router.push("/profile");
                    }}
                    p={3}
                    roundedTop="lg"
                    _hover={{
                      bg: "purple.400",
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuDivider m={0} />
                  <MenuItem
                    onClick={() => {
                      router.push("/api/auth/logout");
                    }}
                    p={3}
                    _hover={{
                      bg: "purple.400",
                    }}
                  >
                    Signout
                  </MenuItem>
                  <MenuDivider m={0} />
                  <MenuItem
                    onClick={onOpen}
                    p={3}
                    roundedBottom="lg"
                    _hover={{
                      bg: "purple.400",
                    }}
                  >
                    Delete Account
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
                router.push("https://www.evently.club/api/auth/login");
              }}
              w={{
                base: 28,
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
