import { useUser } from "@auth0/nextjs-auth0";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import { currentUser } from "../context/slices/userSlice";
import { useEffect } from "react";
import { Container } from "@chakra-ui/react";

export default function Layout({ children }) {
  const { user, error, isLoading } = useUser();
  console.log(user);
  const dispatch = useDispatch();

  async function setUser() {
    const data = await fetch("/api/setuser", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        image: user.picture,
      }),
    });
    const UserData = await data.json();
    console.log(UserData);
    dispatch(currentUser(UserData.user));
  }

  useEffect(() => {
    if (user) {
      setUser();
    }
  }, [user]);

  return (
    <>
    <Container bgImage='./Mesh.svg' bgSize={'cover'} bgRepeat={'no-repeat'} minH={'100vh'} minW={'full'} >

      <Navbar />
      {children}
    </Container>
    </>
  );
}
