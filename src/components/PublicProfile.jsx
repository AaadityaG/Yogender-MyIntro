import React, { useState, useEffect, useRef, useContext } from "react";
import Navbar from "./Navbar";
import Button1 from "./Button1";
import Footer from "./Footer";
import { UserProfileContext } from "../context/UserProfileContext";

import {
  ArrowUpRight,
  MapPin,
  ChevronDown,
  Share,
  Clipboard,
  Mail,
  Phone,
  Award,
  GraduationCap,
  UserPlus,
  TimerReset,
} from "lucide-react";

const PublicProfile = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const demoVideoRef = useRef(null);
  const [isFixed, setIsFixed] = useState(false);
  const userProfile = useContext(UserProfileContext);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleScroll = () => {
    if (!demoVideoRef.current) return;

    const videoRect = demoVideoRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Show the fixed video if the original video is completely out of view
    if (videoRect.bottom <= 0 && !isFixed) {
      setIsFixed(true);
    }

    // Hide the fixed video if any part of the original video is visible (even a tiny part)
    if (videoRect.bottom > 0 && videoRect.top < windowHeight) {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFixed]);

  return (
    <>
      <div className="flex flex-col items-center relative">
        <div className="sticky top-0 bg-white z-50 w-full">
          <Navbar />
        </div>
        <div className="w-full flex flex-col items-center relative" id="banner">
          <img
            src="/DefaultBanner.png"
            alt=""
            className="min-h-[70px] h-auto w-full object-cover"
          />
        </div>

        <div className="flex lg:flex-row-reverse md:flex-row flex-col-reverse gap-12 lg:items-start md:items-start items-center justify-center mt-10 px-12">
          <div className="max-w-[800px] h-full px-6 lg:py-6 md:py-6 mt-6 lg:mt-0 md:mt-0 flex flex-col gap-6  lg:bg-white">
            <div ref={demoVideoRef} className="relative px-3">
              <img src="DemoVideo.png" alt="Demo Video" className="w-full" />
            </div>

            {/* Fixed clone of the video when scrolling */}
            {isFixed && (
              <div className="fixed bottom-5 right-5 w-80 bg-white shadow-xl p-3 z-50 hidden lg:inline md:inline">
                <img
                  src="DemoVideo.png"
                  alt="Fixed Demo Video"
                  className="w-full rounded"
                />
              </div>
            )}
            {/* <div className="items-center justify-center w-full lg:gap-4 gap-3 lg:px-8 flex lg:hidden md:hidden">
              <img
                src="/sam.png"
                alt=""
                className="w-24  rounded-full border-4 border-white"
              />
              <div className="flex flex-col">
                
              <h1 className="font-bold text-2xl">Rakesh Maurya</h1>
              <div className="text-start text-black flex flex-col gap-1 items-start w-full text-sm">
                <p className="flex gap-1 items-center">
                  <Phone size={18} /> +918310590026
                </p>
                <p className="flex gap-1 items-center">
                  <Mail size={18} /> abhishek@extuent.com
                </p>
                <p className="flex gap-1 items-center">
                  <MapPin size={18} /> Delhi, India.
                </p>
              </div>
              
              </div>

            </div> */}

            <div className="px-3">
              {/* <h1 className="font-[400] text-2xl">Profile Summary</h1> */}
              <h1 className="font-[400] text-2xl lg:flex md:flex gap-3 items-center">
                <img
                  src="/prof.png"
                  alt=""
                  className="w-6 h-6 hidden lg:inline md:inline"
                />
                Profile Summary
              </h1>
              <p className="lg:pl-9 md:pl-9">
                {userProfile?.data?.professional_summary}
              </p>
            </div>

            <div className="px-3 flex flex-col gap-2">
              <h1 className="font-[400] text-2xl lg:flex md:flex gap-3 items-center">
                <img
                  src="/ex.png"
                  alt=""
                  className="w-6 h-6 hidden lg:inline md:inline"
                />
                Professional Experience
              </h1>
              <div>
                {userProfile?.data?.employment_history.map((job, index) => (
                  <div
                    className="flex flex-col gap-3 lg:pl-9 md:pl-9"
                    key={index}>
                    <p className="font-[600]">{job.job_title}</p>
                    <p className="flex gap-1 font-[300]">
                      <span>{job.employer}</span>{" "}
                      <span className="px-2">|</span>{" "}
                      <span>
                        {new Date(job.start_date).toLocaleString("default", {
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        -{" "}
                        {new Date(job.end_date).toLocaleString("default", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </p>
                    <span className="font-[300]">{job.summary}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* <div className="px-3 flex flex-col gap-2">
              <h1 className="font-bold text-2xl">Education</h1>
              <div className="flex flex-col gap-0">
                <p className=" font-[600] ">Design at IIT Kharagpur</p>
                <p className=" text-gray ">Jan 2020 - March 2021</p>
              </div>
              <div className="flex flex-col gap-0">
                <p className=" font-[600] ">Multidisciplinary Designer</p>
                <p className=" text-gray ">Jan 2020 - March 2021</p>
              </div>
            </div> */}

            <button className="text-primary font-[600] flex gap-2 items-center justify-center">
              View PDF Resume <ArrowUpRight />{" "}
            </button>
          </div>
          <div className="rounded  bg-[#1E3A5F] text-white  flex flex-col items-center justify-center gap-3 w-[370px] py-7 ">
            <div className="items-center justify-center flex-col w-full lg:gap-4 gap-3 flex">
              <img
                src="/sam.png"
                alt=""
                className="w-24  rounded-full border-4 border-white"
              />
              <h1 className="font-bold text-2xl">
                {userProfile?.data.full_name}
              </h1>
              <div className="text-start flex flex-col gap-1 items-start w-full pl-5">
                <p className="flex gap-1 items-center">
                  <Phone size={18} /> {userProfile?.data?.phone || "N/A"}
                </p>
                <p className="flex gap-1 items-center">
                  <Mail size={18} /> {userProfile?.data?.email || "N/A"}
                </p>
                <p className="flex gap-1 items-center">
                  <MapPin size={18} /> {userProfile?.data?.location || "N/A"}
                </p>
              </div>
            </div>

            {/* <hr className="text-gray w-full opacity-40 my-3" /> */}
            <hr className="  opacity-40 my-3 w-[90%]" />

            <div className=" w-full px-5">
              <p className="text-start font-[500] text-[20px] flex gap-3 items-center">
                <GraduationCap /> Education
              </p>
              <div>
                <div className="w-full mt-3 flex flex-col gap-2">
                  {userProfile?.data?.education.map((edu, index) => (
                    <div className="w-full flex flex-col gap-0" key={index}>
                      <h2 className="font-[600]">{edu.school}</h2>
                      <p className="">
                        {edu.degree} |{" "}
                        {new Date(edu.start_date).toLocaleString("default", {
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        -{" "}
                        {new Date(edu.end_date).toLocaleString("default", {
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* <hr className="text-gray w-full opacity-40 my-3" /> */}
            <hr className=" opacity-40 my-3 w-[90%]" />

            <div className=" w-full px-5">
              <p className="text-start font-[500] text-[20px] flex gap-3 items-center">
                <Award /> Certification
              </p>
              <div className="w-full mt-3 flex flex-col gap-2">
                {userProfile?.data?.certifications.map((cert, index) => (
                  <div className="w-full flex flex-col gap-0" key={index}>
                    <h2 className="font-[600]">{cert.course}</h2>
                    <p className="">
                      {cert.institution} |{" "}
                      {new Date(cert.start_date).toLocaleString("default", {
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      -{" "}
                      {new Date(cert.end_date).toLocaleString("default", {
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* <hr className="text-gray w-full opacity-40 my-3" /> */}
            <hr className=" opacity-40 my-3 w-[90%]" />

            <div className=" w-full px-5">
              <p className="text-start font-[500] text-[20px] flex gap-3 items-center">
                <UserPlus /> Top Skills
              </p>
              {userProfile?.data?.skills.map((skill, index) => (
                <div className="w-full mt-3 flex flex-col" key={index}>
                  <p>{skill}</p>
                </div>
              ))}
            </div>

            <hr className=" opacity-40 my-3 w-[90%]" />

            <div className=" w-full px-5">
              <p className="text-start font-[500] text-[20px] flex gap-3 items-center">
                <TimerReset /> Availibility
              </p>
              <div className="w-full mt-3 flex gap-1   ">
                <p>Immediate</p> <p>•</p>
                <p>Fulltime</p>
              </div>
            </div>

            {/* <hr className="text-gray w-full opacity-40 my-3" /> */}
            {/* <hr className="  opacity-40 my-3 w-[90%]" /> */}
          </div>
        </div>

        <div className="w-full ">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default PublicProfile;
