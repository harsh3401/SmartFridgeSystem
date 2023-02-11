import { useState, useEffect} from 'react';
import {View, Pressable} from 'react-native'
import { Button } from 'react-native-paper';
import CheckBox from 'expo-checkbox'
import { Stack, HStack, VStack, Spacer } from 'react-native-flex-layout';
import {TextInput, Text } from "@react-native-material/core";
import TextDivider from '../general/TextDivider.js';
import { FontAwesome5 } from '@expo/vector-icons';
import useFetch from '../../hooks/useFetch.js';
import axios from 'axios';
const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [passwordC,setPasswordC] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const validateData = (data) => {
    //validation logic
    if(data.password1===data.password2)
    {
      return true
    }
    else
    {
      return false
    }
  }
  const handleSignUp =  () =>{

    const requestData={email:email,password1:password,password2:passwordC}

        axios.post('http://192.168.1.57:8000/api/signup/',
      
      requestData
      
    ).then((response) =>{
      console.log('User created', response.data)
    }).catch((error)=>{
      console.log(error)
    })


    //Email Redux storage
    //Firebase authentication
  }
  const handleGoogleSignUp = async () =>{
    //call appropriate method from services
  }
  const handleFacebookSignUp = async ()=>{
    //call appropriate method from services
  }
  return (
    <View style={{padding:20}}>
        <Stack>
          <View style={styles.inputdiv}>
            <Text style={styles.inputHelperStyle}>Email Address</Text>
            <TextInput onChangeText={(data)=>setEmail(data)} variant="outlined" placeholder="Enter your email" style={styles.textInputStyle} />
          </View>

          <Spacer />

          <View style={styles.inputdiv}>
            <Text style={styles.inputHelperStyle}>Password</Text>
            <TextInput onChangeText={(data)=>setPassword(data)} variant="outlined" secureTextEntry={true} placeholder="Enter your password" style={styles.textInputStyle} />
          </View>

          <Spacer />

          <View style={styles.inputdiv}>
            <Text style={styles.inputHelperStyle}>Password Confirmation</Text>
            <TextInput onChangeText={(data)=>setPasswordC(data)} secureTextEntry={true} variant="outlined" placeholder="Enter your password again" style={styles.textInputStyle} />
          </View>

          <Spacer />

          <View style={styles.horizontalcontainer1}>
            <View style={styles.checkboxcontainer}>
              <CheckBox
                      value={remember}
                      onValueChange={()=>setRemember(!remember)}
              />
              <Text style={{marginLeft:5}}>Remember me</Text>
            </View>
            <View>
              <Pressable ><Text style={{color:'red'}}>forgot password</Text></Pressable>
            </View>
          </View>

          <Spacer />

          <View>
     <Button onPress={handleSignUp}style={styles.buttonStyle} title="Sign Up" >Sign Up </Button>
          </View>

          <Spacer />
          
          <View>
            <TextDivider text="Or With"/>
          </View>

          <Spacer />

          <View style={styles.horizontalcontainer2}>
            <View style={styles.buttoncontainer}>
              <Button
                onPress = {handleFacebookSignUp}
                variant="outlined"
                title="facebook"
                leading={props => <FontAwesome5 name="facebook" size={24} color="black" {...props}/>}
              />
            </View>
            <View style={styles.buttoncontainer}>
              <Button
                onPress = {handleGoogleSignUp}
                variant="outlined"
                title="google"
                leading={props => <FontAwesome5 name="google" size={24} color="" {...props}/>}
              />
            </View>
          </View>

        </Stack>
    </View>
  )
}

styles = {
  'horizontalcontainer1':{
    flexDirection:'row',
    justifyContent: 'space-between',
    marginBottom:30
  },
  'checkboxcontainer':{
    flexDirection:'row'
  },
  'buttonStyle':{
    flexDirection:'row', justifyContent:'center', alignSelf: 'stretch'
  },
  'inputHelperStyle':{
    color:'purple', 
    marginBottom:5
  },
  'textInputStyle':{
    height:20, 
    borderRadius:20
  },
  'horizontalcontainer2':{
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  'inputdiv':{
   height: 100,
   marginVertical: 5
  }
  
}
export default SignUpForm