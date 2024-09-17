import React, { useState, useRef, useEffect } from "react";
import { BsRecordCircle } from "react-icons/bs";
import { CirclePause, CirclePlay, RefreshCcw, Trash } from "lucide-react";
import Button1 from "./Button1";
import "./Record.css";
// import "./Recording.js";

const VideoRecorder = () => {
  return (
    <>
      <div>
        <div className="flex flex-col items-center w-full mt-7">
          <div className="w-full max-w-6xl mb-10 py-10 flex items-start gap-3 flex-wrap lg:flex-nowrap md:flex-nowrap">
            <div
              id="text"
              className="flex flex-col gap-3 lg:items-start md:items-start items-start lg:w-2/3 md:w-2/3 w-full px-4 lg:px-0 md:px-0"
            >
              <h1 className="lg:text-[36px] md:text-[36px] text-[28px] font-bold w-full lg:text-start md:text-start text-center">
                Record Introduction
              </h1>
              <p className="sm:hidden text-center w-full">
                Find a place, relax and just <br /> be yourself
              </p>
              <p className="text-gray text-start shrink-none lg:mt-0 md:mt-0 mt-8">
                Don't have a script to create your video resume?
                <br className="hidden lg:inline md:inline leading-7" /> Don't
                worry we got you covered!
              </p>
              <button className="p-2 px-4 border border-black bg-transparent rounded-full font-[600] flex items-center justify-center gap-2">
                <img src="/logoIcon.png" alt="" className="w-5 h-5" />
                <span>Generate with AI</span>
              </button>
            </div>

            <div
              id="video"
              className="w-full h-[400px] flex flex-col gap-3 mt-2"
            >
              {videoUrl ? (
                <video
                  className="w-full h-full object-contain"
                  src={videoUrl}
                  controls
                />
              ) : (
                <>
                  {countdown !== null ? (
                    <div className="flex justify-center border-4 border-dashed border-[red] items-center w-full h-full bg-gray-200">
                      <span className="text-4xl">{countdown}</span>
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      {isRecording && (
                        <div className="absolute top-2 left-2 flex items-center gap-2 bg-orange-400 text-white px-2 py-1 rounded-full text-xs">
                          <BsRecordCircle className="text-xl animate-pulse" />
                          <span>
                            <span className="hidden lg:inline md:inline">
                              Recording{" "}
                            </span>
                            {formatSeconds(seconds)}
                          </span>
                        </div>
                      )}
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover bg-white"
                      />

                      {!isRecording && (
                        <div className="absolute top-0 border-4 opacity-40 border-black border-dashed w-full h-full flex items-center justify-center text-xl">
                          Start Recording
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              <div className="w-full flex items-center lg:justify-end md:justify-end justify-center lg:gap-5 md:gap-5 gap-7 text-gray">
                {isRecording ? (
                  <>
                    <button
                      onClick={handleDeleteClick}
                      className="lg:flex md:flex gap-1 items-center"
                    >
                      <Trash className="w-7" />
                      <span className="hidden lg:inline md:inline">Delete</span>
                    </button>
                    <button
                      onClick={handlePauseResume}
                      className="lg:flex md:flex gap-1 items-center"
                    >
                      {paused ? (
                        <>
                          <CirclePlay className="w-7" />{" "}
                          <span className="hidden lg:inline md:inline">
                            Resume
                          </span>
                        </>
                      ) : (
                        <>
                          <CirclePause className="w-7" />{" "}
                          <span className="hidden lg:inline md:inline">
                            Pause
                          </span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleRetake}
                      className="lg:flex md:flex gap-1 items-center"
                    >
                      <RefreshCcw className="w-7" />
                      <span className="hidden lg:inline md:inline">Retake</span>
                    </button>
                    <Button1
                      text="Save & End"
                      className="lg:px-16 md:px-16 px-12"
                      onClick={handleStopRecording}
                    />
                  </>
                ) : (
                  <div className={`${recordingEnded && "hidden"} flex gap-4`}>
                    <button className="text-gray">Record later</button>
                    <Button1
                      text="Start Recording"
                      className="lg:px-16 md:px-16 px-12"
                      onClick={handleStartRecording}
                      disabled={isRecording || countdown}
                    />
                  </div>
                )}
                {recordingEnded && (
                  <>
                    <button
                      onClick={handleDeleteClick}
                      className="lg:flex md:flex gap-1 items-center"
                    >
                      <Trash className="w-7" />
                      <span className="hidden lg:inline md:inline">Delete</span>
                    </button>

                    <button
                      onClick={handleRetake}
                      className="lg:flex md:flex gap-1 items-center"
                    >
                      <RefreshCcw className="w-7" />
                      <span className="hidden lg:inline md:inline">Retake</span>
                    </button>
                    <Button1
                      text="Go to Profile"
                      className="lg:px-16 md:px-16 px-12"
                      onClick={() => alert("Navigating to profile...")}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            {/* <h2 className="text-xl font-semibold mb-4">Delete Recording</h2> */}
            <p className="text-gray-700 mb-4 text-center lg:text-[20px] md:text-[20px] text-[16px]">
              Are you sure you want to delete the video introduction?
            </p>
            <div className="flex justify-center gap-4 w-full">
              <button
                className="px-4 py-2 bg-gray-300 rounded-full w-full  hover:bg-gray-400 border-[1px]  "
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <Button1
                className="px-8 py-2  text-white  w-full"
                onClick={confirmDelete}
                text="Delete"
              >
                Delete
              </Button1>
            </div>
          </div>
        </div>
      )}

      <div className="h-screen" id="BackgroundDiv">
        asdfsdfsd
      </div>
    </>
  );
};

export default VideoRecorder;
