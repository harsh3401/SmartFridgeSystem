import { LockClosedIcon } from "@heroicons/react/solid";
import { setLogin, updateToken } from "../../slice/authSlice";
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

export default function Login() {
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
  const [creds, setCreds] = useState({ email: "", password: "" });
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

  const sendCredentials = (authcreds) => {
    if (
      authcreds.password.replace(" ", "") !== "" &&
      authcreds.email.replace(" ", "") !== ""
    ) {
      axios
        .post("api/signin/", {
          email: authcreds.email,
          password: authcreds.password,
        })
        .then(function (response) {
          console.log(response.data.user, response.data.token);
          if (response.data.user != null) {
            
            const loginObj = {
              privilege: response.data.is_superuser ? 1 : 0,
              token: response.data.token,
              name: response.data.user,
              loggedIn: true,
              email: authcreds.email,
              // expiryD: now,
            };
            setAccessToken(response.data.token);
            
            // set axios Authorization headers globally
            axios.defaults.headers.common = {
              "Authorization": `Token ${response.data['token']}`
            };
            dispatch(setLogin(loginObj));

          } else {
            setSnackbarData("Invalid credentials");
            setSnackType("error");
            setSnackbar(true);
          }
        })
        .catch(function (error) {
          console.log(error);
          if (error.status.toString()[0] === "4") {
            setSnackbarData("Email password combination is incorrect");
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
  if (authState) {
    return <Navigate to="/dashboard" replace={true} state={{ init: true }} />;
  }
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
              Login
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
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={creds.password}
                  onChange={(e) => handleOnChange(e, "password")}
                  className="appearance-none rounded-none relative bg-slate-600 block w-full px-3 py-2 border border-slate-700 placeholder-gray-400 text-slate-100 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-100"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-teal-600 hover:text-teal-500"
                ></a>
              </div>
            </div> */}

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
                Login
              </button>
            </div>
            <div>
                Want an account? Signup <a href="/signup">here.</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
