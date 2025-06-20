import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setAuthUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Logout failed. Please try again.");
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:scale-105 transition-transform">
          Job <span className="text-orange-400">Portal</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <ul className="flex font-medium items-center gap-6">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" className="hover:text-orange-400 transition-colors duration-300">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="hover:text-orange-400 transition-colors duration-300">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:text-orange-400 transition-colors duration-300">Home</Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-orange-400 transition-colors duration-300">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse" className="hover:text-orange-400 transition-colors duration-300">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {/* Auth Buttons */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-4 py-2 rounded-lg transition-transform duration-300 hover:scale-105">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-4 py-2 rounded-lg transition-transform duration-300 hover:scale-105">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer hover:scale-105 transition-transform">
                  <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <div className="flex gap-4 mb-4">
                    <Avatar>
                      <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 text-gray-600">
                    {user?.role === "student" && (
                      <div className="flex items-center gap-2 cursor-pointer">
                        <User2 />
                        <Link to="/profile" className="hover:underline">View Profile</Link>
                      </div>
                    )}
                    <div className="flex items-center gap-2 cursor-pointer" onClick={logOutHandler}>
                      <LogOut />
                      <span className="hover:underline">Logout</span>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
