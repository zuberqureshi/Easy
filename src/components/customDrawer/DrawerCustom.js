import { View, Text, Image, FlatList, StyleSheet, Touchable, TouchableOpacity,Linking } from 'react-native'
import React, { useState,useEffect,useContext } from 'react'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import styles from './style'
import CallApi, { setToken, CallApiJson, getToken , removeToken} from '../../utiles/network';
import Share from 'react-native-share';
import  { AuthContext } from "../../utiles/auth-context";

const CustomDrawer = () => {

  const authCtx = useContext(AuthContext);

  const [selectedId, setSelectedId] = useState(null);
  const [userName, setUserName] = useState();
  const [userInfo, setuserInfo] = useState({})

  const [userCoin, setUserCoin] = useState()

  const navigation = useNavigation();
  const isFocused = useIsFocused()


  const commanImg = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  const home = '../../assets/home.png'



  const share=()=>{
    const options={
     message:'📣 Share the App with Your Friends! 📱💫 Spread the word about our app 💪💰',
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
 


  const userLogout = async ()=>{
     const ds = await removeToken();
     authCtx.logout();
     setSelectedId(null);
    navigation.navigate('Login') ;
   
   }

  const getUserInfo = async ()=>{
    const ds = await getToken(  );
    const userParseData= await JSON.parse(ds)
 
    const body = {
      user_id: userParseData.id,
    };
    const userDataApi = await CallApiJson('getprofile', 'POST', body);
    // await setUserID(data.id)
    if( ds){
      setuserInfo(userDataApi.data);
  
    }else{
 
    }
     

  }

  useEffect(() => {
    getUserInfo()
   }, [])

 

  const listArray = [
    { icon: 'home', title: 'Home' },
    { icon: 'person', title: 'Profile' },
    { icon: 'wallet', title: 'Wallet' },
    // { icon: 'share-social', title: 'Referral' },
    // { icon: 'game-controller', title: 'Quiz' },
    // { icon: 'cloud-download', title: 'Offer' },
    { icon: 'headset', title: 'Contact' },
    { icon: 'logo-whatsapp', title: 'Whatsapp Support' },
    { icon: 'share-social', title: 'Refer And Win' },
    { icon: 'share', title: 'Apply Refer Code' },

  ];

  const bottomList = [
    
    // { icon: 'person-add', title: 'Tell a friend' },
    { icon: 'exit', title: 'Sign out' },

  ];

  const Item = ({ title, icon, onPress, backgroundColor, color, iconColor, elevation }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, { backgroundColor: backgroundColor, elevation: elevation }]}>
      {/* <Image 
        style={{height:responsiveHeight(4),width:responsiveWidth(8),borderRadius:responsiveWidth(8),marginLeft:responsiveWidth(2.4)}}
         source={icon}
          /> */}
      <Icon name={icon} size={responsiveWidth(6)} color={iconColor} style={{ marginLeft: responsiveWidth(1) }} />
      <Text style={[styles.title, { color: color }]}>{title}</Text>
    </TouchableOpacity>
  );



  const renderItem = ({ item }) => {



    const backgroundColor = item.title === selectedId ? '#215295' : 'white';
    const color = item.title === selectedId ? 'white' : 'black';
    const iconColor = item.title === selectedId ? 'white' : '#215295';
    const elevation = item.title === selectedId ? responsiveWidth(1.5) : 0;

    return (<Item
      onPress={() => {
        setSelectedId(item.title)
        if( item.title==='Sign out' ) { userLogout(); }  
        else if(item.title==='Tell a friend' ){ share()}
        else if(item.title==='Whatsapp Support' ){
            let url = "whatsapp://send?text=" +
       'Hi !' +
          "&phone=91" +
          7566950472;
        Linking.openURL(url)
          .then(data => {
            console.log("WhatsApp Opened successfully " + data);  //<---Success
          })
          .catch(() => {
            alert("Make sure WhatsApp installed on your device");  //<---Error
          });
         }
        
        else
        navigation.navigate(item.title)
      }}
      title={item.title}
      icon={item.icon}
      backgroundColor={backgroundColor}
      color={color}
      iconColor={iconColor}
      elevation={elevation}
    />);
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.drawerTop}>
        <Image
          style={styles.drawerTopIcon}
          source={ require('../../assets/man.png')}
        />
        <Text style={styles.drawerTopName}> {userInfo?.name} </Text>
         
        <View style={{flexDirection:'row',marginTop:responsiveWidth(2.5),alignItems:'center'}}>
        <Image style={{width:responsiveWidth(6.2),height:responsiveHeight(3),resizeMode:'contain'}} source={require('../../assets/rupee.png')} />
        <Text style={styles.drawerTopCoin}>   {userInfo?.wallet_coins}</Text>
        </View>

      </View>
      <View style={styles.drawerMid}>
        <FlatList
          data={listArray}
          renderItem={renderItem}

        />

      </View>
      <View style={{ flex: 0.25 }}>
        <FlatList
          data={bottomList}
          renderItem={renderItem}

        />
      </View>
    </View>
  )
}

export default CustomDrawer;



