import React, { useState, useRef, useEffect } from 'react';
import { Check, Plus } from 'lucide-react';
import AddSectionBtn from './AddSectionBtn';

// Dummy skills for demonstration
const allSkills = [
  'JavaScript', 'React', 'Node.js', 'CSS', 'HTML',
  'Python', 'Django', 'TypeScript', 'Java', 'C++'
];

const Skills = () => {
  const [sections, setSections] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSkills, setFilteredSkills] = useState(allSkills);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false); // To control visibility
  const inputRef = useRef(null);

  useEffect(() => {
    // Filter skills based on the search term
    setFilteredSkills(
      allSkills.filter(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  const handleInputClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSkillClick = (skill) => {
    if (sections.includes(skill)) {
      setSections(sections.filter(s => s !== skill));
    } else {
      setSections([...sections, skill]);
    }
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  const handleTagRemove = (skill) => {
    setSections(sections.filter(s => s !== skill));
    setFilteredSkills([...filteredSkills, skill].sort());
  };

  const handleAddSectionClick = () => {
    setIsSectionVisible(true);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className='mb-3'>
        <h1 className="mb-2 lg:text-[24px] md:text-[24px] text-[20px] font-semibold w-full">
          Skills
        </h1>
        {isSectionVisible && (
          <div ref={inputRef} className="relative">
            <div className="flex flex-wrap gap-2 mb-2">
              {sections.map(skill => (
                <div
                  key={skill}
                  className="flex items-center gap-2 rounded px-3 py-1 bg-[#EFF2F8] text-primary cursor-pointer"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => handleTagRemove(skill)}
                    className="text-primary"
                  >
                    <Check size={15} />
                  </button>
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Search for skills..."
              value={searchTerm}
              onClick={handleInputClick}
              onChange={handleSearchChange}
              className="border rounded p-3 w-full px-[16px] font-[500] border-gray"
            />
            {isDropdownOpen && (
              <div className="absolute z-30 top-full left-0 w-full mt-1 border rounded bg-white shadow-lg max-h-60 overflow-auto">
                {filteredSkills.length > 0 ? (
                  filteredSkills.map(skill => (
                    <p
                      key={skill}
                      className="flex gap-2 rounded px-5 py-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSkillClick(skill)}
                    >
                      <span>{skill}</span>
                      {sections.includes(skill) && <Check size={15} />}
                    </p>
                  ))
                ) : (
                  <p className="p-2 text-gray-500">No skills found</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {!isSectionVisible && (
        <AddSectionBtn className="my-3" text='Skills' onClick={handleAddSectionClick} />
      )}
    </>
  );
};

export default Skills;
