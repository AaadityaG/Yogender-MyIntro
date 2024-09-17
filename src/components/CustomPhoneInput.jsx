import React, { useState, useEffect } from 'react';
import { countryCodes } from "../data/country-codes-list.js";
import { ChevronDown } from 'lucide-react';

// const countryCodes = [
//   { code: '+1', country: 'US' },
//   { code: '+44', country: 'UK' },
//   { code: '+91', country: 'IN' },
// ];

const CustomPhoneInput = () => {
  const [selectedCode, setSelectedCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [codeInput, setCodeInput] = useState('+1');
  const [filteredCountryCodes, setFilteredCountryCodes] = useState(countryCodes);

  const handleCodeSelect = (code) => {
    setSelectedCode(code);
    setCodeInput(code); // Set input value to the selected code
    setIsDropdownOpen(false);
  };

  const handleCodeInputChange = (e) => {
    const value = e.target.value;
    setCodeInput(value);
    setIsDropdownOpen(true);
    setFilteredCountryCodes(
      countryCodes.filter((country) =>
        country.code.includes(value)
      )
    );
  };

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.relative')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <label className="text-[#999999] text-[14px]">Phone</label>
      <div className="flex items-center border border-gray rounded mt-1">
        <input
          type="text"
          value={codeInput}
          onChange={handleCodeInputChange}
          className="w-[60px] p-[10px] pr-0 outline-none font-[500]"
          placeholder="+"
          onFocus={() => setIsDropdownOpen(true)}
        />
        <ChevronDown
          size={20}
          className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
        />
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="flex-1 p-[10px]"
          placeholder="Enter your phone number"
        />
      </div>
      {isDropdownOpen && filteredCountryCodes.length > 0 && (
        <div className="absolute top-full left-0 mt-1 h-[200px] overflow-y-auto w-[80px] border border-r-none border-gray bg-white shadow-lg z-10">
          {filteredCountryCodes.map((country) => (
            <button
              key={country.code}
              onClick={() => handleCodeSelect(country.code)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 hover:bg-[#bfbfbf]"
            >
              {country.code}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomPhoneInput;
