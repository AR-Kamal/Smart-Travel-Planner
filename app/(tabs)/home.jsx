import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function home() {
  return (
    <ScrollView style={{
          padding:25,
          paddingTop:55,
          backgroundColor:Colors.WHITE,
          height:'100%'
        }}>
          <View style={{
        display:'flex',
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'space-between'
             }}>
            <Text style={{
          fontFamily:'outfit-bold',
          fontSize:35
              }}>Home </Text>
          </View>
    </ScrollView>
  )
}