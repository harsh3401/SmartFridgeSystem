import { LockClosedIcon } from "@heroicons/react/solid";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "../../services/sessionStorageService";
import { useCookies } from "react-cookie";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";

export default function SignUp() {
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar(false);
  };
  function SlideTransition(props) {
    return <Slide {...props} />;
  }
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [cookies, setCookie, removeCookie] = useCookies(["token", "auth"]);
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // cleanup this component
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const [creds, setCreds] = useState({ username: "", password1: "", password2: "" });
  const [snackBardata, setSnackbarData] = useState("");
  const [snackType, setSnackType] = useState("");
  const [openSnackBar, setSnackbar] = useState(false);
  const StateRef = useRef(creds);
  const setRefState = (data) => {
    StateRef.current = data;
    setCreds(data);
  };
  const authState = useSelector((state) => state.auth.loggedIn);
  const handleOnChange = (e, textField) => {
    setRefState({ ...creds, [textField]: e.target.value });
  };
  const dispatch = useDispatch();
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendCredentials(StateRef.current);
    }
  };

  const sendCredentials = (creds) => {
    if (
      creds.password1.replace(" ", "") !== "" &&    
      creds.password2.replace(" ", "") !== "" &&
      creds.email.replace(" ", "") !== "" 
    ) {
      axios
        .post("api/signup/", {
          email: creds.email,
          password1: creds.password1,
          password2: creds.password2
        })
        .then(function (response) {
          // console.log(response.data.user, response.data.token);
          if (response.data.user != null) {
            setSnackbarData("User created. Login to continue");
            setSnackType("success");
            setSnackbar(true);
        } else {
            setSnackbarData("Invalid credentials");
            setSnackType("error");
            setSnackbar(true);
          }
        })
        .catch(function (error) {
          console.log(error);
          if (error.status.toString()[0] === "4") {
            setSnackbarData("Email already exists");
            setSnackType("error");
            setSnackbar(true);
          } else if (error.status.toString()[0] === "5") {
            setSnackbarData("Server side error contact admin");
            setSnackType("error");
            setSnackbar(true);
          }
        });
    } else {
      setSnackbarData("Please fill both the fields");
      setSnackType("error");
      setSnackbar(true);
    }
  };
  
  return (
    <>
      <Snackbar
        sx={{ width: 600 }}
        anchorOrigin={{
          height: 100,
          vertical: "top",
          horizontal: "center",
        }}
        TransitionComponent={SlideTransition}
        open={openSnackBar}
        onClose={handleSnackbarClose}
        autoHideDuration={5000}
      >
        <Alert
          variant="filled"
          severity={snackType}
          sx={{
            width: "100%",
            fontSize: 20,
          }}
        >
          {snackBardata}
        </Alert>
      </Snackbar>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto w-20" src="#" alt="project-icon" />
            <h2 className=" text-center text-3xl font-extrabold text-gray-100">
              Signup
            </h2>
          </div>
          <div className="mt-8 space-y-6" action="#">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="text"
                  value={creds.email}
                  required
                  className="appearance-none rounded-none relative bg-slate-600 block w-full px-3 py-2 border border-slate-700 placeholder-gray-400 text-slate-100 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  onChange={(e) => handleOnChange(e, "email")}
                />
              </div>
              <div>
                <label htmlFor="password1" className="sr-only">
                  Password
                </label>
                <input
                  id="password1"
                  name="password1"
                  type="password"
                  autoComplete="current-password1"
                  required
                  value={creds.password1}
                  onChange={(e) => handleOnChange(e, "password1")}
                  className="appearance-none rounded-none relative bg-slate-600 block w-full px-3 py-2 border border-slate-700 placeholder-gray-400 text-slate-100 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="password2" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  autoComplete="current-password2"
                  required
                  value={creds.password2}
                  onChange={(e) => handleOnChange(e, "password2")}
                  className="appearance-none rounded-none relative bg-slate-600 block w-full px-3 py-2 border border-slate-700 placeholder-gray-400 text-slate-100 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
            </div>


            <div>
              <button
                onClick={() => {
                  sendCredentials(creds);
                }}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                    aria-hidden="true"
                  />
                </span>
                SignUp
              </button>
            </div>
            <div>
                Already have an account? Signin <a href="/login">here.</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
