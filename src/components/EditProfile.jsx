import React from 'react';
import { ChevronDown, LogOut } from 'lucide-react';
import Navbar from './Navbar';
import Banner from './Banner';
import CreateSection from './CreateSection'
import Footer from './Footer'
import EditSection from './EditSection';

const EditProfile = () => {
  return (
    <div>
      <div className="sticky top-0 bg-white z-30">
        <Navbar />
      </div>
      <EditSection />
      {/* <Footer /> */}
    </div>
  );
}

export default EditProfile;
