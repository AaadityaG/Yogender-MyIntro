import React, { useState } from "react";

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState(null);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(URL.createObjectURL(file));
    }
  };

  const handleRemoveVideo = () => {
    setVideoFile(null);
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100">
      <div className="bg-primary p-3 rounded-lg shadow-lg w-full max-w-lg">
        {/* <h2 className="text-2xl font-bold mb-4">Upload Your Video</h2> */}

        {videoFile ? (
          <div className="">
            <video controls src={videoFile} className="w-full rounded-lg mb-4" />
            <button
              onClick={handleRemoveVideo}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300"
            >
              Remove Video
            </button>
          </div>
        ) : (
          <div className="">
            <label
              htmlFor="video-upload"
              className="px-4 py-2 bg-[#2445F] text-white rounded-lg cursor-pointer transition duration-300"
            >
              Upload Video
            </label>
            <input
              id="video-upload"
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="hidden"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;
