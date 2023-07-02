import React,{ useLayoutEffect,useState,useEffect} from 'react';
import {View, SafeAreaView, StyleSheet,Pressable,TouchableOpacity,Image,Keyboard } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style'
import CallApi, { setToken, CallApiJson, getToken } from '../../utiles/network';
import Loader from '../../components/common/loader/Loader';
import { BannerAdSize,BannerAd,AppOpenAd, RewardedAd, RewardedAdEventType,  TestIds, AdEventType,InterstitialAd } from 'react-native-google-mobile-ads';
import AppLovinMAX from  "react-native-applovin-max";

//admob
const adUnitId =  'ca-app-pub-5493577236373808/8452330072';
const adUnitIdrewarded =  'ca-app-pub-5493577236373808/2741101726';
const adUnitIdIntrestial  = 'ca-app-pub-5493577236373808/6488775047';
const rewarded = RewardedAd.createForAdRequest(adUnitIdrewarded );
//admob


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


const Profile = (props) => {
 

  const [userProfileData, setuserProfileData] = useState({});
  const [loadingStatus, setLoadingStatus] = useState(false)
  const navigation = useNavigation();

  const  loadUserInfo = async () =>{
    setLoadingStatus(true);
      // const data = await JSON.parse(seting)
     const  userdata = await getToken();
     const userdataParsed = await JSON.parse(userdata)
     const body = {
      user_id: userdataParsed.id,
    };

     const profileData = await CallApiJson('getprofile', 'POST',body);
     setLoadingStatus(false);

     setuserProfileData(profileData);
      console.log('UserProfileScreenData',profileData);
  }
  
useEffect(() => {
  console.log('userprofile',userProfileData)

  loadUserInfo();
  return  ()=>{
    console.log('return')
  }
}, [])


 

//applovin 
useEffect(() => {

  //intrestial
  AppLovinMAX.loadInterstitial(INTERSTITIAL_AD_UNIT_ID);
  const appLovinIntrestial = AppLovinMAX.addInterstitialLoadedEventListener( async () => {
    // Interstitial ad is ready to show. AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID) now returns 'true'
    const isInterstitialReady =  await AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID);
    if (isInterstitialReady) {
      setclaimButton(false);
      setbuttonDisableTrue(false);
    AppLovinMAX.showInterstitial(INTERSTITIAL_AD_UNIT_ID);
     
    }
  });
  // rewarded
  AppLovinMAX.loadRewardedAd(REWARDED_AD_UNIT_ID);
  const appLovinRewarded =   AppLovinMAX.addRewardedAdLoadedEventListener( async () => {
    const isRewardedAdReady = await AppLovinMAX.isRewardedAdReady(REWARDED_AD_UNIT_ID);
if (isRewardedAdReady) {
 AppLovinMAX.showRewardedAd(REWARDED_AD_UNIT_ID);
}
  });
  //rewarded


 
   return () => { 
    appLovinIntrestial();
    appLovinRewarded();

   }

}, []);
//applovin 



  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={() => {navigation.openDrawer()
          Keyboard.dismiss() }}>

          <Ionicons style={{marginLeft:responsiveWidth(3.8)}} name="menu" size={responsiveWidth(7)} color="#fff" />
        </Pressable>
      ),
     
      headerTitle: "",
      headerStyle: {
        backgroundColor: '#1f4c86'

      },
      headerRight: () =>
        (
           
          <View style={{ flexDirection: 'row' }}>
            <Ionicons onPress={()=>{navigation.navigate('Wallet')}} name="wallet" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(5)}} />
            <TouchableOpacity onPress={()=>{navigation.navigate('EditProfile')}}>
            <IconFeather  name="edit" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(7) }} />
            </TouchableOpacity>
           
          </View>
        
      ),

    });
  }, []);



  return (

    
    <SafeAreaView style={styles.container}>
   
   <Loader loadingStatus = {loadingStatus} />
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: responsiveWidth(3.5)}}>
         <Image
             source={require('../../assets/man.png')}
            // size={responsiveWidth(19.5)}
            style={{width:responsiveWidth(19),height:responsiveHeight(9.1),resizeMode:'contain'}}
         />
          <View style={{marginLeft: responsiveWidth(4.85)}}>
            <Title style={[styles.title, {
              marginTop:responsiveWidth(3.65),
              marginBottom: responsiveWidth(1.2),
            }]}>{userProfileData?.data?.name} </Title>
            <Caption style={styles.caption}>{userProfileData?.data?.email.substring(0,17)}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={responsiveWidth(5)}/>
          <Text style={{color:"#777777", marginLeft: responsiveWidth(5)}}>{ userProfileData?.data?.address ?`${userProfileData?.data?.address},${userProfileData?.data?.country}`:`N/A`}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={responsiveWidth(5)}/>
          <Text style={{color:"#777777", marginLeft:responsiveWidth(5) }}>{ userProfileData?.data?.mobile ?`${userProfileData?.data?.mobile}`:`N/A`}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={responsiveWidth(5)}/>
          <Text style={{color:"#777777", marginLeft: responsiveWidth(5)}}>{ userProfileData?.data?.email ?`${userProfileData?.data?.email}`:`N/A`}</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={ {flexDirection:'row',alignItems:'center',}}>
          <Image style={{width:responsiveWidth(8),height:responsiveHeight(4),marginRight:responsiveWidth(3),resizeMode:'contain'}} source={require('../../assets/rupee.png')} />
            <Title style={{marginRight:responsiveWidth(2),fontSize:responsiveFontSize(3)}}>{userProfileData?.data?.wallet_coins}</Title>
            <Caption style={{fontSize:responsiveFontSize(2)}} >Coins</Caption>
          </View>
      
      </View>

      <View style={styles.menuWrapper}>
      
        <TouchableRipple onPress={() => {navigation.navigate('Wallet')}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color="#1f4c86" size={responsiveWidth(6.1)}/>
            <Text style={styles.menuItemText}>Wallet</Text>
          </View>
        </TouchableRipple>
       
        {/* <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#1f4c86" size={responsiveWidth(6.1)}/>
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <IconFeather name="settings" color="#1f4c86" size={responsiveWidth(6.1)}/>
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple> */}
      </View>

      <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
       <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
       <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
    </SafeAreaView>
   
  );
};

export default Profile;
