import React, { useState } from 'react';
import { ChevronDown, Trash } from "lucide-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomDatePicker from "./CustomDatePicker";
import AddSectionBtn from "./AddSectionBtn";

const CustomSection = () => {
  const [sections, setSections] = useState([]);


 
  return (
    <div>
      <h1 className="mb-8 lg:text-[24px] md:text-[24px] text-[20px] font-semibold w-full">
        Custom
      </h1>
        
        <div className='flex flex-col gap-3'>
          <p className='font-[600]'>Personalize the URL</p>
          <p><span>www.myintro.ai/</span> <input type="text" className='border-[1px] border-gray rounded px-2 py-1 font-[600]'/></p>
          <p className='text-xs text-gray'>Note: Your custom URL must contain 3-100 letters or numbers. Please do not use <br /> spaces, symbols, or special characters.</p>
        </div>

      {/* Input sections */}
          {/* <div className=" my-2 bg-[#F8F9FB] rounded" >
              <div className="flex flex-col gap-5 mt-3">
                <div className="flex gap-7 w-full flex-col lg:flex-row lg:flex-nowrap">
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-[#999999] text-[14px]">Section Title</label>
                    <input
                      type="text"
                      className="rounded border-[1px] p-[10px] px-[16px] font-[500] border-gray"
                      placeholder=""
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-[#999999] text-[14px] text-start">
                    Description
                  </label>
                  <ReactQuill
                    modules={{
                      toolbar: [
                        ["bold"],
                        ["italic"],
                        ["underline"],
                        [{ list: "ordered" }],
                      ],
                    }}
                    formats={["bold", "italic", "underline", "list", "bullet"]}
                    className="w-full min-h-[40px] rounded border border-gray"
                    placeholder="Enter a description..."
                  />
                </div>
              </div>
          </div> */}
      
    </div>
  );
};

export default CustomSection;
