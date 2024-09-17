import React from "react";

const ToggleBtn = ({ toggled, onToggle }) => {
  const handleToggle = () => {
    const newState = !toggled;
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <button
      className="relative h-6 w-10 cursor-pointer rounded-full duration-200 shrink-0"
      onClick={handleToggle}
      style={{
        backgroundColor: toggled ? "#458FE9" : "#24252d50",
      }}
    >
      <span
        className={`absolute left-0 top-0 rounded-full bg-white shadow-lg transition-all duration-200 
          ${toggled ? 'translate-x-full transform h-4 w-4 m-1' : ' transform h-4 w-4 m-1'}
        `}
      />
    </button>
  );
};

export default ToggleBtn;
