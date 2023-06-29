import { View, Text,TouchableOpacity,ToastAndroid, Alert } from 'react-native'
import React,{useRef,useState,useLayoutEffect,useEffect,useContext} from 'react'
import  { AuthContext } from "../../utiles/auth-context";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import LinearGradient from 'react-native-linear-gradient';
import styles from './style'
import CallApi, { setToken, CallApiJson, getToken } from '../../utiles/network';
import { BannerAdSize,BannerAd,AppOpenAd, RewardedAd, RewardedAdEventType,  TestIds, AdEventType,InterstitialAd } from 'react-native-google-mobile-ads';


const adUnitId =  'ca-app-pub-5493577236373808/8452330072';
const adUnitIdrewarded =  'ca-app-pub-5493577236373808/2741101726';
const adUnitIdIntrestial  = 'ca-app-pub-5493577236373808/6488775047';

const interstitial = InterstitialAd.createForAdRequest(adUnitIdIntrestial, { 
});
const rewarded = RewardedAd.createForAdRequest(adUnitIdrewarded,{} );

const QuizReward = ({route}) => {
    const navigation = useNavigation();


    const authCtx = useContext(AuthContext);

    const showToast =  (msg) => {
        ToastAndroid.show(`${msg} !`, ToastAndroid.SHORT);
      };

    const  quizRewardClaim = async () =>{
        // const data = await JSON.parse(seting)
        if(authCtx.quizValue < 6){
          Alert.alert('Sorry ! Your Score is Less than 6 , Try again ' );
          navigation.navigate('Home');

          return;
        }


       const  userdata = await getToken();
       const userdataParsed = await JSON.parse(userdata)
       const body = {
        user_id: userdataParsed.id,
        category:route.params.category,
        totalques: route.params.totalques ,
        correctques:authCtx.quizValue
      };
  
       const quizReward = await CallApiJson('gkRewardClaim', 'POST',body);
      //  setLoadingStatus(false);
      //  setuserProfileData(profileData);
        if(quizReward.error===false){
           Alert.alert( ' You Have Won  ');

        } 
        navigation.navigate('Home')

        // setLoadingStatus(false)
    }
    
//   useEffect(() => {
    
  
    

//     return  ()=>{
//       console.log('return')
//     }
//   }, [])

 

useEffect(() => {
 
   const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      rewarded.show();
 
  });
  const unsubscribeEarned = rewarded.addAdEventListener(
    RewardedAdEventType.EARNED_REWARD,
    reward => {
 

    },
  );

  // Start loading the rewarded ad straight away
  rewarded.load();

  const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
    interstitial.show()
  });

 // Start loading the interstitial straight away
 interstitial.load();


  // Unsubscribe from events on unmount
  return () => {
    unsubscribe()
     unsubscribeLoaded();
    unsubscribeEarned();
  };
}, []);

    //header
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
                <Icon  onPress={()=>{navigation.navigate('Wallet')}} name="wallet" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(5)}} />
                <TouchableOpacity onPress={()=>{navigation.navigate('Profile')}}>
                <Icon  name="person" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(3) }} />
                </TouchableOpacity>
              </View>
            
          ),
    
        });
      }, []);

    console.log("quiz Score reward",authCtx.quizValue)

  return (
    <View style={{flex:1,backgroundColor: '#0a203e',justifyContent:'center'}}>
   <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
    <View style={{}}>
     <LinearGradient colors={["#0a203e", "#1f4c86"]}
                  useAngle={true}
                  angle={322}
                  angleCenter={{ x: 0.5, y: 0.5 }}
                  style={{  borderRadius: responsiveWidth(2.45), 
    elevation: responsiveWidth(1),
     borderWidth: responsiveWidth(0.3),
     width: '70%',
     
            
  borderColor:  '#1f4c86',
  alignSelf:'center',
 justifyContent:'center',
 alignItems:'center',
height:'50%',
marginTop:responsiveWidth(20)
  }}>
          {/* <View
            style={{
              backgroundColor: '#1f4c86',
              width: '90%',
              
              borderRadius: 10,
            }}> */}

            <Text  style={styles.scoreTextHeading}>
             Your Score Must be More  {"\n"}  than 5 To win    
            </Text>
            <Text
              style={styles.scoreText}>
             Your  Score 
            </Text>
            <Text 
              style={styles.scoreNumber}>
          {authCtx.quizValue}
            </Text>
            <TouchableOpacity
              style={styles.closeBUtton}
              onPress={() => {
                // setModalVisible(!modalVisible);
                quizRewardClaim();
              }}>
              <Text style={styles.closeBUttonText}> Claim Reward   </Text>
            </TouchableOpacity>
          {/* </View> */}
          </LinearGradient>
          </View>
          <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />

    </View>
  )
}

export default QuizReward