import { Outlet, useNavigation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { LoaderA } from "@/components/LoaderA";
import {Footer} from "@/pages/home/Footer";

const AppLayout = () => {
  const navigating = useNavigation();
  if (navigating.state == "loading") {
    console.log("dd");
    return;
  }
  return (
    <>
      {navigating.state === "loading" ? (
        <LoaderA />
      ) : (
        <>
          <Navbar />
          <Outlet />
          <Footer/>
        </>
      )}
    </>
  );
};

export default AppLayout;
