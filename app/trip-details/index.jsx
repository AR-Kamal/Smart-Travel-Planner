import { Image } from 'expo-image';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import HotelList from '../../componenets/TripDetails/HotelList';
import PlannedTrip from '../../componenets/TripDetails/PlannedTrip';
import { Colors } from '../../constants/Colors';

export default function TripDetails() {

  const navigation=useNavigation();
  const { trip }=useLocalSearchParams();
  const [tripDetails,setTripDetails]=useState([]);

  

  const formatData = (data) => {
    if (typeof data !== 'string') return data;
    try {
      return JSON.parse(data);
     } catch (e) {
        console.error("Failed to parse JSON string:", e, "Original Data:", data);
      return {}; 
     }
    };

  useEffect(()=>{
      navigation.setOptions({
      headerShown:true,
      headerTransparent:true,
      headerTitle:''
    })

    setTripDetails(JSON.parse(trip))
  },[])
  return tripDetails&&(
    <ScrollView Style={{
      padding:25,
      paddingTop:55,
      paddingBottom: 25,
      backgroundColor:Colors.WHITE,
      minHeighteight:'100%'
    }}>
      <Image
        source={{uri:`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${formatData(tripDetails?.tripData)?.locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`}}
        style={{
            width:'100%',
            height:330,
        }}
        />
        <View style={{
          padding:15,
          backgroundColor:Colors.WHITE,
          height:'100%',
          marginTop:-30,
          borderTopLeftRadius:30,
          borderTopRightRadius:30

        }}>
        <Text style={{
          fontSize:25,
          fontFamily:'outfit-bold'
        }}>{tripDetails?.tripPlan?.location}</Text>
          <View style={{
            display:'flex',
            flexDirection:'row',
            gap:5,
            marginTop:5
          }}>
            <Text style={{
              fontFamily:'outfit',
              fontSize:18,
              color:Colors.GRAY
            }}>{moment(formatData(tripDetails.tripData)?.startDate).format('DD MMM YYYY')}</Text>
            <Text style={{
              fontFamily:'outfit',
              fontSize:18,
              color:Colors.GRAY
            }}> -  {moment(formatData(tripDetails.tripData)?.endDate).format('DD MMM YYYY')}</Text>
          </View>
            <Text style={{
              fontFamily:'outfit',
              fontSize:17,
              color:Colors.GRAY
            }}>{formatData(tripDetails.tripData)?.traveler.title}</Text>
          {/* Hotel List */}
          <HotelList hotelList={tripDetails?.tripPlan?.hotels}/>

          {/* Trip Day Planner Info*/}
          <PlannedTrip details={tripDetails?.tripPlan?.itinerary}/>
        </View>
    </ScrollView>
  )
}