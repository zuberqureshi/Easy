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
import VersionCheck from 'react-native-version-check';
import AppLovinMAX from  "react-native-applovin-max";


//admob
const adUnitId =  'ca-app-pub-5493577236373808/8452330072';
const adUnitIdrewarded =  'ca-app-pub-5493577236373808/2741101726';
const adUnitIdIntrestial  = 'ca-app-pub-5493577236373808/6488775047';
const interstitial = InterstitialAd.createForAdRequest(adUnitIdIntrestial, { 
});
const rewarded = RewardedAd.createForAdRequest(adUnitIdrewarded,{} );
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


const delay  = 10;
const delaySeconds  = delay*1000;

const QuizReward = ({route}) => {
    const navigation = useNavigation();
    const [claimButton, setclaimButton] = useState(true)
    const [count, setCount] = useState(delay);
    const [buttonDisableTrue, setbuttonDisableTrue] = useState(true)

    const authCtx = useContext(AuthContext);

    const showToast =  (msg) => {
        ToastAndroid.show(`${msg} !`, ToastAndroid.SHORT);
      };

    const  quizRewardClaim = async () =>{

      await showApplovinRewarded()
        // const data = await JSON.parse(seting)
        if(authCtx.quizValue < 5){
          Alert.alert('Sorry ! Your Score is Less than 5 , Try again ' );
          navigation.navigate('Home');

          return;
        }


       const  userdata = await getToken();
       const userdataParsed = await JSON.parse(userdata);
       const currentVersion = VersionCheck.getCurrentVersion();

       const body = {
        user_id: userdataParsed.id,
        category:route.params.category,
        totalques: route.params.totalques ,
        correctques:authCtx.quizValue,
        currentVersion:currentVersion
      };
  
       const quizReward = await CallApiJson('gkRewardClaim', 'POST',body);
      //  setLoadingStatus(false);
      //  setuserProfileData(profileData);
      setbuttonDisableTrue(true);

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

                                 
  setTimeout(() => {
    setclaimButton(false);
    setbuttonDisableTrue(false)

}, delaySeconds);


  const interval = setInterval(() => {
    if (count > 0) setCount(count - 1);
  }, 1000);
  return () => clearInterval(interval);
}, [count]);






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



//applovin 
useEffect(() => {

  //intrestial
  AppLovinMAX.loadInterstitial(INTERSTITIAL_AD_UNIT_ID);
  const appLovinIntrestial = AppLovinMAX.addInterstitialLoadedEventListener( async () => {
    // Interstitial ad is ready to show. AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID) now returns 'true'
    const isInterstitialReady =  await AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID);
    if (isInterstitialReady) {
    //  AppLovinMAX.showInterstitial(INTERSTITIAL_AD_UNIT_ID);
     
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

const showApplovinIntrestial = async ()=>{
  const isInterstitialReady =  await AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID);
  if (isInterstitialReady) {
        AppLovinMAX.showInterstitial(INTERSTITIAL_AD_UNIT_ID);
        return true;
  }else{
    return false;
  }
}
 

const showApplovinRewarded =()=>{
  AppLovinMAX.showRewardedAd(REWARDED_AD_UNIT_ID);
}
 


//applovin 


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
              disabled={ buttonDisableTrue }

              onPress={async () => {
                // setModalVisible(!modalVisible);

               await showApplovinIntrestial()
                quizRewardClaim();
              }}>
              <Text style={styles.closeBUttonText}>  { (claimButton   )  ? `Wait For ${count} Seconds` :' Claim Reward  ' }      </Text>
            </TouchableOpacity>
          {/* </View> */}
          </LinearGradient>
          </View>
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          />

    </View>
  )
}

export default QuizReward