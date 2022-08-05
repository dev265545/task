import React from "react";
import { Route, Routes } from "react-router-dom";

import { AuthContextProvider } from "../src/Context/AuthContext";
import Account from "./Account";
import Home from "./Home";

import Signin from "./Login";
import Protected from "./Protected";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Protected>{<Home />}</Protected>} />
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
