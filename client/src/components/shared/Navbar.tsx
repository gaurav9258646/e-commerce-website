import { TableOfContentsIcon, Search, UserRound, Bookmark, ShoppingCart } from "lucide-react";
import useAppStore from "@/store/app.store";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import imag from "../../assets/3.png";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useUserStore from "@/store/user.store";
import { Button } from "../ui/button";
import Wishlist from "@/pages/Wishlist";
import Cart from "@/pages/Cart";

const Navbar = () => {
  const { openSidebar } = useAppStore();
  const { setUser, cart, wishlist } = useUserStore();
  const { user, loading } = useAuth();

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
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>
        <Link to="/product" className="hover:text-blue-600">
          Product
        </Link>
        <Link to="/orders" className="hover:text-blue-600">
          Orders
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            {/* Cart */}
            <Link to="/cart" className="relative">
              {Cart?.length > 0 && (
                <p className="text-xs bg-red-500 text-white w-4 h-4 rounded-full absolute top-[-5px] right-[-5px] flex items-center justify-center">
                  {Cart.length}
                </p>
              )}
              <ShoppingCart className="cursor-pointer" />
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative">
              {Wishlist?.length > 0 && (
                <p className="text-xs bg-red-500 text-white w-4 h-4 rounded-full absolute top-[-5px] right-[-5px] flex items-center justify-center">
                  {Wishlist.length}
                </p>
              )}
              <Bookmark className="cursor-pointer" />
            </Link>

            {/* Log Out */}
            <Button size={"sm"} onClick={logOut}>
              Log Out
            </Button>

            {/* Avatar */}
            <Avatar className="cursor-pointer">
              <AvatarFallback className="uppercase">
                {user?.name ? user.name[0] : "U"}
              </AvatarFallback>
            </Avatar>
          </>
        ) : (
          <>
            <Link to="/signin" className="hover:text-blue-600">
              Sign In
            </Link>
            <Link to="/login" className="flex items-center gap-2 hover:text-blue-600">
              Login
              <span className="border rounded-full p-1 hover:bg-gray-200 transition">
                <UserRound className="w-4 h-4" />
              </span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
