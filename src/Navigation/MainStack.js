import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import Login from '../screens/Login/index';

// import Referral from '../screens/Referral/index';
import Home from '../screens/Home/index';
import Spiner from '../screens/SpinerWheel/index'
import Quiz from '../screens/Quiz/index';
// import Offer from '../screens/Offer/index'
import Wallet from '../screens/Wallet/index';
// import Splash from '../screens/Splash/index';
import Reward from '../screens/Reward/index'
import Contact from '../screens/Contact/index';
import VideoReward from '../screens/videoAdReward';
import Youtube from '../screens/YoutubeVideo/index';
import QuizReward from '../screens/Quiz/QuizReward';

const HomeStack = createNativeStackNavigator();
const MainStack = () => {

  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
     
      {/* <HomeStack.Screen name="Login" component={Login}/> */}

      <HomeStack.Screen name="Home" component={Home} options={{headerShown:true}}/>
      <HomeStack.Screen name="Reward" component={Reward} options={{headerShown:true}}/>
      <HomeStack.Screen name="VideoReward" component={VideoReward} options={{headerShown:true}}/>
      <HomeStack.Screen name="Youtube" component={Youtube} options={{headerShown:true}}/>
      {/* <HomeStack.Screen name='Referral' component={Referral} options={{headerShown:true}} /> */}
      <HomeStack.Screen name='SpinerWheel' component={Spiner} options={{headerShown:true}} />
    <HomeStack.Screen name='Quiz' component={Quiz} options={{headerShown:true}} />
       {/*  <HomeStack.Screen name='Offer' component={Offer} options={{headerShown:true}} /> */}
      <HomeStack.Screen name='Wallet' component={Wallet} options={{headerShown:true}} /> 
      <HomeStack.Screen name='Contact' component={Contact} options={{headerShown:true}} />
      <HomeStack.Screen name='QuizReward' component={QuizReward} options={{headerShown:true}} />
      {/* <HomeStack.Screen name='Login' component={Login} /> */}
    </HomeStack.Navigator>
  )
}

export default MainStack