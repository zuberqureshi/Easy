import { View, Text ,TouchableOpacity,Image,StyleSheet,TextInput} from 'react-native'
import React,{ useLayoutEffect,useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import Loader from '../../components/common/loader/Loader';
import LinearGradient from 'react-native-linear-gradient'

const ReferCode = () => {


    const navigation = useNavigation();
    const [activty, setActivty] = useState(false)
    const [refferCode, setRefferCode] = useState()


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

  return (

    <View style={{flex:1,backgroundColor: '#0a203e'}}>
    {/* <Loader loadingStatus = {loadingStatus} /> */}

       <Text style={{color:'#fff',fontSize:responsiveFontSize(2.1),letterSpacing: responsiveWidth(0.2),
       marginVertical:responsiveWidth(5),marginLeft:responsiveWidth(4)}}>
        Enter your friend refer code & Get Rewards
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

            <Text style={{color:'#fff',fontSize:responsiveFontSize(2.1)}}> Enter Code Here</Text>

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
               console.log("refer code enter by user",refferCode)
              }}>


              <Text style={{color: '#fff',
    paddingHorizontal:  responsiveWidth(2.45),
     letterSpacing: responsiveWidth(0.2)}}>Submit</Text>
      {activty?<ActivityIndicator  size="small" color="#fff" />:null}
            </TouchableOpacity>
          {/* </View> */}
          </LinearGradient>
          </View>

 


    </View>
  )
}

export default ReferCode

const styles = StyleSheet.create({})