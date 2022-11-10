import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";

export default function EditProfile() {
  const user = useSelector((state) => state.userData);

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        rounded={"sm"}
        p={6}
        my={12}
        border={"1px"}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile Edit
        </Heading>
        <FormControl>
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
              <label
                htmlFor="avatar-image"
                style={{
                  textAlign: "center",
                  padding: "10px",
                  fontWeight: "500",
                  borderRadius: "2px",
                  color: "black",
                  cursor: "pointer",
                  width: "100%",
                  border: "1px solid black",
                }}
              >
                Change profile
              </label>
              <input
                type="file"
                id="avatar-image"
                style={{ display: "none" }}
                // onChange={(e) => {
                //   setAvatarImage(e.target.files[0]);
                //   setAvatar(URL.createObjectURL(e.target.files[0]));
                // }}
              />
            </Center>
          </Stack>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Name"
            type="text"
            border={"1px"}
            name="name"
            borderColor="black"
            rounded="sm"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Input
            placeholder="Web Developer"
            type="text"
            border={"1px"}
            name="description"
            borderColor="black"
            rounded="sm"
          />
        </FormControl>
        <Stack spacing={6} direction={["column", "row"]} pt={4}>
          <Button
            colorScheme={"white"}
            border={"1px"}
            rounded="sm"
            color={"black"}
            boxShadow={"4px 4px 0 black"}
            w="full"
          >
            Submit
          </Button>
          <Button
            colorScheme={"white"}
            border={"1px"}
            rounded="sm"
            color={"black"}
            boxShadow={"4px 4px 0 black"}
            w="full"
          >
            Clear
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
