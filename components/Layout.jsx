import Navbar from "./Navbar";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { currentUser } from "../context/slices/userSlice";
import { allEvents } from "../context/slices/alleventsSlice";

export default function Layout({ children }) {
  const { user, error, isLoading } = useUser();
  const dispatch = useDispatch();

  const setUser = async () => {
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
    return UserData;
  };

  const getAllEvents = async () => {
    const fetchAllEvents = await fetch("/api/getallevents");
    const eventsdata = await fetchAllEvents.json();
    if (!fetchAllEvents.ok) return;
    dispatch(allEvents(eventsdata.events));
  };

  useEffect(() => {
    getAllEvents();
    if (!!user) {
      setUser().then((res) => {
        dispatch(currentUser(res.user));
      });
    }
  }, [user]);

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
