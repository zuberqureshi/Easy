import { View, Text ,TouchableOpacity,Image, Alert} from 'react-native'
import React,{ useEffect, useLayoutEffect,useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import {windowHeight,windowWidth} from '../../utiles/Dimensions'
import Clipboard from '@react-native-clipboard/clipboard';
import Dash from 'react-native-dash';
import Share from 'react-native-share';
import styles from './style'
import CallApi, { setToken, CallApiJson, getToken } from '../../utiles/network';
 //applovin
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
  const MREC_AD_UNIT_ID = Platform.select({
   android: '01d673b7684c023e'
 });
  const INTERSTITIAL_AD_UNIT_ID = Platform.select({
   android: '8fba0df7d5246704',
  });
 //applovin

const Referral = () => {


    const [referralCode, setReferralCode] = useState('897459');
    const [userInfo, setUserInfo] = useState()
    const [userSettings, setUserSettings] = useState()

  const navigation = useNavigation();

  const getUserInfo = async ( ) => {

    const ds = await getToken();
  const data = await JSON.parse(ds)
  await setUserInfo(data)

  }
    // setting api
    const settings = async () => {

      const  userdata = await getToken();
      const userdataParsed = await JSON.parse(userdata)
      const body = {
       user_id: userdataParsed.id,
     };
      const seting = await CallApiJson('settings', 'POST',body);
      // const data = await JSON.parse(seting)
      await setUserSettings(seting)
  
    }

 const share= async ()=>{
  const ds = await getToken();
  const data = await JSON.parse(ds)

   const options={
    message:
    `📣 Hey Hey Hey!!😍😍😍 I'm Earning Real Money While Learning By Guessing english word and Playing Quiz And Spinner 📱💫 

    You and Me Will Get ${userSettings && userSettings?.data?.refer_coin} Coin
    
    Use My Referal Code  *${userInfo && userInfo?.referal_code}*  

    👉  Download Now 👉 `,
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


 useEffect(() => {
  getUserInfo()
  settings();

  return  ()=>{

  }
}, [])
  
 
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
          <Text style={styles.perReferText}> You Both Will Earn {userSettings && userSettings?.data?.refer_coin} Coins</Text>
        </View>
         
     <View style={{flexDirection:'row',marginTop:responsiveWidth(-5)}}>
     <View style={styles.container1}>
         <Text style={styles.containerText} >1</Text>
      </View>
      <View style={{marginTop:responsiveWidth(12.5)}} >
      <Text style={styles.containerMainText} >Invite Your Friends With Your Code</Text>
        <View style={{flexDirection:'row'}} >
          <View style={styles.container3SubMainText} >
          <Text style={{color:'#1f4c86',alignSelf:'center',fontWeight:500}}  >Login in Our App</Text>
          </View>
        
        </View>

      </View>
     </View>
     <View >
     <Dash style={styles.dashLine1} dashColor='#eaeaea'/>
     </View>
     <TouchableOpacity onPress={()=>{ Alert.alert('hi') } } >

            <View style={{flexDirection:'row'}}>
            <View style={styles.container2}>
                <Text style={styles.containerText} >2</Text>
              </View>
              <View style={{marginTop:responsiveWidth(1)}} >
              <Text style={styles.containerMainText} >Ask Your Friend To Apply Refer Code </Text> 
              {/* <Text style={{color:'#1f4c86'}} >50 Offers</Text> */}
                    <View style={{flexDirection:'row'}} >
                    <View style={styles.container2SubMainText} >
                    <Text style={{color:'#1f4c86',alignSelf:'center',fontWeight:500}}  >Code Apply Section</Text>
                    </View>
                    {/* <View style={{width:110,height:35,backgroundColor:'#ecf3f3',borderRadius:15,justifyContent:'center',marginTop:10}} ><Text style={{color:'#1f4c86',alignSelf:'center',fontWeight:500}}  >You gets 15.0</Text></View> */}
                    </View>
              </View>
            </View>
     </TouchableOpacity>

     <View >
     <Dash style={styles.dashLine2} dashColor='#eaeaea'/>
     </View>
     <View style={{flexDirection:'row'}}>
     <View style={styles.container3}>
         <Text style={styles.containerText} >3</Text>
      </View>
      <View >
      <Text style={styles.containerMainText} >You Will Earn Rewards of {userSettings && userSettings?.data?.refer_coin} Coins</Text>
      <View style={{flexDirection:'row'}} >
        <View style={styles.container3SubMainText} >
        <Text style={{color:'#1f4c86',alignSelf:'center',fontWeight:500}}  > Coins added In Wallet </Text>
        </View>
        
        </View>
      </View>
      
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
          {    console.log('userInfo',userInfo)}
        {userInfo && userInfo?.referal_code} 
        </Text>

        <TouchableOpacity onPress={()=>{Clipboard.setString(userInfo && userInfo?.referal_code)}} >
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
        <Icon  name="share-social" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(3) }} />
        <Text style={{color:'#fff',fontSize:responsiveFontSize(1.9)}}  >Refer & Share Now   </Text>
        </TouchableOpacity>
        </View>
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

     
    </View>

   
  )
}

export default Referral;