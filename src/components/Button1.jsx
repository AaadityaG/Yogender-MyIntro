import React from "react";

const Button1 = ({ text, onClick, className, disabled = false }) => {
  return (
    <button 
      onClick={onClick}
      className={`p-[10px] text-[16px] hover:bg-[#05046A] bg-primary rounded-[100px] font-[600] text-white ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button1;
