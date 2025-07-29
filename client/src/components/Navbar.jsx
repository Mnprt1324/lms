import { DropdownMenu2 } from "./DropdownMenu";
import { IoBookSharp } from "react-icons/io5";
import { MdLockOpen } from "react-icons/md";
import { Button } from "../components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CgMenuMotion } from "react-icons/cg";
import { SheetDemo } from "./SideBar";
export const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticate } = useSelector((state) => state.auth);
  return (
    // <div className="h-16 dark:bg-[#0a0a0a] border-bottom flex md:justify-around items-center border-1  ">
    //   <div className="flex items-center gap-3">
    //     <div className="text-3xl">
    //       <IoBookSharp />
    //     </div>
    //     <div className="font-bold">E-Learning</div>
    //   </div>
    //   <div>
    //   ?  {isAuthenticate? (
    //         <DropdownMenu2 />
    //     ):(
    //          <div className="flex items-center gap-2">
    //           <Button variant="outline" onClick={() => navigate("/login")}>
    //             Login
    //           </Button>
    //           <Button onClick={() => navigate("/login")}>Signup</Button>
    //         </div>
    //     )
    //   }
    //   </div>
    // </div>
    <nav className="flex items-center  justify-between md:justify-around p-2 shadow">
      <div className="md:hidden p-3 rounded cursor-pointer">
        <SheetDemo  />
      </div>
      <div className="hidden md:flex md:visible items-center gap-10">
        <NavLink to="/">
          <div className=" bg-[#5567FF] aspect-square rounded">
            <img
              className="w-[45px] p-1 h-auto "
              src=" https://luma.humatheme.com/public/images/illustration/student/128/white.svg"
              alt=""
            />
          </div>
        </NavLink>

        <NavLink to="/">Home</NavLink>
        <NavLink to="/courses">Courses</NavLink>
        <NavLink to="">Teachers</NavLink>
        <NavLink to="">About Us</NavLink>
       
      </div>
      <div>
        {isAuthenticate ? (
          <DropdownMenu2 />
        ) : (
          <div className="flex gap-4">
            <button onClick={() => navigate("/login")}>
              <MdLockOpen className="text-xl" />
            </button>
            <Button variant={"outline"} onClick={() => navigate("/login")}>
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
