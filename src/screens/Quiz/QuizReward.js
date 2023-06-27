import { View, Text,TouchableOpacity,ToastAndroid } from 'react-native'
import React,{useRef,useState,useLayoutEffect,useEffect,useContext} from 'react'
import  { AuthContext } from "../../utiles/auth-context";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import LinearGradient from 'react-native-linear-gradient';
import styles from './style'
import CallApi, { setToken, CallApiJson, getToken } from '../../utiles/network';

const QuizReward = ({route}) => {
    const navigation = useNavigation();


    const authCtx = useContext(AuthContext);

    const showToast =  (msg) => {
        ToastAndroid.show(`${msg} !`, ToastAndroid.SHORT);
      };

    const  quizRewardClaim = async () =>{
        // const data = await JSON.parse(seting)
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
        console.log('quiz reward creesn scoreee',quizReward);
        if(quizReward.error===false){
          showToast(quizReward.msg)
        }
        // setLoadingStatus(false)
    }
    
//   useEffect(() => {
    
  
    

//     return  ()=>{
//       console.log('return')
//     }
//   }, [])

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
            <Text
              style={styles.scoreText}>
              SCORE
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

                navigation.navigate('Home')
             
              }}>
              <Text style={styles.closeBUttonText}>Claim Reward</Text>
            </TouchableOpacity>
          {/* </View> */}
          </LinearGradient>
          </View>
    </View>
  )
}

export default QuizReward