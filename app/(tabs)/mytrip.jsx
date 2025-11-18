import Ionicons from '@expo/vector-icons/Ionicons';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import StartNewTripCard from '../../componenets/MyTrips/StartNewTripCard';
import { auth, db } from '../../configs/FirebaseConfig';
import { Colors } from './../../constants/Colors';
import UserTripList from '../../componenets/MyTrips/UserTripList';
import { useRouter } from 'expo-router';

export default function MyTrip() {

  const [userTrips, setUserTrips]=useState([]);
  const [loading,setLoading]=useState(false);
  const router=useRouter();
  const user=auth.currentUser;

  useEffect(()=>{
    user&&GetMyTrips();
  },[user])


  const GetMyTrips=async()=>{
    setLoading(true)
    setUserTrips([]);
    const q=query(collection(db, 'Usertrips'),where('userEmail','==',user?.email));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setUserTrips(prev=>[...prev,doc.data()])
   });
    setLoading(false);

  }
  return (
    <ScrollView contentContainerStyle={{
      padding:25,
      paddingTop:55,
      paddingBottom: 25,
      backgroundColor:Colors.WHITE,
      minHeighteight:'100%'
    }}>

      
      <View style={{
        display:'flex',
        flexDirection:'row',
        alignContent:'center',
      }}>
        <Text style={{
          fontFamily:'outfit-bold',
          fontSize:35
        }}>My Trip</Text>
      </View>

      {loading&&<ActivityIndicator size={'large'} color={Colors.PEIMARY}/>}

      {userTrips?.length==0?
        <StartNewTripCard/>:
        <UserTripList userTrips={userTrips}/>
      }
    </ScrollView>
  )
}