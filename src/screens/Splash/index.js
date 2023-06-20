import { View, Text } from 'react-native'
import React,{useEffect,useState} from 'react'
import Lottie from 'lottie-react-native';
import { useNavigation } from "@react-navigation/native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
const Splash = () => {
 
  const navigation = useNavigation();

 const [appName, setAppName] = useState(false)

 useEffect(() => {
  setTimeout(() => {
  setAppName(true)
  }, 2000);

  
 }, []);

  return (
    <View style={{flex:1,backgroundColor:'#0a203e',alignItems:'center',justifyContent:'center'}}>
      <Lottie
        source={require('../../assets/splash1.json')}
        autoPlay
        loop={false}
        resizeMode='cover'
        // onAnimationFinish={ ()=>{navigation.navigate('HomeStack')} }
        style={{marginBottom:responsiveWidth(24),marginLeft:responsiveWidth(2.7)}}
      />
    
   {appName? <Text style={{color:'#fff',fontFamily:'Poppins-Light',fontSize:responsiveFontSize(3.5),marginTop:responsiveWidth(35.5)}} >Earn Money</Text>:null}

    </View>
  )
}

export default Splash