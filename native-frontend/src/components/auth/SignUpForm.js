import { useState, useEffect} from 'react';
import {View, Pressable} from 'react-native'
import CheckBox from 'expo-checkbox'
import { Stack, HStack, VStack, Spacer } from 'react-native-flex-layout';
import {TextInput, Text, Button } from "@react-native-material/core";
import TextDivider from '../general/TextDivider.js';
import { FontAwesome5 } from '@expo/vector-icons';
const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [phNumber, setPhNumber] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSignUp = async () =>{
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
            <Text style={styles.inputHelperStyle}>Phone Number</Text>
            <TextInput onChangeText={(data)=>setPhNumber(data)} variant="outlined" placeholder="Enter your phone no." style={styles.textInputStyle} />
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
                      value={remember}
                      onValueChange={()=>setRemember(!remember)}
              />
              <Text style={{marginLeft:5}}>Remember me</Text>
            </View>
            <View>
              <Pressable onPress={handleSignUp}><Text style={{color:'red'}}>forgot password</Text></Pressable>
            </View>
          </View>

          <Spacer />

          <View>
            <Button style={styles.buttonStyle} title="Sign Up" />
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