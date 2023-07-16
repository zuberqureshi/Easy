import { View, Text,SafeAreaView,StyleSheet,TextInput, TouchableOpacity,Image,ToastAndroid } from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import { styles } from './style'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { responsiveHeight,responsiveWidth,responsiveFontSize} from "react-native-responsive-dimensions";
import LinearGradient from 'react-native-linear-gradient';
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';
import CallApi, {setToken ,CallApiJson } from '../../utiles/network';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useNavigation,useIsFocused } from "@react-navigation/native";
import Loader from '../../components/common/loader/Loader';
import  { AuthContext } from "../../utiles/auth-context";
import AppLovinMAX from  "react-native-applovin-max";
import VersionCheck from 'react-native-version-check';
import DeviceCountry, { TYPE_TELEPHONY} from 'react-native-device-country';
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

const Login = () => {
  const isFocused = useIsFocused()

  const authCtx = useContext(AuthContext);
  
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [userInfo, setUserInfo] = useState(null)

  const [loginButton, setLoginButton] = useState(false)
  const navigation = useNavigation();
useEffect(() => {
  GoogleSignin.configure({webClientId:'978092792291-q516pofd6upmdlisfkgea3j1rpr6lrsg.apps.googleusercontent.com'});
}, [])

const showToast = (msg) => {
  ToastAndroid.show(`${msg} !`, ToastAndroid.SHORT);
};

// console.log('login info',userInfo)

const signIn = async () => {

  

 
  setLoadingStatus(true);
  setLoginButton(true)
  try {
    await GoogleSignin.hasPlayServices();
    GoogleSignin.signOut()
    const usrInfo = await GoogleSignin.signIn();
        setUserInfo(usrInfo);
        let DeviceCountryInfo =  await  DeviceCountry.getCountryCode(TYPE_TELEPHONY);
        const currentVersion = VersionCheck.getCurrentVersion()

        const body = {
            email: usrInfo.user.email,
            name: usrInfo.user.name,
            currentVersion:currentVersion,
            user_country: DeviceCountryInfo.code.toUpperCase()
          };

          
        const userLogin =  await CallApiJson('login', 'POST', body);
   
     if(userLogin.error === true){
       showToast(userLogin.msg)
      
       setLoadingStatus(false);
       setLoginButton(false)
     }
        else{
            const ds = await setToken(  userLogin.data );
            authCtx.authenticate(ds);
        
            setLoadingStatus(false)
            setLoginButton(false)
          navigation.navigate('HomeStack');
 
          }
           
  } catch (error) {
    
    setLoadingStatus(false);
    setLoginButton(false)   

    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('SIGN_IN_CANCELLED',error)
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('IN_PROGRESS',error)
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('PLAY_SERVICES_NOT_AVAILABLE',error)
      // play services not available or outdated
    } else {
      // some other error happened
    }
    showToast(error)
    console.log('Google error ',error)
  }
};


//applovin 
useEffect(() => {

  
  // rewarded

    // You may use the utility method `AppLovinMAX.isTablet()` to help with view sizing adjustments
    AppLovinMAX.createBanner(BANNER_AD_UNIT_ID, AppLovinMAX.AdViewPosition.BOTTOM_CENTER);

    // Set background or background color for banners to be fully functional
    // In this case we are setting it to black - PLEASE USE HEX STRINGS ONLY
    AppLovinMAX.setBannerBackgroundColor(BANNER_AD_UNIT_ID, '#0a203e');
  //rewarded
  AppLovinMAX.showBanner(BANNER_AD_UNIT_ID);


 
 

}, []);
//applovin 

  // function handleLogin() {
  //   if (inputData.Email === '') {
  //     setModal({isVisible: true, text: "Email can't be empty"});
  //     return;
  //   }
  //   if (inputData.Password === '') {
  //     setModal({isVisible: true, text: "Password can't be empty"});
  //     return;
  //   }

  //   const body = {
  //     uid: inputData.Email,
  //     password: inputData.Password,
  //   };

  //   CallApi('users/login', 'POST', body).then(async r => {
  //     if (r.message) {
  //       setModal({isVisible: true, text: r.message});
  //       setStatus('Input');
  //       return;
  //     } else {
  //       setStatus('Loaded');
  //       // Alert.alert(r.token);
  //       setToken(r.token);
  //       navigation.navigate('Home');
  //       // const token = await getToken();
  //       // console.log('token in login.js :', token);
  //       // getToken().then(res => console.log(res));
  //     }
  //   });
  //   setStatus('Loading');
  // }


  return (

    <LinearGradient colors={['#1f4c86', '#0a203e']} 
        useAngle={true}
                  angle={190}
                  angleCenter={{ x: 0.5, y: 0.5 }}
      
    style={{flex:1}}>
      <View style={styles.mainContainer}>
        {/* <Text style={styles.textWlcm}>Welcome Back</Text>
        <Text style={styles.textLogin}>Login to your account</Text>
        <View style={styles.inputMain}>
            <Icon name="user-alt" size={responsiveWidth(4.5)} color="#3566ac" />
        <TextInput cd
        style={styles.inputText}
        placeholder="Email"
      
      />
        </View>
        <View style={styles.inputMain}>
            <Icon name="lock" size={responsiveWidth(4.5)} color="#3566ac" />
        <TextInput 
        style={styles.inputText}
        placeholder="Password"
      
      />
        </View> */}
        <Loader loadingStatus = {loadingStatus} />
        <Image style={{width:responsiveWidth(60),height:responsiveHeight(32),marginTop:responsiveWidth(20),resizeMode:'contain'}} source={require('../../assets/l1.png')} />
        <Text style={styles.textWlcm}>Welcome</Text>
        <Text style={styles.textLogin}>Create your Account & </Text>
        <Text style={[styles.textLogin,{marginBottom:responsiveWidth(10),}]}>Start Earning</Text>   

   <TouchableOpacity disabled={loginButton} onPress={()=>{{ signIn()}}}>
        <LinearGradient colors={['#1f4c86', '#0a203e']} style={styles.inputMain}
           start={{x: 0, y: 0}} end={{x: 1, y: 0}}>

          
          
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Icon style={{position:'absolute',left:responsiveWidth(2)}} name="google-plus-g" size={responsiveWidth(5.5)} color="#fff" />
            <Text  style={styles.buttonText}>LOGIN WITH GMAIL</Text>
          </View>
        </LinearGradient>
    </TouchableOpacity> 

{/* <View style={{marginTop:responsiveWidth(3.5)}}>
 
<Text style={{color:'#fff',fontSize:responsiveFontSize(1.7),fontFamily:'Poppins-Light',alignSelf:'center'}}>Email Us <Text  style={{color:'#fff',fontSize:responsiveFontSize(1.7),fontFamily:'Poppins-Light',letterSpacing:responsiveWidth(0.15),textDecorationLine:'underline',fontWeight:'bold'}}> contact@newindiagyan.online</Text> </Text>
</View>
 */}

        {/* <LinearGradient colors={['#2a3a5a','#304577' ,'#374e91']} style={styles.inputMain}
           start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
          <View style={{backgroundColor:'#4f62d8',height:responsiveHeight(4.3),width:responsiveWidth(67),borderRadius:responsiveWidth(5),justifyContent:'center',alignItems:'center'}}>
          <Text  style={styles.buttonText} >SIGN UP</Text>
           </View>
        </LinearGradient> */}


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
 


  </LinearGradient>
  

  )
}

export default Login ;

