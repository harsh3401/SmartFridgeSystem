import React,{useEffect, useState} from 'react'
import {View, FlatList, Text, Pressable, Image} from 'react-native'
import { Flex, Box, Spacer, Avatar } from "@react-native-material/core";
import { Ionicons } from '@expo/vector-icons'; 
import useFetch from '../../hooks/useFetch';
import RecipeNotification from '../../components/notification/recipeNotification';
import WarningNotification from '../../components/notification/warningNotification';

const Notifications = () => {
    const [notifications, setNotifications] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        axios.get('/user-notifications/')
        .then(response=>{
            setNotifications(response.data)
            setIsLoading(false)
        })
        .catch(error=>{
            console.error(error)
        })
    },[])
    // notificationList = [
    //     {
    //         img:'',
    //         type:'',
    //         title:'',
    //         subtitle:'',
    //     },
    //     {
    //         img:'',
    //         type:'',
    //         title:'',
    //         subtitle:''
    //     },
    //     {
    //         img:'',
    //         type:'',
    //         title:'',
    //         subtitle:''
    //     }
    // ]
  return (
    <View style={{marginTop:50}}>
        <Pressable>
            <Flex inline style={{height:40, width:50}}>
                <Ionicons style={{fontSize:25,color:'blue'}} name="chevron-back" /> 
                <Text style={{fontSize:20,color:'blue'}}>Back</Text>
            </Flex>
        </Pressable>
        <Flex inline style={{height:40, marginVertical: 10, marginHorizontal:15}}>
                <Text style={{fontSize:30, marginRight:20}}>Notifications</Text>
                <Image style={{height:50, width:50}} source={{ uri: "https://freeiconshop.com/wp-content/uploads/edd/notification-flat.png" }} />
        </Flex>
        <FlatList 
            data = {notifications}
            renderItem = {notification=>{
                if(isLoading){
                    return <View></View>
                }else if(notification.imgSrc!=""){
                    return <RecipeNotification imageSrc={notification.img} titleText={notification.item.notification_title} subText={notification.item.notification_body} created_at={notification.item.created_at} />
                }else{
                    return <WarningNotification warningTitle={notification.item.notification_title} warningDesc={notification.item.notification_body} created_at={notification.item.created_at}/>
                }
            }}
        />
    </View>
  )
}

export default Notifications