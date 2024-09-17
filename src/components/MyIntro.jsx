import React from 'react'
import { useState } from "react";
import Button1 from "./Button1";
import Login from "./Login";
import Signup from "./Signup";
import Footer from "./Footer";

const MyIntro = () => {
    const [isSignup, setIsSignup] = useState(false); // State to toggle between Login and Signup
    const toggleAuthMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
      };

  return (
    <>
    <div className="w-full h-full flex flex-col lg:flex-row justify-between items-start lg:gap-0 md:gap-10 gap-10">
      <div className="w-full flex items-center justify-center lg:mt-[70px] lg:ml-14 md:mt-20">
        <div className="w-[360px] shrink-1 flex flex-col gap-5 lg:items-start md:items-start items-center">
          {isSignup ? <Signup /> : <Login />}
          <p className="text-[14px] text-center w-full ">
            {isSignup ? "Already using MyIntro?" : "New to Myntro?"}{" "}
            <button
              className="font-[600] hover:text-primary underline"
              onClick={toggleAuthMode}
            >
              {isSignup ? "Log in" : "Create an account"}
            </button>
          </p>
        </div>
      </div>

      <div className="w-full flex items-center justify-center">
        <picture>
          <source media="(max-width: 767px)" srcSet="/mobileBanner.png" />
          <img src="/Frame 2.png" alt="banner" className="w-cover" />
        </picture>
      </div>
    </div>
    <Footer />
  </>
  )
}

export default MyIntro
