import React, { useRef, useContext } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { UserProfileContext } from "../context/UserProfileContext";
import { Phone, Mail, MapPin, CirclePlay,Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeDoc2 = () => {
  const resumeRef = useRef(null);
  const userProfile = useContext(UserProfileContext);

  const downloadResumeAsPDF = () => {
    const input = resumeRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${userProfile?.data?.full_name}_Resume.pdf`);
    });
  };

  return (
    <>
      <Navbar CustomComponent={<>
        <button
          className=" font-[600] flex gap-2 items-center justify-center"
          onClick={downloadResumeAsPDF}
        >
          <Download size={20} />
        </button>
        </>} />
      <div className="p-10 px-20" ref={resumeRef}>
        {/* Resume Layout */}
        <div className="resume-content text-start">
          <h1 className="uppercase font-bold text-[72px] leading-tight">John<br />Doe</h1>
          <p className="text-[18px] text-gray-600 flex justify-between items-center">
            <span className="text-gray">{userProfile?.data?.job_title || "Software Developer"} at{" "}
            {userProfile?.data?.company || "Tech Company"}</span>
            <button className="text-primary text-[24px] font-[600] flex gap-3 items-center"><CirclePlay /> <span>View Introduction</span></button>
          </p>
          <hr className="my-7 text-gray opacity-45 " />
        </div>

        <div className="grid grid-cols-6 gap-20 text-[18px]">
          {/* Left Section */}
          <div className="col-span-2 space-y-8">
            <div>
              <h2 className="uppercase text-[32px] font-[600] tracking-widest my-4">Details</h2>
              <div className="flex flex-col text-black gap-4">
                <p className="flex gap-2 items-start flex-col">
                   <span className="font-[600]">LOCATION</span>  <span className="text-gray">New Delhi, India</span>
                </p>
                <p className="flex gap-2 items-start flex-col">

                <span className="font-[600]">PHONE</span> <span className="text-gray">+91 9958579090</span>
                </p>
                <p className="flex gap-2 items-start flex-col">

                <span className="font-[600]">EMAIL</span> <span className="text-gray">rakesh4322@gmail.com</span>
                </p>
              </div>
            </div>
            {/* Skills Section */}
            <div>
              <h2 className="uppercase text-[32px] font-[600] tracking-widest my-4">Skills</h2>
              <div className="space-y-4 ">
                {["JavaScript", "React", "Node.js", "CSS", "HTML", "Python", "Nextjs", "TailwindCSS"].map((skill, index) => (
                  <div key={index}>
                    <p className="text-gray">{skill}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div className="bg-black h-2.5 rounded-full w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* certificate Section */}
            <div>
              <h2 className="uppercase text-[32px] font-[600] tracking-widest my-4">CERTIFICATE</h2>
              <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <p className="text-black">Programming Basics by IIT Bombay </p>
                <p className="text-gray">2021</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-black">Programming Basics by IIT Bombay </p>
                <p className="text-gray">2021</p>
              </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-span-4 space-y-10">
            <div>
              <h2 className="uppercase text-[32px] font-[600] tracking-widest my-4">Professional Summary</h2>
              <p className="text-gray">
              Accomplished UX Design Director with over [X] years of experience in leading innovative design strategies and crafting user-centric digital solutions. Adept at managing and inspiring cross-functional teams to achieve high-impact results. Demonstrated expertise in balancing creative vision with business objectives, driving user engagement, and enhancing overall user satisfaction. Proven track record in improving product usability and ensuring seamless user experiences across multiple platforms.
              </p>
            </div>
          <hr className="my-7 text-gray opacity-45 " />

            {/* Employment History */}
            <div>
              <h2 className="uppercase text-[32px] font-[600] tracking-widest my-4">Employment History</h2>
              {/* {userProfile?.data?.employment_history.slice(0, 2).map((job, index) => (
                <div key={index} className="flex justify-between">
                  <div className="w-[48%]">
                    <p className="font-bold">
                      {job.job_title}, {job.employer}
                    </p>
                    <p className="text-gray-600">
                      {new Date(job.start_date).toLocaleString("default", { month: "short", year: "numeric" })} -{" "}
                      {new Date(job.end_date).toLocaleString("default", { month: "short", year: "numeric" })}
                    </p>
                    <ul className="list-disc pl-5">
                      {["Developed web applications", "Collaborated with team", "Wrote clean code"].map((tag, i) => (
                        <li key={i} className="text-gray-700">{tag}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))} */}
              <div className="flex justify-between flex-col gap-6">
                  <div className="w-full text-gray">
                    <div className="mb-5 flex flex-col gap-2">
                    <p className=" text-black flex justify-between items-center">
                      <span className="font-[600]">Programmer, XYZ</span>
                      <span className="text-gray">Pune, XYZ</span>
                    </p>
                    <p className="text-gray-600">
                      {/* {new Date(job.start_date).toLocaleString("default", { month: "short", year: "numeric" })} -{" "}
                      {new Date(job.end_date).toLocaleString("default", { month: "short", year: "numeric" })} */}
                      Jan 2022 - Present
                    </p>
                    </div>
                    <ul className="list-disc pl-5">
                      {/* {["Developed web applications", "Collaborated with team", "Wrote clean code"].map((tag, i) => (
                        <li key={i} className="text-gray-700">{tag}</li>
                      ))} */}
                      <li>
                      Develop, write, and test code in various programming languages such as Java, Python, C++, JavaScript, etc.
                      </li>
                      <li>
                      Software Development: Participate in the software development lifecycle, including requirements analysis, design, development, testing, and deployment.
                      </li>
                      <li>
                      Code Review: Review and analyze code written by other team members to ensure it meets the project's standards.
                      </li>
                      <li>
                      Code Review: Review and analyze code written by other team members to ensure it meets the project's standards.
                      </li>
                    </ul>
                  </div>
                  <div className="w-full text-gray">
                    <div className="mb-5 flex flex-col gap-2">
                    <p className=" text-black flex justify-between items-center">
                      <span className="font-[600]">Programmer, XYZ</span>
                      <span className="text-gray">Pune, XYZ</span>
                    </p>
                    <p className="text-gray-600">
                      {/* {new Date(job.start_date).toLocaleString("default", { month: "short", year: "numeric" })} -{" "}
                      {new Date(job.end_date).toLocaleString("default", { month: "short", year: "numeric" })} */}
                      Jan 2022 - Present
                    </p>
                    </div>
                    <ul className="list-disc pl-5">
                      {/* {["Developed web applications", "Collaborated with team", "Wrote clean code"].map((tag, i) => (
                        <li key={i} className="text-gray-700">{tag}</li>
                      ))} */}
                      <li>
                      Develop, write, and test code in various programming languages such as Java, Python, C++, JavaScript, etc.
                      </li>
                      <li>
                      Software Development: Participate in the software development lifecycle, including requirements analysis, design, development, testing, and deployment.
                      </li>
                      <li>
                      Code Review: Review and analyze code written by other team members to ensure it meets the project's standards.
                      </li>
                      <li>
                      Code Review: Review and analyze code written by other team members to ensure it meets the project's standards.
                      </li>
                    </ul>
                  </div>
                </div>
            </div>

            <div>
              <h2 className="uppercase text-[32px] font-[600] tracking-widest my-4">Education </h2>
              {/* {userProfile?.data?.employment_history.slice(0, 2).map((job, index) => (
                <div key={index} className="flex justify-between">
                  <div className="w-[48%]">
                    <p className="font-bold">
                      {job.job_title}, {job.employer}
                    </p>
                    <p className="text-gray-600">
                      {new Date(job.start_date).toLocaleString("default", { month: "short", year: "numeric" })} -{" "}
                      {new Date(job.end_date).toLocaleString("default", { month: "short", year: "numeric" })}
                    </p>
                    <ul className="list-disc pl-5">
                      {["Developed web applications", "Collaborated with team", "Wrote clean code"].map((tag, i) => (
                        <li key={i} className="text-gray-700">{tag}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))} */}

<div className="mb-5 flex flex-col gap-2">
                    <p className=" text-black flex justify-between items-center">
                      <span className="font-[600]">Programmer, XYZ</span>
                      <span className="text-gray">Pune, XYZ</span>
                    </p>
                    <p className="text-gray-600 text-gray">
                      {/* {new Date(job.start_date).toLocaleString("default", { month: "short", year: "numeric" })} -{" "}
                      {new Date(job.end_date).toLocaleString("default", { month: "short", year: "numeric" })} */}
                      Jan 2022 - Present
                    </p>
                    </div>
            </div>

          </div>
        </div>

        
      </div>

      <Footer />

      {/* Print specific styles */}
      <style jsx>{`
        @media print {
          .resume-content {
            width: 100%;
            font-size: 12pt;
            line-height: 1.5;
            margin: 0 auto;
            page-break-after: avoid;
          }

          /* Adjustments for consistent PDF layout */
          .text-[72px] {
            font-size: 24pt !important;
          }
          .text-[32px] {
            font-size: 14pt !important;
          }
          .text-[18px] {
            font-size: 12pt !important;
          }

          /* Force layout consistency */
          .col-span-2, .col-span-3 {
            width: 48% !important;
            margin: 0;
          }

          /* Page Breaks for PDF */
          @page {
            size: A4;
            margin: 0;
          }
        }
      `}</style>
    </>
  );
};

export default ResumeDoc2;
