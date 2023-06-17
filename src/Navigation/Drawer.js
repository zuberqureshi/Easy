import { View, Text,Dimensions } from 'react-native'
import React,{useState,useEffect} from 'react'
import HomeStack from './MainStack'
import { createDrawerNavigator } from "@react-navigation/drawer";
// import Profile from '../screens/Profile/index';
import CustomDrawer from '../components/customDrawer/DrawerCustom'
// import EditProfile from '../screens/EditProfile/index'
import Splash from '../screens/Splash/index'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

const Drawer = createDrawerNavigator();
const DrawerStack = () => {
  
  const [splashShow, setSplashShow] = useState(true)

useEffect(() => {
 setTimeout(() => {
  setSplashShow(false)
 }, 4000);
}, []);

  return (
    <Drawer.Navigator initialRouteName='Splash' drawerContent={props => <CustomDrawer {...props}/>} screenOptions={{ headerShown: false , drawerStyle: {
      width:Dimensions.get('window').width / 1.65,
    }, }}>
   {splashShow?<Drawer.Screen name="Splash" component={Splash}/>:null}
   <Drawer.Screen name="HomeStack" component={HomeStack} />
     {/* <Drawer.Screen name='Profile' component={Profile} options={{headerShown:true}} />
    <Drawer.Screen name='EditProfile' component={EditProfile} options={{headerShown:true}}/> */}
  </Drawer.Navigator>
  )
}

export default DrawerStack;