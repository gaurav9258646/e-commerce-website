import { TableOfContentsIcon, Search, UserRound } from "lucide-react";
import useAppStore from "@/store/app.store";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ShoppingCart, Sidebar as SidebarIcon } from "lucide-react";
import imag  from  "../../assets/3.png"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useUserStore from "@/store/user.store";
import { Button } from "../ui/button";

const Navbar = () => {
  const { openSidebar } = useAppStore();
  const { setUser, cart } = useUserStore();
  const { user } = useAuth();

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refToken");
    setUser(null);
  };

  return (
    <div className="w-full h-[60px] flex justify-between items-center px-5 py-3 border-b border-gray-300 shadow-lg bg-green-100">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <TableOfContentsIcon onClick={openSidebar} className="cursor-pointer" />
        <Sidebar />
        <Link to="/" className="text-xl font-bold">
        <img src={imag} alt="Logo" className="h-14" />

        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg border">
        <input
          type="text"
          placeholder="Search the Item"
          className="outline-none text-sm"
        />
        <Search className="w-4 h-4 text-gray-500" />
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-6 text-sm font-medium">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/product" className="hover:text-blue-600">Product</Link>
        <Link to="/orders" className="hover:text-blue-600">Orders</Link>
      </div>

      {/* Auth Buttons / Avatar */}
      <div className="flex items-center gap-3">
        {!user && (
          <>
            <Link to="/signin" className="hover:text-blue-600">Sign In</Link>
            <Link to="/login" className="flex items-center gap-2 hover:text-blue-600">
              Login
              <span className="border rounded-full p-1 hover:bg-gray-200 transition">
                <UserRound className="w-4 h-4" />
              </span>
            </Link>
          </>
        )}
        {user && (
        <div className="flex items-center gap-2">
          <div className="relative">
            {cart!?.length > 0 && (
              <p className="text-xs bg-red-500 text-white w-4 h-4 rounded-full absolute top-[-5px] right-[-5px] flex items-center justify-center">
                {cart?.length}
              </p>
            )}
            <ShoppingCart />
          </div>
          <Button size={"sm"} onClick={logOut}>
            Log Out
          </Button>
          <Avatar className="cursor-pointer">
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback className="uppercase">{user.name[0]}</AvatarFallback>
          </Avatar>
        </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
