import * as React from "react";
import { useState,useEffect } from "react";
import axios from "axios";

export default function UserNotifications ()  {
    const [Notifications, setNotifications] = useState([]);
    
    const getNotifications = async () => {
        axios.get('api/user-notifications/').then((response) => {
            console.log(response.data);
            setNotifications(response.data);
            console.log(Notifications);
        });
    }
    useEffect(() => {
        getNotifications();
      }, []);

    if (Notifications.length !== 0){
        // show the notifications in a card from top to bottom
        return (
            <div className="w-full">
                {Notifications.map((item) => (
                    <div className="mx-8 my-4 rounded overflow-hidden shadow-lg bg-white">
                        <img className="w-full" srcSet={item['notification_img']} alt="notification_image" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{item['notification_title']}</div>
                            <p className="text-gray-700 text-base">
                                {item['notification_body']}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        ) 
    } else {
        return (
            <div>
                No notifications.
            </div>
        )
    }
}

