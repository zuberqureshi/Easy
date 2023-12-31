import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, TextInput, Pressable, KeyboardAvoidingView, ScrollView, SafeAreaView ,ToastAndroid,Keyboard, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';

import  FormSchema from '../../utiles/FormSchema';
import styles from './style'

import CallApi, { setToken, CallApiJson, getToken } from '../../utiles/network';
import Loader from '../../components/common/loader/Loader';
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
   const INTERSTITIAL_AD_UNIT_ID = Platform.select({
    android: '8fba0df7d5246704',
   });
   const MREC_AD_UNIT_ID = Platform.select({
    android: '01d673b7684c023e'
  });
  //applovin


const EditProfileScreen = () => {


    const navigation = useNavigation();
    const [loadingStatus, setLoadingStatus] = useState(false)
    const [userProfileData, setuserProfileData] = useState({});
    const [image, setImage] = useState('https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
    // const [formikValues, setFormikValues] = useState({ name: '' ,age: '', phone: '', email: '', country: '', address: '' })

    const loadUserInfo = async () => {
        setLoadingStatus(true);

        // const data = await JSON.parse(seting)
        const userdata = await getToken();
        const userdataParsed = await JSON.parse(userdata)
        const body = {
            user_id: userdataParsed.id,
        };

        const profileData = await CallApiJson('getprofile', 'POST', body);
        setuserProfileData(profileData);
        // setFormikValues({name:'hhhg'})
        setLoadingStatus(false);

        console.log('EditProfileScreenData', profileData);
    }

    useEffect(() => {
        console.log('insideeditprofile', userProfileData)

        loadUserInfo();
        return () => {
            console.log('return')
        }
    }, [])


 

//applovin 
useEffect(() => {

    //intrestial
    AppLovinMAX.loadInterstitial(INTERSTITIAL_AD_UNIT_ID);
    const appLovinIntrestial = AppLovinMAX.addInterstitialLoadedEventListener( async () => {
      // Interstitial ad is ready to show. AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID) now returns 'true'
      const isInterstitialReady =  await AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID);
      if (isInterstitialReady) {
        setclaimButton(false);
        setbuttonDisableTrue(false);
     // AppLovinMAX.showInterstitial(INTERSTITIAL_AD_UNIT_ID);
       
      }
    });
    // rewarded
    AppLovinMAX.loadRewardedAd(REWARDED_AD_UNIT_ID);
    const appLovinRewarded =   AppLovinMAX.addRewardedAdLoadedEventListener( async () => {
      const isRewardedAdReady = await AppLovinMAX.isRewardedAdReady(REWARDED_AD_UNIT_ID);
  if (isRewardedAdReady) {
   AppLovinMAX.showRewardedAd(REWARDED_AD_UNIT_ID);
  }
    });
    //rewarded
  
  
   
     return () => { 
    
  
     }
  
  }, []);

  
const showApplovinIntrestial = async ()=>{
    const isInterstitialReady =  await AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID);
    if (isInterstitialReady) {
          AppLovinMAX.showInterstitial(INTERSTITIAL_AD_UNIT_ID);
          return true;
    }else{
      return false;
    }
  }
   
  
  const showApplovinRewarded =()=>{
    AppLovinMAX.showRewardedAd(REWARDED_AD_UNIT_ID);
  }
   

  //applovin 
  


    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Pressable onPress={() => {navigation.openDrawer()
                   Keyboard.dismiss()  }}>

                    <Ionicons style={{ marginLeft: responsiveWidth(3.8) }} name="menu" size={responsiveWidth(7)} color="#fff" />
                </Pressable>
            ),

            headerTitle: "",
            headerStyle: {
                backgroundColor: '#1f4c86'

            },
            headerRight: () =>
            (

                <View style={{ flexDirection: 'row' }}>
                    <Ionicons onPress={() => { navigation.navigate('Wallet') }} name="wallet" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(5) }} />
                    {/* <IconFeather onPress={()=>{navigation.navigate('EditProfile')}} name="edit" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(7) }} /> */}
                </View>

            ),

        });
    }, []);

    //toast
    const showToast = (msg) => {
        ToastAndroid.show(`${msg}`, ToastAndroid.SHORT);
      };

    //upadte profile

    const updateProfile = async(country,address,name,mobile) =>{

        await showApplovinIntrestial();
        const body = {
            user_id: userProfileData?.data?.id,
            country: country,
            address:address,
            name: name,
            mobile:mobile
        };

        const profileData = await CallApiJson('profileupdate', 'POST', body);

        console.log("updae Profile Success",profileData.msg)

        Alert.alert(profileData.msg)
        showToast(profileData.msg)
        

    }





    return (
        <SafeAreaView style={styles.container}>
            <Loader loadingStatus={loadingStatus} />

            <KeyboardAvoidingView behavior='height'>
                <ScrollView>

                    <View style={styles.container}>

                        <View style={{
                            margin: responsiveWidth(7.3),

                        }}>
                            <View style={{ alignItems: 'center' }}>

                                <View
                                    style={{
                                        height: responsiveHeight(11.85),
                                        width: responsiveWidth(24),      //problem
                                        borderRadius: responsiveWidth(3.5),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <ImageBackground
                                        source={require('../../assets/man.png')}
                                        style={{ height: responsiveHeight(11.85), width: responsiveWidth(24.5) }}
                                        imageStyle={{ borderRadius: responsiveWidth(3.5),resizeMode:'contain' }}>

                                    </ImageBackground>
                                </View>

                                <Text style={{ marginTop: responsiveWidth(2.5), fontSize: responsiveFontSize(2.15), fontWeight: 'bold' }}>
                                    Profile Details
                                    {console.log('profileDataDetails', userProfileData)}
                                    {console.log('profileDataDetailscodedata', userProfileData)}
                                </Text>
                            </View>

                            {/* use formik   */}
                            <Formik
                             enableReinitialize={true}
                                initialValues={{ name: userProfileData?.data?.name ? userProfileData?.data?.name : "", mobile: userProfileData?.data?.mobile ? userProfileData?.data?.mobile : "", email: userProfileData?.data?.email ? userProfileData?.data?.email : "", country:userProfileData?.data?.country ? userProfileData?.data?.country : "", address: userProfileData?.data?.address ? userProfileData?.data?.address : "" }}
                                validationSchema={FormSchema}
                                onSubmit={(values, action) => {

                                 
                                    updateProfile(values.country,values.address,values.name,values.mobile)

                                    console.warn('updateProfile',values);
                                    action.resetForm()
                                    loadUserInfo();
                                    
                                }
                                }
                            >
                                {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (


                                    <View>
                                        <View style={styles.action}>
                                            <FontAwesome name="user-o" size={responsiveWidth(5)} />
                                            <TextInput
                                                onChangeText={handleChange('name')}
                                                onBlur={handleBlur('name')}
                                                value={values.name}
                                                placeholder={ 'Enter Your Name'}
                                                placeholderTextColor="#666666"
                                                autoCorrect={false}
                                                style={[
                                                    styles.textInput
                                                ]}
                                            />
                                            { (errors.name && touched.name) ? <Text style={{color:'red'}}>{errors.name}</Text>:null}
                                        </View>



                                        {/* <View style={styles.action}>
                                <FontAwesome name="user-o" size={responsiveWidth(5)} />
                                <TextInput
                                 onChangeText={handleChange('lastname')}
                                    onBlur={handleBlur('lastname')}
                                    value={values.lastname}
                                    placeholder="Last Name"
                                    placeholderTextColor="#666666"
                                    autoCorrect={false}
                                    style={[
                                        styles.textInput
                                    ]}
                                />
                            </View> */}


                                        {/* <View style={styles.action}>
                                <FontAwesome name="user-o" size={responsiveWidth(5)} />
                                <TextInput
                                 onChangeText={handleChange('age')}
                                    onBlur={handleBlur('age')}
                                    value={userProfileData?.data?.age}
                                    placeholder="Age"
                                    placeholderTextColor="#666666"
                                    autoCorrect={false}
                                    style={[
                                        styles.textInput
                                    ]}
                                />
                            </View> */}


                                        <View style={styles.action}>
                                            <Feather name="phone" size={responsiveWidth(5)} />
                                            <TextInput
                                                onChangeText={handleChange('mobile')}
                                                onBlur={handleBlur('mobile')}
                                                value={values.mobile}
                                                placeholder={'Enter Mobile Number ( Whatsapp) '}
                                                placeholderTextColor="#666666"
                                                keyboardType="number-pad"
                                                autoCorrect={false}
                                                style={[
                                                    styles.textInput
                                                ]}
                                            />
                                                { (errors.mobile && touched.mobile) ? <Text style={{color:'red'}}>{errors.mobile}</Text>:null}
                                        </View>


                                        <View style={styles.action}>
                                            <FontAwesome name="envelope-o" size={responsiveWidth(5)} />
                                            <TextInput
                                                onChangeText={handleChange('email')}
                                                onBlur={handleBlur('email')}
                                                value={values.email}
                                                placeholder={'Enter Your Email'}
                                                placeholderTextColor="#666666"
                                                keyboardType="email-address"
                                                autoCorrect={false}
                                                style={[
                                                    styles.textInput

                                                ]}
                                                editable={false}
                                            />
                                        </View>


                                        <View style={styles.action}>
                                            <Icon name="map-marker-outline" size={responsiveWidth(5)} />
                                            <TextInput
                                                onChangeText={handleChange('address')}
                                                onBlur={handleBlur('address')}
                                                value={values.address}
                                                placeholder={'Enter Your Address'}
                                                placeholderTextColor="#666666"
                                                autoCorrect={false}
                                                style={[
                                                    styles.textInput
                                                ]}
                                            />
                                                { (errors.address && touched.address) ? <Text style={{color:'red'}}>{errors.address}</Text>:null}
                                        </View>


                                        <View style={styles.action}>
                                            <FontAwesome name="globe" size={responsiveWidth(5)} />
                                            <TextInput
                                                onChangeText={handleChange('country')}
                                                onBlur={handleBlur('country')}
                                                value={values.country}
                                                placeholder={'Enter Your Country'}
                                                placeholderTextColor="#666666"
                                                autoCorrect={false}
                                                style={[
                                                    styles.textInput

                                                ]}
                                            />
                                                { (errors.country && touched.country) ? <Text style={{color:'red'}}>{errors.country}</Text>:null}
                                        </View>

                                        <TouchableOpacity disabled={!isValid} style={styles.commandButton} onPress={handleSubmit}>
                                            <Text style={styles.panelButtonTitle}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </Formik>


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
                </ScrollView>
            </KeyboardAvoidingView>


        </SafeAreaView>
    );
};

export default EditProfileScreen;