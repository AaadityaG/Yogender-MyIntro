import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col lg:flex-row md:flex-col justify-between items-center lg:py-12 lg:px-24 md:py-12 md:px-24 p-7 text-gray gap-2 lg:gap-0 md:gap-0'>
       <div className='flex lg:flex-row md:flex-row flex-col items-center justify-center gap-6'>
            <img src="Logo.png" alt="logo" className='lg:w-[145px] md:w-[145px] w-[109.06px]' />
            <p>©2024 - Copyright @ <a href="#">Myintro.ai</a></p>
       </div>
       <div className='flex items-center justify-center gap-6 lg:text-[16px] md:text-[16px] text-[12px] lg:opacity-100 md:opacity-100 opacity-70'>
            <a href='#'>Support</a>
            <a href='#'>Privacy Policy</a>
            <a href='#'>English (EN)</a>
       </div>
    </div>
  )
}

export default Footer
