import * as React from "react";
import { useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/LinearProgress";
import { Typography } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import Slide from "@mui/material/Slide";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { useSelector } from "react-redux";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Time vs Temperature',
    },
  },
};


export default function TemperatureHistogram() {
  const [temperatureValues, setTemperatureValues] = useState();
    
    const getTemperatures = async () => {
        axios.get('api/temperature/').then((response) => {
          var temp = [], date = [];
          for (let i = 0; i<response.data.length; i++){
            temp.push(response.data[i]['temperature']);
            date.push(response.data[i]['created_at']);
          }
          setTemperatureValues({
            // get labels from response
            labels: date,
            datasets: [
              {
                label: "Temperatures",
                data: temp,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
              },
            ]    
          });
        });
    }
    useEffect(() => {
        getTemperatures();
      }, []);

      if (temperatureValues != null){
        return (
            <div className="chart-container" style={{position: "relative", height:"40vh", width:"40vw"}}>
              <Line data={temperatureValues} options={options} /> 
            </div>
        )  
      } else {
        return (
          <div>Empty div</div>
        )
      }

  }

