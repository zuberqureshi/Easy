import { View, Text, Button, Pressable, SafeAreaView, ScrollView, Image, TouchableOpacity, Modal, TouchableHighlight, ToastAndroid, StyleSheet, } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { WebView } from 'react-native-webview';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient'
import Loader from '../../components/common/loader/Loader';
import CallApi, { setToken, CallApiJson, getToken } from '../../utiles/network';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import YoutubePlayer from "react-native-youtube-iframe";
import { BannerAdSize,BannerAd,AppOpenAd, RewardedAd, RewardedAdEventType,  TestIds, AdEventType,InterstitialAd } from 'react-native-google-mobile-ads';
import VersionCheck from 'react-native-version-check';

const adUnitId =  'ca-app-pub-5493577236373808/8452330072';
const adUnitIdrewarded =  'ca-app-pub-5493577236373808/2741101726';
const adUnitIdIntrestial  = 'ca-app-pub-5493577236373808/6488775047';
const interstitial = InterstitialAd.createForAdRequest(adUnitIdIntrestial, { 
});
const rewarded = RewardedAd.createForAdRequest(adUnitIdrewarded );
const delay  = 150;
const delaySeconds  = delay*1000;

const Youtube = ({ route }) => {

    const { videoId } = route.params;
    const navigation = useNavigation();
    const [loadingStatus, setLoadingStatus] = useState(false)
    const [videoIdApi, setvideoIdApi] = useState()
    const [userInfo, setUserInfo] = useState()
    const [claimButton, setclaimButton] = useState(true)
    const [count, setCount] = useState(delay-30);
    const [buttonDisableTrue, setbuttonDisableTrue] = useState(true)
    const [userSettings, setUserSettings] = useState()


//     //Get User Info
  const getUserInfo = async () => {
     const ds = await getToken();
    const data = await JSON.parse(ds)   
     await setUserInfo(data)

  }
// setting api
const settings = async () => {

    const seting = await CallApiJson('settings', 'GET');
    // const data = await JSON.parse(seting)
    await setUserSettings(seting);


  }
 
      //youtube video ID Api 
  const youtubeVideoId = async () => {
     
    const youtubeVideo = await CallApiJson('youtubevideolist', 'GET');
    //  const data = await JSON.stringify(youtubeVideo)
     await setvideoIdApi(youtubeVideo.data.video_url)
  }
  
  const load =  async () => {
    await youtubeVideoId();
    await settings()

  }

  //youtube video Reward Claim Api 
  const youtubeVideoRewardClaim = async () => {

    setLoadingStatus(true)
    // console.log('dailyreward eligiblaForDailyReward ',dailyRewardButton)
    const currentVersion = VersionCheck.getCurrentVersion()
    const body = {
      user_id: userInfo.id,
      currentVersion:currentVersion
    };
    const youtubeVideoReward = await CallApiJson('youtubevideorewardclaim', 'POST', body);
    //  const data = await JSON.stringify(youtubeVideo)
    setLoadingStatus(false)
    navigation.navigate('Home');

 
  }


 

    useEffect(() => {
        setLoadingStatus(true)
        youtubeVideoId();
        getUserInfo();
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

        const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
          interstitial.show()
        });
       
       // Start loading the interstitial straight away
       interstitial.load();
   
       

        setLoadingStatus(false)

        setTimeout(() => {
            setclaimButton(false)
        }, delaySeconds);
        // Unsubscribe from events on unmount
        return () => {
            setLoadingStatus(false)
          unsubscribeLoaded();
          unsubscribe();
          unsubscribeEarned();
        };
      }, []);


      useEffect(() => {
        const interval = setInterval(() => {
          if (count > 0) setCount(count - 1);
        }, 1000);
        return () => clearInterval(interval);
      }, [count]);

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
        <View style={{ flex: 1, backgroundColor: "#0a203e",}} >
            <Loader loadingStatus = {loadingStatus} />

   <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />


<Text style={{color:'#fff',fontSize:responsiveFontSize(2.1),marginHorizontal:responsiveWidth(5),marginTop:responsiveWidth(30),fontWeight:'bold'}}>  Watch video For 60 seconds   </Text>


            <LinearGradient colors={["#0a203e", "#1f4c86"]}
                useAngle={true}
                angle={322}
                angleCenter={{ x: 0.5, y: 0.5 }}
                style={{
                    flex: 0.50,
                    borderRadius: responsiveWidth(2.5),
                    elevation: responsiveWidth(1.5),
                    marginHorizontal: responsiveWidth(2),
                    // borderWidth: responsiveWidth(0.2),
                    // borderColor: '#1f4c86',
                    marginTop: responsiveWidth(5),

                

                }}>


              <WebView
              javaScriptEnabled={true}
              domStorageEnabled={true}
              scrollEnabled={false}
              bounces={false}
               source={{uri:`https://www.youtube.com/watch?v=${videoIdApi}`}}
               style={{ width:responsiveWidth(100),alignSelf:'center',}}
              />
           

                
            {/* <Text style={{color:'#fff',fontSize:responsiveFontSize(2.1),marginHorizontal:responsiveWidth(5),marginTop:responsiveWidth(4),fontWeight:'bold'}}>  Watch video For 30 seconds   </Text> */}
                {/* <View style={{ justifyContent: 'center', alignItems: 'center',marginTop:responsiveWidth(10)}} >
 
                        <YoutubePlayer
                            style={{}}
                            width={responsiveWidth(85)}
                            height={responsiveHeight(23.5)}
                            play={true}
                            videoId={videoIdApi}
                        // onChangeState={onStateChange}
                        />
                   

            


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
                        disabled={claimButton }
                        
                        onPress={() => {
                            youtubeVideoRewardClaim()
                        }}>
                        <Text  style={{ color: '#fff', paddingHorizontal: responsiveWidth(4.4), letterSpacing: responsiveFontSize(0.095) }}> { claimButton ? `Wait For ${count} Seconds` :' Click Here Go To Home' } </Text>
                    </TouchableOpacity>

                

                </View> */}



            </LinearGradient>

 
<View style={{alignSelf:'center'}}>
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
                    alignItems:'center',
                    borderWidth:responsiveWidth(0.2),
                    borderColor:'#1f4c86'

                   
                        }}
                        disabled={claimButton }
                        
                        onPress={() => {
                            youtubeVideoRewardClaim()
                        }}>
                        <Text  style={{ color: '#fff', paddingHorizontal: responsiveWidth(4.4), letterSpacing: responsiveFontSize(0.095) }}> { claimButton ? `Wait For ${count} Seconds` :' Click Here Go To Home' } </Text>
                    </TouchableOpacity>
             
</View>
        </View>


    )
}

export default Youtube;

const styles = StyleSheet.create({


})