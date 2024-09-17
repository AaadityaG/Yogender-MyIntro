import React, { useState, Suspense, lazy } from "react";
import {
  Trash,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Kanban,
  FileText,
  Briefcase,
  Book,
  Video,
  CirclePlus,
  Layers,
  AtSign,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Button1 from "./Button1";

const ProfessionalSummary = lazy(() => import("./ProfessionalSummary"));
const PersonalDetails = lazy(() => import("./PersonalDetails"));
const EmploymentHistory = lazy(() => import("./EmploymentHistory"));
const Education = lazy(() => import("./Education"));
const Skills = lazy(() => import("./Skills"));
const SocialProfiles = lazy(() => import("./SocialProfiles"));
const VideoRecorder = lazy(() => import("./VideoRecorder"));
const CustomSection = lazy(() => import("./CustomSection"));

const sectionComponents = {
  PersonalDetails,
  EmploymentHistory,
  Education,
  Skills,
  SocialProfiles,
};

const icons = {
  PersonalDetails: FileText,
  EmploymentHistory: Briefcase,
  Education: Book,
  Skills: Layers,
  SocialProfiles: AtSign,
};

const EditSection = () => {
  const [activeSection, setActiveSection] = useState("PersonalDetails");
  const [accordionOpen, setAccordionOpen] = useState(true);
  const [view, setView] = useState("Profile");
  const [error, setError] = useState(null);

  const ActiveSectionComponent =
    sectionComponents[activeSection] || sectionComponents.PersonalDetails;

  const renderViewComponent = () => {
    switch (view) {
      case "Video":
        return (
          <>
            <div
              id="video"
              className="w-full h-[400px] flex flex-col gap-5 mt-2 items-end"
            >
              <div className="flex flex-col gap-8 justify-center items-center w-full h-full bg-gray-200">
                <img src="/record.png" alt="" />
                <span className="text-md text-center">
                  Unlock the potential of first impressions with a <br /> video
                  introduction.
                </span>
                <Button1
                  text="Record Introduction"
                  className="lg:px-16 md:px-16 px-12"
                />
              </div>
              <div className={` flex gap-4`}></div>
            </div>
          </>
        );
      case "CustomSection":
        return <CustomSection />;
      default:
        return <ActiveSectionComponent />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="flex-grow relative">
        {/* Banner */}
        <div className="w-full flex flex-col items-center relative" id="banner">
          <img
            src="/DefaultBanner.png"
            alt="Profile Banner"
            className="lg:min-h-[70px] md:min-h-[70px] min-h-[100px] h-auto w-full object-cover"
          />
          <button className="absolute lg:top-[40%] top-[13%] lg:left-[7%] md:left-[7%] left-[4%] z-30 text-white flex items-center gap-2 lg:text-[16px] md:text-[16px] text-[12px]">
            <ArrowLeft color="#ffffff" className="w-4 lg:w-6 md:w-6" /> Back to
            Profile
          </button>
        </div>

        {/* Horizontal Buttons */}
        <div className="lg:hidden md:hidden flex overflow-x-auto w-full bg-gray-100 p-4 space-x-4 text-[12px] absolute top-10 left-0">
          {Object.keys(sectionComponents).map((section) => (
            <button
              key={section}
              onClick={() => {
                setActiveSection(section);
                setView("Profile");
              }}
              className={`text-left whitespace-nowrap p-2 rounded flex items-center bg-white ${
                activeSection === section && view === "Profile"
                  ? "text-primary "
                  : ""
              }`}
              aria-pressed={activeSection === section && view === "Profile"}
            >
              <span className="flex items-center gap-2">
                {icons[section] &&
                  React.createElement(icons[section], { size: 17 })}
                {section.replace(/([A-Z])/g, " $1").trim()}
              </span>
            </button>
          ))}
          <button
            onClick={() => setView("Video")}
            className={`text-left whitespace-nowrap p-2 rounded flex items-center bg-white ${
              view === "Video" ? "text-primary " : ""
            }`}
          >
            <span className="flex items-center gap-2">
              <Video size={20} />
              Video
            </span>
          </button>
          <button
            onClick={() => setView("CustomSection")}
            className={`text-left whitespace-nowrap p-2 rounded flex items-center bg-white ${
              view === "CustomSection" ? "text-primary " : ""
            }`}
          >
            <span className="flex items-center gap-2">
              <CirclePlus size={20} />
              Custom Section
            </span>
          </button>
        </div>

        <div className="flex w-full gap-10 lg:mt-10 md:mt-10">
          {/* Sidebar */}
          <div className="hidden lg:inline md:inline w-1/4 min-w-[200px] p-2 bg-gray-100 ml-28 mr-8 font-[600]">
            <button
              onClick={() => setAccordionOpen(!accordionOpen)}
              className="flex w-full text-left p-2 hover:bg-gray-200 items-center justify-between"
              aria-expanded={accordionOpen}
              aria-controls="section-accordion"
            >
              <span className="flex gap-2">
                <Kanban className="rotate-180" size={20} /> My Profile
              </span>
              {accordionOpen ? (
                <ChevronUp size={"15"} />
              ) : (
                <ChevronDown size={"15"} />
              )}
            </button>
            {accordionOpen && (
              <div id="section-accordion" className="mt-2 font-[400]">
                {Object.keys(sectionComponents).map((section) => (
                  <button
                    key={section}
                    onClick={() => {
                      setActiveSection(section);
                      setView("Profile");
                    }}
                    className={`w-full text-left p-2 pl-8 flex items-center gap-4 hover:bg-gray-200 ${
                      activeSection === section && view === "Profile"
                        ? "text-primary "
                        : ""
                    }`}
                    aria-pressed={
                      activeSection === section && view === "Profile"
                    }
                  >
                    {icons[section] &&
                      React.createElement(icons[section], { size: 20 })}
                    {section.replace(/([A-Z])/g, " $1").trim()}
                  </button>
                ))}
              </div>
            )}
            <hr className="w-full text-[#c4c4c4] my-4" />
            <button
              onClick={() => setView("Video")}
              className={`w-full text-left p-2 flex items-center gap-2 hover:bg-gray-200 ${
                view === "Video" ? "text-primary " : ""
              }`}
            >
              <Video size={20} />
              Video
            </button>
            <button
              onClick={() => setView("CustomSection")}
              className={`w-full text-left p-2 flex items-center gap-2 hover:bg-gray-200 ${
                view === "CustomSection" ? "text-primary " : ""
              }`}
            >
              <CirclePlus size={20} />
              Custom Section
            </button>
          </div>

          {/* Main Content */}
          <div className="p-4 lg:pt-8 md:pt-8 lg:w-[50%] md:w-[50%] w-full">
            <Suspense fallback={<div>Loading...</div>}>
              {error ? (
                <div className="text-red-500">{error}</div>
              ) : (
                renderViewComponent()
              )}
            </Suspense>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default EditSection;
