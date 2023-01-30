import * as React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { Button } from "bootstrap";
import SideBar from "./Sidebar";

// get the last image of the refrigerator
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const [recommendationData, setRecommendationData] = useState("");
    
    const getRecommendation = async () => {
        axios.get('api/get-recommendation/').then(function (response)  {
          console.log(response);
          console.log(response.data)
          setRecommendationData(response.data['recommendations']);
        });
    }
    useEffect(() => {
        setRecommendationData();
      }, []);

      return (
        <div className="flex">
            <SideBar />
            <div >
                <button onClick={getRecommendation}>Get Recommendation</button>
                {/* display list of recommendations if recommendationData is not null */}
                {recommendationData && recommendationData.map((item) => (
                    <div>
                        <p className="text-2xl">Recipe name: </p>
                        {item['recipe_name']}
                        <p className="text-2xl">Ingredients: </p>
                        <p>{item['ingredients']}</p>
                        <p className="text-2xl">Steps: </p>
                        <p>{item['steps']}</p>
                        <p className="text-2xl">Time to make: </p>
                        <p>{item['time_to_make']}</p>
                        
                    </div>
                ))}

            </div>
        </div>
      )

}

