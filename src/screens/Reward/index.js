import { View, Text, Button, Pressable, SafeAreaView, ScrollView, Image, TouchableOpacity, Modal, TouchableHighlight, ToastAndroid,StyleSheet, Alert } from 'react-native'
import React,{ useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient'
import Loader from '../../components/common/loader/Loader';
import CallApi, { setToken, CallApiJson, getToken } from '../../utiles/network';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
//goggle admob
import { BannerAdSize,BannerAd,AppOpenAd, RewardedAd, RewardedAdEventType, RewardedInterstitialAd, TestIds, AdEventType,InterstitialAd } from 'react-native-google-mobile-ads';
//applovin
import AppLovinMAX from  "react-native-applovin-max";

//goggle admob
const adUnitId =  'ca-app-pub-5493577236373808/8452330072';
const adUnitIdrewarded =   'ca-app-pub-5493577236373808/2741101726';
const adUnitIdIntrestial  = 'ca-app-pub-5493577236373808/6488775047';
const adUnitIdIntrestialRewarded  ='ca-app-pub-5493577236373808/8357047029';

const interstitial = InterstitialAd.createForAdRequest(adUnitIdIntrestial, { });
const rewarded = RewardedAd.createForAdRequest(adUnitIdrewarded,{} );
const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitIdIntrestialRewarded, {});
//goggle admob

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


const Reward = () => {

    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState()
    const [loadingStatus, setLoadingStatus] = useState(false)
    const [userSettings, setUserSettings] = useState()
    const [buttonDisableTrue, setbuttonDisableTrue] = useState(true)

 //Get User Info
 const getUserInfo = async () => {
   const ds = await getToken();
  const data = await JSON.parse(ds)
  await setUserInfo(data)

}

  // setting api
  const settings = async () => {

    const seting = await CallApiJson('settings', 'GET');
    // const data = await JSON.parse(seting)
    await setUserSettings(seting)

  }
    const load = async () => {
      setLoadingStatus(true)
       await settings();
       await getUserInfo();
       setLoadingStatus(false)
    }
  

  //DailyRewardClaim
  const dailyRewardClaim = async () => {
    await showApplovinIntrestial();
    setLoadingStatus(true)
    const body = {
      user_id: userInfo.id,
    };
    const dailyRewardCheckClaim = await CallApiJson('dailyrewardclaim', 'POST', body); 
    console.log(" dailyRewardCheckClaim", dailyRewardCheckClaim);
    setLoadingStatus(false)
    if( dailyRewardCheckClaim.error == false){
    Alert.alert('You Have claimed Reward');
    }else{
      Alert.alert( `Failed${dailyRewardCheckClaim.msg} `);
    }
    navigation.navigate('Home');

  }


    useEffect(() => {
      load();
      setLoadingStatus(true)

      const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
           rewarded.show();
           setLoadingStatus(false)
           setbuttonDisableTrue(false)

      });
      const unsubscribeEarned = rewarded.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        reward => {
           setLoadingStatus(false)
           setbuttonDisableTrue(false)
        },
      );
  
      // Start loading the rewarded ad straight away
      rewarded.load();
      // Unsubscribe from events on unmount


    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      interstitial.show()
      setbuttonDisableTrue(false)

    });

    // Start loading the interstitial straight away
    interstitial.load();


    //intrestial rewarded 

    const unsubscribeLoadedIntrestialRewarded = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
       },
    );
    const unsubscribeEarnedIntrestialRewarded = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
      },
    );

    // Start loading the rewarded interstitial ad straight away
    rewardedInterstitial.load();

    //intrestial reward


      return () => {
        unsubscribe();
        unsubscribeLoadedIntrestialRewarded();
        unsubscribeEarnedIntrestialRewarded()
        unsubscribeLoaded();
        unsubscribeEarned();
      };
    }, []);



 

//applovin 
useEffect(() => {

  //intrestial
  AppLovinMAX.loadInterstitial(INTERSTITIAL_AD_UNIT_ID);
  const appLovinIntrestial = AppLovinMAX.addInterstitialLoadedEventListener( async () => {
    // Interstitial ad is ready to show. AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID) now returns 'true'
    const isInterstitialReady =  await AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID);
    if (isInterstitialReady) {
   // AppLovinMAX.showInterstitial(INTERSTITIAL_AD_UNIT_ID);

     //setbuttonDisableTrue(false);
 
    }
  });
  // rewarded
  AppLovinMAX.loadRewardedAd(REWARDED_AD_UNIT_ID);
  const appLovinRewarded =   AppLovinMAX.addRewardedAdLoadedEventListener( async () => {
    const isRewardedAdReady = await AppLovinMAX.isRewardedAdReady(REWARDED_AD_UNIT_ID);
if (isRewardedAdReady) {
 AppLovinMAX.showRewardedAd(REWARDED_AD_UNIT_ID);
  setbuttonDisableTrue(false);
}
  });
  //rewarded


 
   return () => { 
    appLovinIntrestial();
    appLovinRewarded();

   }

}, []);

const showApplovinIntrestial = async ()=>{
  const isInterstitialReady =  await AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID);
  if (isInterstitialReady) {
        AppLovinMAX.showInterstitial(INTERSTITIAL_AD_UNIT_ID);
        setbuttonDisableTrue(false);
        return true;
  }else{
    return false;
  }
}
 

const showApplovinRewarded =()=>{
  AppLovinMAX.showRewardedAd(REWARDED_AD_UNIT_ID);
  setbuttonDisableTrue(false);
}

//applovin 



//

  //  Header start
  useLayoutEffect(() => {


    navigation.setOptions({

      headerLeft: () => (

        <TouchableOpacity onPress={() => navigation.openDrawer()}>

          <Icon name="menu" size={responsiveWidth(7)} color="#fff" />
        </TouchableOpacity>
      ),

      headerTitle: "",
      headerStyle: {
        backgroundColor: '#1f4c86'

      },
      headerRight: () =>
      (

        <View style={{ flexDirection: 'row' }}>
          <Icon onPress={() => { navigation.navigate('Wallet') }} name="wallet" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(5) }} />
          <TouchableOpacity onPress={() => { navigation.navigate('Profile') }}>
            <Icon name="person" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(3) }} />
          </TouchableOpacity>
        </View>

      ),



    });
  }, []);

  //  Header End

  return (
    <View style={{ flex: 1, backgroundColor: "#0a203e", }} >

<Loader loadingStatus = {loadingStatus} />

    <View>
      <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      
    />
      </View>
 

    <LinearGradient colors={["#0a203e", "#1f4c86"]}
      useAngle={true}
      angle={322}
      angleCenter={{ x: 0.5, y: 0.5 }}
      style={{  flex: 0.7,
     borderRadius: responsiveWidth(2.5),

      elevation: responsiveWidth(1.5), 
      marginHorizontal:responsiveWidth(5),
       borderWidth: responsiveWidth(0.2), 
       borderColor: '#1f4c86', 
       marginTop:responsiveWidth(10)

     
      }}>

        { !loadingStatus && 
      <View style={{justifyContent:'center',alignItems:'center' }} >
      <Text
                  style={{
                    fontSize: responsiveFontSize(3.55),
                    letterSpacing: responsiveWidth(0.35),
                    fontWeight: '600',

                    marginTop: responsiveWidth(7),
                    color: '#fff'
                  }}>
                  Congrats 
                </Text>
                <Text
                  style={{
                    fontSize: responsiveWidth(3.8),
                    marginTop: responsiveWidth(1.2),
                    color: '#fff',

                  }}>
                  Daily Reward will be Given Only one time in single Day , 

                  Come Back Tommorrow and Earn Again
                </Text>
                <Image style={{ width: responsiveWidth(46), height: responsiveHeight(20), marginTop: responsiveWidth(4) }} source={require('../../assets/dailygift.png')} />

                <Text
                  style={{
                    fontSize: responsiveWidth(3.8),
                    marginTop: responsiveWidth(5),
                    color: '#fff',

                  }}>
                  YOUR TODAY REWARD  IS
                </Text>
                <View style={{ flexDirection: 'row' }} >
                  <Image style={{ width: responsiveWidth(7.15), height: responsiveHeight(3.65), marginTop: responsiveWidth(0.5), marginRight: responsiveWidth(1) }} source={require('../../assets/coin.png')} />
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.9),
                      marginTop: responsiveFontSize(0.7),
                      color: '#fff',

                    }}>
                  {userSettings && userSettings.data.daily_coin} Coins
                  </Text>
                </View>
                <TouchableOpacity
                  style={{

                    height: responsiveHeight(7),
                    padding: responsiveWidth(2.5),
                    width:responsiveWidth(60),
                    borderRadius: responsiveWidth(2.5),
                    marginTop: responsiveWidth(8),
                    // marginBottom: responsiveWidth(5),
                    backgroundColor: '#0a203e',
                    color: '#fff',
                    elevation: responsiveWidth(1.2),
                    justifyContent:'center',
                    alignItems:'center'
                  }}
                  disabled={buttonDisableTrue}

                  onPress={() => {
                    dailyRewardClaim()


                  }}>
                  <Text style={{ color: '#fff', paddingHorizontal: responsiveWidth(4.4), letterSpacing: responsiveFontSize(0.095) }}> { buttonDisableTrue ? 'Please Wait ' : 'Claim your Reward' }   </Text>
                </TouchableOpacity>
          
 

      </View>

                }

      <View style={{        marginTop:responsiveWidth(15)  }}  >

      <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
     
    />
       <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      
    />

      </View>
    </LinearGradient>



      

    
    </View>

   
  )
}

export default Reward

const styles = StyleSheet.create({


})