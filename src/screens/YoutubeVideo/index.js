import { View, Text, Button, Pressable, SafeAreaView, ScrollView, Image, TouchableOpacity, Modal, TouchableHighlight, ToastAndroid, StyleSheet } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient'
import Loader from '../../components/common/loader/Loader';
import CallApi, { setToken, CallApiJson, getToken } from '../../utiles/network';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import YoutubePlayer from "react-native-youtube-iframe";
import { BannerAdSize,BannerAd,AppOpenAd, RewardedAd, RewardedAdEventType,  TestIds, AdEventType,InterstitialAd } from 'react-native-google-mobile-ads';
const adUnitId =   'ca-app-pub-2291791121050290/1352844929';
const adUnitIdrewarded =    'ca-app-pub-2291791121050290/6625314913';

const rewarded = RewardedAd.createForAdRequest(adUnitIdrewarded );


const Youtube = ({ route }) => {

    const { videoId } = route.params;
    const navigation = useNavigation();
    const [loadingStatus, setLoadingStatus] = useState(false)





    useEffect(() => {
        setLoadingStatus(true)
      
         const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
            setLoadingStatus(false)
            rewarded.show();

      
        });
        const unsubscribeEarned = rewarded.addAdEventListener(
          RewardedAdEventType.EARNED_REWARD,
          reward => {
             setLoadingStatus(false)
       
          },
        );
       
        // Start loading the rewarded ad straight away
        rewarded.load();
      
        // Unsubscribe from events on unmount
        return () => {
            setLoadingStatus(false)
          unsubscribeLoaded();
          unsubscribeEarned();
        };
      }, []);



    //  Header start
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

    //  Header End

    return (
        <View style={{ flex: 1, backgroundColor: "#0a203e",}} >
            <Loader loadingStatus = {loadingStatus} />

   <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
            <LinearGradient colors={["#0a203e", "#1f4c86"]}
                useAngle={true}
                angle={322}
                angleCenter={{ x: 0.5, y: 0.5 }}
                style={{
                    flex: 0.65,
                    borderRadius: responsiveWidth(2.5),
                  
                    elevation: responsiveWidth(1.5),
                    marginHorizontal: responsiveWidth(5),
                    borderWidth: responsiveWidth(0.2),
                    borderColor: '#1f4c86',
                    marginTop: responsiveWidth(30)


                }}>

                
            <Text style={{color:'#fff',fontSize:responsiveFontSize(2.1),marginHorizontal:responsiveWidth(5),marginTop:responsiveWidth(6),fontWeight:'bold'}}>Earn Money By Watch Video</Text>
                <View style={{ justifyContent: 'center', alignItems: 'center',marginTop:responsiveWidth(10)}} >
                
                
                  
               

                        <YoutubePlayer
                            style={{}}
                            width={responsiveWidth(85)}
                            height={responsiveHeight(23.5)}
                            play={true}
                            videoId={videoId}
                        // onChangeState={onStateChange}
                        />
                   

                    <TouchableOpacity
                        style={{

                            height: responsiveHeight(7),
                    padding: responsiveWidth(2.5),
                    width:responsiveWidth(60),
                    borderRadius: responsiveWidth(2.5),
                    marginTop: responsiveWidth(8),
                    // marginBottom: responsiveWidth(5),
                    backgroundColor: '#0a203e',
                    color: '#fff',
                    elevation: responsiveWidth(1.2),
                    justifyContent:'center',
                    alignItems:'center'
                        }}

                        onPress={() => {



                        }}>
                        <Text style={{ color: '#fff', paddingHorizontal: responsiveWidth(4.4), letterSpacing: responsiveFontSize(0.095) }}>Click Here Go To Home</Text>
                    </TouchableOpacity>

                

                </View>



            </LinearGradient>




        </View>


    )
}

export default Youtube;

const styles = StyleSheet.create({


})