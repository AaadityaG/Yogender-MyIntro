import { useState } from "react";
import Button1 from "./components/Button1";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import { Routes, Route, Link } from "react-router-dom";
import MyIntro from "./components/MyIntro";
import CreateProfile from "./components/CreateProfile";
import EditProfile from "./components/EditProfile";
import UserProfile from "./components/UserProfile";
import PublicProfile from "./components/PublicProfile";
import ResumeDoc1 from "./components/ResumeDoc1";
// import { AuthProvider } from './context/AuthContext';

import { UserProfileProvider } from "./context/UserProfileContext";

function App() {
  return (
    <div>
      {/* <AuthProvider> */}
      <Routes>
        <Route path="/" element={<MyIntro />} />
        <Route path="/create" element={<CreateProfile />} />
        <Route path="/edit" element={<EditProfile />} />
        <Route path="/resume" element={<ResumeDoc1 />} />
        <Route
          path="/user-profile"
          element={
            <UserProfileProvider>
              <UserProfile />
            </UserProfileProvider>
          }
        />
        <Route
          path="/public-profile"
          element={
            <UserProfileProvider>
              <PublicProfile />
            </UserProfileProvider>
          }
        />
      </Routes>
      {/* </AuthProvider> */}
    </div>
  );
}

export default App;
