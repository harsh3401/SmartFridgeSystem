import { logOut } from "../slice/authSlice";
import { useDispatch } from "react-redux";
import { persistor } from "../store/store"
import { useEffect } from "react";
import { logout } from '../services/sessionStorageService'
import { Navigate } from "react-router-dom";

export default function Logout () {
    useEffect(() => {
        window.localStorage.clear();
        logout();
    }, [])
    return (
        <div>
            <h3> You have successfully logged out!</h3>
            <p>Login <a href="/login">here</a></p>
        </div>
    );
}