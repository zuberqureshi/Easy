import { View, Text ,TouchableOpacity,Image,StyleSheet,TextInput, Alert} from 'react-native'
import React,{ useEffect, useLayoutEffect,useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import Loader from '../../components/common/loader/Loader';
import LinearGradient from 'react-native-linear-gradient'
import CallApi, { setToken, CallApiJson, getToken } from '../../utiles/network';
import AppLovinMAX from  "react-native-applovin-max";

 
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
 const MREC_AD_UNIT_ID = Platform.select({
  android: '01d673b7684c023e'
});
//applovin
const ReferCode = () => {


    const navigation = useNavigation();
    const [activty, setActivty] = useState(false)
    const [refferCode, setRefferCode] = useState()
    const [loadingStatus, setLoadingStatus] = useState(false)

    
       // referalCodeSubmit api
       const referalCodeSubmit = async () => {
        setLoadingStatus(true);
        showApplovinIntrestial();
        const  userdata = await getToken();
        const userdataParsed = await JSON.parse(userdata)
        const body = {
         user_id: userdataParsed.id,
         referal_code:refferCode
       };
        const Apiresponse = await CallApiJson('referalCodeSubmit', 'POST',body);
        // const data = await JSON.parse(seting)
        setLoadingStatus(false);
        if(Apiresponse.error==true ){
          Alert.alert(Apiresponse.msg); 
          return;
        }else{
          Alert.alert(Apiresponse.msg); 
          return;
        }

      }

      
    useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
    
              <Icon name="menu" size={responsiveWidth(7)} color="#fff" />
            </TouchableOpacity>
          ),
         
          headerTitle: "",
          headerTintColor:'#fff',
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
    //AppLovinMAX.showInterstitial(INTERSTITIAL_AD_UNIT_ID);
     
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


  return (

    <View style={{flex:1,backgroundColor: '#0a203e'}}>
    <Loader loadingStatus = {loadingStatus} />

       <Text style={{color:'#fff',fontSize:responsiveFontSize(2.1),letterSpacing: responsiveWidth(0.2),
       marginVertical:responsiveWidth(5),marginLeft:responsiveWidth(4)}}>
        To receive bonus coins, please enter your Referral code.
         </Text>


    <View style={{flex:0.6,justifyContent:'center',paddingHorizontal:responsiveWidth(10)}}>
     <LinearGradient colors={["#0a203e", "#1f4c86"]}
                  useAngle={true}
                  angle={322}
                  angleCenter={{ x: 0.5, y: 0.5 }}
                  style={{  borderRadius: responsiveWidth(2.45), 
    elevation: responsiveWidth(1),
     borderWidth: responsiveWidth(0.3),

  borderColor:  '#1f4c86',
  alignSelf:'center',
 justifyContent:'center',
 alignItems:'center',
 paddingHorizontal:responsiveWidth(10),
 paddingVertical:responsiveWidth(6)

  }}>
          {/* <View
            style={{
              backgroundColor: '#1f4c86',
              width: '90%',
              
              borderRadius: 10,
            }}> */}

            <Text style={{color:'#fff',fontSize:responsiveFontSize(2.1)}}> Enter Referral Code Here</Text>

            <View style={{  borderWidth: responsiveFontSize(0.2),
    borderColor: '#0a203e', 
    borderRadius: responsiveWidth(6.25),
    width: responsiveWidth(48.5),
     alignItems: 'center',
      marginTop: responsiveWidth(5), 
      alignSelf: 'center' }}>
             <TextInput
               onChangeText={text => setRefferCode(text)}
               placeholder="Enter Referral Code"
               placeholderTextColor="#fff"
               autoCorrect={false}
               value={refferCode}
          
               color='#fff'
            //    maxLength={(gameData?.data?.word)?.length}
             />
           </View>

            <TouchableOpacity
              style={{  alignSelf: 'center',
   height: responsiveHeight(4.8),
   padding: responsiveWidth(2.45),
 
   borderRadius: responsiveWidth(2.45),
   marginTop: responsiveWidth(8),
 
   backgroundColor:'#0a203e',
  
   elevation:responsiveWidth(1.5),
   flexDirection:'row'}}
              onPress={() => {

                referalCodeSubmit()

                }}>


              <Text style={{color: '#fff',
    paddingHorizontal:  responsiveWidth(2.45),
     letterSpacing: responsiveWidth(0.2)}}>Submit</Text>
      {activty?<ActivityIndicator  size="small" color="#fff" />:null}
            </TouchableOpacity>
          {/* </View> */}
          </LinearGradient>
          </View>

 
        {/* applovin mrec  */}
        <AppLovinMAX.AdView adUnitId={MREC_AD_UNIT_ID}
                    adFormat={AppLovinMAX.AdFormat.MREC}
                    style={styles.mrec}
                    autoRefresh={true}
                    onAdLoaded={(adInfo) => {
                      console.log('MREC ad loaded from ' + adInfo.networkName);
                    }}
                    onAdLoadFailed={(errorInfo) => {
                      console.log('MREC ad failed to load with error code ' + errorInfo.code + ' and message: ' + errorInfo.message);
                    }}
                    onAdClicked={(adInfo) => {
                      console.log('MREC ad clicked');
                    }}
                    onAdExpanded={(adInfo) => {
                      console.log('MREC ad expanded')
                    }}
                    onAdCollapsed={(adInfo) => {
                      console.log('MREC ad collapsed')
                    }}
                    onAdRevenuePaid={(adInfo) => {
                      console.log('MREC ad revenue paid: ' + adInfo.revenue);
                    }}/>
            {/* applovin mrec  */}

    </View>
  )
}

export default ReferCode

const styles = StyleSheet.create({})