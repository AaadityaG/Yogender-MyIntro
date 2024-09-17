import { useState, useEffect, useRef, useContext } from "react";
import { UserProfileContext } from "../context/UserProfileContext";
import Navbar from "./Navbar";
import Button1 from "./Button1";
import Footer from "./Footer";
import {
  ArrowUpRight,
  MapPin,
  ChevronDown,
  Share,
  Clipboard,
  Mail,
} from "lucide-react";

const UserProfile = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Consume the context
  const userProfile = useContext(UserProfileContext);
  // console.log(userProfile?.data);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col items-end relatv">
        <div className="sticky top-0 bg-white z-50 w-full">
          <Navbar />
        </div>
        <div className="w-full flex flex-col items-center relative" id="banner">
          <img
            src="/DefaultBanner.png"
            alt=""
            className="min-h-[70px] h-auto w-full object-cover"
          />

          <div className="rounded absolute top-[20%] lg:top-[45%] lg:left-[7%] md:left-[7%] left-[4%] z-30 lg:bg-white bg-transparent flex items-center justify-center gap-2  w-[364px] py-7 lg:px-12">
            <div className="flex items-center justify-center flex-col lg:gap-4 gap-3">
              <img
                src="/sam.png"
                alt=""
                className="w-24  rounded-full border-4 border-white"
              />
              <h1 className="font-bold text-2xl">
                {userProfile?.data?.full_name}
              </h1>
              <p className="text-gray text-center">
                {userProfile?.data?.title}
              </p>
              <p className="flex items-center gap-2 text-gray">
                {" "}
                <MapPin size={15} /> {userProfile?.data?.location}
              </p>
              <Button1 text={"Edit Profile"} className="w-full" />
              <button className="flex font-[600] text-primary gap-2 my-3">
                View Public Profile <ArrowUpRight />
              </button>
              <div className="w-full mt-5 flex flex-col gap-2 lg:px-0 md:px-4 px-10">
                <h2 className="font-[600]">Availability for Hire</h2>
                <p className="text-gray">
                  Let people know your availability for new opportunities
                </p>
              </div>
              <div className="flex w-full justify-between lg:px-4 md:px-4 px-14 text-gray mt-4">
                <p className="flex items-center justify-center gap-2">
                  <span>15 days</span> <ChevronDown size={20} color="#111" />{" "}
                </p>
                <p className="flex items-center gap-2">
                  Fulltime <ChevronDown size={20} color="#111" />
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[898px] h-full p-6 flex flex-col gap-6 mt-[570px] lg:mt-0 md:mt-0">
          <div className="flex justify-between gap-3 w-full">
            <div className="flex gap-3 items-center">
              <button className="bg-black text-white rounded-full px-4 py-2">
                Digital Profile
              </button>
              <button className="font-[600]">Analytics</button>
            </div>
            <div className="relative" ref={dropdownRef}>
              <button onClick={toggleDropdown}>
                <Share size={25} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-xl z-50">
                  <button
                    className="flex gap-2 items-center w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      setDropdownOpen(false);
                      alert("Link copied to clipboard!");
                    }}>
                    <Clipboard size={20} /> Copy Link
                  </button>
                  <button className=" w-full flex items-center gap-2 text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
                    <Mail size={20} /> Mail
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="px-3">
            <img src="DemoVideo.png" alt="" className="w-full" />
          </div>

          <div className="px-3">
            <h1 className="font-bold text-2xl">Profile Summary</h1>
            <p className="text-gray">
              {userProfile?.data?.professional_summary}
            </p>
          </div>

          <div className="px-3">
            <h1 className="font-bold text-2xl">Top Skills</h1>
            <div className="text-gray flex gap-2">
              {userProfile?.data?.skills.map((item, index) => (
                <div className="" key={index}>
                  {item} |
                </div>
              ))}
            </div>
          </div>

          <div className="px-3 flex flex-col gap-2">
            <h1 className="font-bold text-2xl">Work Experience</h1>
            {userProfile?.data?.employment_history.map((job, index) => (
              <div className="flex flex-col gap-0" key={index}>
                <p className=" font-[600] ">
                  {job.job_title} at {job.employer}
                </p>
                <p className=" text-gray ">
                  {job.start_date} - {job.end_date}
                </p>
                <ul className="text-gray list-disc pl-6">
                  <li>{job.summary}</li>
                </ul>
              </div>
            ))}
          </div>

          <div className="px-3 flex flex-col gap-2">
            <h1 className="font-bold text-2xl">Education</h1>
            {userProfile?.data?.education.map((edu, index) => (
              <div className="flex flex-col gap-0" key={index}>
                <p className=" font-[600] ">
                  {edu.degree} at {edu.school}
                </p>
                <p className=" text-gray ">
                  {edu.start_date} - {edu.end_date}
                </p>
                <p className=" text-gray ">{edu.description}</p>
              </div>
            ))}
          </div>

          <div className="px-3 flex flex-col gap-2">
            <h1 className="font-bold text-2xl">Certifications</h1>
            {userProfile?.data?.certifications.map((cert, index) => (
              <div className="flex flex-col gap-0" key={index}>
                <p className=" font-[600] ">
                  {cert.course} from {cert.institution}
                </p>
                <p className=" text-gray ">
                  {cert.start_date} - {cert.end_date}
                </p>
              </div>
            ))}
          </div>

          <div className="px-3 flex flex-col gap-2">
            <h1 className="font-bold text-2xl">Social Links</h1>
            {userProfile?.data?.social_links.map((link, index) => (
              <div className="flex flex-col gap-0" key={index}>
                <a href={link.url} className="text-primary font-[600]">
                  {link.name}
                </a>
              </div>
            ))}
          </div>

          <button className="text-primary font-[600] flex gap-2 items-center justify-center">
            View PDF Resume <ArrowUpRight />{" "}
          </button>
        </div>
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
