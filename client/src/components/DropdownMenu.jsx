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
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    dispatch(userLoggedOut());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <DropdownMenu className="pointer-cursor">
      <DropdownMenuTrigger asChild>
        <Avatar className="w-[36px] h-auto">
          <AvatarImage
            src={
              user?.avatar ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
          />
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
            <Button onClick={handleLogOut}>Log Out</Button>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
