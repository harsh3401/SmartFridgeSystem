import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";


export default function RequireAuth({ children }) {
  // persist the token in case of window reload
  const [accessToken, setAccessToken] = useState();
  const authState = useSelector((state) => state.auth);
  
  console.log(authState);
  
  useEffect(() => {
    window.localStorage.setItem('accessToken', accessToken);
  }, [accessToken]);
  console.log(`this is teh token: ${accessToken}`);
  
  useEffect(() => {
    setAccessToken(window.sessionStorage.getItem('accessToken'));
  }, []);

  const authed = useSelector((state) => state.auth.loggedIn);
  return authed === true ? children : <Navigate to="/login" replace />;
}
