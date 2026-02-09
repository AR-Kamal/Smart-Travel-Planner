import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { useNavigation, useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../../configs/FirebaseConfig';
import { Colors } from '../../../constants/Colors';

export default function SignUp() {
  const navigation=useNavigation();
  const router=useRouter();

  
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [fullName,setFullName]=useState();

  useEffect(()=>{
    navigation.setOptions({
      headerShown:false
    })
  }, [])

  const OnCreateAccount=async()=>{

    if(!email||!password||!fullName)
    {
      ToastAndroid.show("Please Enter all Details", ToastAndroid.LONG);
      return;
    }
    /* createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    router.replace('/mytrip')
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage,errorCode);
    // ..
  }); */
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save fullName to Firestore
      await setDoc(doc(db, "Users", user.uid), {
        fullName: fullName,
        email: email,
        createdAt: new Date(),
      });

      ToastAndroid.show("Account Created Successfully!", ToastAndroid.SHORT);

      router.replace('/(tabs)/home');  // better navigation

    } catch (error) {
      console.log(error);

      if (error.code === 'auth/email-already-in-use') {
        ToastAndroid.show("Email already in use", ToastAndroid.LONG);
      } else if (error.code === 'auth/weak-password') {
        ToastAndroid.show("Password must be at least 6 characters", ToastAndroid.LONG);
      } else {
        ToastAndroid.show("Failed to create account", ToastAndroid.LONG);
      }
    }
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
      <TouchableOpacity onPress={()=>router.replace('auth/sign-in')}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30,
        marginTop:30,
      }}>Create New Account</Text>

      {/*Full name*/}
      <View style={{
        marginTop:50
      }}>
        <Text style={{
          fontFamily:'outfit'
        }}>Full Name</Text>
        <TextInput style={styles.input} 
        onChangeText={(value)=>setFullName(value)}
        placeholder='Enter Full Name'
        />
      </View>

      {/*Email*/}
      <View style={{
        marginTop:20
      }}>
        <Text style={{
          fontFamily:'outfit'
        }}>Email</Text>
        <TextInput style={styles.input} 
        onChangeText={(value)=>setEmail(value)}
        placeholder='Enter Email'
        />
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
          placeholder='Enter Password'
          />
        </View>

      {/* Create Account button */}
      <TouchableOpacity 
      onPress={OnCreateAccount}
      style={{
        padding:15,
        backgroundColor:Colors.PEIMARY,
        borderRadius:20,
        marginTop:50,
      }}>
        <Text style={{
          color:Colors.WHITE,
          textAlign:'center',
        }}>Create Account</Text>
      </TouchableOpacity>

      {/* Sign In button */}
      <TouchableOpacity 
      onPress={()=>router.replace('auth/sign-in')}
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
        }}>Sign In</Text>
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