import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Image from "./Image"
import Header from "./Header";
import SideBar from "./Sidebar";
import Recipe from "./Recipe";
import TemperatureHistogram from "./TemperatureHistogram";
import NutritionHistogram from "./NutritionHistogram";
import TimesOpened from "./TimesOpened";

export default function Dashboard() {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  const authState = useSelector((state) => state.auth.loggedIn);
  
  if (!authState) {
    return <Navigate to="/dashboard" replace={true} state={{ init: true }} />;
  }
  return (
    <>
      <SideBar isOpen={sidebarOpen} />
      <div className = "flex flex-col w-full">
        {/* live view */}
        <p className = "text-5xl m-8"> Dashboard </p>
        <div className="rounded center justify-center flex items-center py-12 px-4 sm:px-6 lg:px-8 ">
            <Image />
        </div>
        {/* temperature and nutrition histogram in flex div */}
        <div className = "flex flex-row m-8 justify-evenly">
          <TemperatureHistogram />
          <NutritionHistogram />
        </div>
        <div>
          <TimesOpened />  
        </div>
      </div>
      
    </>
  );
}
