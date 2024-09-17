import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import ToggleBtn from './ToggleBtn';

const CustomDatePicker = ({ selectedDate, onChange, placeholder, showPursuingOption, ToggleText="Currently Pursuing" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(selectedDate || null); // Start with no date selected
  const [isPursuing, setIsPursuing] = useState(false); // Initially not pursuing
  const dateInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dateInputRef.current && !dateInputRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dateInputRef]);

  const handleDateChange = (year, month, closePicker = true) => {
    if (isPursuing) return; // Prevent date changes if pursuing

    const newDate = new Date();
    newDate.setFullYear(year);
    newDate.setMonth(month);
    setCurrentDate(newDate);
    onChange(newDate);
    if (closePicker) setIsOpen(false);
  };

  const months = Array.from({ length: 12 }, (_, index) =>
    format(new Date(0, index), 'MMM')
  );

  const today = new Date();
  const isFutureDate = (year, month) => {
    if (year > today.getFullYear()) return true;
    if (year === today.getFullYear() && month > today.getMonth()) return true;
    return false;
  };

  const handleTogglePursuing = (newState) => {
    setIsPursuing(newState);
    if (newState) {
      setCurrentDate(null); // Clear selected date when toggled to "Pursuing"
      onChange(null);
    } else if (currentDate) {
      onChange(currentDate); // Restore the current date when toggled off
    }
  };

  return (
    <div ref={dateInputRef} className="relative">
      <input
        type="text"
        value={isPursuing ? 'Present' : (currentDate ? format(currentDate, 'MMM, yyyy') : '')}
        onClick={() => setIsOpen(!isOpen)}
        className="w-[157px] rounded border-[1px] p-[10px] px-[16px] font-[500] border-gray placeholder:text-center"
        placeholder={placeholder}
        readOnly
      />
      {isOpen && (
        <div className="absolute bg-white mt-1 rounded shadow-lg p-4 z-10 w-[280px] md:w-[320px] lg:w-[280px] top-full left-0 md:left-auto md:right-0 lg:left-0 transform translate-x-0 lg:translate-x-0 md:translate-x-0 max-w-full sm:max-w-[90vw] overflow-auto">
          <div className="flex justify-between items-center">
            <button
              onClick={() => !isFutureDate(currentDate ? currentDate.getFullYear() - 1 : today.getFullYear() - 1, currentDate ? currentDate.getMonth() : today.getMonth()) &&
                handleDateChange((currentDate ? currentDate.getFullYear() : today.getFullYear()) - 1, currentDate ? currentDate.getMonth() : today.getMonth(), false)}
              disabled={isFutureDate(currentDate ? currentDate.getFullYear() - 1 : today.getFullYear() - 1, currentDate ? currentDate.getMonth() : today.getMonth()) || isPursuing}
            >
              <ChevronLeft size={20} />
            </button>
            <span className='p-2 px-4 bg-[#458FE9] text-white rounded-full lg:text-[16px] md:text-[16px] text-[14px]'>{currentDate ? currentDate.getFullYear() : today.getFullYear()}</span>
            <button
              onClick={() => !isFutureDate(currentDate ? currentDate.getFullYear() + 1 : today.getFullYear() + 1, currentDate ? currentDate.getMonth() : today.getMonth()) &&
                handleDateChange((currentDate ? currentDate.getFullYear() : today.getFullYear()) + 1, currentDate ? currentDate.getMonth() : today.getMonth(), false)}
              disabled={isFutureDate(currentDate ? currentDate.getFullYear() + 1 : today.getFullYear() + 1, currentDate ? currentDate.getMonth() : today.getMonth()) || isPursuing}
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2 lg:text-[16px] md:text-[16px] text-[14px]">
            {months.map((month, index) => (
              <button
                key={month}
                onClick={() => !isFutureDate(currentDate ? currentDate.getFullYear() : today.getFullYear(), index) &&
                  handleDateChange(currentDate ? currentDate.getFullYear() : today.getFullYear(), index)}
                disabled={isFutureDate(currentDate ? currentDate.getFullYear() : today.getFullYear(), index) || isPursuing}
                className={`p-1 rounded ${isFutureDate(currentDate ? currentDate.getFullYear() : today.getFullYear(), index) || isPursuing ? 'opacity-60 cursor-not-allowed' : 'bg-white text-black'}`}
              >
                {month}
              </button>
            ))}
          </div>
          {showPursuingOption && (
            <label className="flex items-center gap-3 mt-5 justify-start lg:px-4">
              <ToggleBtn onToggle={handleTogglePursuing} toggled={isPursuing} />
              <span className='lg:text-[16px] md:text-[16px] text-[12px] text-gray '>{ToggleText}</span>
            </label>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
