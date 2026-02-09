import { ScrollView, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import PlaceCard from './PlaceCard';

export default function PlannedTrip({ details }) {

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
        <PlaceCard 
          key={index}
          dayInfo={dayInfo}
          index={index}      // <-- VERY IMPORTANT
        />
      ))}
    </ScrollView>
  );
}
