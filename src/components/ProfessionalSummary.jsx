import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Default Quill theme
import './custom-quill.css'; // Your custom styles

const ProfessionalSummary = () => {
  const [text, setText] = useState(''); // State to hold the text content
  const maxLength = 1000; // Maximum length of characters allowed

  const handleChange = (value) => {
    const plainText = value.replace(/<[^>]*>/g, ''); // Remove HTML tags to get plain text
    if (plainText.length <= maxLength) {
      setText(value); // Update the text state if within limit
    } else {
      const truncatedText = text.substring(0, text.length - (plainText.length - maxLength)); // Calculate allowed text length
      setText(truncatedText); // Set text to truncated value
    }
  };

  // Calculate the length of the text without HTML tags
  const textLength = text.replace(/<[^>]*>/g, '').length;

  return (
    <div className="relative">
      <h1 className="mb-2 lg:text-[24px] md:text-[24px] text-[20px] font-semibold">
        Professional Summary
      </h1>
      <ReactQuill
        value={text}
        onChange={handleChange}
        modules={{
          toolbar: [
            ['bold'],
            ['italic'],
            ['underline'],
            [{ 'list': 'ordered' }],
          ],
        }}
        formats={[
          'bold', 'italic', 'underline',
          'list', 'bullet'
        ]}
        className="w-full min-h-[40px] rounded border border-gray"
        placeholder="Enter a description..."
      />
      <div className="text-right text-gray-500 mt-2 absolute bottom-2 right-2">
        {textLength}/<span className='opacity-60'>{maxLength}</span>
      </div>
    </div>
  );
};

export default ProfessionalSummary;
