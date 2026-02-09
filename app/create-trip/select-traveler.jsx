import { Link, useNavigation, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
//import { HeaderTitle } from '@react-navigation/elements';
import OptionCard from '../../componenets/CreateTrip/OptionCard';
import { Colors } from './../../constants/Colors';
import { SelectTravelesList } from './../../constants/Options';
import { CreateTripContext } from './../../context/CreateTripContext';

export default function SelectTraveler() {

    const navigation=useNavigation();
    const [selectedTraveler,setSelectedTraveler]=useState();
    //const [selectedOption,setSelectedOption]=useState();
    const {tripData,setTripData}=useContext(CreateTripContext);
    const router=useRouter();


    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTransparent:true,
            headerTitle:''
        })
    }, [])

    useEffect(()=>{
        setTripData({...tripData,
            traveler:selectedTraveler
        }) 
    }, [selectedTraveler])

    useEffect(()=>{

    },[tripData])
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
      }}>Who's traveling</Text>
      <View style={{
        marginTop:20,
      }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:23,
        
      }}>Choose your traveler</Text>
      <FlatList
        data={SelectTravelesList}
        renderItem={({item, index})=>(
            <TouchableOpacity 
            onPress={()=>setSelectedTraveler(item)}
            style={{
                marginVertical:10
            }}>
                <OptionCard 
                    option={item}
                    selectedOption={selectedTraveler}
                
                />
            </TouchableOpacity>
        )}
      />
      </View>
        <TouchableOpacity style={{
        padding:15,
        backgroundColor:Colors.PEIMARY,
        borderRadius:15,
        marginTop:20}}>
        <Link href={'/create-trip/select-dates'}
        style={{
            width:'100%',
        }}
        >
            <Text style={{
            textAlign:'center',
            color:Colors.WHITE,
            fontFamily:'outfit-medium',
            fontSize:20,
        }}>Continue</Text>

        </Link>
            
        </TouchableOpacity>
    </View>
  )
}