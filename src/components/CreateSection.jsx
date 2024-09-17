import React, { useState, useEffect } from "react";
import { CheckCircle, FileText, Trash, ArrowLeft  } from "lucide-react";
import PersonalDetails from "./PersonalDetails";
import ProfessionalSummary from "./ProfessionalSummary"
import EmploymentHistory from "./EmploymentHistory"
import Education from "./Education"
import Certifications from "./Certifications"
import Skills from "./Skills"
import SocialProfiles from "./SocialProfiles"
import Button1 from "./Button1"
import VideoRecorder from "./VideoRecorder"

const CreateSection = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [showVideoRecorder, setShowVideoRecorder] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setProgress(0); // Reset progress to 0 when a new file is uploaded
      setUploadComplete(false); // Reset upload complete state
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const selectedFile = event.dataTransfer.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setProgress(0); // Reset progress to 0 when a new file is uploaded
      setUploadComplete(false); // Reset upload complete state
    }
  };

  const handleDelete = () => {
    setFile(null);
    setProgress(0);
    setUploadComplete(false); // Reset upload complete state
  };

  useEffect(() => {
    if (file) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => setUploadComplete(true), 500); // Delay before marking upload as complete
            return 100;
          }
          return prevProgress + 1;
        });
      }, 30);
    }
  }, [file]);

  const handleButtonClick = () => {
    setShowVideoRecorder(!showVideoRecorder); // Show the VideoRecorder when the button is clicked
  };

  return (
    <>
    <div className='w-full flex flex-col items-center relative' id="banner">
        <img src="/DefaultBanner.png" alt="" className='min-h-[70px] h-auto w-full object-cover'/>
        <button id="uploadResume" className='lg:w-[282px] md:w-[282px] w-[250px] shadow-lg rounded-full lg:p-4 lg:px-6 py-3 px-0  absolute z-10 lg:top-[80%] md:top-[80%] top-[70%] bg-white flex items-center justify-center font-[600] gap-3 text-[14px] md:text-[16px] lg:text-[16px]'>
          <span className={`${showVideoRecorder ? 'text-gray': 'text-primary'}`}>Upload Resume</span> 
          <hr className='w-[20px]' />
          <span className={`${showVideoRecorder ? 'text-primary': 'text-gray'}`}>Record</span>
        </button>
        { showVideoRecorder && 

        <button onClick={handleButtonClick} className="absolute top-[40%] lg:left-[7%] md:left-[7%] left-[4%] z-30 text-white flex items-center gap-2 lg:text-[16px] md:text-[16px] text-[12px]">
        <ArrowLeft  color="#ffffff" className="w-4 lg:w-6 md:w-6" /> Back
        </button>
        }

      </div>
      { !showVideoRecorder && 

    <div className="flex flex-col items-center w-full p-4">
      <div className="w-full max-w-3xl lg:p-7 md:p-7 p-0 h-full relative mb-10">
        <h1 className="text-center font-bold lg:text-4xl md:text-3xl text-2xl ld:my-12 md:my-8 my-8 lg:mb-16">
          Create your profile
        </h1>

        <div className="my-5" id="uploadResumeSection">
          <div
            className={`border ${
              dragActive
                ? "border-blue-500"
                : file
                ? "border-gray  border-[0.5px] border-opacity-40"
                : "border-dashed"
            } rounded max-h-[128px] flex items-center justify-center gap-4 md:gap-7 p-4 cursor-pointer`}
            onClick={() => document.getElementById("resumeInput").click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="my-3 w-full h-full flex flex-col justify-between items-center gap-7 lg:text-[14px] md:text-[14px] text-[12px] font-[500]">
                <span className="w-full flex justify-between items-center shrink-none ">
                  <span className="flex gap-1 ">
                    <FileText size={18} />
                    {file.name}
                  </span>
                  <span>
                    {!uploadComplete ? (
                      <Trash
                        size={18}
                        onClick={handleDelete}
                        className="cursor-pointer"
                      />
                    ) : (
                      <Trash
                        size={18}
                        onClick={handleDelete}
                        className="cursor-pointer"
                      />
                    )}
                  </span>
                </span>
                {!uploadComplete && (
                  <span className="w-full flex justify-between items-center gap-2">
                    <div
                      id="progress"
                      className="w-[93%] h-[6px] bg-gray-200 rounded"
                    >
                      <div
                        style={{
                          width: `${progress}%`,
                          backgroundColor:
                            progress === 100 ? "#50C878" : "#007bff",
                        }}
                        className="h-full transition-all duration-300 rounded-full"
                      ></div>
                    </div>
                    <p className="text-[12px]">{progress}%</p>
                  </span>
                )}
              </div>
            ) : (
              <>
                <img src="/upload.svg" alt="Upload" className="h-10" />
                <div className="flex flex-col gap-1">
                  <h2 className="lg:text-lg md:text-lg text-[16px] font-semibold">
                    Upload or drag and drop Resume
                  </h2>
                  <span className="text-[12px] text-gray">
                    Upload your existing resume in DOC, DOCX or PDF formats
                    <br />{" "}
                    <span className="shrink-none">
                      (Less than 10MB in size).
                    </span>
                  </span>
                </div>
              </>
            )}
          </div>
          <input
            type="file"
            id="resumeInput"
            accept=".doc,.docx,.pdf"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        <div className="w-full py-2 px-0" id="PersonalDetails">
        <PersonalDetails />
        </div>

        <div className="w-full py-2 px-0" id="ProfessionalSummary">
          <ProfessionalSummary />
        </div>

        <div className="w-full py-2 px-0" id="ProfessionalSummary">
          <EmploymentHistory />
        </div>

        <div className="w-full py-2 px-0" id="ProfessionalSummary">
          <Education />
        </div>

        <div className="w-full py-2 px-0" id="ProfessionalSummary">
          <Certifications />
        </div>

        <div className="w-full py-2 px-0" id="ProfessionalSummary">
          <Skills />
        </div>

        <div className="w-full py-2 px-0" id="ProfessionalSummary">
          <SocialProfiles />
        </div>
        
        <Button1 text="Next" onClick={handleButtonClick} className={" absolute lg:right-5 lg:px-24 md:px-24 lg:w-auto md:w-auto w-full"} />

      </div>
    </div>
      }

        
      { showVideoRecorder && <VideoRecorder />}
    </>

  );
};

export default CreateSection;
