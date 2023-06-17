import { View,Alert, Text, Button, Pressable, SafeAreaView, ScrollView, Image,TouchableOpacity,Modal,TouchableHighlight } from 'react-native'
import React from 'react'
import { useLayoutEffect,useState,useEffect,useRef } from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import Carousel,{ Pagination } from 'react-native-snap-carousel';
import { sliderData } from '../../components/slider/data'
import BannerSlider from '../../components/slider/BannerSlider'
import { windowHeight, windowWidth } from '../../utiles/Dimensions'
import styles from './style'
import IconEntypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient'
import YoutubePlayer from "react-native-youtube-iframe";
 import crashlytics from '@react-native-firebase/crashlytics';
 import CallApi, {setToken} from '../../utiles/network';

const Home = () => {


  //  const isInternet = useRef(checkInternet)
  const [playing, setPlaying] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleVideo, setModalVisibleVideo] = useState(false);
  const [videoClose, setVideoClose] = useState(false)
  const [inputData, setInputData] = useState({Email: '', Password: ''});

  const navigation = useNavigation();
 

  function handleLogin() {
    if (inputData.Email === '') {
      Alert('Email');
     // setModal({isVisible: true, text: "Email can't be empty"});
      return;
    }
    if (inputData.Password === '') {
      Alert('Email');

     // setModal({isVisible: true, text: "Password can't be empty"});
      return;
    }

    const body = {
      uid: inputData.Email,
      password: inputData.Password,
    };

    CallApi('/login', 'POST', body).then(async r => {
      console.log( 'apires',r)

    });
   }

  const renderBanner = ({ item, index }) => {
    return <BannerSlider data={item} />;
  };

//timer login
const [counter, setCounter] = useState(0)

useEffect(() => {
 // handleLogin();
 
 const body = {
  uid: inputData.Email,
  password: inputData.Password,
};

CallApi('userlist', 'POST', body).then(async r => {
  console.log( 'apiresponse',r)

});
  console.log( 'homepage')
    console.log( 'homepage crash ')


   const timer = counter>0 && setInterval(() => {
    setCounter(counter-1)
  }, 1000);

  return () => {
    clearInterval(timer)
  }
}, [counter])




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
            <Icon onPress={()=>{navigation.navigate('Wallet')}} name="wallet" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(5)}} />
            <TouchableOpacity onPress={()=>{navigation.navigate('Profile')}}>
            <Icon  name="person" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(3) }} />
            </TouchableOpacity>
          </View>
        
      ),
     


    });
  }, []);

//  Header End

  // const DailyReward = () => {
      
  //   return (
    
  //   )
  // }

// const [index, setIndex] = useState(0);
// const isCarousel = useRef(null);

  return (



    <SafeAreaView style={{ flex: 1, backgroundColor: '#0a203e' }}>
  
        <ScrollView>
        <View style={{ flex: 1, }}>
        
          {/* Slider */}
          <View style={[styles.slider]}>
            <Carousel
              // ref={isCarousel}

              autoplay={true}
              data={sliderData}
              renderItem={renderBanner}
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

          {/* Get Free Coins -Start */}
          <View style={{ flex: 0.20, marginTop: responsiveHeight(1.8) }}>
             
            <Text style={styles.getFreeMainText}>Get Free Coins</Text>
            <View style={{ alignItems: 'center', marginTop: responsiveWidth(2.5)}}>

              <View style={styles.getFreeMainContainer}>
                <Image style={styles.getFreeCoin} source={require('../../assets/coin.png')} />
                <View style={{ flexDirection: 'column', marginLeft: responsiveWidth(4.8) }}>
                  <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.25), fontWeight: 600 }}>Free Coins</Text>
                  <Text style={{ color: '#fff' }}>Scratch Card, Get Coins!</Text>
                </View>
                <View style={{ flexDirection: 'column',marginHorizontal:responsiveWidth(6) }}>
                  <Text style={{ color: '#fff' }}>Get Up-to</Text>

                  <View style={{ flexDirection: 'row', marginTop: responsiveWidth(2.5) }}>
                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.15) }}>10</Text>
                    <Image style={{ width: responsiveWidth(7.3), height: responsiveHeight(2.82), marginLeft: responsiveWidth(2.5)}} source={require('../../assets/coin.png')} />
                  </View>

                </View>
              </View>
            </View>

          </View>
          {/* Get Free Coins -End */}

          {/* Spine-Start*/}
          <View style={{ flex: 0.20, marginTop: responsiveWidth(5) }}>
            <Text style={styles.spineMainText}>Spine Wheel</Text>
     

           
            <View style={{ alignItems: 'center', marginTop: responsiveWidth(5) }}>
            <TouchableOpacity onPress={()=>{navigation.navigate('SpinerWheel')}}  >
                 
                
              <View style={styles.spineImgView}>
                
                <Image style={styles.spineImg} source={require('../../assets/Spin4.jpg')} />

              </View>
              </TouchableOpacity>
            </View>
            
          </View>
          {/* Spine-End*/}


          {/* Game Zone-Start*/}
          <View style={{ flex: 0.20, marginTop:responsiveWidth(3.6) }}>


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
                  <TouchableOpacity onPress={ ()=>{navigation.navigate('Login')} }>
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

          </View>

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
                  style={{ borderRadius: responsiveWidth(2.5), elevation: responsiveWidth(2.5), borderWidth: responsiveWidth(0.2),width: '90%',height:responsiveHeight(50),
                  alignItems:'center',
                  borderColor:  '#1f4c86', }}>
        {/* <View
          style={{
            backgroundColor: '#1f4c86',
            width: '90%',
             alignItems:'center',
            borderRadius: 10,
          }}> */}
          
          <TouchableOpacity onPress={()=>{ setModalVisible(!modalVisible)}} style={{position:'absolute',right:responsiveWidth(3.5),top:responsiveWidth(3)}}>
          <IconEntypo name="cross" size={responsiveWidth(6)} color="#fff"  />
          </TouchableOpacity>


          <Text
            style={{
              fontSize: responsiveFontSize(3.55),
              letterSpacing:responsiveWidth(0.35),
              fontWeight: '600',
             
              marginTop: responsiveWidth(7),
              color:'#fff'
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
          <Image style={{width:responsiveWidth(44),height:responsiveHeight(14.2),marginTop:responsiveWidth(4)}} source={require('../../assets/dailygift.png')} />

          <Text 
            style={{
              fontSize: responsiveWidth(3.8),
              marginTop: responsiveWidth(3.6),
              color: '#fff',
              
            }}>
          YOUR REWARD TODAY IS
          </Text>
         <View style={{flexDirection:'row'}} >
         <Image style={{width:responsiveWidth(7.15),height:responsiveHeight(3.65),marginTop:responsiveWidth(0.5),marginRight:responsiveWidth(1)}} source={require('../../assets/coin.png')} />
          <Text 
            style={{
              fontSize: responsiveFontSize(1.9),
              marginTop: responsiveFontSize(0.7),
              color: '#fff',
              
            }}>
           {34} Coins
          </Text>
         </View>
          <TouchableOpacity
            style={{
         
              height: responsiveHeight(4.8),
              padding: responsiveWidth(2.5),
            
              borderRadius: responsiveWidth(2.5),
              marginTop: responsiveWidth(5),
              marginBottom: responsiveWidth(5),
              backgroundColor:'#0a203e',
              color:'#fff',
              elevation:responsiveWidth(1.2)
            }}
            onPress={() => {
              setModalVisible(!modalVisible);
          
            
            }}>
            <Text style={{ color:'#fff',paddingHorizontal:responsiveWidth(2.4),letterSpacing:responsiveFontSize(0.095)}}>Claim Reward</Text>
          </TouchableOpacity>
        {/* </View> */}
        </LinearGradient>
      </View>
    </Modal> 
{/* Model-End Daily Rewards */}

          {/* Game Zone-End*/}

          {/* Contest Zone-Start*/}

          <View style={{ flex: 0.20, marginTop: responsiveWidth(3.6), marginBottom: responsiveWidth(9.75)}}>


            <View style={{ alignItems: 'center', marginTop: responsiveWidth(2.5) }}>

              <View style={styles.contestZoneContainer}>

                <Text style={styles.contestZoneMainText}>Contest Zone</Text>

                <View >
                  <Image style={styles.contestZoneImg} source={require('../../assets/contest.jpeg')} />
                  <View style={{ alignItems: 'center' }}>
                    <Text style={styles.contestZoneAvailableText}>Contest not available!!</Text>
                  </View>
                </View>






              </View>
            </View>

   {/* Video-Start*/}

            <View style={{ marginTop: responsiveWidth(3.6) }} >
              <Text style={styles.videoMainText}>Earn Money By Watch Video</Text>
              <View style={{ alignItems: 'center', marginTop: responsiveWidth(2.5) }}>

                  <TouchableOpacity 
                  onPress={()=>{
                    setModalVisibleVideo(true)
                    setCounter(30)
                    setTimeout(()=>{
                      setVideoClose(true)
                      
                    },30000)
                  }} >
                <View style={styles.videoImgView}>
                  <Image style={styles.videoImg} source={require('../../assets/videoicon.png')} />
                </View>
                </TouchableOpacity>

              </View>
            </View>

{/* Video-End*/}

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
                  style={{ borderRadius: responsiveWidth(2.5), elevation: responsiveWidth(2.5), borderWidth: responsiveWidth(0.2),width: '90%',height:responsiveHeight(40),
                  alignItems:'center',
                  borderColor:  '#1f4c86', }}>
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
          
   <View style={{marginTop:responsiveWidth(15)}}>

   <YoutubePlayer
          style={{}}
          width={responsiveWidth(85)}
          height={responsiveHeight(23.5)}
          play={playing}
          videoId={"EdftT8GMU1U"}
          // onChangeState={onStateChange}
        />
   </View>
        
         

         
          
   {videoClose?
        
    <TouchableOpacity
            style={{
         
              height: responsiveHeight(4.8),
              padding: responsiveWidth(2.5),
            
              borderRadius: responsiveWidth(2.5),
              marginTop: responsiveWidth(5),
              marginBottom: responsiveWidth(5),
              backgroundColor:'#0a203e',
              color:'#fff',
              elevation:responsiveWidth(1.2)
            }}
            onPress={() => {
              setModalVisibleVideo(!modalVisibleVideo);
              setVideoClose(!videoClose)
           
            
            }}>
            <Text style={{ color:'#fff',paddingHorizontal:responsiveWidth(2.4),letterSpacing:responsiveFontSize(0.095),}}>Claim Reward</Text>
          </TouchableOpacity> :
            
          <TouchableOpacity
            style={{
         
              height: responsiveHeight(4.8),
              padding: responsiveWidth(2.5),
            
              borderRadius: responsiveWidth(2.5),
              marginTop: responsiveWidth(5),
              marginBottom: responsiveWidth(5),
              backgroundColor:'#808080',
              color:'#fff',
              elevation:responsiveWidth(1.2)
            }}
          >
            <Text style={{ color:'#fff',paddingHorizontal:responsiveWidth(2.4),letterSpacing:responsiveFontSize(0.095),}}>Claim Reward  {counter}</Text>
          </TouchableOpacity>
           }

        {/* </View> */}
        </LinearGradient>
      </View>
    </Modal>

{/* Video-ModelEnd*/}


        </View>
       
      </ScrollView>
     
     
      

      
    </SafeAreaView>
  )
}

export default Home