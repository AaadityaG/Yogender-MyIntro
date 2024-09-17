import React from "react";
import { ChevronDown, Trash } from "lucide-react";

const SocialProfiles = () => {
  return (
    <div className="">
      <h1 className="mb-3 text-[20px] md:text-[24px] font-semibold">
        Social Profile
      </h1>
      <div className="my-2 bg-[#F8F9FB] rounded">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-4">
          {/* Twitter Input */}
          <div className="flex items-center gap-2 relative">
            <div className="absolute left-3 flex gap-2">
              <img src="/X.png" alt="Twitter icon" className="w-6 h-6" />
              <span className="opacity-45">|</span>
            </div>
            <input
              type="text"
              className="pl-14 rounded border-[1px] p-3 px-4 font-medium border-gray w-full"
              placeholder="@username"
            />
          </div>

          {/* Instagram Input */}
          <div className="flex items-center gap-2 relative">
            <div className="absolute left-3 flex gap-2">
              <img src="/Insta.png" alt="Instagram icon" className="w-6 h-6" />
              <span className="opacity-45">|</span>
            </div>
            <input
              type="text"
              className="pl-14 rounded border-[1px] p-3 px-4 font-medium border-gray w-full"
              placeholder="@username"
            />
          </div>

          {/* Additional Inputs */}
          <div className="flex items-center gap-2 relative">
            <div className="absolute left-3 flex gap-2">
              <img src="/Fb.png" alt="Facebook icon" className="w-6 h-6" />
              <span className="opacity-45">|</span>
            </div>
            <input
              type="text"
              className="pl-14 rounded border-[1px] p-3 px-4 font-medium border-gray w-full"
              placeholder="@username"
            />
          </div>

          <div className="flex items-center gap-2 relative lg:col-span-1">
            <div className="absolute left-3 flex gap-2">
              <img src="/globe.png" alt="Website icon" className="w-6 h-6" />
              <span className="opacity-45">|</span>
            </div>
            <input
              type="text"
              className="pl-14 rounded border-[1px] p-3 px-4 font-medium border-gray w-full"
              placeholder="@username"
            />
          </div>

          <div className="flex items-center gap-2 relative lg:col-span-1">
            <div className="absolute left-3 flex gap-2">
              <img src="/linkedIn.png" alt="LinkedIn icon" className="w-6 h-6" />
              <span className="opacity-45">|</span>
            </div>
            <input
              type="text"
              className="pl-14 rounded border-[1px] p-3 px-4 font-medium border-gray w-full"
              placeholder="@username"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProfiles;
