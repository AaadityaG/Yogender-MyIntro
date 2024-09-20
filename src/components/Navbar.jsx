import React, { useState, useRef, useEffect, useContext } from "react";
import {
  ChevronDown,
  LogOut,
  Share,
  Mail,
  Facebook,
  X,
  Linkedin,
  Copy,
} from "lucide-react"; // Import additional icons
import { useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { logout } from "../utils/Auth";
import { useNavigate, Link } from "react-router-dom";
import { UserProfileContext } from "../context/UserProfileContext";

const Navbar = ( {CustomComponent}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isShareDropdownOpen, setIsShareDropdownOpen] = useState(false); // To manage Share dropdown
  const [userName, setUserName] = useState(null);
  const dropdownRef = useRef(null);
  const location = useLocation(); // Get current route
  const navigate = useNavigate();
  const userProfile = useContext(UserProfileContext);
  // console.log("from nav", userProfile?.data);

  useEffect(() => {
    setUserName(localStorage.getItem("username"));
  }, []);

  const handleButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
      setIsShareDropdownOpen(false); // Close share dropdown if clicked outside
    }
  };

  const handleShareClick = () => {
    setIsShareDropdownOpen(!isShareDropdownOpen); // Toggle Share dropdown
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      await logout(token);
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    // Attach event listener to detect clicks outside the dropdown
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="shadow-xl relative w-full h-[72px] flex justify-between items-center lg:px-[80px] md:px-[80px] px-[20px]">
      <Link to="/">
      <img
        src="/Logo.png"
        alt="Logo"
        className="lg:w-[136px] md:w-[136px] w-[109.06px]"
      />

      </Link>
    
     
      <div>
      {
         CustomComponent ? CustomComponent : 
         <>
         {location.pathname === "/public-profile" ? (
          <div ref={dropdownRef}>
            <button onClick={handleShareClick}>
              <Share size={24} strokeWidth={2} color="black" />
            </button>
            {isShareDropdownOpen && (
              <div className="absolute top-[100%] right-2  bg-white shadow-lg rounded-lg p-4 w-[250px]">
                <div className="grid grid-cols-2 gap-5">
                  <button className="flex items-center gap-2">
                    <Copy size={20} />{" "}
                    <span className="whitespace-nowrap">Copy Link</span>
                  </button>
                  <button className="flex items-center gap-2">
                    <FiFacebook size={20} /> Facebook
                  </button>
                  <button className="flex items-center gap-2">
                    <Mail size={20} /> Mail
                  </button>
  
                  <button className="flex items-center gap-2">
                    <FaWhatsapp size={20} /> WhatsApp
                  </button>
                  <button className="flex items-center gap-2">
                    <FaXTwitter size={20} /> Twitter
                  </button>
                  <button className="flex items-center gap-2">
                    <FaLinkedin size={20} /> LinkedIn
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div id="userProfile" ref={dropdownRef}>
            <button
              className="text-[14px] flex gap-4 items-center justify-center"
              onClick={handleButtonClick}>
              <img src="/profile-pic.png" alt="Profile" />
              <p className="hidden lg:inline md:inline font-[600]">
                {userProfile?.data.full_name}
              </p>
              <span className="border-[0.5px] border-gray rounded-full p-[2px] hidden lg:inline md:inline">
                <ChevronDown padding strokeWidth={2} size={10} color="black" />
              </span>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-[100%] right-0 z-[-1px] mt-2 lg:w-[318px] md:w-[318px] w-[200px] font-[600] text-[#4C4C4C] bg-white shadow-lg rounded-lg">
                <div className="p-4 text-[12px] md:text-[16px] lg:text-[16px]">
                  <p>{userProfile?.data.email}</p>
                  <hr className="my-4 opacity-30" />
                  <button
                    className="flex gap-2 items-center"
                    onClick={handleLogout}>
                    <LogOut size={20} /> Log Out
                  </button>
                </div>
              </div>
            )}
          </div>

)}
</>
      }
      </div>

    
     
      
    </div>
  );
};

export default Navbar;
