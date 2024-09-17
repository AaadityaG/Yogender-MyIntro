import Button1 from "./Button1";
import { useState, useRef, useEffect } from "react";
import { signUp, sendOtp } from "../utils/Auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [emailOrPhoneError, setEmailOrPhoneError] = useState("");
  const [otpVisible, setOtpVisible] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const [resendVisible, setResendVisible] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(null);

  const otpRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (otpVisible && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      setResendVisible(true);
    }
    return () => clearInterval(interval);
  }, [otpVisible, timer]);

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const validatePhone = (input) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(input);
  };

  const handleFullNameChange = (e) => {
    const fullNameValue = e.target.value;
    setFullName(fullNameValue);

    if (fullNameValue === "") {
      setFullNameError("Full name cannot be empty!");
    } else {
      setFullNameError("");
    }
  };

  const handleEmailOrPhoneChange = (e) => {
    const inputValue = e.target.value;
    setEmailOrPhone(inputValue);

    if (inputValue === "") {
      setEmailOrPhoneError("");
    } else if (!validateEmail(inputValue) && !validatePhone(inputValue)) {
      setEmailOrPhoneError("Please enter a valid email or phone number!");
    } else {
      setEmailOrPhoneError("");
    }
  };

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        otpRefs.current[index + 1].focus();
      }
      if (!value && index > 0) {
        otpRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = async () => {
    let isValid = true;

    if (fullName === "") {
      setFullNameError("Whoops. You didn't enter your full name.");
      isValid = false;
    }

    if (emailOrPhone === "") {
      setEmailOrPhoneError(
        "Whoops. You didn't enter an email or phone number."
      );
      isValid = false;
    } else if (!validateEmail(emailOrPhone) && !validatePhone(emailOrPhone)) {
      setEmailOrPhoneError("Please enter a valid email or phone number!");
      isValid = false;
    }

    if (isValid && !otpVisible) {
      console.log("my email: ", emailOrPhone);

      try {
        const response = await sendOtp(emailOrPhone, "signup");
        console.log("OTP sent", response);

        if (response.success) {
          setOtpVisible(true);
          setTimer(30);
          setResendVisible(false);
        } else {
          alert(response.message || "Failed to send OTP. Please try again.");
        }
      } catch (error) {
        console.error("Error sending OTP", error);
        alert("Failed to send OTP. Please try again.");
      }
    }
  };

  const handleSubmitOTP = async () => {
    try {
      const otpString = otp.join("");
      const response = await signUp(emailOrPhone, fullName, otpString);

      if (response.success) {
        console.log("Signup successful:", response);
        setSignupSuccess(true);
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/user-profile");
        // Handle successful signup (e.g., redirect to dashboard, show success message)
      } else {
        console.log("Signup failed:", response);
        setSignupSuccess(false);
        alert(response.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred during signup:", error);
      setSignupSuccess(false);
      alert("An error occurred during signup. Please try again.");
    }
  };

  const handleResendClick = async () => {
    try {
      const response = await sendOtp(emailOrPhone, "signup");
      if (response.success) {
        setTimer(30);
        setResendVisible(false);
      } else {
        alert(response.message || "Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error resending OTP", error);
      alert("Failed to resend OTP. Please try again.");
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");
  const isFormFilled = fullName !== "" && emailOrPhone !== "";

  return (
    <>
      <img
        src="/Logo.png"
        alt="Logo"
        className="w-[127px] md:w-[168px] lg:w-[174px] mt-5 lg:m-0 md:m-0"
      />
      <h1 className="font-bold text-[24px] lg:text-4xl md:text-4xl mt-5 text-start w-full">
        Sign Up
      </h1>
      <button className="flex w-full p-[8px] px-0 gap-3 items-center justify-center border-[black] border-[1px] rounded">
        <img src="/google.png" alt="" />
        <span className="font-[500] text-[16px]">Continue with Google</span>
      </button>

      <div className="flex items-center justify-center w-full">
        <div className="border-t border-[#E0E0E0] flex-grow"></div>
        <span className="text-center text-[#999999] text-[12px] mx-4">OR</span>
        <div className="border-t border-[#E0E0E0] flex-grow"></div>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-[#999999] text-[14px]">Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={handleFullNameChange}
          className={`rounded border-[1px] p-[10px] px-[16px] font-[500] border-gray`}
          placeholder="Enter Full Name"
        />
        {fullNameError && (
          <span className="text-[#FF3B3B] text-[12px] animate-shake">
            {fullNameError}
          </span>
        )}

        <label className="text-[#999999] text-[14px]">Email/Phone</label>
        <input
          type="text"
          value={emailOrPhone}
          onChange={handleEmailOrPhoneChange}
          className={`rounded border-[1px] p-[10px] px-[16px] font-[500] border-gray `}
          placeholder="Enter Email or Phone"
        />
        {emailOrPhoneError && (
          <span className="text-[#FF3B3B] text-[12px] animate-shake">
            {emailOrPhoneError}
          </span>
        )}
      </div>

      {otpVisible && (
        <div className="flex flex-col gap-2 w-full mt-4">
          <label className="text-[#999999] text-[14px]">
            Enter 6 Digit Code
          </label>
          <div className="flex gap-2">
            {otp.map((data, index) => (
              <input
                key={index}
                ref={(el) => (otpRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleOtpChange(e, index)}
                className="rounded border-[1px] p-[10px] px-[16px] font-[600] border-gray w-[54px] text-center"
              />
            ))}
          </div>
          {resendVisible ? (
            <span
              onClick={handleResendClick}
              className="text-primary text-[14px] cursor-pointer text-end">
              Resend
            </span>
          ) : (
            <span className=" text-[14px] text-end">
              00:{timer < 10 ? `0${timer}` : timer}
            </span>
          )}
        </div>
      )}

      {!otpVisible ? (
        <Button1
          text={"Get Sign up Code"}
          onClick={handleSubmit}
          className="w-full mt-4"
          disabled={!isFormFilled}
        />
      ) : (
        <Button1
          text={"Verify and Signup"}
          onClick={handleSubmitOTP}
          className="w-full mt-4"
          disabled={!isOtpComplete}
        />
      )}

      {signupSuccess !== null && (
        <div
          className={`mt-4 p-2 rounded ${
            signupSuccess
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}>
          {signupSuccess
            ? "Signup successful!"
            : "Signup failed. Please try again."}
        </div>
      )}
    </>
  );
};

export default Signup;
