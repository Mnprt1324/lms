import { DropdownMenu2 } from "./DropdownMenu";
import { IoBookSharp } from "react-icons/io5";
import {Button} from '../components/ui/button'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const navigate=useNavigate();
  const {isAuthenticate}=useSelector((state)=>state.auth)
  return (
    <div className="h-16 dark:bg-[#0a0a0a] border-bottom flex md:justify-around items-center border-1  ">
      <div className="flex items-center gap-3">
        <div className="text-3xl">
          <IoBookSharp />
        </div>
        <div className="font-bold">E-Learning</div>
      </div>
      <div>
        {isAuthenticate? (
            <DropdownMenu2 />
        ):(
             <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/login")}>Signup</Button>
            </div>
        )
      }
      </div>
    </div>
  );
};
