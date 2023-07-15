import { View, Text ,TouchableOpacity,Image} from 'react-native'
import React,{ useLayoutEffect,useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import {windowHeight,windowWidth} from '../../utiles/Dimensions'
import Clipboard from '@react-native-clipboard/clipboard';
import Dash from 'react-native-dash';
import Share from 'react-native-share';
import styles from './style'


const Referral = () => {


    const [referralCode, setReferralCode] = useState('897459');

  const navigation = useNavigation();

 const share=()=>{
   const options={
    message:
    `📣 hey hey hey!!😍😍😍 i'm earning real money in this app By Watching Video and Playing Games For Free !! 📱💫 🌹🌹🌹 Most popular money making app in World💪💰!!!💛🤍💚 Download app, You and Me will get 100 Bonus Coin !!!😻😻😻 it's 100% true! 
    😹  Use My Referal Code inside app After Login !  👉 ->  Download Now 👉 `,
    url:'https://play.google.com/store/apps/details?id=com.easyearn.cash',
   
   }


  Share.open(options)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    err && console.log(err);
  });
 }


  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>

          <Icon name="menu" size={responsiveWidth(7)} color="#fff" />
        </TouchableOpacity>
      ),
     
      headerTitle: "    Refer & Earn",
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

 

    <View style={{flex:1,backgroundColor: '#0a203e'}}  >
    <View style={{flex:0.6}} >
        <View style={styles.referFriendContainer}>
          <Text style={styles.referFriendText}>Refer a friend</Text>
          <Text style={styles.perReferText}> And earn 100 coins per refer</Text>
        </View>
         
     <View style={{flexDirection:'row',marginTop:responsiveWidth(-5)}}>
     <View style={styles.container1}>
         <Text style={styles.containerText} >1</Text>
      </View>
      <View style={{marginTop:responsiveWidth(12.5)}} >
      <Text style={styles.containerMainText} >Invite your friends & Share your refer code. </Text>
      </View>
     </View>
     <View >
     <Dash style={styles.dashLine1} dashColor='#eaeaea'/>
     </View>
     <View style={{flexDirection:'row'}}>
     <View style={styles.container2}>
         <Text style={styles.containerText} >2</Text>
      </View>
      <View style={{marginTop:responsiveWidth(1)}} >
      <Text style={styles.containerMainText} >They create account. </Text> 
      {/* <Text style={{color:'#1f4c86'}} >50 Offers</Text> */}
        <View style={{flexDirection:'row'}} >
        <View style={styles.container2SubMainText} >
        <Text style={{color:'#1f4c86',alignSelf:'center',fontWeight:500}}  >Sign up with your code</Text>
        </View>
        {/* <View style={{width:110,height:35,backgroundColor:'#ecf3f3',borderRadius:15,justifyContent:'center',marginTop:10}} ><Text style={{color:'#1f4c86',alignSelf:'center',fontWeight:500}}  >You gets 15.0</Text></View> */}
        </View>
      </View>
     </View>
     <View >
     <Dash style={styles.dashLine2} dashColor='#eaeaea'/>
     </View>
     <View style={{flexDirection:'row'}}>
     <View style={styles.container3}>
         <Text style={styles.containerText} >3</Text>
      </View>
      <View >
      <Text style={styles.containerMainText} >You earn rewards.</Text>
      <View style={{flexDirection:'row'}} >
        <View style={styles.container3SubMainText} >
        <Text style={{color:'#1f4c86',alignSelf:'center',fontWeight:500}}  >Then you get 100 coins</Text>
        </View>
        
        </View>
      </View>
      
     </View>
     <View style={styles.viewReferralContainer} >
     <View style={{borderBottomWidth:responsiveWidth(0.3),borderColor:'#fff'}} >
     <Text style={{fontSize:responsiveFontSize(1.9),color:'#fff'}} >View Referral History</Text>
     </View>

     <IconMaterial  name="greater-than" size={responsiveWidth(4)} color="#fff" style={{marginLeft:responsiveWidth(0.5),marginTop:responsiveWidth(1.25)}} />
     </View>
     <View style={styles.dividerLine} ></View>
     </View>
    
    <View style={{flex:0.4}}  >
        <Text style={styles.shareYourTxt} >Share your referral code</Text>
      <View style={styles.referCodeBox} >
         
         <View style={{flexDirection:'row'}}>
         <Text style={{fontSize:responsiveFontSize(1.9),color:'#fff'}}>
          Copy Code :  
        </Text>  
        <Text style={styles.referCode}>
        {referralCode}
        </Text>

        <TouchableOpacity onPress={()=>{Clipboard.setString(referralCode)}} >
        <IconMaterial  name="content-copy" size={responsiveWidth(5)} color="#fff" style={{marginLeft:responsiveWidth(1.3),marginTop:responsiveWidth(0.7)}} />
        </TouchableOpacity>
         </View>

      </View>

      <View style={{flexDirection:'row',justifyContent:'center'}} >
      {/* <TouchableOpacity onPress={()=>{share()}} >
        <View style={{flexDirection:'row',backgroundColor:'#27d246',width:190,height:50,marginTop:20,alignItems:'center',justifyContent:'center',borderRadius:5,marginRight:20,elevation:3}}>
        <Icon  name="logo-whatsapp" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(3) }} />
            <Text style={{color:'#fff',fontSize:16}} >Via Whatsapp</Text>
            
        </View>
        </TouchableOpacity> */}
        <View style={styles.referButtonBox}>
        <TouchableOpacity onPress={()=>{share()}} style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}} >
        <Icon  name="share-outline" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(3) }} />
        <Text style={{color:'#fff',fontSize:responsiveFontSize(1.9)}}  >Refer friends now</Text>
        </TouchableOpacity>
        </View>
      </View>

    </View>

     
    </View>

   
  )
}

export default Referral;