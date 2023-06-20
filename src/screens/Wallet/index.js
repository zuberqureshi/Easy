import { View, Text, Image, TouchableOpacity, Modal, TextInput, TouchableHighlight } from 'react-native'
import React from 'react'
import { useLayoutEffect, useState } from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import styles from './style'


const Wallet = () => {


  const [coin, setCoin] = useState(5660)
  const [selectedCard, setSelectedCard] = useState()
  const [selected, setSelected] = useState(false)
  const [paytmNo, setPaytmNo] = useState('')
  const [paypalId, setPaypalId] = useState('')
  const [modalPaypal, setModalPaypal] = useState(false);
  const [modalPaytm, setModalPaytm] = useState(false);
  const [modalConfirm, setModalConfim] = useState(false);
  const navigation = useNavigation();



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
          <Icon onPress={() => { navigation.navigate('Wallet') }} name="wallet" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(5) }} />
          <TouchableOpacity onPress={() => { navigation.navigate('Profile') }}>
            <Icon name="person" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(3) }} />
          </TouchableOpacity>
        </View>

      ),

    });
  }, []);


  const submitPaytm = () => {

    // console.warn(paytmNo, selectedCard)
    setModalPaytm(false)
    setModalConfim(true)
    

  }

  const submitPaypal = () => {

    console.warn(paypalId, selectedCard)
     setModalPaypal(false)
     setModalConfim(true)
  }

  return (

   
 

    <View style={{ flex: 1, backgroundColor: "#0a203e" }} >



      <LinearGradient colors={["#0a203e", "#1f4c86"]}
        useAngle={true}
        angle={322}
        angleCenter={{ x: 0.5, y: 0.5 }}
        style={styles.balanceLinearGradient}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
          <View style={{}}>
            <Text style={styles.balanceLinearGradientCoin} >{coin}</Text>
            <Text style={styles.balanceLinearGradientCoinText} >Coins</Text>
          </View>
          <Image style={styles.balanceLinearGradientImg} source={require("../../assets/coin.png")} />
        </View>
      </LinearGradient>

      <View style={{ flex: 0.8, marginHorizontal: responsiveWidth(5) }}>
        <Text style={styles.redeenTxt} >Redeem Reward Via</Text>

        <LinearGradient colors={["#0a203e", "#1f4c86"]}
          useAngle={true}
          angle={322}
          angleCenter={{ x: 0.5, y: 0.5 }}
          style={styles.paytmLinearGradient}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <Image style={styles.paytmLinearGradientImg} source={require("../../assets/Paytm.png")} />

            <View>
              <Text style={styles.paytmLinearGradientMainTxt}>Paytm</Text>
              <Text style={styles.paytmLinearGradientSubTxt} >Redeem Money on Paytm</Text>
            </View>

            <TouchableOpacity onPress={() => { setModalPaytm(true) }} >
              <Icon name="arrow-forward-circle" size={responsiveWidth(10)} color="#1f4c86" style={{ marginRight: responsiveWidth(3) }} />
            </TouchableOpacity>

          </View>

        </LinearGradient>

        <LinearGradient colors={["#0a203e", "#1f4c86"]}
          useAngle={true}
          angle={322}
          angleCenter={{ x: 0.5, y: 0.5 }}
          style={styles.paypalLinearGradient}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <Image style={styles.paypalLinearGradientImg} source={require("../../assets/PayPal.png")} />

            <View>
              <Text style={styles.paypalLinearGradientMainTxt}>PayPal</Text>
              <Text style={styles.paypalLinearGradientSubTxt} >Redeem Money on Paypal</Text>
            </View>

            <TouchableOpacity onPress={() => { setModalPaypal(true) }}>
              <Icon name="arrow-forward-circle" size={responsiveWidth(10)} color="#1f4c86" style={{ marginRight: responsiveWidth(3) }} />
            </TouchableOpacity>

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

              <TouchableHighlight onPress={() => { setSelectedCard(100) }} style={{ borderRadius: responsiveWidth(2.45) }}>
                <LinearGradient colors={["#0a203e", "#1f4c86"]}
                  useAngle={true}
                  angle={322}
                  angleCenter={{ x: 0.5, y: 0.5 }}
                  style={[styles.modelPaypalLinearGradientCard,{borderColor: selectedCard === 100 ? 'gold' : '#1f4c86',}]}>
                  <Image style={{ width: responsiveWidth(8.1), height: responsiveHeight(4) }} source={require("../../assets/PayPal.png")} />
                  <View style={{ width: responsiveWidth(9.5) }}>
                    <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.9), fontWeight: 500 }} >100</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <IconFontAwesome name="rupee" size={responsiveWidth(3.5)} color="#fff" style={{ marginRight: responsiveWidth(1) }} />
                      <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8) }} >50</Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableHighlight>


              <TouchableHighlight onPress={() => { setSelectedCard(500) }} style={{ borderRadius: responsiveWidth(2.45) }}>
                <LinearGradient colors={["#0a203e", "#1f4c86"]}
                  useAngle={true}
                  angle={322}
                  angleCenter={{ x: 0.5, y: 0.5 }}
                  style={[styles.modelPaypalLinearGradientCard,{borderColor: selectedCard === 500 ? 'gold' : '#1f4c86',}]}>
                  <Image style={{ width:responsiveWidth(8.1), height: responsiveHeight(4) }} source={require("../../assets/PayPal.png")} />
                  <View style={{ width: responsiveWidth(9.5)  }}>
                    <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.9), fontWeight: 500 }} >500</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <IconFontAwesome name="rupee" size={responsiveWidth(3.5)} color="#fff" style={{ marginRight: responsiveWidth(1) }} />
                      <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8) }} >1000</Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableHighlight>


              <TouchableHighlight onPress={() => { setSelectedCard(1000) }} style={{ borderRadius: responsiveWidth(2.45) }}>
                <LinearGradient colors={["#0a203e", "#1f4c86"]}
                  useAngle={true}
                  angle={322}
                  angleCenter={{ x: 0.5, y: 0.5 }}
                  style={[styles.modelPaypalLinearGradientCard,{borderColor: selectedCard === 1000 ? 'gold' : '#1f4c86',}]}>
                  <Image style={{  width:responsiveWidth(8.1), height: responsiveHeight(4)  }} source={require("../../assets/PayPal.png")} />
                  <View style={{ width: responsiveWidth(9.5) }}>
                    <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.9), fontWeight: 500 }} >1000</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <IconFontAwesome name="rupee" size={responsiveWidth(3.5)} color="#fff" style={{ marginRight: responsiveWidth(1) }} />
                      <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.8) }} >50</Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableHighlight>
            </View>


            <View style={{ flexDirection: 'row', alignSelf: 'center' }} >
              <TouchableOpacity
                style={styles.modelPaypalSubmitButton}

                onPress={() => {

                  if (selectedCard != null) {
                    submitPaypal()
                  }
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
                placeholder="Enter Your Paytm Number"
                placeholderTextColor="#fff"
                autoCorrect={false}
                keyboardType='number-pad'
                onChangeText={text => setPaytmNo(text)}
                value={paytmNo}
                color='#fff'
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: responsiveWidth(2.45) }}>

              <TouchableHighlight onPress={() => { setSelectedCard(100) }} style={{ borderRadius: responsiveWidth(2.45) }}>

                <LinearGradient colors={["#0a203e", "#1f4c86"]}
                  useAngle={true}
                  angle={322}
                  angleCenter={{ x: 0.5, y: 0.5 }}
                  style={[styles.modelPaytmLinearGradientCard,{borderColor: selectedCard === 100 ? 'gold' : '#1f4c86',}]}>
                  <Image style={{ width: responsiveWidth(8), height: responsiveHeight(4.8) }} source={require("../../assets/Paytm.png")} />
                  <View style={{ width: responsiveWidth(9.5) }}>
                    <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.9), fontWeight: 500 }} >100</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <IconFontAwesome name="rupee" size={responsiveWidth(3.5)} color="#fff" style={{ marginRight: responsiveWidth(1) }} />
                      <Text style={{ color: "#fff", fontSize:  responsiveFontSize(1.8) }} >50</Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableHighlight>

              <TouchableHighlight onPress={() => { setSelectedCard(500) }} style={{ borderRadius: 10 }}>
                <LinearGradient colors={["#0a203e", "#1f4c86"]}
                  useAngle={true}
                  angle={322}
                  angleCenter={{ x: 0.5, y: 0.5 }}
                  style={[styles.modelPaytmLinearGradientCard,{borderColor: selectedCard === 500 ? 'gold' : '#1f4c86',}]}>
                  <Image style={{ width: responsiveWidth(8), height: responsiveHeight(4.8)  }} source={require("../../assets/Paytm.png")} />
                  <View style={{  width: responsiveWidth(9.5) }}>
                    <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.9), fontWeight: 500 }} >500</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <IconFontAwesome name="rupee" size={responsiveWidth(3.5)} color="#fff" style={{ marginRight: responsiveWidth(1) }} />
                      <Text style={{ color: "#fff", fontSize:  responsiveFontSize(1.8) }} >100</Text>
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

                  <Image style={{ width: responsiveWidth(8), height: responsiveHeight(4.8) }} source={require("../../assets/Paytm.png")} />

                  <View style={{  width: responsiveWidth(9.5)}}>
                    <Text style={{ color: "#fff", fontSize: responsiveFontSize(1.9), fontWeight: 500 }} >1000</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <IconFontAwesome name="rupee" size={responsiveWidth(3.5)} color="#fff" style={{ marginRight: responsiveWidth(1) }} />
                      <Text style={{ color: "#fff",fontSize:  responsiveFontSize(1.8) }} >50</Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableHighlight>


            </View>




            <View style={{ flexDirection: 'row', alignSelf: 'center' }} >
              <TouchableOpacity
                style={styles.modelPaypalSubmitButton}

                onPress={() => {
                  if ((paytmNo.length) == 10 && selectedCard != null) {
                    submitPaytm()
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
            

            <Image style={{ width: responsiveWidth(43.7), height: responsiveHeight(14) }} source={require("../../assets/greentick.gif")} />
            





          {/* </View> */}
          </LinearGradient>
        </View>
       
      </Modal>




    </View>

 
  )
}

export default Wallet;