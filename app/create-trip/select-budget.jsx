import { useNavigation, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { FlatList, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { SelectBudgetOptions } from '../../constants/Options';
import { CreateTripContext } from '../../context/CreateTripContext';
import OptionCard from './../../componenets/CreateTrip/OptionCard';


export default function SelectBudget() {

    const navigation=useNavigation();
    const [selectedOption,setSelectedOption]=useState();
    const [selectBudger,setSelectBudget]=useState();
    const {tripData,setTripData}=useContext(CreateTripContext);
    const router=useRouter();

    const onClickContinue=()=>{
        if(!selectedOption){
            ToastAndroid.show('Select Your Budget', ToastAndroid.SHORT);
            return;
        }

        router.push('/create-trip/review-trip');
    }

    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTransparent:true,
            headerTitle:''
        })
    }, [])

    useEffect(()=>{
        selectedOption&&setTripData({...tripData,
            budget:selectedOption?.title
        })
    },[selectedOption])

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
        marginTop:20}}
    >Budget</Text>

        <View style={{
            marginTop:20,
        }}>
            <Text style={{
                fontFamily:'outfit-bold',
                fontSize:20,
            }}>Choose spending hapits for your trip</Text>

            <FlatList
                data={SelectBudgetOptions}
                renderItem={({item, index})=>(
                    <TouchableOpacity
                    onPress={()=>setSelectedOption(item)}
                    style={{
                        marginVertical:10
                    }}>
                    <OptionCard 
                        option={item}
                        selectedOption={selectedOption}    
                    />
                    </TouchableOpacity>
                )}
            />
        </View>
        <TouchableOpacity 
        onPress={()=>onClickContinue()}
        style={{
        padding:15,
        backgroundColor:Colors.PEIMARY,
        borderRadius:15,
        marginTop:20}}>
            <Text style={{
            textAlign:'center',
            color:Colors.WHITE,
            fontFamily:'outfit-medium',
            fontSize:20,
        }}>Continue</Text>

        </TouchableOpacity>
    </View>
  )
}