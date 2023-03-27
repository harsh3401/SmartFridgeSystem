import { useState, useEffect} from 'react';
import {View, Pressable,Touchable,StyleSheet} from 'react-native'
import CheckBox from 'expo-checkbox';
import { TextInput, Text } from "@react-native-material/core";
import { Stack, Spacer } from 'react-native-flex-layout';
import { FontAwesome5 } from '@expo/vector-icons';
import TextDivider from '../general/TextDivider.js';

import { signInWithGoogle } from '../../services/firebase/google/google-signin.js';
import { signInWithEmailAccount} from '../../services/firebase/email/email-password-auth.js';

import { Button } from 'react-native-paper';
import { login,updateToken} from '../../slice/authSlice.js';
import { useDispatch } from "react-redux";
import {useSelector} from 'react-redux'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const dispatch=useDispatch()
  const authState=useSelector((state)=>state.auth)
  const navigation = useNavigation();

  const handleLogin = async () =>{
    //Email Redux storage
    // const requestData={email:email,password:password}
    // console.log(requestData);
    // axios.post('signin/',
    //   requestData

    // ).then((response) =>{
    //   console.log('User logged in', response.data)
    //   dispatch(login({loggedIn:true,expires:response.data.expires_in,name:response.data.user,privilege:response.data.is_superuser?0:1,token:response.data.token}))
    //   axios.defaults.headers.common[
    //     "Authorization"
    //   ] = `Token ${response.data["token"]}`;
    //   navigation.navigate("Dashboard")
    // }).catch((error)=>{
    //   console.log(error)
    // })
    //Firebase authentication
    const user= await signInWithEmailAccount(email,password);
    // let token=await user.getIdToken();
    // dispatch(login({uid:user.uid,email:user.email,token:token}))
  }
  const handleGoogleLogin = async() =>{
   const user= await signInWithGoogle();
  //  let token=await user.getIdToken();
  //  dispatch(login({uid:user.uid,email:user.email,token:token}))

  }
  // const handleFacebookLogin = async ()=>{
  //   const user= await signInWithFacebook();
  //   // let token=await user.getIdToken();
  //   // dispatch(login({uid:user.uid,email:user.email,token:token}))
  // }
  return (
    <View >
          <View style={styles.inputdiv}>
            <Text style={styles.inputHelperStyle}>Email Address</Text>
            <TextInput autoCapitalize='none' onChangeText={(data)=>setEmail(data)} variant="outlined" placeholder="Enter your email" style={styles.textInputStyle} />
          </View>

          <Spacer />

          <View style={styles.inputdiv}>
            <Text style={styles.inputHelperStyle}>Password</Text>
            <TextInput autoCapitalize='none' onChangeText={(data)=>setPassword(data)} secureTextEntry={true} variant="outlined" placeholder="Enter password" style={styles.textInputStyle} />
          </View>

          <Spacer />

          <View style={styles.horizontalcontainer1}>
            {/* <View style={styles.checkboxcontainer}>
              <CheckBox
                  disabled={false}
                  value={remember}
                  onValueChange={(remember)=>setRemember(!remember)}
              />
                  <Text style={{margin:2}}>Remember me</Text>
            </View> */}
            <View>
              <Pressable onPress={()=>{console.log("Press")}}><Text style={{color:'purple'}}>Forgot password</Text></Pressable>
            </View>
          </View>

          <Spacer />

          <View>
        

            <Button 
 style={{ backgroundColor: 'purple', marginTop: 20 }}
 onPress={() =>handleLogin()}
 mode="contained"
 icon="mail"
>
Login 
</Button>
            <Button 
 style={{ backgroundColor: 'purple', marginTop: 20 }}
 onPress={() => handleGoogleLogin().then(() => console.log('Signed in with Google!'))}
 mode="contained"
 icon="google"
>
Login with Google
</Button>
{/* <Button 
 style={{ backgroundColor: 'purple', marginTop: 20 }}
 onPress={() => handleFacebookLogin().then(() => console.log('Signed in with Facebook!'))}
 mode="contained"
 icon="facebook"
>
Login with Facebook
</Button> */}

          </View>

          <Spacer />

          {/* <View>
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
 */}
    </View>
  )
}

styles = StyleSheet.create({
  'horizontalcontainer1':{
    flexDirection:'row',
    justifyContent: 'space-between',
    marginBottom:30
  },
  'checkboxcontainer':{
    flexDirection:'row'
  },
  'buttonStyle':{
    flexDirection:'row', justifyContent:'center', alignSelf: 'stretch',
  
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
  },
  
})

export default LoginForm