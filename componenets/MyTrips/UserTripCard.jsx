import { View, Text, Image } from 'react-native'
import React from 'react'
import moment from 'moment'
import { Colors } from '../../constants/Colors';

export default function UserTripCard({trip}) {

    /* const formatData=()=>{
        return JSON.parse(data);
    } */
   const formatData = (data) => {
      return JSON.parse(data);
    };

  return (
    <View style={{
        marginTop:20,
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center'
    }}>
        <Image
          source={{uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${formatData(trip.tripData).locationInfo?.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`}}
        style={{
            width:100,
            height:100,
            borderRadius:15,
        }}
        />
      <View>
        <Text style={{
            fontFamily:'outfit-medium',
            fontSize:18
        }}>{trip.tripPlan?.location}</Text>
        <Text style={{
            fontFamily:'outfit',
            fontSize:14,
            color:Colors.GRAY
        }}>Traveler(s): {formatData(trip.tripData).traveler.title}</Text>
        <Text tyle={{
            fontFamily:'outfit',
            fontSize:14,
            color:Colors.GRAY
        }}>{moment(formatData(trip.tripData).startDate).format('DD MMM YYYY')}</Text>
      </View>
    </View>
  )
}