import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function PlannedTrip({ details }) {


    const isValidImage = (url) => {
        return url && url.startsWith("http") && (url.endsWith(".jpg") || url.endsWith(".jpeg") || url.endsWith(".png"));
    };


  // Prevent crash before data loads
  if (!details || !Array.isArray(details)) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Loading itinerary...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      
      {details.map((dayInfo, index) => (
        <View key={index} style={{ marginBottom: 30 }}>

          {/* -- Day Title -- */}
          <Text style={{
            fontSize: 22,
            fontFamily: 'outfit-bold',
            marginBottom: 10,
          }}>
            Day {index + 1}
          </Text>

          {/* Loop through morning, afternoon, etc */}
          {Object.entries(dayInfo).map(([period, activity]) => {

            // Skip non-object values like "day" or "theme"
            if (typeof activity !== 'object') return null;

            return (
              <View key={period} style={{
                backgroundColor: Colors.WHITE,
                padding: 12,
                borderRadius: 12,
                marginBottom: 15,
                shadowColor: Colors.PEIMARY,
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}>

                {/* Period Label */}
                <Text style={{
                  fontSize: 16,
                  fontFamily: 'outfit-medium',
                  color: Colors.GRAY,
                  marginBottom: 6
                }}>
                  {period.toUpperCase()}
                </Text>

                {/* Image */}
                <Image
                source={
                    isValidImage(activity.image_url)
                    ? { uri: activity.image_url }
                    : require('./../../assets/images/alorsetar.jpeg')
                }
                style={{
                    width: "100%",
                    height: 180,
                    borderRadius: 10,
                    marginBottom: 10,
                }}
                />

                {/* Activity Name */}
                <Text style={{
                  fontSize: 18,
                  fontFamily: 'outfit-bold',
                  marginBottom: 4,
                }}>
                  {activity.activity}
                </Text>

                {/* Details */}
                <Text style={{
                  fontSize: 14,
                  color: Colors.GRAY,
                  marginBottom: 10,
                }}>
                  {activity.details}
                </Text>

                {/* Row: Time / Duration / Price */}
                <View style={{ flexDirection: 'row', gap: 20, width:180 }}>

                  {/* Time */}
                  <View>
                    <Text style={{ fontFamily: 'outfit-medium' }}>Time</Text>
                    <Text>{activity.time}</Text>
                  </View>

                  {/* Duration */}
                  <View>
                    <Text style={{ fontFamily: 'outfit-medium' }}>Duration</Text>
                    <Text>{activity.duration}</Text>
                  </View>

                  {/* Price */}
                  <View>
                    <Text style={{ 
                        fontFamily: 'outfit-medium',
                        flex:1
                    }}>Price</Text>
                    <Text>{activity.price}</Text>
                  </View>

                </View>
                    <TouchableOpacity style={{
                        backgroundColor:Colors.PEIMARY,
                        padding:5,
                        borderRadius:7,
                        marginTop:10,
                        backgroundColor:Colors.LIGHT_GRAY,
                        borderWidth:1,
                        borderRadius:10,
                        borderColor:Colors.GRAY,
                        flexDirection:'row',
                        gap:100
                    }}>
                        <Ionicons name="navigate" size={24} color="black" />
                        <Text style={{
                            textAlign:'center',
                            fontFamily:'outfit-medium',
                            fontSize:17
                        }}>Navigate</Text>
                    </TouchableOpacity>
              </View>
            );
          })}

        </View>
      ))}

    </ScrollView>
  );
}
