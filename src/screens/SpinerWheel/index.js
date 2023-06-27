import { StyleSheet, Text, View,TouchableOpacity,SafeAreaView } from 'react-native'
import React,{useLayoutEffect,useState,} from 'react'
import Spiner from './spiner'
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import  { AuthContext } from "../../utiles/auth-context";


const SpinerWheel = () => {
 
  const navigation = useNavigation();

  const [spinValue, setSpinValue] = useState()
  const [spinAmount, setSpinAmount] = useState()

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

 console.log("spinner value state",spinValue)
 console.log("spinner Amount state",spinAmount)

  return (

 
    <View style={{flex:1,backgroundColor:'#0a203e'}}>
    <View style={{justifyContent:'center',alignItems:'center',marginTop:responsiveWidth(7)}}>
          <Text style={{color:'#fff',fontSize:responsiveFontSize(3.55)}}>DAILY SPINNER</Text>
          <Text style={{color:'#fff',fontSize:responsiveFontSize(1.7),letterSpacing:responsiveWidth(0.37)}}>Spin Daily and get Exciting cash rewards</Text>
          <Text style={{color:'#fff',fontSize:responsiveFontSize(1.9),marginTop:responsiveWidth(2.5)}}>Win upto Rs.100 Daily</Text>
        </View>

       <Spiner setSpinValue={setSpinValue} setSpinAmount={setSpinAmount} spinAmount={spinAmount} />
  
    </View>
   
  )
}

export default SpinerWheel;

const styles = StyleSheet.create({



})