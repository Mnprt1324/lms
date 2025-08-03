import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavLink, useNavigate } from "react-router";
import { functionToLogout } from "../API/api";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../features/userSlice";
import { toast } from "sonner";

export const DropdownMenu2 = () => {
  const navigate=useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { mutate } = useMutation({
    mutationFn: functionToLogout,
    onSuccess: (data) => {
      if(data.data.message){
      dispatch(userLoggedOut());
       toast.success(data.data.message);
      navigate("/login")
      }
    },
    onError: (err) => {
        toast.error(err?.data.data.message||"somthing went wrong")     
    },
  });
  const handleLogOut = () => {
    mutate(); // trigger logout
  };

  return (
    <DropdownMenu className="pointer-cursor">
      <DropdownMenuTrigger asChild>
        <Avatar className="w-[36px] h-auto">
          <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <NavLink to={`/mylearning`}>My Learning</NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <NavLink to={`/profile`}>Edit Profile</NavLink>
          </DropdownMenuItem>
          {user?.role === "instructor" && (
            <DropdownMenuItem onClick={handleLogOut}>Log out</DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {user?.role === "instructor" ? (
            <NavLink to={`/admin/dashboard`}>
              <Button>DashBoard</Button>
            </NavLink>
          ) : (
            <Button  onClick={handleLogOut}>Log Out</Button>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
