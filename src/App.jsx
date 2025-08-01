import { BrowserRouter, Routes, Route, Outlet, Router } from "react-router-dom";
import Signup from "./components/Signup";

import Postcontext from "./components/store";
import CreatePost from "./components/addpost";
import { useState } from "react";
import BaseLayout from "./components/Base";
import Login from "./components/Login";
import EnhancedNavbar from "./components/navbar";
import UserProfile from "./components/Profile";

export default function App() {
  const [dopost, setdopost] = useState(false);

  return (
    <BrowserRouter>
      <Postcontext dopost={dopost} setdopost={setdopost}>
        <Routes>

          <Route path="/social" element={<EnhancedNavbar/>} />
          <Route path="/social/signup" element={<Signup/>} />
          <Route path="/social/login" element={<Login/>} />
          <Route path="/social/:username" element={<BaseLayout />}>
            <Route index element={<UserProfile />} />
            <Route path="post" element={<CreatePost />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>

        </Routes>
      </Postcontext>
    </BrowserRouter>
  );
}

// connrct the user signup/in to the backend and show the info in the user profile component
// connect backend to create post , and add the post created to the feed component
// pulling post from user following 