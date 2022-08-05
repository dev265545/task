import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { AuthContextProvider, UserAuth } from "../src/Context/AuthContext";
import Account from "./Account";
import Home from "./Home";
import Login from "./Login";

import Signin from "./Login";
import Navbar from "./Navbar";
import Protected from "./Protected";

function App() {
  const [pattern, setPattern] = useState("hero-pattern");

  // console.log(user);

  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route
            path="/"
            element={<Protected>{<Home pattern={pattern} />}</Protected>}
          />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/account"
            element={
              <Protected>
                <Account />
              </Protected>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
