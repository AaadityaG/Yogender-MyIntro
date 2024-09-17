import React from 'react';

const AddSectionBtn = ({ text = "", onClick }) => {
  return (
    <button
      className='text-primary font-[600] text-md'
      onClick={onClick} // Add the onClick handler
    >
      + Add {text}
    </button>
  );
};

export default AddSectionBtn;
