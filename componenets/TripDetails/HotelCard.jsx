import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { GetPhotoRef } from '../../services/GooglePlaceApi';

export default function HotelCard({item}) {

    const [photoRef,setPhotoRef]=useState();

    useEffect(()=>{
        GetGooglePhotoRef();
        
    },[])

    const GetGooglePhotoRef = async () => {
        const result = await GetPhotoRef(item.name);

        if (
            result?.results?.[0]?.photos?.[0]?.photo_reference
        ) {
            setPhotoRef(result.results[0].photos[0].photo_reference);
        } else {
            setPhotoRef(null); // No image found
        }
        console.log("PHOTO REF:", result.results[0].photos?.[0]?.photo_reference);

    };

  return (
    <View style={{
        marginRight:20, 
        padding:15,
        width:190,
        borderWidth:1,
        borderRadius:15,
        borderColor:Colors.LIGHT_GRAY,
        alignItems:'center'
    }}>
        <Image source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
            }}
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
  )
}