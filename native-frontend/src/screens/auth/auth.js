import React from 'react'
import {useState} from 'react'
import {View,Pressable} from 'react-native'
import { Text, IconButton } from "@react-native-material/core";
import SignUpForm from '../../components/auth/SignUpForm.js'
import LoginForm from '../../components/auth/LoginForm.js'
import { Stack, HStack, VStack, Spacer } from 'react-native-flex-layout';
const Auth = () => {
    const [isUserRegistered, setIsUserRegistered] = useState(true);
  return isUserRegistered ?
    (
    <Stack style={{margin:20}}>
        <View>
            <Text variant="h4" style={{ marginTop: 16, marginHorizontal:16 }}>
                Hi, Welcome Back!
            </Text>
            <Text variant="" style={{ marginHorizontal: 16, marginBottom:30, color:'grey' }}>Hello again, you've been missed</Text>
        </View>
        <Spacer />
        <View style={{height:400}}>
            <LoginForm />
        </View>
        <Spacer />
        <View style={styles.registerStatusChange}>
            <Text style={{color:'purple'}}>Don't have an account?</Text>
            <Pressable isPress={()=>setIsUserRegistered(!isUserRegistered)}><Text style={{color:'purple'}}>SignUp</Text></Pressable>
        </View>
    </Stack>
    )
    :
    (
    <Stack>
        <View>
            <Text variant="h4" style={{ margin: 16 }}>
                Create an account
            </Text>
            <Text style={{ margin: 16, color:'grey' }}>Connect with your friends today!</Text>
        </View>
        <Spacer />
        <View>
            <SignUpForm />
        </View>
        <Spacer />
        <View style={styles.registerStatusChange}>
            <Text  style={{color:'grey'}}>Already have an account</Text>
            <Pressable isPress={()=>setIsUserRegistered(!isUserRegistered)}><Text style={{color:'purple'}}>Login</Text></Pressable>
        </View>
    </Stack>
   )
}

styles = {
    'registerStatusChange':{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    }
}

export default Auth