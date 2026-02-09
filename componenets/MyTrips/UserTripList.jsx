import { useRouter } from 'expo-router';
import moment from 'moment';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import UserTripCard from './UserTripCard';

export default function UserTripList({userTrips}) {


    const LocalData = JSON.parse(userTrips[0].tripData);
    const router = useRouter();

  return userTrips&&(
    <View>
      <View style={{marginTop:20}}>
        {LocalData?.locationInfo?.photoRef ? (
        <Image
            source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${LocalData.locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
            }}
            style={{
            width:'100%',
            height:300,
            objectFit:'cover',
            borderRadius:15
            }}
        />
        ) : (
        <Image
            source={require('./../../assets/images/kedahs.jpeg')}
            style={{
            width:'100%',
            height:300,
            objectFit:'cover',
            borderRadius:15
            }}
        />
        )}

        <View style={{
            marginTop:10,
        }}>
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize:20,

            }}>{userTrips[0].tripPlan?.location}</Text>

            <View style={{
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                marginTop:5
            }}>
                <Text style={{
                    fontFamily:'outfit-medium',
                    fontSize:17,
                    color:Colors.GRAY
                }}>Traveler(s): {LocalData.traveler.title}</Text>
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize:17,
                color:Colors.GRAY
            }}>{moment(LocalData.startDate).format('DD MMM YYYY')}</Text>
            </View>
            <TouchableOpacity 
                onPress={()=>router.push({pathname:'/trip-details',params:{
                    trip:JSON.stringify(userTrips[0])
                }})}
                style={{
                padding:15,
                backgroundColor:Colors.PEIMARY,
                borderRadius:15,
                marginTop:15}}>
                <Text style={{
                    textAlign:'center',
                    color:Colors.WHITE,
                    fontFamily:'outfit-medium',
                    fontSize:15,
                }}>See your plan</Text>
            </TouchableOpacity>
        </View>
        {userTrips.map((trip,index) => (
            <UserTripCard trip={trip} key={index} />
        ))}

        {/* {userTrips.map((trip,index)=>{
            <UserTripCard trip={trip} key={index}/>
        })} */}
      </View>
    </View>
  )
}