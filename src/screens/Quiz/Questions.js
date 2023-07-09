import { View, Text, FlatList, TouchableOpacity,onPress } from 'react-native'
import React,{useState  , useEffect} from 'react'
import {windowHeight,windowWidth} from '../../utiles/Dimensions'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import styles from './style'
import RenderHtml from 'react-native-render-html';
import AppLovinMAX from  "react-native-applovin-max";
 

//applovin

AppLovinMAX.initialize("WbvV2RHHbEGVC_s0Od_B0cZoG97sxIom919586O4G_eOin_W3n6ef2WdHqlug5t5IG_ZSo2D6VGE11RWPocUqk").then(configuration => {
 // SDK is initialized, start loading ads
}).catch(error => {
});
const BANNER_AD_UNIT_ID = Platform.select({
 android: '2c0d4e4e0e0d9af8'
});
const REWARDED_AD_UNIT_ID = Platform.select({
 android: '3365fad27fce67ed',
});
const INTERSTITIAL_AD_UNIT_ID = Platform.select({
 android: '8fba0df7d5246704',
});
//applovin

const Questions = ({data,selectedOption}) => {

//applovin 
useEffect(() => {

  //intrestial
  AppLovinMAX.loadInterstitial(INTERSTITIAL_AD_UNIT_ID);
  const appLovinIntrestial = AppLovinMAX.addInterstitialLoadedEventListener( async () => {
    // Interstitial ad is ready to show. AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID) now returns 'true'
    const isInterstitialReady =  await AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID);
    if (isInterstitialReady) {
        // AppLovinMAX.showInterstitial(INTERSTITIAL_AD_UNIT_ID);
     
    }
  });
  // rewarded
  AppLovinMAX.loadRewardedAd(REWARDED_AD_UNIT_ID);
  const appLovinRewarded =   AppLovinMAX.addRewardedAdLoadedEventListener( async () => {
    const isRewardedAdReady = await AppLovinMAX.isRewardedAdReady(REWARDED_AD_UNIT_ID);
if (isRewardedAdReady) {
  // AppLovinMAX.showRewardedAd(REWARDED_AD_UNIT_ID);
}
  });
  //rewarded


 
   return () => { 
    appLovinIntrestial();
    appLovinRewarded();

   }

}, []);


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