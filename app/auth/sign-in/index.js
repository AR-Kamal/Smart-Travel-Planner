import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { useNavigation, useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { auth } from './../../../configs/FirebaseConfig';


export default function SignIn() {
  const navigation=useNavigation();
  const router=useRouter();

  const [email,setEmail]=useState();
  const [password,setPassword]=useState();

  useEffect(()=>{
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  // Check saved session
/*   useEffect(() => {
    const checkUserSession = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          router.replace('/(tabs)/home'); // Redirect if already signed in
        }
      } catch (error) {
        console.log('Error checking user session:', error);
      }
    };
    checkUserSession();
  }, []); */
  useEffect(() => {
  const checkUserSession = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      router.replace('/(tabs)/mytrip');
    }
  };

  checkUserSession();
}, []);


  const onSignIn=()=>{

  if(!email||!password)
      {
        ToastAndroid.show("Please Enter all Details", ToastAndroid.LONG);
        return;
      }
    signInWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    // Signed in 
    const user = userCredential.user;

    await AsyncStorage.setItem('user', JSON.stringify(user));

    router.replace('/home')
    console.log(user)
    ToastAndroid.show('Successfuly Sign In', ToastAndroid.SHORT)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage,errorCode)

    if(errorCode=='auth/invalid-email')
    {
      ToastAndroid.show('The Account does not exist', ToastAndroid.LONG)
    }
    else if(errorCode=='auth/invalid-credential')
    {
      ToastAndroid.show('Wrong Password', ToastAndroid.LONG)
    }
    else
    {
      return;
    }
  });
  }
  return (
    <View style={{
      height:'100%',

    }}>
        <Image source={require('./../../../assets/images/beach.jpg')}
        style={{ 
          width: '100%', 
          height: '100%'
        }}/>
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>router.push('/login')}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30,
        marginTop:30,
      }}>Welcome back</Text>

      <Text style={{
        fontFamily:'outfit',
        fontSize:30,
        color:Colors.GRAY,
        marginTop:20,
      }}>Let's Sign you In</Text>

        {/*Email*/}
      <View style={{
        marginTop:50
      }}>
        <Text style={{
          fontFamily:'outfit'
        }}>Email</Text>
        <TextInput style={styles.input} 
        onChangeText={(value)=>setEmail(value)}
        placeholder='Enter Email'/>
      </View>

      {/*Password*/}
      <View style={{
        marginTop:20
      }}>
        <Text style={{
          fontFamily:'outfit'
        }}>Password</Text>
        <TextInput secureTextEntry={true} style={styles.input} 
        onChangeText={(value)=>setPassword(value)}
        placeholder='Enter Password'/>
      </View>

      {/* Sign In button */}
      <TouchableOpacity 
      onPress={onSignIn}
      style={{
        padding:15,
        backgroundColor:Colors.PEIMARY,
        borderRadius:20,
        marginTop:50,
      }}>
        <Text style={{
          color:Colors.WHITE,
          textAlign:'center',
        }}>Sign In</Text>
      </TouchableOpacity>

      {/* Create account button */}
      <TouchableOpacity 
      onPress={()=>router.replace('auth/sign-up')}
      style={{
        padding:15,
        backgroundColor:Colors.WHITE,
        borderRadius:20,
        marginTop:20,
        borderWidth:1,
      }}>
        <Text style={{
          color:Colors.PEIMARY,
          textAlign:'center',
        }}>Create Account</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input:{
    padding: 15,
    borderWidth:1,
    borderRadius:15,
    borderColor: Colors.GRAY,
    fontFamily:'outfit'
  },

  container:{
        backgroundColor: Colors.WHITE,
        marginTop:-700,
        height: '100%',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        padding: 25
    },

    button:{
        padding:15,
        backgroundColor:Colors.PEIMARY,
        borderRadius:99,
        marginTop:'25%'
    }
})


