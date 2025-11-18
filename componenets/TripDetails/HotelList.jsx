import { Image } from 'expo-image'
import { FlatList, Text, View } from 'react-native'
import { Colors } from '../../constants/Colors'

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
            <View style={{
                marginRight:20,
                padding:15,
                width:190,
                borderWidth:1,
                borderRadius:15,
                borderColor:Colors.LIGHT_GRAY,
                alignItems:'center'
            }}>
                <Image source={require('./../../assets/images/alorsetar.jpeg')}
                style={{
                    width:180,
                    height:120,
                    borderRadius:15,
              
                }}
                />
                <View style={{
      
                }}>
                    <Text style={{
                        fontFamily:'outfit-medium',
                        fontSize:15,
                        marginTop:2
                    }}>{item.name}</Text>

                    <View style={{

                    }}>
                        <Text style={{
                            fontFamily:'outfit',
                            marginTop:2
                        }}>{item.price}</Text>
                        <Text style={{
                            fontFamily:'outfit',
                            marginTop:2
                        }}>⭐ {item.rating}</Text>
                    </View>
                </View>
            </View>
        )}
      />
    </View>
  )
}