import { useState, useEffect} from 'react';
import {View, Pressable} from 'react-native'
import CheckBox from 'expo-checkbox';
import { TextInput, Text, Button } from "@react-native-material/core";
import { Stack, Spacer } from 'react-native-flex-layout';
import { FontAwesome5 } from '@expo/vector-icons';
import TextDivider from '../general/TextDivider.js';
import { signInWithFacebook } from '../../services/firebase/facebook/facebook-signin.js';
import { signInWithGoogle } from '../../services/firebase/google/google-signin.js';
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  
  const handleLogin = async () =>{
    //Email Redux storage
    //Firebase authentication
  }
  const handleGoogleLogin = () =>{
    signInWithGoogle();
  }
  const handleFacebookLogin = async ()=>{
    signInWithFacebook();
  }
  return (
    <View >
          <View style={styles.inputdiv}>
            <Text style={styles.inputHelperStyle}>Email Address</Text>
            <TextInput onChangeText={(data)=>setEmail(data)} variant="outlined" placeholder="Enter your email" style={styles.textInputStyle} />
          </View>

          <Spacer />

          <View style={styles.inputdiv}>
            <Text style={styles.inputHelperStyle}>Password</Text>
            <TextInput onChangeText={(data)=>setPassword(data)} secureTextEntry={true} variant="outlined" placeholder="Enter password" style={styles.textInputStyle} />
          </View>

          <Spacer />

          <View style={styles.horizontalcontainer1}>
            <View style={styles.checkboxcontainer}>
              <CheckBox
                  disabled={false}
                  value={remember}
                  onValueChange={(remember)=>setRemember(!remember)}
              />
              <Text style={{margin:2}}>Remember me</Text>
            </View>
            <View>
              <Pressable onPress={()=>{console.log("Press")}}><Text style={{color:'red'}}>forgot password</Text></Pressable>
            </View>
          </View>

          <Spacer />

          <View>
            <Button style={styles.buttonStyle} title="Login" />
          </View>

          <Spacer />

          <View>
            <TextDivider text="Or With"/>
          </View>

          <Spacer />

          <View style={styles.horizontalcontainer2}>
            
              <Button
                onPress = {handleFacebookLogin}
                variant="outlined"
                title="facebook"
                leading={props => <FontAwesome5 name="facebook" size={24} color="black" {...props}/>}
              />
            
           
              <Button
                onPress = {handleGoogleLogin}
                variant="outlined"
                title="google"
                leading={props => <FontAwesome5 name="google" size={24} color="" {...props}/>}
              />
            
          </View>

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

export default LoginForm