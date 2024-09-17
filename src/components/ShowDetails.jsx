import React from 'react'
import { ChevronDown, Trash } from "lucide-react";


const ShowDetails = () => {
  return (
    <div className="w-full flex flex-col p-4 gap-3 bg-[#F8F9FB]">
        <p className="flex justify-between"><span className='font-[600]'>Designner at Zee, Pune</span> <ChevronDown  /></p>
        <p className="flex justify-between text-gray"><span>March 2022 - April 2023</span> <button><Trash size={20} /></button></p>
      </div>
  )
}

export default ShowDetails
