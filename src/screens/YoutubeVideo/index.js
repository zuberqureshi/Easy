import { View, Text, Button, Pressable, SafeAreaView, ScrollView, Image, TouchableOpacity, Modal, TouchableHighlight, ToastAndroid, StyleSheet } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient'
import Loader from '../../components/common/loader/Loader';
import CallApi, { setToken, CallApiJson, getToken } from '../../utiles/network';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import YoutubePlayer from "react-native-youtube-iframe";
import { BannerAdSize,BannerAd,AppOpenAd, RewardedAd, RewardedAdEventType,  TestIds, AdEventType,InterstitialAd } from 'react-native-google-mobile-ads';
const adUnitId =   'ca-app-pub-2291791121050290/1352844929';
const adUnitIdrewarded =    'ca-app-pub-2291791121050290/6625314913';
const rewarded = RewardedAd.createForAdRequest(adUnitIdrewarded );
const delay  = 59;
const delaySeconds  = delay*1000;

const Youtube = ({ route }) => {

    const { videoId } = route.params;
    const navigation = useNavigation();
    const [loadingStatus, setLoadingStatus] = useState(false)
    const [videoIdApi, setvideoIdApi] = useState()
    const [userInfo, setUserInfo] = useState()
    const [claimButton, setclaimButton] = useState(true)
    const [count, setCount] = useState(delay);


//     //Get User Info
//   const getUserInfo = async () => {
//      const ds = await getToken();
//     const data = await JSON.parse(ds)   
//      await setUserInfo(data)

//   }

      //youtube video ID Api 
  const youtubeVideoId = async () => {
     
    const youtubeVideo = await CallApiJson('youtubevideolist', 'GET');
    //  const data = await JSON.stringify(youtubeVideo)
    console.log('youtubeVideoId after api ', youtubeVideo.data.video_url)
    await setvideoIdApi(youtubeVideo.data.video_url)
  }
  const load =  async () => {
    await youtubeVideoId();

  }

    useEffect(() => {
        youtubeVideoId();
        setLoadingStatus(true)
         const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
            setLoadingStatus(false)
           // rewarded.show();
        });
        const unsubscribeEarned = rewarded.addAdEventListener(
          RewardedAdEventType.EARNED_REWARD,
          reward => {
             setLoadingStatus(false)
       
          },
        );
       
        // Start loading the rewarded ad straight away
        rewarded.load();
        setLoadingStatus(false)

        setTimeout(() => {
            setclaimButton(false)
        }, delaySeconds);
        // Unsubscribe from events on unmount
        return () => {
            setLoadingStatus(false)
          unsubscribeLoaded();
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
            <LinearGradient colors={["#0a203e", "#1f4c86"]}
                useAngle={true}
                angle={322}
                angleCenter={{ x: 0.5, y: 0.5 }}
                style={{
                    flex: 0.65,
                    borderRadius: responsiveWidth(2.5),
                    elevation: responsiveWidth(1.5),
                    marginHorizontal: responsiveWidth(5),
                    borderWidth: responsiveWidth(0.2),
                    borderColor: '#1f4c86',
                    marginTop: responsiveWidth(30)

                }}>

                
            <Text style={{color:'#fff',fontSize:responsiveFontSize(2.1),marginHorizontal:responsiveWidth(5),marginTop:responsiveWidth(6),fontWeight:'bold'}}>Earn Money By Watch Video</Text>
                <View style={{ justifyContent: 'center', alignItems: 'center',marginTop:responsiveWidth(10)}} >
                
                
                  
               {console.log( 'videoIdApi',videoIdApi )  }

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
                        disabled={claimButton}
                        onPress={() => {
                            navigation.navigate('Home');
                        }}>
                        <Text  style={{ color: '#fff', paddingHorizontal: responsiveWidth(4.4), letterSpacing: responsiveFontSize(0.095) }}> { claimButton ? `Wait For ${count} Seconds` :' Click Here Go To Home' } </Text>
                    </TouchableOpacity>

                

                </View>



            </LinearGradient>




        </View>


    )
}

export default Youtube;

const styles = StyleSheet.create({


})