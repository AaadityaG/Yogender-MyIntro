import Button1 from "./Button1";
import { useState, useRef, useEffect } from "react";
import { login, sendOtp } from "../utils/Auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpVisible, setOtpVisible] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const [resendVisible, setResendVisible] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(null);

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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // Assuming phone numbers have 10 digits
    return phoneRegex.test(phone);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setEmailOrPhone(value);

    if (value === "") {
      setError(""); // No error if input is empty
    } else if (!validateEmail(value) && !validatePhone(value)) {
      setError("Please enter a valid email or phone number!");
    } else {
      setError(""); // Clear error if email or phone is valid
    }
  };

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to next input box
      if (value && index < otp.length - 1) {
        otpRefs.current[index + 1].focus();
      }
      // Move focus to previous input box if deleted
      if (!value && index > 0) {
        otpRefs.current[index - 1].focus();
      }
    }
  };

  // const sendOtp = async (emailOrPhone, type) => {
  //   try {
  //     const isEmail = emailOrPhone.includes("@");
  //     const fieldName = isEmail ? "email" : "phone";

  //     const response = await axios.post(
  //       "http://3.235.100.59/api/v1/auth/send-otp",
  //       {
  //         [fieldName]: emailOrPhone,
  //         type: type,
  //       }
  //     );
  //     console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error sending OTP:", error);
  //   }
  // };

  const handleSubmit = async () => {
    if (emailOrPhone === "") {
      setError("Whoops. You didn't enter an email or phone number.");
    } else if (!validateEmail(emailOrPhone) && !validatePhone(emailOrPhone)) {
      setError("Please enter a valid email or phone number!");
    } else {
      setError(""); // No error if email or phone is valid
      try {
        const response = await sendOtp(emailOrPhone, "login");
        if (response.success) {
          setOtpVisible(true); // Show OTP input
          setTimer(30); // Reset timer
          setResendVisible(false); // Hide resend text
        } else {
          setError(response.message || "Failed to send OTP. Please try again.");
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
        setError("You are not registered yet! Please create your account.");
      }
    }
  };

  const handleLogin = async () => {
    try {
      const otpString = otp.join("");
      const response = await login(emailOrPhone, otpString);
      if (response.success) {
        setLoginSuccess(true);
        // console.log("Login successful:", response);
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/user-profile");
      } else {
        setLoginSuccess(false);
        // setError(response.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginSuccess(false);
      setOtpError("OTP does not match!");
    }
  };

  const handleResendClick = async () => {
    try {
      const response = await sendOtp(emailOrPhone, "login");
      if (response.success) {
        setTimer(30); // Reset timer
        setResendVisible(false); // Hide resend text
        setOtp(new Array(6).fill("")); // Clear the OTP input fields
        setOtpError("");
      } else {
        setError(response.message || "Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");
  const isEmailOrPhoneFilled = emailOrPhone !== "";

  return (
    <>
      <img
        src="/Logo.png"
        alt="Logo"
        className="w-[127px] md:w-[168px] lg:w-[174px] mt-5 lg:m-0 md:m-0"
      />
      <h1 className="font-bold text-[24px] lg:text-4xl md:text-4xl mt-5 text-start w-full">
        Log in
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
        <label className="text-[#999999] text-[14px]">Email/Phone</label>
        <input
          type="text"
          value={emailOrPhone}
          onChange={handleInputChange}
          className={`rounded border-[1px] p-[10px] px-[16px] font-[500] ${
            error ? "border-[#FF3B3B]" : "border-gray"
          }`}
          placeholder="Enter Email or Phone"
        />
        {error && (
          <span
            className={`text-[#FF3B3B] text-[12px] ${
              error ? "animate-shake" : "animate-fadeIn"
            }`}>
            {error}
          </span>
        )}
      </div>

      {otpVisible && (
        <div className="flex flex-col gap-2 w-full">
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

          
          
          {
          <div className={`flex  ${otpError ? 'items-center justify-between' : 'items-center justify-end'}`}>

{otpError && (
          <span
            className={`text-[#FF3B3B] text-[12px] ${
              otpError ? "animate-shake" : "animate-fadeIn"
            }`}>
            {otpError}
          </span>
        )}
          
          {resendVisible ? (
            <span
              onClick={handleResendClick}
              className="text-primary text-[14px] cursor-pointer text-end">
              Resend OTP
            </span>
          ) : (
            <span className="text-[14px] text-end">
              00:{timer < 10 ? `0${timer}` : timer}
            </span>
          )}
              </div>
          }
        </div>
      )}

      <Button1
        text={otpVisible ? "Log In" : "Get Log in Code"}
        onClick={otpVisible ? handleLogin : handleSubmit}
        className="w-full mt-4"
        disabled={
          (otpVisible && !isOtpComplete) ||
          (!otpVisible && !isEmailOrPhoneFilled)
        }
      />

      {/* {loginSuccess !== null && (
        <div
          className={`mt-4 p-2 rounded ${
            loginSuccess
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}>
          {loginSuccess
            ? "Login successful!"
            : "Login failed. Please try again."}
        </div>
      )} */}
    </>
  );
};

export default Login;
