import { useNavigation, useRouter } from 'expo-router';
import moment from 'moment';
import { useContext, useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function ReviewTrip() {

    const navigation = useNavigation();
    const {tripData,setTripData}=useContext(CreateTripContext);
    const router=useRouter();

    useEffect(()=>{
        navigation.setOptions=({
            headerShown:true,
            headerTransparent:true,
            headerTitle:'',
        })
    },[]);

    //
  return (
    <View style={{
        padding:25,
        paddingTop:75,
        backgroundColor:Colors.WHITE,
        height:'100%'
        }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:35,
        marginTop:20
      }}>Review Your Trip</Text>
      <View style={{
        marginTop:20
      }}>
        <Text style={{
            fontFamily:'outfit-bold',
            fontSize:20
        }}>
            Before generating your trip, please review youe selection
        </Text>

        {/* Destination Info */}
        <View style={{
            marginTop:45,
            display:'flex',
            flexDirection:'row',
            gap:20
        }}>
            {/* <Ionicons name="location-sharp" size={24} color="black" /> */}
            <Image source={require('./../../assets/images/map-location.png')}
                style={{
                    width: '15%',
                    height: 55
                }}/>
            <View>
                <Text style={{
                    fontFamily:'outfit',
                    fontSize:23,
                    color:Colors.GRAY
                }}>Destination</Text>
                <Text style={{
                    fontFamily:'outfit-medium',
                    fontSize:18
                }}>{tripData?.locationInfo?.name}</Text>
            </View>
        </View>
        {/* Date Info */}
        <View style={{
            marginTop:25,
            display:'flex',
            flexDirection:'row',
            gap:20
        }}>
            <Image source={require('./../../assets/images/calender.png')}
                style={{
                    width: '15%',
                    height: 55
                }}/>
            <View>
                <Text style={{
                    fontFamily:'outfit',
                    fontSize:23,
                    color:Colors.GRAY
                }}>Trip Date</Text>
                <Text style={{
                    fontFamily:'outfit-medium',
                    fontSize:18
                }}>{moment(tripData?.startDate).format('DD MMM') 
                + " To " +
                moment(tripData?.endDate).format('DD MMM') + "  "}
                ({tripData?.totalNoOfDays} Days)
                </Text>
            </View>
        </View>
        {/* Travelers Info */}
        <View style={{
            marginTop:25,
            display:'flex',
            flexDirection:'row',
            gap:20
        }}>
            <Image source={require('./../../assets/images/travelers.png')}
                style={{
                    width: '15%',
                    height: 55
                }}/>
            <View>
                <Text style={{
                    fontFamily:'outfit',
                    fontSize:23,
                    color:Colors.GRAY
                }}>Traveler(s) Type</Text>
                <Text style={{
                    fontFamily:'outfit-medium',
                    fontSize:18
                }}>{tripData?.traveler?.title}
                </Text>
            </View>
        </View>
        {/* Budget Info */}
        <View style={{
            marginTop:25,
            display:'flex',
            flexDirection:'row',
            gap:20
        }}>
            <Image source={require('./../../assets/images/budget.png')}
                style={{
                    width: '15%',
                    height: 55
                }}/>
            <View>
                <Text style={{
                    fontFamily:'outfit',
                    fontSize:23,
                    color:Colors.GRAY
                }}>Budget Type</Text>
                <Text style={{
                    fontFamily:'outfit-medium',
                    fontSize:18
                }}>{tripData?.budget}
                </Text>
            </View>
        </View>
      </View>
        <TouchableOpacity
        onPress={()=>router.replace('/create-trip/generate-trip')}
        style={{
            padding:15,
            backgroundColor:Colors.PEIMARY,
            borderRadius:15,
            marginTop:80
        }}>
            <Text style={{
            textAlign:'center',
            color:Colors.WHITE,
            fontFamily:'outfit-medium',
            fontSize:20,
        }}>Build My Trip</Text>

        </TouchableOpacity>
    </View>
  )
}