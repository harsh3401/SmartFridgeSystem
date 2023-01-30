import * as React from "react";
import { useState,useEffect } from "react";
import axios from "axios";

export default function TimesOpened ()  {
    const [timesOpened, setTimesOpened] = useState(null);
    
    const getTimesOpened = async () => {
        axios.get('api/open-count/').then((response) => {
            console.log(response);
            if (response.data.length > 0)
                setTimesOpened(response.data[0].count);
        });
    }
    useEffect(() => {
        getTimesOpened();
      }, []);

    if (timesOpened != null){
        return (
            <div>
                Fridge opened {timesOpened} times.
            </div>
        )  
    } else {
        return (
            <div>
                Hardware module not synced yet.
            </div>
        )
    }
}

