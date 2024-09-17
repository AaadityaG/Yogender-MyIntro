import React from 'react';

const Banner = () => {
  return (
    <>
      <div className='w-full flex flex-col items-center relative'>
        <img src="/DefaultBanner.png" alt="" className='min-h-[70px] h-auto w-full object-cover'/>
        <button id="uploadResume" className='w-[282px] shadow-lg rounded-full p-4 px-6 absolute z-10 lg:top-[80%] md:top-[80%] top-[70%] bg-white flex items-center justify-center font-[600] gap-3 text-[16px] md:text-[16px] lg:text-[16px]'>
          <span className='text-primary'>Upload Resume</span> 
          <hr className='w-[20px]' />
          <span className='text-gray'>Record</span>
        </button>
      </div>
    </>
  );
}

export default Banner;
