import { View, Text,Dimensions } from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import HomeStack from './MainStack'
import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from '../screens/Profile/index';
import CustomDrawer from '../components/customDrawer/DrawerCustom'
import EditProfile from '../screens/EditProfile/index'
import Splash from '../screens/Splash/index'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import Login from '../screens/Login/index';
import CallApi, {setToken ,CallApiJson,getToken } from '../utiles/network';
import  { AuthContext } from "../utiles/auth-context";

const Drawer = createDrawerNavigator();
const DrawerStack = () => {
  
  console.log( 'DrawerStack');
  const authCtx = useContext(AuthContext);
  const [splashShow, setSplashShow] = useState(true)
  const [userLoggedIn, setUserLogged] = useState(false)
 const [userID, setUserID] = useState()

  const getUserInfo = async ()=>{
    const ds = await getToken(  );
    const data= await JSON.parse(ds)
    // await setUserID(data.id)
    if( ds){
      // setUserLogged(true);
      authCtx.authenticate(ds);
      console.log("Token  Exist  ");

    }else{
      console.log("Token Not Set  ");

    }
     

  }

  const load = ()=>{
    getUserInfo();

    setTimeout(() => {
      setSplashShow(false)
     }, 4000);
  }
  
useEffect(() => {

  load()
  console.log(" inside useeffect   ");

}, []);

  return (
    <Drawer.Navigator initialRouteName='Splash' drawerContent={(props) => <CustomDrawer {...props}  />} screenOptions={{ headerShown: false , drawerStyle: {
      width:Dimensions.get('window').width / 1.65,
    }, }}>
   {splashShow?<Drawer.Screen name="Splash" component={Splash}/>:null}
   { !authCtx.isAuthenticated && <Drawer.Screen name='Login' component={Login} />   }
   <Drawer.Screen name="HomeStack" component={HomeStack} />
     <Drawer.Screen name='Profile' component={Profile} options={{headerShown:true}} />
    <Drawer.Screen name='EditProfile' component={EditProfile} options={{headerShown:true}}/>
  </Drawer.Navigator>
  )
}

export default DrawerStack;