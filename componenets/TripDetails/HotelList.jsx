import { FlatList, Text, View } from 'react-native'
import HotelCard from './HotelCard'

export default function HotelList({hotelList}) {



  return (
    <View style={{
        marginTop:20
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20
      }}>Hotel Recommendation</Text>

      <FlatList 
        data={hotelList}
        style={{
            marginTop:8
        }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({item,index})=>(
            <HotelCard item={item}/>
        )}
      />
    </View>
  )
}