import { useRouter } from 'expo-router'; // 1. Import useRouter
import moment from 'moment';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function UserTripCard({trip}) {
    
    // 2. Initialize router hook
    const router = useRouter();

    const formatData = (data) => {
        try {
            return JSON.parse(data);
        } catch (e) {
            console.error("Error parsing trip data:", e);
            return {}; 
        }
    };

    // 3. Define the onPress handler to match UserTripList navigation logic
    const onTripPress = () => {
        router.push({
            pathname: '/trip-details',
            params: {
                // Pass the specific trip prop (not userTrips[0])
                trip: JSON.stringify(trip) 
            }
        });
    }
    
    // Safely extract data for rendering
    const parsedTripData = formatData(trip.tripData);
    const photoRef = parsedTripData.locationInfo?.photoRef;
    const travelerTitle = parsedTripData.traveler?.title;
    const startDate = parsedTripData.startDate;


    return (
        <TouchableOpacity 
            style={{
                marginTop:20,
                display:'flex',
                flexDirection:'row',
                gap:10,
                alignItems:'center'
            }}
            onPress={onTripPress} // 4. Apply the press handler
        >
            <Image
                source={{uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`}}
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
                }}>Traveler(s): {travelerTitle}</Text>
                <Text style={{ // Corrected 'tyle' to 'style'
                    fontFamily:'outfit',
                    fontSize:14,
                    color:Colors.GRAY
                }}>{moment(startDate).format('DD MMM YYYY')}</Text>
            </View>
        </TouchableOpacity>
    )
}