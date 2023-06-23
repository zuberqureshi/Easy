import { View, Alert, Text, Button, Pressable, SafeAreaView, ScrollView, Image, TouchableOpacity, Modal, TouchableHighlight, ToastAndroid } from 'react-native'
import React from 'react'
import { useLayoutEffect, useState, useEffect, useRef } from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderData } from '../../components/slider/data'
import BannerSlider from '../../components/slider/BannerSlider'
import { windowHeight, windowWidth } from '../../utiles/Dimensions'
import styles from './style'
import IconEntypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient'
import YoutubePlayer from "react-native-youtube-iframe";
import crashlytics from '@react-native-firebase/crashlytics';
import CallApi, { setToken, CallApiJson, getToken } from '../../utiles/network';
import { BannerAdSize,BannerAd,AppOpenAd, RewardedAd, RewardedAdEventType,  TestIds, AdEventType,InterstitialAd } from 'react-native-google-mobile-ads';
const adUnitId =  'ca-app-pub-2291791121050290/1352844929';
const adUnitIdrewarded =  'ca-app-pub-2291791121050290/6625314913';

import RNPollfish from 'react-native-plugin-pollfish';

const builder = new RNPollfish.Builder('950a50c8-f2c5-43d7-afdc-61d0499f7aef', null).rewardMode(true).releaseMode(true);


RNPollfish.init(builder.build());

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

  const set = async () => {
    await settings();
    await getUserInfo();
    await banners();

  }



  useEffect(() => {
    set();
    return () => {
      console.log('return')
    }
  }, [])

  // setting api
  const settings = async () => {

    const seting = await CallApiJson('settings', 'GET');
    // const data = await JSON.parse(seting)
    await setUserSettings(seting)

  }
  console.log("setting Info after calling.....", userSettings)

  //Get User Info
  const getUserInfo = async () => {
    console.log("getdata Callling....")
    const ds = await getToken();
    const data = await JSON.parse(ds)
    console.log("getdata Callling....recieved by async",data)

    await setUserInfo(data)

  }
  // console.log("getdata after Callling.... APi", userInfo)
  
  //Get Banners

   const banners = async () => {
    console.log("banner Callling....")
    const banners = await CallApiJson('banner', 'GET');
    // const data = await JSON.parse(seting)
    console.log('banner data',banners.data)
    await setBanner(banners.data)

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
      console.log('show survey');
      RNPollfish.show();
    } else {
      Alert.alert('No Survey Available Right , Please Try After Some Time ');
    }

  }

  //Survey Reward
  const surveyRewardClaim = async () => {
    // console.log("User data home survey API", userInfo.id)
    // console.log('dailyreward eligiblaForDailyReward ',dailyRewardButton)

    const body = {
      // user_id: userInfo.id,
    };
    const surveyReward = await CallApiJson('surveyrewardclaim', 'POST', body);

    // console.log('surveyReward Claim after api ', surveyReward.msg)

  }


  //youtube video ID Api 
  const youtubeVideoId = async () => {
    console.log("User data home youtubeVideoId API", userInfo.id)
    // console.log('dailyreward eligiblaForDailyReward ',dailyRewardButton)

    // const body = {
    //   user_id: userInfo.id,
    // };
    const youtubeVideo = await CallApiJson('youtubevideolist', 'GET');
    //  const data = await JSON.stringify(youtubeVideo)
    console.log('youtubeVideoId after api ', youtubeVideo.data.video_url)
    await setVideoId(youtubeVideo)
  }


  //youtube video Reward Claim Api 
  const youtubeVideoRewardClaim = async () => {
    console.log("User data home youtubeVideo Reward API", userInfo.id)
    // console.log('dailyreward eligiblaForDailyReward ',dailyRewardButton)

    const body = {
      user_id: userInfo.id,
    };
    const youtubeVideoReward = await CallApiJson('youtubevideorewardclaim', 'POST', body);
    //  const data = await JSON.stringify(youtubeVideo)
    console.log('youtubeVideo Reward after api ', youtubeVideoReward.msg)

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


          <View style={{ flex: 0.30, marginTop: responsiveHeight(1.8) }}>

            {/* Get Free Coins -Start */}
            <TouchableOpacity onPress={() => { navigation.navigate('Reward') }}>
              <View style={{ flex: 0.10, }}>

                <Text style={styles.getFreeMainText}>Daily Reward: Unlock </Text>
                <View style={{ alignItems: 'center', marginTop: responsiveWidth(2.5) }}>

                  <View style={styles.getFreeMainContainer}>
                    <Image  style={styles.getFreeCoin} source={require('../../assets/rupee.png')} />

                    <View style={{ flexDirection: 'column', width: responsiveWidth(48), marginLeft: responsiveWidth(4.5) }}>
                      <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.25), fontWeight: 600 }}>Free Coins</Text>
                      <Text style={{ color: '#fff' }}>Claim Your Daily Reward Now !</Text>
                    </View>
                    <View style={{ flexDirection: 'column', marginHorizontal: responsiveWidth(3) }}>
                      <Text style={{ color: '#fff' }}>Get Coins</Text>

                      <View style={{ flexDirection: 'row', marginTop: responsiveWidth(2.5), width: responsiveWidth(6) }}>
                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.15) }}>{userSettings && userSettings.data.daily_coin}</Text>
                        <Image  style={{ width: responsiveWidth(5.65), height: responsiveHeight(2.75), marginLeft: responsiveWidth(2.5),resizeMode:'contain' }} source={require('../../assets/rupee.png')} />
                      </View>

                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            {/* Get Free Coins -End */}

            {/* Get Free Coins Video -Start */}
            <TouchableOpacity onPress={() => { navigation.navigate('VideoReward') }} >
              <View style={{ flex: 0.10, marginTop: responsiveHeight(1.8) }}>

                <Text style={styles.getFreeMainText}>Video Reward: Unlock </Text>
                <View style={{ alignItems: 'center', marginTop: responsiveWidth(2.5) }}>

                  <View style={styles.getFreeMainContainer}>
                    <Image  style={styles.videoIcon} source={require('../../assets/play.png')} />

                    <View style={{ flexDirection: 'column', width: responsiveWidth(48), marginLeft: responsiveWidth(4.5) }}>
                      <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.25), fontWeight: 600 }}> Earn Coins </Text>
                      <Text style={{ color: '#fff' }}> by Watching Video !</Text>
                    </View>
                    <View style={{ flexDirection: 'column', marginHorizontal: responsiveWidth(3) }}>
                      <Text style={{ color: '#fff' }}>Get Coins</Text>

                      <View style={{ flexDirection: 'row', marginTop: responsiveWidth(2.5), width: responsiveWidth(6) }}>
                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.15) }}> {userSettings && userSettings?.data?.video_ad_coin}</Text>
                        <Image  style={{ width: responsiveWidth(5.65), height: responsiveHeight(2.75), marginLeft: responsiveWidth(2.5),resizeMode:'contain' }} source={require('../../assets/rupee.png')} />
                      </View>

                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            {/* Get Free Coins Video-End */}





          </View>


          {/* Spine-Start*/}
          {/* <View style={{ flex: 0.20, marginTop: responsiveWidth(4) }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.spineMainText}>Spine Wheel</Text>
              <View style={{ flexDirection: 'row', marginRight: responsiveWidth(7.5), alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontWeight: '500' }}>Get Coins</Text>


                <Text style={{ color: '#fff' }}> 1 </Text>
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

          </View> */}
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
          {/* <View style={{ flex: 0.20, marginTop:responsiveWidth(3.6) }}>

            <View style={{ alignItems: 'center', marginTop: responsiveWidth(2.5)}}>

              <View style={styles.gameZoneContainer}>

                <Text style={styles.gameZoneMainText}>Quiz Zone</Text>
                <View style={styles.gameZoneMainImgView}>

                  <View style={styles.gameZoneSingleImgView}>
                    <Image style={styles.gameZoneSingleImg} source={require('../../assets/q1.png')} />
                    <Text style={styles.gameZoneImgText}>English Quiz</Text>
                  </View>
                  <View style={styles.gameZoneSingleImgView}>
                    <Image style={styles.gameZoneSingleImg} source={require('../../assets/q2.png')} />
                    <Text style={styles.gameZoneImgText}>Math Quiz</Text>
                  </View>
                  <TouchableOpacity >
                  <View style={styles.gameZoneSingleImgView}>
                    <Image style={styles.gameZoneSingleImg} source={require('../../assets/q3.png')} />
                    <Text style={styles.gameZoneImgText}>GK Quiz</Text>
                  </View>
                  </TouchableOpacity>

                 <TouchableOpacity onPress={ ()=>{setModalVisible(true)} }>
                 <View style={styles.gameZoneSingleImgView}>
                    <Image style={styles.gameZoneSingleImg} source={require('../../assets/q4.png')} />
                    <Text style={styles.gameZoneImgText}>Daily Reward</Text>
                  </View>
                 </TouchableOpacity>
                </View>
              </View>
            </View>

          </View> */}



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
                    <Text style={styles.surveyText}> Earn  By survey  </Text>
                    <View style={{ flexDirection: 'column', marginRight: responsiveWidth(5), alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontWeight: '500' }}>Get Coins</Text>

                 <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{ color: '#fff' }}>  {userSettings && userSettings?.data?.survey_ad_coin} </Text>
                <Image style={{width: responsiveWidth(4.1), height: responsiveHeight(2), marginLeft: responsiveWidth(2),resizeMode:'contain' }} source={require('../../assets/rupee.png')} />
</View>

              </View>
                  </View>

                  <View >
                    <Image  style={styles.surveyImg} source={require('../../assets/test.png')} />
                    <View style={{ alignItems: 'center' }}>
                      {/* <Text style={styles.contestZoneAvailableText}>Contest not available!!</Text> */}
                    </View>
                  </View>

                </View>
              </View>
            </TouchableOpacity>
            {/* survey container - end */}

            {/*YouTUbe Video-Start*/}

            <View style={{ marginTop: responsiveWidth(3.6) }} >

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.videoMainText}>Earn By Watch Video</Text>
              <View style={{ flexDirection: 'row', marginRight: responsiveWidth(7.5), alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontWeight: '500' }}>Get Coins</Text>


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

          {/* Model-Start Daily Rewards  */}
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
                  borderRadius: responsiveWidth(2.5), elevation: responsiveWidth(2.5), borderWidth: responsiveWidth(0.2), width: '90%', height: responsiveHeight(50),
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

                <TouchableOpacity onPress={() => { setModalVisible(!modalVisible) }} style={{ position: 'absolute', right: responsiveWidth(3.5), top: responsiveWidth(3) }}>
                  <IconEntypo name="cross" size={responsiveWidth(6)} color="#fff" />
                </TouchableOpacity>


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
                <Image  style={{ width: responsiveWidth(44), height: responsiveHeight(14.2), marginTop: responsiveWidth(4),resizeMode:'contain' }} source={require('../../assets/dailygift.png')} />

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
                    {userSettings && userSettings.data.daily_coin} Coins
                  </Text>
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
                    elevation: responsiveWidth(1.2)
                  }}
                  disabled={dailyRewardButton}
                  onPress={() => {
                    dailyRewardClaim()
                    setModalVisible(!modalVisible);


                  }}>
                  <Text style={{ color: '#fff', paddingHorizontal: responsiveWidth(2.4), letterSpacing: responsiveFontSize(0.095) }}>{dailyRewardButton ? 'Reward Already Claim' : 'Claim Reward'}</Text>
                </TouchableOpacity>
                {/* </View> */}
              </LinearGradient>
            </View>
          </Modal>
          {/* Model-End Daily Rewards */}


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