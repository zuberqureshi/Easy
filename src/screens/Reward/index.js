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


const Reward = () => {

    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState()
    const [loadingStatus, setLoadingStatus] = useState(true)

 //Get User Info
 const getUserInfo = async () => {
   const ds = await getToken();
  const data = await JSON.parse(ds)
  await setUserInfo(data)

}
    const load = async () => {
       await getUserInfo();
  
    }
  

  //DailyRewardClaim
  const dailyRewardClaim = async () => {
   
    const body = {
      user_id: userInfo.id,
    };
    const dailyRewardCheckClaim = await CallApiJson('dailyrewardclaim', 'POST', body); 
     console.log(" dailyRewardClaim API", body)

  }


    useEffect(() => {
      load();
      const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
          rewarded.show();
      });
      const unsubscribeEarned = rewarded.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        reward => {
          console.log('User earned reward of ', reward);
          setLoadingStatus(false)
          dailyRewardClaim();

        },
      );
  
      // Start loading the rewarded ad straight away
      rewarded.load();
  
      // Unsubscribe from events on unmount
      return () => {
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
                  Come back everyday to earn{'\n'}
                  {'        '}Extra reward coins!
                </Text>
                <Image style={{ width: responsiveWidth(46), height: responsiveHeight(20), marginTop: responsiveWidth(4) }} source={require('../../assets/dailygift.png')} />

                <Text
                  style={{
                    fontSize: responsiveWidth(3.8),
                    marginTop: responsiveWidth(5),
                    color: '#fff',

                  }}>
                  YOUR REWARD TODAY IS
                </Text>
                <View style={{ flexDirection: 'row' }} >
                  <Image style={{ width: responsiveWidth(7.15), height: responsiveHeight(3.65), marginTop: responsiveWidth(0.5), marginRight: responsiveWidth(1) }} source={require('../../assets/coin.png')} />
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.9),
                      marginTop: responsiveFontSize(0.7),
                      color: '#fff',

                    }}>
                  500 Coins
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
                
                  onPress={() => {
               


                  }}>
                  <Text style={{ color: '#fff', paddingHorizontal: responsiveWidth(4.4), letterSpacing: responsiveFontSize(0.095) }}>Click Here Go To Home</Text>
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

export default Reward

const styles = StyleSheet.create({


})