import * as React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
// import intercepted_axios from "../services/interceptor";


// get the last image of the refrigerator
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const [imageUrl, setImageUrl] = useState([]);
    
    const getImageUrl = async () => {
        axios.get('api/image/').then((response) => {
          console.log(response);
          console.log(response.data[0]['image'])
          setImageUrl(response.data[0]['image']);
        });
    }
    useEffect(() => {
        getImageUrl();
      }, []);

      return (
        <div>
            <img src={imageUrl} alt="last fridge image"></img>
        </div>
      )

}

