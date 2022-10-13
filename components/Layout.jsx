import { useUser } from "@auth0/nextjs-auth0";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import { currentUser } from "../context/slices/userSlice";
import { useEffect } from "react";

export default function Layout({ children }) {
  const { user, error, isLoading } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      console.log(user);
      dispatch(currentUser(user));
    }
  }, [dispatch, user]);

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
