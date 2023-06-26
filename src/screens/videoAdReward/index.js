import { View, Text, Button, Pressable, SafeAreaView, ScrollView, Image, TouchableOpacity, Modal, TouchableHighlight, ToastAndroid,StyleSheet } from 'react-native'
import React,{ useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient'
import Loader from '../../components/common/loader/Loader';
import CallApi, { setToken, CallApiJson, getToken } from '../../utiles/network';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { BannerAdSize,BannerAd,AppOpenAd, RewardedAd, RewardedAdEventType,  TestIds, AdEventType,InterstitialAd } from 'react-native-google-mobile-ads';
const adUnitId =  'ca-app-pub-2291791121050290/1352844929';
const adUnitIdrewarded =  'ca-app-pub-2291791121050290/6625314913';

const rewarded = RewardedAd.createForAdRequest(adUnitIdrewarded );


const VideoReward = () => {

    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState()
    const [loadingStatus, setLoadingStatus] = useState(true)
    const [buttonDisableTrue, setbuttonDisableTrue] = useState(true)
    const [userSettings, setUserSettings] = useState()

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
  

  //Video Ad Reward
  const videoAdRewardClaim = async () => {
    setLoadingStatus(true)

    const body = {
      user_id: userInfo.id,
    };

    const videoAdReward = await CallApiJson('videoadrewardclaim', 'POST', body);
     console.log('videoAdReward Calim after api ', videoAdReward);
     setLoadingStatus(false)

     navigation.navigate('Home');
  }


    useEffect(() => {
      setLoadingStatus(true)

      load();
      const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
          rewarded.show();
          setLoadingStatus(false)

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
      return () => {
        setLoadingStatus(false)
        unsubscribeLoaded();
        unsubscribeEarned();
      };
    }, []);


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
          <TouchableOpacity onPress={() => {           videoAdRewardClaim();  }}>
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
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
      </View>
 

    <LinearGradient colors={["#0a203e", "#1f4c86"]}
      useAngle={true}
      angle={322}
      angleCenter={{ x: 0.5, y: 0.5 }}
      style={{  flex: 0.7,
     borderRadius: responsiveWidth(2.5),
      height: 50, 
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
                  Came Back And Earn Again  !
                  After 1 Video Always Wait for 30 Seconds  else You will be Blocked 
                </Text>
                <Image style={{ width: responsiveWidth(46), height: responsiveHeight(20), marginTop: responsiveWidth(4) }} source={require('../../assets/dailygift.png')} />

                <Text
                  style={{
                    fontSize: responsiveWidth(3.8),
                    marginTop: responsiveWidth(5),
                    color: '#fff',

                  }}>
                  YOUR VIDEO REWARD  IS
                </Text>
                <View style={{ flexDirection: 'row' }} >
                  <Image style={{ width: responsiveWidth(7.15), height: responsiveHeight(3.65), marginTop: responsiveWidth(0.5), marginRight: responsiveWidth(1) }} source={require('../../assets/coin.png')} />
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.9),
                      marginTop: responsiveFontSize(0.7),
                      color: '#fff',

                    }}>
                      {userSettings && userSettings.data.video_ad_coin} Coins
                  </Text>
                </View>
                <TouchableOpacity
                  style={{

                    height: responsiveHeight(6),
                    padding: responsiveWidth(2.5),
                    width:responsiveWidth(50),
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
               
                    videoAdRewardClaim()

                  }}>
                  <Text style={{ color: '#fff', paddingHorizontal: responsiveWidth(4.4), letterSpacing: responsiveFontSize(0.095) }}> { buttonDisableTrue ? 'Please Wait ' : 'Claim your Reward' }   </Text>
                </TouchableOpacity>
          
 

      </View>

                }

      <View style={{        marginTop:responsiveWidth(15)  }}  >

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

      </View>
    </LinearGradient>



      

    
    </View>

   
  )
}

export default VideoReward

const styles = StyleSheet.create({


})