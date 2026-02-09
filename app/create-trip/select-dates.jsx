import { useNavigation, useRouter } from 'expo-router';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import CalendarPicker from "react-native-calendar-picker";
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SelectDates() {

    const navigation=useNavigation();
    const [startDate,setStartDate]=useState();
    const [endDate,setEndDate]=useState();
    const {tripData,setTripData}=useContext(CreateTripContext);
    const router=useRouter();

    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTransparent:true,
            headerTitle:''
        })
    }, [])

    
    const onDateChange = (date, type) => {
        console.log('Selected date:', date, 'Type:', type);
        if(type=='START_DATE')
            {
                setStartDate(moment(date));
                setEndDate(null);
            }
            else if(type=='END_DATE'){
                setEndDate(moment(date));
            }
        };
    const OnDateSelectionContinue=()=>{

        if(!startDate || !endDate){
            ToastAndroid.show('Please select start and end dates', ToastAndroid.LONG);
            return;
        };

        if (!moment.isMoment(startDate) || !moment.isMoment(endDate)) {
            console.error('startDate or endDate is not a moment object');
            return;
        };

        const totalNoOfDays = endDate.diff(startDate, 'days');
        console.log('Total days selected:', totalNoOfDays+1);

        setTripData({
            ...tripData,
            startDate:startDate,
            endDate:endDate,
            totalNoOfDays:totalNoOfDays+1
        });

        router.push('/create-trip/select-budget')

    };

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
      }}>Travel Dates</Text>
      <View style={{
        marginTop:30,
      }}>
        <CalendarPicker 
        onDateChange={onDateChange}
        allowRangeSelection={true}
        minDate={new Date()}
        maxRangeDuration={5}
        selectedRangeStyle={{
            backgroundColor:Colors.PEIMARY
        }}
        selectedDayTextStyle={{
            color:Colors.WHITE
        }}
        />
      </View>
        <TouchableOpacity 
        onPress={OnDateSelectionContinue}
        style={{
        padding:15,
        backgroundColor:Colors.PEIMARY,
        borderRadius:15,
        marginTop:35}}>
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