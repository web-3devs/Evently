import { useUser } from "@auth0/nextjs-auth0";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  const { user, error, isLoading } = useUser();

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
