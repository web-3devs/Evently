import Navbar from "./Navbar";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { currentUser } from "../context/slices/userSlice";
import { allUsers } from "../context/slices/userSlice";
import { allEvents } from "../context/slices/alleventsSlice";
import { useToast } from "@chakra-ui/react";

export default function Layout({ children }) {
  const { user, error, isLoading } = useUser();
  const dispatch = useDispatch();
  const toast = useToast();

  const setUser = async () => {
    const data = await fetch("https://www.evently.club/api/setuser", {
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
    if (!data.ok) {
      toast({
        title: "Something went wrong!!",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    } else {
      dispatch(currentUser(UserData.user));
      toast({
        title: "Logged in succesfully.",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const getAllEvents = async () => {
    const fetchAllEvents = await fetch("http://localhost:3000/api/getallevents");
    const eventsdata = await fetchAllEvents.json();
    if (!fetchAllEvents.ok) return;
    dispatch(allEvents(eventsdata.events));
  };

  const getAllUsers = async ()=>{
    const fecthAllUsers = await fetch("http://localhost:3000/api/getallusers");
    const allUsersdata = await fecthAllUsers.json();
    if (!fecthAllUsers.ok) return;
    dispatch(allUsers(allUsersdata.users));
  }

  useEffect(() => {
    getAllEvents();
    getAllUsers();
    if (!isLoading) {
      if (user) {
        setUser();
      }
    }
  }, [isLoading]);

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
