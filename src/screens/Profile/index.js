import React,{ useLayoutEffect,useState,useEffect} from 'react';
import {View, SafeAreaView, StyleSheet,Pressable,TouchableOpacity,Image} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style'
import CallApi, { setToken, CallApiJson, getToken } from '../../utiles/network';
import Loader from '../../components/common/loader/Loader';

const Profile = (props) => {
 

  const [userProfileData, setuserProfileData] = useState({});
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
     setLoadingStatus(false);

     setuserProfileData(profileData);
      console.log('UserProfileScreenData',profileData);
  }
  
useEffect(() => {
  console.log('userprofile',userProfileData)

  loadUserInfo();
  return  ()=>{
    console.log('return')
  }
}, [])

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={() => navigation.openDrawer()}>

          <Ionicons style={{marginLeft:responsiveWidth(3.8)}} name="menu" size={responsiveWidth(7)} color="#fff" />
        </Pressable>
      ),
     
      headerTitle: "",
      headerStyle: {
        backgroundColor: '#1f4c86'

      },
      headerRight: () =>
        (
           
          <View style={{ flexDirection: 'row' }}>
            <Ionicons onPress={()=>{navigation.navigate('Wallet')}} name="wallet" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(5)}} />
            <TouchableOpacity onPress={()=>{navigation.navigate('EditProfile')}}>
            <IconFeather  name="edit" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(7) }} />
            </TouchableOpacity>
           
          </View>
        
      ),

    });
  }, []);



  return (

    
    <SafeAreaView style={styles.container}>
   
   <Loader loadingStatus = {loadingStatus} />
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: responsiveWidth(3.5)}}>
         <Image
             source={require('../../assets/man.png')}
            // size={responsiveWidth(19.5)}
            style={{width:responsiveWidth(19),height:responsiveHeight(9.1),resizeMode:'contain'}}
         />
          <View style={{marginLeft: responsiveWidth(4.85)}}>
            <Title style={[styles.title, {
              marginTop:responsiveWidth(3.65),
              marginBottom: responsiveWidth(1.2),
            }]}>{userProfileData?.data?.name} </Title>
            <Caption style={styles.caption}>{userProfileData?.data?.email.substring(0,17)}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={responsiveWidth(5)}/>
          <Text style={{color:"#777777", marginLeft: responsiveWidth(5)}}>{ userProfileData?.data?.address ?`${userProfileData?.data?.address},${userProfileData?.data?.country}`:`Nill`}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={responsiveWidth(5)}/>
          <Text style={{color:"#777777", marginLeft:responsiveWidth(5) }}>{ userProfileData?.data?.mobile ?`${userProfileData?.data?.mobile}`:`Nill`}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={responsiveWidth(5)}/>
          <Text style={{color:"#777777", marginLeft: responsiveWidth(5)}}>{ userProfileData?.data?.email ?`${userProfileData?.data?.email}`:`Nill`}</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={ {flexDirection:'row',alignItems:'center',}}>
          <Image style={{width:responsiveWidth(8),height:responsiveHeight(4),marginRight:responsiveWidth(3),resizeMode:'contain'}} source={require('../../assets/rupee.png')} />
            <Title style={{marginRight:responsiveWidth(2),fontSize:responsiveFontSize(3)}}>{userProfileData?.data?.wallet_coins}</Title>
            <Caption style={{fontSize:responsiveFontSize(2)}} >Coins</Caption>
          </View>
      
      </View>

      <View style={styles.menuWrapper}>
      
        <TouchableRipple onPress={() => {navigation.navigate('Wallet')}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color="#1f4c86" size={responsiveWidth(6.1)}/>
            <Text style={styles.menuItemText}>Wallet</Text>
          </View>
        </TouchableRipple>
       
        {/* <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#1f4c86" size={responsiveWidth(6.1)}/>
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <IconFeather name="settings" color="#1f4c86" size={responsiveWidth(6.1)}/>
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple> */}
      </View>

   
    </SafeAreaView>
   
  );
};

export default Profile;
