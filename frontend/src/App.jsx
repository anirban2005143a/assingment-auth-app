import { useState } from "react";
import DashBoard from "./pages/DashBoard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/auth/Signup";
import { Login } from "./pages/auth/Login";
import { AuthContextProvider } from "./Context/Authcontext";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className=" bg-slate-900 min-h-screen">
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar /> <DashBoard />
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <Login />
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <Signup />
                </>
              }
            />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
