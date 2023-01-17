import React, { useState, Suspense } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import white from "@mui/material/colors/blue";
import RequireAuth from "./containers/RequireAuth";
import Logout from "./components/Logout";
import Recipe from "./components/Recipe";
import UserNotifications from "./UserNotifications";

const theme = createTheme({
  palette: {
    primary: white,
    mode: "dark",
  },
});
function App() {
  const authState = useSelector((state) => state.auth);

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-column h-screen bg-slate-800">
        {/* Navbar */}
        {/* <Navbar /> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/recipe"
            element={
              <RequireAuth>
                <Recipe />
              </RequireAuth>
            }
          />
          <Route
            path="/notifications"
            element={
              <RequireAuth>
                <UserNotifications />
              </RequireAuth>
            }
          />
          <Route
            path="/logout"
            element={
              <RequireAuth>
                <Logout />
              </RequireAuth>
            }
          />

          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
