import { View, Alert, Text, Button, Platform, Pressable, SafeAreaView, ScrollView, Image, TouchableOpacity, Modal, TouchableHighlight, ToastAndroid, BackHandler, Linking } from 'react-native'
import React from 'react'
import { useLayoutEffect, useState, useEffect, useRef } from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import EncryptedStorage from 'react-native-encrypted-storage';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderData } from '../../components/slider/data'
import BannerSlider from '../../components/slider/BannerSlider'
import { windowHeight, windowWidth } from '../../utiles/Dimensions'
import styles from './style'
import IconEntypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient'
import VersionCheck from 'react-native-version-check';
import YoutubePlayer from "react-native-youtube-iframe";
import crashlytics from '@react-native-firebase/crashlytics';
import AppLovinMAX from  "react-native-applovin-max";
import CallApi, { setToken, CallApiJson, getToken } from '../../utiles/network';
import { BannerAdSize,BannerAd,AppOpenAd, RewardedAd, RewardedAdEventType,  TestIds, AdEventType,InterstitialAd } from 'react-native-google-mobile-ads';
import inbrain, {InBrainNativeSurvey, InBrainSurveyFilter, InBrainSurveyCategory} from 'inbrain-surveys';
import RNPollfish from 'react-native-plugin-pollfish';


//admob
const adUnitId =  'ca-app-pub-5493577236373808/8452330072';
const adUnitIdrewarded =  'ca-app-pub-5493577236373808/2741101726';
const adUnitIdIntrestial  = 'ca-app-pub-5493577236373808/6488775047';
// admob



// ibrain
const apiSecretInBrain ='Tlz6uQqRLkg5WKGFFGJZqIiReUlwIP+RYbQUOtJzbDNdr1VfLHYlbLMTVf351Q6fZdWfKXQbCRfI73Xf0VEgzw==';
const navigationBarConfig = {
  title: 'Easy Earn Survey',
  backgroundColor: '#00A5ED',
  titleColor: '#FFFFFF',
  buttonsColor: '#FFFFFF',
  hasShadow: false,
};
inbrain.setNavigationBarConfig(navigationBarConfig);
// ibrain


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

//polfish
const builder = new RNPollfish.Builder('950a50c8-f2c5-43d7-afdc-61d0499f7aef', null).rewardMode(true).releaseMode(true);
RNPollfish.init(builder.build());
//polfish


const Home = () => {

  //  const isInternet = useRef(checkInternet)
  const [polfishSurveyAvail, setpolfishSurveyAvail] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleVideo, setModalVisibleVideo] = useState(false);
  const [videoClose, setVideoClose] = useState(false)
  const [inputData, setInputData] = useState({ Email: '', Password: '' });
  const [userInfo, setUserInfo] = useState()
  const [dailyRewardButton, setDailyRewardButton] = useState()
  const [userSettings, setUserSettings] = useState()
  const [banner, setBanner] = useState()
  const [videoId, setVideoId] = useState()

  const navigation = useNavigation();
  const isFocused = useIsFocused()

  RNPollfish.addEventListener(RNPollfish.PollfishSurveyReceivedListener, (event) => {
    if (event === undefined) {
      console.log("Pollfish Offerwall Received");
    } else {
      setpolfishSurveyAvail(true);
      console.log(`Pollfish Survey Received - CPA: ${event.surveyCPA}, IR: ${event.surveyIR}, LOI: ${event.surveyLOI}, Class: ${event.surveyClass}, Reward Value: ${event.rewardValue}, Reward Name: ${event.rewardName}, Remaining Completes: ${event.remainingCompletes}`);
    }
  });

  RNPollfish.addEventListener(RNPollfish.PollfishSurveyCompletedListener, (event) => {
    console.log(`Pollfish Survey Completed - CPA: ${event.surveyCPA}, IR: ${event.surveyIR}, LOI: ${event.surveyLOI}, Class: ${event.surveyClass}, Reward Value: ${event.rewardValue}, Reward Name: ${event.rewardName}, Remaining Completes: ${event.remainingCompletes}`);
  });

  RNPollfish.addEventListener(RNPollfish.PollfishUserNotEligibleListener, (_) => {
    console.log("Pollfish User Not Eligible");
  });

  RNPollfish.addEventListener(RNPollfish.PollfishSurveyNotAvailableListener, (_) => {
    console.log("Pollfish Survey Not Available");
  });

  RNPollfish.isPollfishPresent((isPollfishPresent) => {
    console.log(isPollfishPresent ? 'Pollfish is available' : 'Pollfish is not available');

    if (isPollfishPresent) {
      setpolfishSurveyAvail(true);

    }

  });


  // inbrain
  // .checkSurveysAvailable()
  // .then((available) => {
  //   console.log('inbraincheckSurveysAvailable',available);
  // })
  // .catch((err) => {
  //   console.log('inbraincheckSurveysAvailable',err);
  // });



  async function initializeBannerAds()
  {
      // Banners are automatically sized to 320x50 on phones and 728x90 on tablets
      // You may use the utility method `AppLovinMAX.isTablet()` to help with view sizing adjustments
      AppLovinMAX.createBanner(BANNER_AD_UNIT_ID, AppLovinMAX.AdViewPosition.BOTTOM_CENTER);

      // Set background or background color for banners to be fully functional
      // In this case we are setting it to black - PLEASE USE HEX STRINGS ONLY
      AppLovinMAX.setBannerBackgroundColor(BANNER_AD_UNIT_ID, '#215295');

      AppLovinMAX.showBanner(BANNER_AD_UNIT_ID);
      console.log("banner loaded ");

  }
 
 
  const set = async () => {
    await settings();
    await getUserInfo();
    await banners();
    await initializeBannerAds();

  }


  const checkUpdateNeeded = async () => {
    const latestVersion = await VersionCheck.getLatestVersion();
    const currentVersion = VersionCheck.getCurrentVersion()
    let updateNeeded = await VersionCheck.needUpdate();
     if (    (updateNeeded.isNeeded )  ) {
        Alert.alert('Update Required ',
        'Download Latest Version From PlayStore',
        [ 
          {
            text : 'Update Now ',
            onPress:()=>{
              BackHandler.exitApp();
              Linking.openURL(updateNeeded.storeUrl);
            }
          }
        ],
        { cancelable:false }
        
        );
    }
}
  useEffect(() => {

     set();
     checkUpdateNeeded();
       
    return () => {
 
    }
  }, [])

  // setting api
  const settings = async () => {

    const seting = await CallApiJson('settings', 'GET');
    // const data = await JSON.parse(seting)
    await setUserSettings(seting)

  }
 
  //Get User Info
  const getUserInfo = async () => {
     const ds = await getToken();
    const data = await JSON.parse(ds)
     if( data.id ){
     const fcmToken =  await EncryptedStorage.getItem('fcmToken');
      const tokenSet = {
        user_id: data.id,
        fcm_token: fcmToken

      }
      const seting = await CallApiJson('fcmupdate', 'POST' , tokenSet );

    }
     await setUserInfo(data)

  }
  // console.log("getdata after Callling.... APi", userInfo)
  
  //Get Banners

   const banners = async () => {
    const banners = await CallApiJson('banner', 'GET');
    // const data = await JSON.parse(seting)
    await setBanner(banners?.data)

  }




  // const renderBanner = ({ item, index }) => {
  //   return <BannerSlider data={item} />;
  // };

  //timer login
  const [counter, setCounter] = useState(0)



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




  const dailyReward = async () => {
    setModalVisible(true)
    // console.log("dailreward function ID sent", userInfo.id)
    const body = {
      user_id: userInfo.id,
    };
    const dailyRewardCheck = await CallApiJson('dailyrewardcheck', 'POST', body);
    // console.log('dailyreward info', !(dailyRewardCheck.eligiblaForDailyReward))

    await setDailyRewardButton(!(dailyRewardCheck.eligiblaForDailyReward))
    // setDailyRewardButton(!(dailyRewardCheck.eligiblaForDailyReward))
    //  console.log('dailyreward eligiblaForDailyReward',dailyRewardButton)

  }
  // console.log('dailyreward eligiblaForDailyReward',dailyRewardButton)

  //DailyRewardClaim
  const dailyRewardClaim = async () => {
    // console.log("User data home dailyRewardClaim API", userInfo.id)
    // console.log('dailyreward eligiblaForDailyReward ',dailyRewardButton)

    const body = {
      user_id: userInfo.id,
    };
    const dailyRewardCheckClaim = await CallApiJson('dailyrewardclaim', 'POST', body);
    // console.log('DailyReward Calim after api ', dailyRewardCheckClaim.msg)
    // console.log('dailyreward eligiblaForDailyReward after api ', dailyRewardButton)

  }

  //Video Ad Reward
  const videoAdRewardClaim = async () => {
    // console.log("User data home video API", userInfo.id)
    // console.log('dailyreward eligiblaForDailyReward ',dailyRewardButton)

    const body = {
      // user_id: userInfo.id,
    };
    const videoAdReward = await CallApiJson('videoadrewardclaim', 'POST', body);

    // console.log('videoAdReward Calim after api ', videoAdReward.msg)




  }


  //Survey Reward
  const surveyCheck = async () => {
    if (polfishSurveyAvail == true) {
       RNPollfish.show();
    } 
    else {


      if( userInfo.email){
        inbrain.setInBrain('c9602f14-bb94-445d-b517-952682a71e9c', apiSecretInBrain, userInfo.email);
        inbrain.setUserID(userInfo.email)

        let filter = {
          placementId: 'b95f3c51-eb88-4f2a-a31b-e9d5e147d456'
        };

        inbrain
        .getNativeSurveys(filter)
        .then((nativeSurveys) => {
                 inbrain.showNativeSurvey(nativeSurveys[0].id, nativeSurveys[0].surveyId )
        .then(() => {
          console.log('success inbrain survey ');
        })
        .catch((err) => {
 
          Alert.alert('No Survey Available Right,  Please Try After Some Time  '); 
          return;

        });


        })
        .catch((err) => {
           Alert.alert('No Survey Available Right,  Please Try After Some Time  '); 
          return;
        });


       


      }else{
        Alert.alert('Close The app and Start Again  ');

      }
    }

  }

  //Survey Reward
  const surveyRewardClaim = async () => {
   
    const body = {
      // user_id: userInfo.id,
    };
    const surveyReward = await CallApiJson('surveyrewardclaim', 'POST', body);

  }


  //youtube video ID Api 
  const youtubeVideoId = async () => {
     // console.log('dailyreward eligiblaForDailyReward ',dailyRewardButton)

    // const body = {
    //   user_id: userInfo.id,
    // };
    const youtubeVideo = await CallApiJson('youtubevideolist', 'GET');
    //  const data = await JSON.stringify(youtubeVideo)
     await setVideoId(youtubeVideo)
  }


  //youtube video Reward Claim Api 
  const youtubeVideoRewardClaim = async () => {
     const body = {
      user_id: userInfo.id,
    };
    const youtubeVideoReward = await CallApiJson('youtubevideorewardclaim', 'POST', body);
    //  const data = await JSON.stringify(youtubeVideo)
 
  }

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: '#0a203e' }}>

      <ScrollView>
        <View style={{ flex: 1, }}>

          {/* Slider */}
          <View style={[styles.slider]}>
            <Carousel
              // ref={isCarousel}

              autoplay={true}
              data={banner}
              renderItem={( item, index ) => { return (<BannerSlider data={item} />)}}
              sliderWidth={windowWidth}
              // - responsiveWidth(6)
              itemWidth={responsiveWidth(85)}
              loop={true}
            // onSnapToItem={index => setIndex(index)}
            />
            {/* <Pagination
              dotsLenght={sliderData.lenght}
              activeDotIndex={index}
              carouselRef={isCarousel}
              dotStyle={{
                width:10,
                height:10,
                borderRadius:10,
                marginHorizontal:8,
                backgroundColor:'#fff',
                zIndex:1
              }}
              inactiveDotOpacity={0.4}
           
            />
             */}
          </View>
          {/* Slider-End */}


          <View style={{ flex: 0.20, marginTop: responsiveHeight(1.8) }}>

            {/* Get Free Coins -Start */}
            {/* navigation.navigate('Reward')  */}
            <TouchableOpacity onPress={() => { navigation.navigate('Reward')  }}>
              <View style={{ flex: 0.10, }}>
                <Text style={styles.getFreeMainText}>Daily Reward: Unlock </Text>
                <View style={{ alignItems: 'center', marginTop: responsiveWidth(2.5), }}>

                  <View style={styles.getFreeMainContainer}>
                    <Image  style={styles.getFreeCoin} source={require('../../assets/rupee.png')} />

                  
                   <View style={{height:responsiveHeight(5.8),flexDirection:'row'}}>
                    <View style={{ flexDirection: 'column', width: responsiveWidth(48), marginLeft: responsiveWidth(4.5),height:responsiveWidth(7) }}>
                      <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.25), fontWeight: 600 }}>Click Here </Text>
                      <Text style={{ color: '#fff' }}>To Get Daily Login Bonus!</Text>
                    </View>
                 
                    <View style={{ flexDirection: 'column', marginHorizontal: responsiveWidth(3),width:responsiveWidth(20),height:responsiveWidth(5),marginTop:responsiveWidth(-2) }}>
                      <Text style={{ color: '#fff' }}>Get Coins</Text>

                      <View style={{ flexDirection: 'row', marginTop: responsiveWidth(2.5), width: responsiveWidth(6) }}>
                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.15) }}>{userSettings && userSettings.data.daily_coin}</Text>
                        <Image  style={{ width: responsiveWidth(5.65), height: responsiveHeight(2.75), marginLeft: responsiveWidth(2.5),resizeMode:'contain' }} source={require('../../assets/rupee.png')} />
                      </View>
                         
                    </View>
                  
                  </View>
                
            
              </View>
              </View>
              </View>
            </TouchableOpacity>
            {/* Get Free Coins -End */}

            {/* Get Free Coins Video -Start */}
            {/* <TouchableOpacity onPress={() => { navigation.navigate('VideoReward') }} >
              <View style={{ flex: 0.10, marginTop: responsiveHeight(1.8) }}>

                <Text style={styles.getFreeMainText}>Video Reward: EveryTime </Text>
                <View style={{ alignItems: 'center', marginTop: responsiveWidth(2.5) }}>

                  <View style={styles.getFreeMainContainer}>
                    <Image  style={styles.videoIcon} source={require('../../assets/play.png')} />

               
                    <View style={{height:responsiveHeight(5.8),flexDirection:'row'}}>
                    <View style={{ flexDirection: 'column', width: responsiveWidth(48), marginLeft: responsiveWidth(4.5),height:responsiveWidth(7) }}>
                      <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.25), fontWeight: 600 }}> Click here </Text>
                      <Text style={{ color: '#fff' }}> Earn by Watching Video!</Text>
                    </View>
                    <View style={{ flexDirection: 'column', marginHorizontal: responsiveWidth(3),width:responsiveWidth(20),height:responsiveWidth(5),marginTop:responsiveWidth(-2)}}>
                      <Text style={{ color: '#fff' }}>Get Coins</Text>

                      <View style={{ flexDirection: 'row', marginTop: responsiveWidth(2.5), width: responsiveWidth(6) }}>
                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.15) }}> {userSettings && userSettings?.data?.video_ad_coin}</Text>
                        <Image  style={{ width: responsiveWidth(5.65), height: responsiveHeight(2.75), marginLeft: responsiveWidth(2.5),resizeMode:'contain' }} source={require('../../assets/rupee.png')} />
                      </View>

                    </View>

               </View>
                
                </View>
              </View>
              </View>
            </TouchableOpacity> */}
            {/* Get Free Coins Video-End */}





          </View>


          {/* Spine-Start*/}
          <View style={{ flex: 0.20, marginTop: responsiveWidth(4) }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.spineMainText}>Spine Wheel</Text>
              <View style={{ flexDirection: 'row', marginRight: responsiveWidth(7.5), alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontWeight: '500' }}>Get Up to </Text>


                <Text style={{ color: '#fff' }}> 100 </Text>
                <Image  style={{ width: responsiveWidth(4.1), height: responsiveHeight(2), marginLeft: responsiveWidth(1),resizeMode:'contain' }} source={require('../../assets/rupee.png')} />


              </View>
            </View>


            <View style={{ alignItems: 'center', marginTop: responsiveWidth(6) }}>
              <TouchableOpacity onPress={() => { navigation.navigate('SpinerWheel') }}  >


                <View style={styles.spineImgView}>

                  <Image style={styles.spineImg} source={require('../../assets/Spin4.jpg')} />

                </View>
              </TouchableOpacity>
            </View>

          </View>
          {/* Spine-End*/}


          {/* Get Free Coins Survey-Start */}
          {/* <TouchableOpacity onPress={()=>{surveyRewardClaim()}}>
  <View style={{ flex: 0.10 , marginTop: responsiveHeight(1.8)}}>

<Text style={styles.getFreeMainText}>Get Coins By Survey </Text>
<View style={{ alignItems: 'center', marginTop: responsiveWidth(2.5) }}>

  <View style={styles.getFreeMainContainer}>
    <Image style={styles.surveyIcon} source={require('../../assets/test.png')} />

    <View style={{ flexDirection: 'column',width:responsiveWidth(48),marginLeft:responsiveWidth(4.5) }}>
      <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.25), fontWeight: 600 }}>Free Coins</Text>
      <Text style={{ color: '#fff' }}>Claim Your Daily Reward Now !</Text>
    </View>
    <View style={{ flexDirection: 'column', marginHorizontal: responsiveWidth(3) }}>
      <Text style={{ color: '#fff' }}>Get Coins</Text>

      <View style={{ flexDirection: 'row', marginTop: responsiveWidth(2.5),width:responsiveWidth(6) }}>
        <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.15) }}>{userSettings && userSettings.data.survey_ad_coin}</Text>
        <Image style={{ width: responsiveWidth(5.65), height: responsiveHeight(2.75), marginLeft: responsiveWidth(2.5) }} source={require('../../assets/rupee.png')} />
      </View>

    </View>
  </View>
</View>
</View>
</TouchableOpacity> */}
          {/* Get Free Coins Survey -End */}

          {/* Game Zone-Start*/}
          <View style={{ flex: 0.20, }}>

            <View style={{ alignItems: 'center', marginTop: responsiveWidth(2.5)}}>

              <View style={styles.gameZoneContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                <Text style={styles.gameZoneMainText}>Quiz Zone</Text> 
                <View style={{ flexDirection: 'row', marginRight: responsiveWidth(4), alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontWeight: '500' }}>Get Coins</Text>


                <Text style={{ color: '#fff' }}> {userSettings && userSettings.data.gk_ad_coin} </Text>
                <Image  style={{ width: responsiveWidth(4.1), height: responsiveHeight(2), marginLeft: responsiveWidth(1),resizeMode:'contain' }} source={require('../../assets/rupee.png')} />


              </View>
            </View>

                <View style={styles.gameZoneMainImgView}>
                <TouchableOpacity onPress={()=>{navigation.navigate('Quiz',{category:'science'})}} >
                  <View style={styles.gameZoneSingleImgView}>
                    <Image style={styles.gameZoneSingleImg} source={require('../../assets/q1.png')} />
                    <Text style={styles.gameZoneImgText}>Science</Text>
                  </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{navigation.navigate('Quiz',{category:'math'})}} >
                  <View style={styles.gameZoneSingleImgView}>
                    <Image style={styles.gameZoneSingleImg} source={require('../../assets/q2.png')} />
                    <Text style={styles.gameZoneImgText}>Math</Text>
                  </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{navigation.navigate('Quiz',{category:'WORLDGK'})}} >
                  <View style={styles.gameZoneSingleImgView}>
                    <Image style={styles.gameZoneSingleImg} source={require('../../assets/gk2.png')} />
                    <Text style={styles.gameZoneImgText}>GK</Text>
                  </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{navigation.navigate('Quiz',{category:'IT'})}} >
                  <View style={styles.gameZoneSingleImgView}>
                    <Image style={styles.gameZoneSingleImg} source={require('../../assets/it.png')} />
                    <Text style={styles.gameZoneImgText}>Coding</Text>
                  </View>
                  </TouchableOpacity>


                 {/* <TouchableOpacity onPress={ ()=>{setModalVisible(true)} }>
                 <View style={styles.gameZoneSingleImgView}>
                    <Image style={styles.gameZoneSingleImg} source={require('../../assets/q4.png')} />
                    <Text style={styles.gameZoneImgText}>Daily Reward</Text>
                  </View>
                 </TouchableOpacity> */}
                </View>
              </View>
            </View>

          </View>



          {/* Game Zone-End*/}

          {/* Contest Zone-Start*/}

          <View style={{ flex: 0.30, marginTop: responsiveWidth(3.6), marginBottom: responsiveWidth(9.75) }}>


            {/* <View style={{ alignItems: 'center', marginTop: responsiveWidth(2.5) }}>

              <View style={styles.contestZoneContainer}>

                <Text style={styles.contestZoneMainText}> Earn Coin By  survey  </Text>

                <View >
                  <Image style={styles.contestZoneImg} source={require('../../assets/contest.jpeg')} />
                  <View style={{ alignItems: 'center' }}>
                    <Text style={styles.contestZoneAvailableText}>Contest not available!!</Text>
                  </View>
                </View>
              </View>
            </View> */}

            {/* //contest Zone DisAble */}

            {/* survey container - start */}
            <TouchableOpacity onPress={() => { surveyCheck() }}>
              <View style={{ alignItems: 'center', marginTop: responsiveWidth(2) }}>

                <View style={styles.surveyContainer}>
                  <View style={{ flexDirection: 'row', marginTop: responsiveWidth(2), justifyContent: 'space-between' }}>
                    <Text style={styles.surveyText}> Earn By survey  </Text>
                    <View style={{ flexDirection: 'column', marginRight: responsiveWidth(5), alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontWeight: '500' }}>Get Coin</Text>

                 <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{ color: '#fff' }}>  {userSettings && userSettings?.data?.survey_ad_coin} </Text>
                <Image style={{width: responsiveWidth(4.1), height: responsiveHeight(2), marginLeft: responsiveWidth(2),resizeMode:'contain' }} source={require('../../assets/rupee.png')} />
                </View>

              </View>
                  </View>

                  <View >
                    <Image  style={styles.surveyImg} source={require('../../assets/test.png')} />
                    <View style={{ alignItems: 'center' }}>
                    </View>
                  </View>

                </View>
              </View>
            </TouchableOpacity>
            {/* survey container - end */}

            {/*YouTUbe Video-Start*/}

            <View style={{ marginTop: responsiveWidth(3.6) }} >

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.videoMainText}> Watch Reels </Text>
              <View style={{ flexDirection: 'row', marginRight: responsiveWidth(7.5), alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontWeight: '500' }}>Get Coin </Text>
                <Text style={{ color: '#fff' }}> {userSettings && userSettings?.data?.youtube_video_coin} </Text>
                <Image style={{ width: responsiveWidth(4.1), height: responsiveHeight(2), marginLeft: responsiveWidth(2.5),resizeMode:'contain' }} source={require('../../assets/rupee.png')} />
              </View>
              </View>
           
              <View style={{ alignItems: 'center', marginTop: responsiveWidth(2.5) }}>

                <TouchableOpacity
                  onPress={() => {
                    // setModalVisibleVideo(true)
                    youtubeVideoId()
                    navigation.navigate('Youtube', { videoId: videoId?.data?.video_url })
                    // setCounter(30)
                    // setTimeout(() => {
                    //   setVideoClose(true)

                    // }, 30000)

                  }} >
                  <View style={styles.videoImgView}>
                    <Image  style={styles.videoImg} source={require('../../assets/youtube.png')} />
                  </View>
                </TouchableOpacity>

              </View>
            </View>

            {/* YouTUbe Video-End*/}

          </View>


          {/* Contest Zone-End*/}

          {/* Video-Model_Start*/}

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleVideo}
            onRequestClose={() => {
              setModalVisibleVideo(!modalVisibleVideo);

              setVideoClose(!videoClose)
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,.5)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LinearGradient colors={["#0a203e", "#1f4c86"]}
                useAngle={true}
                angle={322}
                angleCenter={{ x: 0.5, y: 0.5 }}
                style={{
                  borderRadius: responsiveWidth(2.5), elevation: responsiveWidth(2.5), borderWidth: responsiveWidth(0.2), width: '90%', height: responsiveHeight(40),
                  alignItems: 'center',
                  borderColor: '#1f4c86',
                }}>
                {/* <View
          style={{
            backgroundColor: '#1f4c86',
            width: '90%',
             alignItems:'center',
            borderRadius: 10,
          }}> */}

                {/* {videoClose?
          <TouchableOpacity onPress={()=>{ 
            setModalVisibleVideo(!modalVisibleVideo)
          
            setVideoClose(!videoClose)
            }} style={{position:'absolute',right:responsiveWidth(3.5),top:responsiveWidth(3)}}>
          <IconEntypo name="cross" size={responsiveWidth(6)} color="#fff"  />
          </TouchableOpacity>
           : <View style={{backgroundColor:'#1f4c86',borderRadius:responsiveWidth(3),width:responsiveWidth(6),height:responsiveHeight(3),position:'absolute',right:responsiveWidth(3.5),top:responsiveWidth(3),alignItems:'center',justifyContent:'center'}}><Text style={{color:'#fff',}} >{counter}</Text></View>} */}

                <View style={{ marginTop: responsiveWidth(15) }}>

                  <YoutubePlayer
                    style={{}}
                    width={responsiveWidth(85)}
                    height={responsiveHeight(23.5)}
                    play={playing}
                    videoId={videoId && videoId.data.video_url}
                  // onChangeState={onStateChange}
                  />
                </View>





                {videoClose ?

                  <TouchableOpacity
                    style={{

                      height: responsiveHeight(4.8),
                      padding: responsiveWidth(2.5),

                      borderRadius: responsiveWidth(2.5),
                      marginTop: responsiveWidth(5),
                      marginBottom: responsiveWidth(5),
                      backgroundColor: '#0a203e',
                      color: '#fff',
                      elevation: responsiveWidth(1.2)
                    }}
                    onPress={() => {
                      setModalVisibleVideo(!modalVisibleVideo);
                      setVideoClose(!videoClose)
                      youtubeVideoRewardClaim()

                    }}>
                    <Text style={{ color: '#fff', paddingHorizontal: responsiveWidth(2.4), letterSpacing: responsiveFontSize(0.095), }}>Claim Reward</Text>
                  </TouchableOpacity> :

                  <TouchableOpacity
                    style={{

                      height: responsiveHeight(4.8),
                      padding: responsiveWidth(2.5),

                      borderRadius: responsiveWidth(2.5),
                      marginTop: responsiveWidth(5),
                      marginBottom: responsiveWidth(5),
                      backgroundColor: '#808080',
                      color: '#fff',
                      elevation: responsiveWidth(1.2)
                    }}
                  >
                    <Text style={{ color: '#fff', paddingHorizontal: responsiveWidth(2.4), letterSpacing: responsiveFontSize(0.095), }}>Claim Reward  {counter}</Text>
                  </TouchableOpacity>
                }

                {/* </View> */}
              </LinearGradient>
            </View>
          </Modal>

          {/* Video-ModelEnd*/}

          {/* Model-Home pop-up  */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,.5)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LinearGradient colors={["#0a203e", "#1f4c86"]}
                useAngle={true}
                angle={322}
                angleCenter={{ x: 0.5, y: 0.5 }}
                style={{
                  borderRadius: responsiveWidth(2.5), elevation: responsiveWidth(2.5), borderWidth: responsiveWidth(0.2), width: '90%', height: responsiveHeight(45),
                  // alignItems: 'center',
                  borderColor: '#1f4c86',
                }}>
                {/* <View
          style={{
            backgroundColor: '#1f4c86',
            width: '90%',
             alignItems:'center',
            borderRadius: 10,
          }}> */}

                {/* <TouchableOpacity onPress={() => { setModalVisible(!modalVisible) }} style={{ position: 'absolute', right: responsiveWidth(3.5), top: responsiveWidth(3) }}>
                  <IconEntypo name="cross" size={responsiveWidth(6)} color="#fff" />
                </TouchableOpacity> */}
    <View style={{alignItems:'center'}}>

                <Text
                  style={{
                    fontSize: responsiveFontSize(3.55),
                    letterSpacing: responsiveWidth(0.35),
                    fontWeight: '600',

                    marginTop: responsiveWidth(7),
                    color: '#fff'
                  }}>
                 Welcome
                </Text>
                <Text
                  style={{
                    fontSize: responsiveWidth(3.8),
                    marginTop: responsiveWidth(1.2),
                    color: '#fff',

                  }}>
                 Easy Earn App !
                </Text>
                <Text
                  style={{
                    fontSize: responsiveWidth(3.8),
                    color: '#fff',

                  }}>
                 Earn daily rewards...
                </Text>

                </View>
                {/* <Image  style={{ width: responsiveWidth(44), height: responsiveHeight(14.2), marginTop: responsiveWidth(4),resizeMode:'contain' }} source={require('../../assets/dailygift.png')} />

                <Text
                  style={{
                    fontSize: responsiveWidth(3.8),
                    marginTop: responsiveWidth(3.6),
                    color: '#fff',

                  }}>
                  YOUR REWARD TODAY IS
                </Text>
                <View style={{ flexDirection: 'row' }} >
                  <Image  style={{ width: responsiveWidth(7.15), height: responsiveHeight(3.65), marginTop: responsiveWidth(0.5), marginRight: responsiveWidth(1),resizeMode:'contain' }} source={require('../../assets/coin.png')} />
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.9),
                      marginTop: responsiveFontSize(0.7),
                      color: '#fff',

                    }}>
                    {userSettings && userSettings?.data?.daily_coin} Coins
                  </Text>
                </View> */}
         
         <View style={{marginHorizontal:responsiveWidth(5),marginVertical:responsiveWidth(6)}}>
          <Text style={{marginVertical:responsiveWidth(1),color:'#fff'}} > {"\u2B24" + "  "}Easy earn App earn daily rewards !</Text>
          <Text style={{marginVertical:responsiveWidth(1),color:'#fff'}} > {"\u2B24" + "  "}Easy earn App earn daily rewards !</Text>
          <Text style={{marginVertical:responsiveWidth(1),color:'#fff'}} > {"\u2B24" + "  "}Easy earn App earn daily rewards !</Text>
          <Text style={{marginVertical:responsiveWidth(1),color:'#fff'}} > {"\u2B24" + "  "}Easy earn App earn daily rewards !</Text>
         </View>
            

                <TouchableOpacity
                  style={{

                    height: responsiveHeight(4.8),
                    padding: responsiveWidth(2.5),

                    borderRadius: responsiveWidth(2.5),
                    marginTop: responsiveWidth(5),
                    marginBottom: responsiveWidth(5),
                    backgroundColor: '#0a203e',
                    color: '#fff',
                    elevation: responsiveWidth(1.2),
                    alignSelf:'center'
                    
                  }}
                  // disabled={dailyRewardButton}
                  onPress={() => {
                    // dailyRewardClaim()
                    setModalVisible(!modalVisible);


                  }}>
                  <Text style={{ color: '#fff', paddingHorizontal: responsiveWidth(2.4), letterSpacing: responsiveFontSize(0.095) }}>Play Now !</Text>
                </TouchableOpacity>
                {/* </View> */}
              </LinearGradient>
            </View>
          </Modal>
          {/* Model-Home pop-up */}


        </View>

      </ScrollView>


      <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
 


    </SafeAreaView>
  )
}

export default Home