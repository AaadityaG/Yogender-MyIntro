import React, { useState } from 'react';
import { ChevronDown, Trash } from "lucide-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomDatePicker from "./CustomDatePicker";
import AddSectionBtn from "./AddSectionBtn";

const Education = () => {
  const [sections, setSections] = useState([]);

  const addSection = () => {
    setSections([...sections, { 
      isOpen: true, 
      startDate: null, 
      endDate: null, 
      isPursuing: false,
      degree: '',
      school: '',
      city: '',
    }]);
  };

  const toggleDrawer = (index) => {
    const newSections = sections.map((section, i) => {
      if (i === index) {
        return { ...section, isOpen: !section.isOpen };
      }
      return section;
    });
    setSections(newSections);
  };

  const handleInputChange = (index, e, field) => {
    const newSections = sections.map((section, i) => {
      if (i === index) {
        return { ...section, [field]: e.target.value };
      }
      return section;
    });
    setSections(newSections);
  };

  const handleDateChange = (index, date, type) => {
    const newSections = sections.map((section, i) => {
      if (i === index) {
        return { ...section, [type]: date };
      }
      return section;
    });
    setSections(newSections);
  };

  const deleteSection = (index) => {
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
  };

  return (
    <div>
      <h1 className="mb-2 lg:text-[24px] md:text-[24px] text-[20px] font-semibold w-full">
        Education
      </h1>
      {sections.map((section, index) => {
        const degree = section.degree;
        const school = section.school;
        const city = section.city;
        const startDate = section.startDate ? section.startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '';
        const endDate = section.endDate ? section.endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : section.isPursuing ? 'Present' : '';

        const isAnyFieldFilled = degree || school || city || startDate || endDate;

        return (
          <div className="p-4 my-2 bg-[#F8F9FB] rounded" key={index}>
            <div className="text-base font-[600] w-full flex justify-between items-start">
              <div className="w-full flex flex-col gap-3 bg-[#F8F9FB]">
                {isAnyFieldFilled ? (
                  <>
                    <p className="flex justify-between">
                      <span className='font-[600]'>{`${degree || 'Degree'} at ${school || 'School/College'}, ${city || 'City'}`}</span>
                    </p>
                    <p className="flex justify-between text-gray font-[400]">
                      <span>{`${startDate || 'Start'} - ${endDate || 'End'}`}</span>
                    </p>
                  </>
                ) : (
                  <span>(Not Specified)</span>
                )}
              </div>
              <div className='flex gap-2'>
                <button onClick={() => toggleDrawer(index)}>
                  <ChevronDown className={`${section.isOpen ? 'transform rotate-180' : ''}`} />
                </button>
                <button onClick={() => deleteSection(index)}>
                  <Trash size={20} className='hover:color-gray' />
                </button>
              </div>
            </div>
            {section.isOpen && (
              <div className="flex flex-col gap-5 mt-3">
                <div className="flex gap-7 w-full flex-col lg:flex-row lg:flex-nowrap">
                  <div className="flex flex-col gap-2 w-full max-w-[360px]">
                    <label className="text-[#999999] text-[14px]">Degree</label>
                    <input
                      type="text"
                      className="rounded border-[1px] p-[10px] px-[16px] font-[500] border-gray"
                      value={section.degree}
                      onChange={(e) => handleInputChange(index, e, 'degree')}
                      placeholder=""
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full max-w-[360px]">
                    <label className="text-[#999999] text-[14px]">School/College</label>
                    <input
                      type="text"
                      className="rounded border-[1px] p-[10px] px-[16px] font-[500] border-gray"
                      value={section.school}
                      onChange={(e) => handleInputChange(index, e, 'school')}
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="flex  gap-7 w-full flex-col lg:flex-row lg:flex-nowrap">
                  <div className="flex flex-col gap-2">
                    <label className="text-[#999999] text-[14px]">
                      Start & End Date
                    </label>
                    <div className="flex gap-3 max-w-[360px]">
                      <CustomDatePicker
                        selectedDate={section.startDate}
                        onChange={(date) => handleDateChange(index, date, "startDate")}
                        placeholder="MM/YYYY"
                      />
                      <CustomDatePicker
                        selectedDate={section.endDate}
                        onChange={(date) => handleDateChange(index, date, "endDate")}
                        placeholder="MM/YYYY"
                        isPursuingg={section.isPursuing}
                        showPursuingOption={true}
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 w-full max-w-[360px]">
                    <label className="text-[#999999] text-[14px]">City</label>
                    <input
                      type="text"
                      className="rounded border-[1px] p-[10px] px-[16px] font-[500] border-gray"
                      value={section.city}
                      onChange={(e) => handleInputChange(index, e, 'city')}
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-[#999999] text-[14px] text-start">
                    Summary
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
            )}
          </div>
        );
      })}
      <button
        className="my-3"
        onClick={addSection}
      >
        <AddSectionBtn text="Education" />
      </button>
    </div>
  );
};

export default Education;
