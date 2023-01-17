import * as React from "react";
import { useState } from "react";
import axios from "axios";
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
      text: 'Average Nutrition Values',
    },
  },
};


export default function NutritionHistogram() {
  const [nutritionValues, setNutritionValues] = useState();
    
    const getNutritions = async () => {
        axios.get('api/nutrition/').then((response) => {
          setNutritionValues({
            // get labels from response
            labels: ["Calories(kcal)", "Total Fat(PDV)", "Sugar(PDV)", "Sodium(PDV)", "Protein(PDV)"],
            datasets: [
              {
                label: "Nutrition Values",
                data: response.data.nutrition,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
              },
            ]    
          });
        });
    }
    useEffect(() => {
        getNutritions();
      }, []);

      if (nutritionValues != null){
        return (
            <div className="chart-container" style={{position: "relative", height:"40vh", width:"40vw"}}>
              <Line data={nutritionValues} options={options} /> 
            </div>
        )  
      } else {
        return (
          <div>Empty div</div>
        )
      }

  }

