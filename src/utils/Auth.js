const BASE_URL = "http://3.235.100.59/api/v1";

// Helper function to make POST requests

const postRequest = async (url, data, token) => {
  const realUrl = BASE_URL + url;
  console.log(realUrl);
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    const response = await fetch(`${realUrl}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    console.log(realUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(`Error in ${url}:`, error);
    throw error;
  }
};

// Auth functions
export const signUp = async (email, fullName, otp) => {
  console.log("email: ", email, "fullname: ", fullName, "otp: ", otp);
  return await postRequest("/auth/signup", { email, full_name: fullName, otp });
};

export const login = async (email, otp) => {
  return await postRequest("/auth/login", { email, otp });
};

export const logout = async (token) => {
  console.log("token", token);
  return await postRequest("/auth/logout", { token: token }, token);
};

export const sendOtp = async (emailOrPhone, type) => {
  console.log("email/phone: ", emailOrPhone, "type: ", type);
  const isEmail = emailOrPhone.includes("@");
  const fieldName = isEmail ? "email" : "phone";
  return await postRequest("/auth/send-otp", {
    [fieldName]: emailOrPhone,
    type,
  });
};

export const socialLogin = async (socialData) => {
  return await postRequest("/auth/social-login", socialData);
};
