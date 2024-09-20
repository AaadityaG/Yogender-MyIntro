import React, { useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  Phone,
  Mail,
  MapPin,
  Download,
  GraduationCap,
  Award,
  UserPlus,
  TimerReset,
  CirclePlay,
} from "lucide-react";
// import html2pdf from "html2pdf.js";
import html2pdf from "html2pdf.js";
import { Link } from "react-router-dom";

const ResumeDoc1 = ({ userProfile }) => {
  const resumeRef = useRef(null);

  const downloadResumeAsPDF = () => {
    const element = resumeRef.current;
    const opt = {
      margin: 0,
      filename: `${userProfile?.data?.full_name}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    };
    
    html2pdf().from(element).set(opt).save();
  };

  return (
    <>
      <Navbar
        CustomComponent={
          <button
            className="font-[600] flex gap-2 items-center justify-center"
            onClick={downloadResumeAsPDF}
          >
            <Download size={20} />
          </button>
        }
      />
      <div ref={resumeRef} className="w-full h-full">
        {/* Table structure for the resume layout */}
        <table
          style={{
            // width: "100%",
            // borderCollapse: "collapse",
            // tableLayout: "fixed",
            padding: "10px", fontSize: "15px" 
          }}
          border="0"
        >
          <tbody>
            <tr >
              {/* Left section */}
              <td
                style={{
                  width: "33%",
                  // height: "100vh",
                  backgroundColor: "#1E3A5F",
                  color: "white",
                  verticalAlign: "top",
                  padding: "28px",
                }}
              >
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="/sam.png"
                    alt="Profile Pic"
                    className="w-32 h-32 rounded-full border-4 border-white"
                  />
                  <h1 className="text-2xl">My name</h1>
                  {/* <Link to="/public-profile" className="my-2"> */}
                    <a href="#" className="gap-2 my-2" style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                      <CirclePlay size={20} />
                      <p className="text-center">View Introduction</p>
                    </a>
                  {/* </Link> */}
                </div>

                <div className="text-start flex flex-col gap-1 items-start w-full mt-4">
                  <p className="flex gap-1 items-center " style={
                    {
                      lineHeight: '32px',
                      verticalAlign: 'middle',
                    }
                  }>
                    <Phone size={18} />
                    {userProfile?.phone || "+919363636333"}
                  </p>
                  <p className="flex gap-1 items-center">
                    <Mail size={18} />
                    {userProfile?.email || "hsadfsdf@sdfsd.com"}
                  </p>
                  <p className="flex gap-1 items-center justify-center">
                    {/* <MapPin size={18} /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="17" viewBox="0 0 10 12" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.99994 11.1965C4.99994 11.1965 9.0492 7.31825 9.0492 4.04926C9.0492 1.81291 7.23628 0 4.99994 0C2.7636 0 0.950684 1.81291 0.950684 4.04926C0.950684 7.31825 4.99994 11.1965 4.99994 11.1965ZM5 5.80088C5.93913 5.80088 6.70044 5.03957 6.70044 4.10044C6.70044 3.16131 5.93913 2.4 5 2.4C4.06087 2.4 3.29956 3.16131 3.29956 4.10044C3.29956 5.03957 4.06087 5.80088 5 5.80088Z" fill="#fff"></path>
                      </svg>
                    {userProfile?.location || "Pune, Maharashtra!"}
                  </p>
                </div>

                <hr className="my-3 w-[95%] text-white" />

                {/* Education */}
                <div className="w-full">
                  <p className="font-[500] text-[20px] flex gap-3 items-center">
                    <span><GraduationCap /></span> Education
                  </p>
                  <div className="mt-3">
                    <h2 className="font-[600]">IIM Bangalore | <span className="font-[400]">Research and Analysis on Corporate Finance | Jan 2022 - Present</span></h2>
                    <h2 className="font-[600]">IIM Bangalore | <span className="font-[400]">Research and Analysis on Corporate Finance | Jan 2022 - Present</span></h2>
                    <h2 className="font-[600]">IIM Bangalore | <span className="font-[400]">Research and Analysis on Corporate Finance | Jan 2022 - Present</span></h2>
                  </div>
                </div>

                <hr className="my-3 w-[95%] text-white" />

                {/* Certifications */}
                <div className="w-full">
                  <p className="font-[500] text-[20px] flex gap-3 items-center">
                    🏆 Certifications
                  </p>
      
                  <div className="mt-3">
                    <h2 className="font-[600]">Stanford University | <span className="font-[400]">Machine Learning | 2022 - 2022</span></h2>
                    <h2 className="font-[600]">University of Michigan | <span className="font-[400]">Successful Negotiation: Strategies and Skills | 2022 - 2022</span></h2>
                    {/* <h2 className="font-[600]">M.S. Ramaiah University | <span className="font-[400]">Budgeting and controlling course | 2022 - 2022</span></h2> */}
                  </div>
                </div>

                <hr className="my-3 w-[95%] text-white" />

                {/* Skills */}
                <div className="w-full">
                  <p className="font-[500] text-[20px] flex gap-3 items-center">
                    <UserPlus /> Top Skills
                  </p>
                  <div className="mt-3">
                    <p>Skill 1</p>
                    <p>Skill 2</p>
                    <p>Skill 3</p>
                  </div>
                </div>

                <hr className="my-3 w-[95%] text-white" />

                {/* Availability */}
                <div className="w-full">
                  <p className="font-[500] text-[20px] flex gap-3 items-center">
                    <TimerReset /> Availability
                  </p>
                  <div className="mt-3 flex gap-1">
                    <p>Immediate</p> <p>•</p> <p>Fulltime</p>
                  </div>
                </div>
              </td>

              {/* Right section */}
              <td
                style={{
                  width: "67%",
                  backgroundColor: "white",
                  verticalAlign: "top",
                  padding: "20px",
                  position: "relative"
                }}
              >
                {/* Profile Summary */}
                <div className="px-3">
                  {/* <h1 className="font-[500] text-lg flex gap-3 items-center my-3">
                    <img src="/prof.png" alt="Profile" className="w-4" />
                    Profile Summary
                  </h1> */}
                  <h1 className="font-[500] text-lg flex items-center gap-3 my-3 mb-0">
                    <img src="/prof.png" alt="Profile" className="w-4 h-4" />
                    Profile Summary
                  </h1>
                  <p
                    
                  >
                    I am a finance consultant with 5 years of experience in the finance industry. Skilled in Advanced Excel, Microsoft Office, Power BI, and more. I produce interactive reports for efficient decision-making.
                  </p>
                </div>

                {/* Professional Experience */}
                <div className="px-3 flex flex-col gap-2 my-3">
                  <h1 className="font-[500] text-lg flex gap-3 items-center ">
                    <img src="/prof.png" alt="Profile" className="w-4" />
                    Professional Experience
                  </h1>
                  <div className="flex flex-col gap-3 pl-3">
                    <p className="font-bold text-[#3d4465]">Finance Consultant</p>
                    <p className="flex gap-1">
                      <span>AYR Wellness</span> <span className="px-2">|</span>{" "}
                      <span>Oct 2022 - Present</span>
                    </p>
                    <span>
                      Involved in Inventory management, MIS reporting, profitability analysis, costing, trend analysis, and more.
                    </span>
                  </div>
                  <hr className="my-5" />

                  {/* Repeat Experience block */}
                  <div className="flex flex-col gap-3 pl-3">
                    <p className="font-bold text-[#3d4465]">Finance Consultant</p>
                    <p className="flex gap-1">
                      <span>AYR Wellness</span> <span className="px-2">|</span>{" "}
                      <span>Oct 2022 - Present</span>
                    </p>
                    <span>
                      Involved in Inventory management, profitability analysis, costing, and more.
                    </span>
                  </div>
                </div>

                <div className="text-center flex items-center justify-center  absolute bottom-0 right-5">
    <div className="text-sm text-gray-500 flex gap-2 items-center justify-center">POWERED BY <a href="#"><img src="/Logo.png" alt="" className="w-20" /></a></div>
  </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default ResumeDoc1;
