import { View, Text, FlatList, TouchableOpacity,onPress } from 'react-native'
import React,{useState } from 'react'
import {windowHeight,windowWidth} from '../../utiles/Dimensions'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import styles from './style'
import RenderHtml from 'react-native-render-html';


const Questions = ({data,selectedOption}) => {
  return (
    <View style={{width:windowWidth}} >
      <Text style={styles.ques} >
      { 'Ques:' + data.question}
      </Text>
    
    <View style={{marginTop:responsiveWidth(5)}} >
    <FlatList
      data={data.Options}
      renderItem={({item,index})=>{
        return(
          <TouchableOpacity style={[styles.quesOption,{ backgroundColor: data.marked==index+1 ? '#1f4c86' :'#fff',}]} 
          onPress={()=>{
            // console.warn(index)
            selectedOption(index + 1);
          }}>
             
        <View style={[styles.optionNumberView,{  backgroundColor:data.marked==index+1 ? '#fff':'#1f4c86' ,}]}>
        
        <Text style={{fontWeight: '600', color:data.marked==index+1 ? '#000':'#fff' }}>
        {index == 0 ? 'A' : index == 1 ? 'B' : index == 2 ? 'C' : 'D'}
        </Text>
        
        </View>

        <Text style={{fontSize: responsiveFontSize(1.9), fontWeight: '600', marginLeft: responsiveWidth(2.5),color:data.marked == index + 1 ?'#fff':'#000',marginVertical:responsiveWidth(1),width:responsiveWidth(75)}}>
                  {item}
                </Text>

          </TouchableOpacity>
        )
      }}
     /> 
    </View>   

    </View>
  )
}

export default Questions