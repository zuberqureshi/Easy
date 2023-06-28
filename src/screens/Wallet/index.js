import { View, Text, Image, TouchableOpacity, Modal, TextInput, TouchableHighlight,FlatList,ActivityIndicator, Alert,Keyboard  } from 'react-native'
import React from 'react'
import { useLayoutEffect, useState,useEffect } from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient'
import Loader from '../../components/common/loader/Loader';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import styles from './style'
import CallApi, { setToken, CallApiJson, getToken } from '../../utiles/network';
import moment from 'moment'
import { BannerAdSize,BannerAd,AppOpenAd, RewardedAd, RewardedAdEventType,  TestIds, AdEventType,InterstitialAd } from 'react-native-google-mobile-ads';

const adUnitId =  'ca-app-pub-5493577236373808/8452330072';
const adUnitIdrewarded =  'ca-app-pub-5493577236373808/2741101726';
const adUnitIdIntrestial  = 'ca-app-pub-5493577236373808/6488775047';
const rewarded = RewardedAd.createForAdRequest(adUnitIdrewarded );
const interstitial = InterstitialAd.createForAdRequest(adUnitIdIntrestial, { 
});
const Wallet = () => {
  



  const [coin, setCoin] = useState(0)
  const [selectedCard, setSelectedCard] = useState()
  const [selected, setSelected] = useState(false)
  const [paytmNo, setPaytmNo] = useState('')
  const [paypalId, setPaypalId] = useState('')
  const [modalPaypal, setModalPaypal] = useState(false);
  const [modalPaytm, setModalPaytm] = useState(false);
  const [modalConfirm, setModalConfim] = useState(false);
  const navigation = useNavigation();
  const [userProfileData, setuserProfileData] = useState({});


  const [withdrawHistoryData, setWithdrawHistoryData] = useState({});
  const [loadingStatus, setLoadingStatus] = useState(false)
  


  const  loadUserInfo = async () =>{
    setLoadingStatus(true);

      // const data = await JSON.parse(seting)
     const  userdata = await getToken();
     const userdataParsed = await JSON.parse(userdata)
     const body = {
      user_id: userdataParsed.id,
    };

    const profileData = await CallApiJson('getprofile', 'POST',body);

     const historyData = await CallApiJson('widrawrequestlist', 'POST',body);
   await  setuserProfileData(profileData);
     setWithdrawHistoryData(historyData);
      setLoadingStatus(false);

      console.log('Wallet data',!!userProfileData.data.mobile);
  }
  
useEffect(() => {
   loadUserInfo();

  return  ()=>{

  }
}, [])
  


useEffect(() => {
  setLoadingStatus(true)

   const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
    setLoadingStatus(false)
      rewarded.show();

  });
  const unsubscribeEarned = rewarded.addAdEventListener(
    RewardedAdEventType.EARNED_REWARD,
    reward => {
      console.log('User earned reward of ', reward);
      setLoadingStatus(false)
 
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

  const Item = ({sno,coins,amount,status,date}) => {

       
    
    var dateModified = moment(date).format('DD/MM/YYYY')


    
    return(

    <View style={{ marginTop:responsiveWidth(2.5), }} >
    <View style={{flexDirection:'row',justifyContent:'space-between',}}>
      <Text style={{color:'#fff',marginLeft:responsiveWidth(2),fontSize:responsiveFontSize(1.45)}} >{sno}</Text>
      <Text style={{color:'#fff',marginLeft:responsiveWidth(13),fontSize:responsiveFontSize(1.45)}} >{coins}</Text>
      <Text style={{color:'#fff',marginLeft:responsiveWidth(11),fontSize:responsiveFontSize(1.45)}} >{amount}</Text>
      <Text style={{color:'#fff',marginLeft:responsiveWidth(9),fontSize:responsiveFontSize(1.45)}} >{dateModified}</Text>
      <Text style={{color:status == 'SUCCESS' ? 'green':'red',fontSize:responsiveFontSize(1.45)}} >{status}</Text>
      </View> 
    </View> 
    
  )};







  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => {navigation.openDrawer()
          Keyboard.dismiss() }}>

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
          <Icon onPress={() => { navigation.navigate('Wallet') }} name="wallet" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(5) }} />
          <TouchableOpacity onPress={() => { navigation.navigate('Profile') }}>
            <Icon name="person" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(3) }} />
          </TouchableOpacity>
        </View>

      ),

    });
  }, []);


  const submitPaytm = async () => {


    if( !selectedCard  ){
      Alert.alert('Select Payout Value '); return;
    }

    if( !paytmNo  ){
      Alert.alert('Enter Your Paytm Number '); return;
    }

    if( selectedCard > userProfileData?.data?.wallet_coins  ){
      Alert.alert('Wallet Has Insufficient Coins'); return;
    }

    const body = {
      user_id: userProfileData?.data?.id,
      coin: selectedCard,
      sender_id:paytmNo,
      mode:'PAYTM'
    };
    setLoadingStatus(true);

    const widrawrequest = await CallApiJson('widrawrequest', 'POST',body);
    if(widrawrequest.error==true ){
      setLoadingStatus(false);
      Alert.alert(widrawrequest.msg); return;
    }
    console.warn('widrawrequest', widrawrequest,'body',body)
    setModalPaytm(false)
    setModalConfim(true)
    setLoadingStatus(false);

    

  }

  const openPaytmModal = async() => {


    if (! userProfileData.data.mobile ) {
      Alert.alert(' Complete Your Profile First    '); return;

    }else{
      setModalPaytm(true)  
    }


  }
  const submitPaypal = async() => {

    if (paypalId.length <3) {
      Alert.alert('Enter Paypal VaIdlue '); return;

    }

    if( !selectedCard  ){
      Alert.alert('Select Payout Value '); return;
    }

    if( selectedCard > userProfileData?.data?.wallet_coins  ){
      Alert.alert('Wallet Has Insufficient Coins'); return;
    }


    const body = {
      user_id: userProfileData?.data?.id,
      coin: selectedCard,
      sender_id:paypalId,
      mode:'PAYPAL'
    };
    setLoadingStatus(true);

    const widrawrequest = await CallApiJson('widrawrequest', 'POST',body);
    if(widrawrequest.error==true ){
      setLoadingStatus(false);
      Alert.alert(widrawrequest.msg); return;
    }
     setModalPaypal(false)
     setModalConfim(true)
  }

  return (

   
 

    <View style={{ flex: 1, backgroundColor: "#0a203e" }} >
   <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />

<Loader loadingStatus = {loadingStatus} />


      <LinearGradient colors={["#0a203e", "#1f4c86"]}
        useAngle={true}
        angle={322}
        angleCenter={{ x: 0.5, y: 0.5 }}
        style={styles.balanceLinearGradient}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
          <View style={{}}>
            <Text style={styles.balanceLinearGradientCoin} >{userProfileData?.data?.wallet_coins }</Text>
            <Text style={styles.balanceLinearGradientCoinText} >Coins</Text>
          </View>
          <Image style={styles.balanceLinearGradientImg} source={require("../../assets/coin.png")} />
        </View>
      </LinearGradient>

      <View style={{ flex: 0.7, marginHorizontal: responsiveWidth(5) }}>
        <Text style={styles.redeenTxt} >Redeem Reward Via</Text>
      
        
        <LinearGradient colors={["#0a203e", "#1f4c86"]}
          useAngle={true}
          angle={322}
          angleCenter={{ x: 0.5, y: 0.5 }}
          style={styles.paytmLinearGradient}
        
           >
        <TouchableOpacity onPress={() => { openPaytmModal() }} >
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <Image style={styles.paytmLinearGradientImg} source={require("../../assets/Paytm.png")} />

            <View>
              <Text style={styles.paytmLinearGradientMainTxt}>Paytm</Text>
              <Text style={styles.paytmLinearGradientSubTxt} >Redeem Money By Paytm</Text>
            </View>

           
              <Icon name="arrow-forward-circle" size={responsiveWidth(10)} color="#1f4c86" style={{ marginRight: responsiveWidth(3) }} />
            

          </View>
          </TouchableOpacity>
        </LinearGradient>
  

        <LinearGradient colors={["#0a203e", "#1f4c86"]}
          useAngle={true}
          angle={322}
          angleCenter={{ x: 0.5, y: 0.5 }}
          style={styles.paypalLinearGradient}>
         

         <TouchableOpacity onPress={() => { setModalPaypal(true) }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <Image style={styles.paypalLinearGradientImg} source={require("../../assets/PayPal.png")} />

            <View>
              <Text style={styles.paypalLinearGradientMainTxt}>PayPal</Text>
              <Text style={styles.paypalLinearGradientSubTxt} >Redeem Money By Paypal</Text>
            </View>

            
              <Icon name="arrow-forward-circle" size={responsiveWidth(10)} color="#1f4c86" style={{ marginRight: responsiveWidth(3) }} />
           

          </View>
          </TouchableOpacity>

        </LinearGradient>

        <Text style={[styles.redeenTxt,{marginTop:responsiveWidth(2)}]} >Withdraw History</Text>
      
        <LinearGradient colors={["#0a203e", "#1f4c86"]}
          useAngle={true}
          angle={322}
          angleCenter={{ x: 0.5, y: 0.5 }}
          style={{ 
           flex:0.7,
            borderRadius: responsiveWidth(2.45),
      height: responsiveHeight(40), 
      elevation: responsiveWidth(1.5), 
     marginTop:responsiveWidth(2),
      borderWidth: responsiveWidth(0.2),
       borderColor: '#1f4c86',
    }}>
          <View style={{marginHorizontal:responsiveWidth(4),height:responsiveWidth(65)}}>
           
          <View  style={{ flexDirection:'row',marginTop:responsiveWidth(2.5),justifyContent:'space-between'}}>
            <Text style={{color:'#fff',fontWeight:'bold' }}>S.No</Text>
            <Text style={{color:'#fff',fontWeight:'bold' }}>Coins</Text>
            <Text style={{color:'#fff',fontWeight:'bold' }}>Amount</Text>
            <Text style={{color:'#fff',fontWeight:'bold' }}>Date</Text>
            <Text style={{color:'#fff',fontWeight:'bold' }}>Status</Text>
          </View>

         
          <FlatList
        data={withdrawHistoryData.data}
        renderItem={({item}) => <Item sno={item.id} coins={item.coin} amount={item.amount} status={item.status} date={item.time}/> }
  
           /> 

          </View>

      </LinearGradient>

      </View>

      
      {/* models */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalPaypal}
        onRequestClose={() => {
          setModalPaypal(!modalPaypal);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
           <LinearGradient colors={["#0a203e", "#1f4c86"]}
                  useAngle={true}
                  angle={322}
                  angleCenter={{ x: 0.5, y: 0.5 }}
                  style={styles.modelPaypalLinearGradient}>
          {/* <View
            style={{
              backgroundColor: '#1f4c86',
              width: '90%',
              borderRadius: 10,

            }}> */}

            <View style={styles.modelPaypalTextInputCintainer}>
              <TextInput
                onChangeText={text => setPaypalId(text)}
                placeholder="Enter Your Paypal Id"
                placeholderTextColor="#fff"
                autoCorrect={false}
                value={paypalId}
                keyboardType='email-address'
                color='#fff'
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: responsiveWidth(2.45) }}>

              <TouchableHighlight onPress={() => { setSelectedCard(200) }} style={{ borderRadius: responsiveWidth(2.45) }}>
                <LinearGradient colors={["#0a203e", "#1f4c86"]}
                  useAngle={true}
                  angle={322}
                  angleCenter={{ x: 0.5, y: 0.5 }}
                  style={[styles.modelPaypalLinearGradientCard,{borderColor: selectedCard === 200 ? 'gold' : '#1f4c86',}]}>
                  <Image style={{ width: responsiveWidth(8.1), height: responsiveHeight(4),resizeMode:'contain' }} source={require("../../assets/PayPal.png")} />
                  <View style={{ width: responsiveWidth(9.5) }}>
                    <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.9), fontWeight: 500 }} >200</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <IconFontAwesome name="rupee" size={responsiveWidth(3.5)} color="#fff" style={{ marginRight: responsiveWidth(1) }} />
                      <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8) }} >20</Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableHighlight>


              <TouchableHighlight onPress={() => { setSelectedCard(1000) }} style={{ borderRadius: responsiveWidth(2.45) }}>
                <LinearGradient colors={["#0a203e", "#1f4c86"]}
                  useAngle={true}
                  angle={322}
                  angleCenter={{ x: 0.5, y: 0.5 }}
                  style={[styles.modelPaypalLinearGradientCard,{borderColor: selectedCard === 100 ? 'gold' : '#1f4c86',}]}>
                  <Image style={{ width:responsiveWidth(8.1), height: responsiveHeight(4),resizeMode:'contain' }} source={require("../../assets/PayPal.png")} />
                  <View style={{ width: responsiveWidth(9.5)  }}>
                    <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.9), fontWeight: 500 }} >1000</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <IconFontAwesome name="rupee" size={responsiveWidth(3.5)} color="#fff" style={{ marginRight: responsiveWidth(1) }} />
                      <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8) }} >100</Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableHighlight>


              <TouchableHighlight onPress={() => { setSelectedCard(2000) }} style={{ borderRadius: responsiveWidth(2.45) }}>
                <LinearGradient colors={["#0a203e", "#1f4c86"]}
                  useAngle={true}
                  angle={322}
                  angleCenter={{ x: 0.5, y: 0.5 }}
                  style={[styles.modelPaypalLinearGradientCard,{borderColor: selectedCard === 2000 ? 'gold' : '#1f4c86',}]}>
                  <Image style={{  width:responsiveWidth(8.1), height: responsiveHeight(4),resizeMode:'contain'  }} source={require("../../assets/PayPal.png")} />
                  <View style={{ width: responsiveWidth(9.5) }}>
                    <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.9), fontWeight: 500 }} >2000</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <IconFontAwesome name="rupee" size={responsiveWidth(3.5)} color="#fff" style={{ marginRight: responsiveWidth(1) }} />
                      <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8) }} >200</Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableHighlight>
            </View>


            <View style={{ flexDirection: 'row', alignSelf: 'center' }} >
              <TouchableOpacity
                style={styles.modelPaypalSubmitButton}

                onPress={() => {
                  submitPaypal()

                 
                  // setModalPaypal(!modalPaypal);
                  // // navigation.navigate('Home')
                  // reset()
                }}>
                <Text style={styles.modelPaypalSubmitButtonTxet}>Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modelPaypalCloseButton}

                onPress={() => {
                  setSelectedCard()
                  setPaypalId()
                  setModalPaypal(!modalPaypal);
                  // // navigation.navigate('Home')
                  // reset()
                }}>
                <Text style={styles.modelPaypalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
            </LinearGradient>
          {/* </View> */}
        </View>
      </Modal>


      {/* paytm Model */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalPaytm}
        onRequestClose={() => {
          setModalPaytm(!modalPaytm);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
             <LinearGradient colors={["#0a203e", "#1f4c86"]}
                  useAngle={true}
                  angle={322}
                  angleCenter={{ x: 0.5, y: 0.5 }}
                  style={styles.modelPaytmLinearGradient}>
          {/* <View
            style={{
              backgroundColor: '#1f4c86',
              width: '90%',
              borderRadius: 10
            }}> */}
            

         <View style={styles.modelPaytmTextInputCintainer}>
              <TextInput
                placeholder="Enter Your UPI ID  "
                placeholderTextColor="#fff"
                autoCorrect={false}
                keyboardType='number-pad'
                onChangeText={text => setPaytmNo(text)}
                value={paytmNo}
                color='#fff'
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: responsiveWidth(2.45) }}>

              <TouchableHighlight onPress={() => { setSelectedCard(200) }} style={{ borderRadius: responsiveWidth(2.45) }}>

                <LinearGradient colors={["#0a203e", "#1f4c86"]}
                  useAngle={true}
                  angle={322}
                  angleCenter={{ x: 0.5, y: 0.5 }}
                  style={[styles.modelPaytmLinearGradientCard,{borderColor: selectedCard === 200 ? 'gold' : '#1f4c86',}]}>
                  <Image style={{ width: responsiveWidth(8), height: responsiveHeight(4.8),resizeMode:'contain' }} source={require("../../assets/Paytm.png")} />
                  <View style={{ width: responsiveWidth(9.5) }}>
                    <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.9), fontWeight: 500 }} >200</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <IconFontAwesome name="rupee" size={responsiveWidth(3.5)} color="#fff" style={{ marginRight: responsiveWidth(1) }} />
                      <Text style={{ color: "#fff", fontSize:  responsiveFontSize(1.8) }} >20</Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableHighlight>

              <TouchableHighlight onPress={() => { setSelectedCard(1000) }} style={{ borderRadius: 10 }}>
                <LinearGradient colors={["#0a203e", "#1f4c86"]}
                  useAngle={true}
                  angle={322}
                  angleCenter={{ x: 0.5, y: 0.5 }}
                  style={[styles.modelPaytmLinearGradientCard,{borderColor: selectedCard === 1000 ? 'gold' : '#1f4c86',}]}>
                  <Image style={{ width: responsiveWidth(8), height: responsiveHeight(4.8),resizeMode:'contain'  }} source={require("../../assets/Paytm.png")} />
                  <View style={{  width: responsiveWidth(9.5) }}>
                    <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.9), fontWeight: 500 }} >1000</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <IconFontAwesome name="rupee" size={responsiveWidth(3.5)} color="#fff" style={{ marginRight: responsiveWidth(1) }} />
                      <Text style={{ color: "#fff", fontSize:  responsiveFontSize(1.8) }} >100</Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableHighlight>

              <TouchableHighlight onPress={() => { setSelectedCard(2000) }} style={{ borderRadius: 10 }}>
                <LinearGradient colors={["#0a203e", "#1f4c86"]}
                  useAngle={true}
                  angle={322}
                  angleCenter={{ x: 0.5, y: 0.5 }}
                  style={[styles.modelPaytmLinearGradientCard,{borderColor: selectedCard === 2000 ? 'gold' : '#1f4c86',}]}>

                  <Image style={{ width: responsiveWidth(8), height: responsiveHeight(4.8),resizeMode:'contain' }} source={require("../../assets/Paytm.png")} />

                  <View style={{  width: responsiveWidth(9.5)}}>
                    <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.9), fontWeight: 500 }} >2000</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <IconFontAwesome name="rupee" size={responsiveWidth(3.5)} color="#fff" style={{ marginRight: responsiveWidth(1) }} />
                      <Text style={{ color: "#fff",fontSize:  responsiveFontSize(1.8) }} >200</Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableHighlight>


            </View>




            <View style={{ flexDirection: 'row', alignSelf: 'center' }} >
              <TouchableOpacity
                style={styles.modelPaypalSubmitButton}

                onPress={() => {
                  if ((paytmNo.length) != 10  ) {
                    submitPaytm()
                  }else{
                    Alert.alert('Paytm Mobile number is mandatory ');
                  }
                  // setModalPaypal(!modalPaytm);
                  // // navigation.navigate('Home')
                  // reset()
                }}>
                <Text style={styles.modelPaypalSubmitButtonTxet}>Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modelPaypalCloseButton}

                onPress={() => {
                  setSelectedCard()
                  setPaytmNo('')
                  setModalPaytm(!modalPaytm);
                  // // navigation.navigate('Home')
                  // reset()
                }}>
                <Text style={styles.modelPaypalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View> 
            

            {/* <View>
             <View style={{alignSelf:'center',marginTop:responsiveWidth(3)}}>
             <Text style={{color:'red',alignSelf:'center',fontSize:responsiveFontSize(2.1)}}>ALERT</Text>
              <Text style={{color:'#fff'}}>Please Complete Your Details</Text>
              <Text style={{color:'#fff'}}>Add Your Whatsapp Number</Text>
              </View>
             <TouchableOpacity
                style={styles.modelPaypalCloseButton}

                onPress={() => {
               
                  setModalPaytm(!modalPaytm);
                  // // navigation.navigate('Home')
                  // reset()
                }}>
                <Text style={styles.modelPaypalCloseButtonText}>Close</Text>
              </TouchableOpacity>
             </View> */}
            
            </LinearGradient>
          {/* </View> */}
        </View>
      </Modal>

      {/* Success model */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalConfirm}
        onRequestClose={() => {
          setModalPaytm(!modalConfirm);
        }}>
   
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,.5)',
            justifyContent: 'center',
            alignItems: 'center',
           
          }}>
          <LinearGradient colors={["#0a203e", "#1f4c86"]}
                  useAngle={true}
                  angle={322}
                  angleCenter={{ x: 0.5, y: 0.5 }}
                  style={styles.successModel}>
          {/* <View
            style={{
              backgroundColor: '#1f4c86',
              width: '65%',
              borderRadius: 10,
              
              alignItems: 'center',
              height:200,
              justifyContent: 'center',
            }}> */}
            <View>
            <TouchableOpacity onPress={()=>{setModalConfim(!modalConfirm)}} >
            <Icon name="close" size={responsiveWidth(5.5)} color="#fff" style={{position:'absolute',right:responsiveWidth(-2.45),marginTop:responsiveWidth(1.25)}} />
            </TouchableOpacity>
            <Text style={styles.successModelText}>Amount Redeem Successful</Text>
         
            </View>
            

            <Image style={{ width: responsiveWidth(43.7), height: responsiveHeight(14),resizeMode:'contain' }} source={require("../../assets/greentick.gif")} />
            





          {/* </View> */}
          </LinearGradient>
        

        </View>
        
      </Modal>
      <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  

    </View>

    

 
  )
}

export default Wallet;