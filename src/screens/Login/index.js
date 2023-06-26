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
import { BannerAdSize,BannerAd,AppOpenAd, RewardedAd, RewardedAdEventType,  TestIds, AdEventType,InterstitialAd } from 'react-native-google-mobile-ads';
const adUnitId =  'ca-app-pub-2291791121050290/1352844929';
const adUnitIdrewarded =  'ca-app-pub-2291791121050290/6625314913';
import  { AuthContext } from "../../utiles/auth-context";


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
        setUserInfo(usrInfo)
        const body = {
            email: usrInfo.user.email,
            name: usrInfo.user.name,
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
          <Icon style={{position:'absolute',left:responsiveWidth(-12)}} name="google-plus-g" size={responsiveWidth(5.5)} color="#fff" />
            <Text  style={styles.buttonText}>LOGIN WITH GMAIL</Text>
            
      
        
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


    </View>

    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />


  </LinearGradient>
  

  )
}

export default Login ;

