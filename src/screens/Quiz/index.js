import { View, Text,FlatList,TouchableOpacity,onPress,Modal, Alert } from 'react-native'
import React,{useRef,useState,useLayoutEffect,useEffect,useContext} from 'react'
import {quizdata} from './QuizData'
import {windowHeight,windowWidth} from '../../utiles/Dimensions'
import Questions from './Questions'
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import LinearGradient from 'react-native-linear-gradient'
import styles from './style'
import CallApi, { setToken, CallApiJson, getToken } from '../../utiles/network';
import Loader from '../../components/common/loader/Loader';
 import AppLovinMAX from  "react-native-applovin-max";
 import RenderHtml from 'react-native-render-html';


//applovin

AppLovinMAX.initialize("WbvV2RHHbEGVC_s0Od_B0cZoG97sxIom919586O4G_eOin_W3n6ef2WdHqlug5t5IG_ZSo2D6VGE11RWPocUqk").then(configuration => {
  // SDK is initialized, start loading ads
  AppLovinMAX.setVerboseLogging(true);

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
//applovin


import  { AuthContext } from "../../utiles/auth-context";
const Quiz = ({route}) => {
    // alert(JSON.stringify(quizdata[1].question))

    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(1);
    const [questions, setQuestions] = useState([]);
     const listRef = useRef();
    const [modalVisible, setModalVisible] = useState(false);
    const authCtx = useContext(AuthContext);
    const [loadingStatus, setLoadingStatus] = useState(false)

const [apiQues, setApiQues] = useState({})
    
  const  loadUserInfo = async () =>{
      // const data = await JSON.parse(seting)
      setLoadingStatus(true)
     const  userdata = await getToken();
     const userdataParsed = await JSON.parse(userdata)
     const body = {
      user_id: userdataParsed.id,
      category:route.params.category
    };

     const questionData = await CallApiJson('gkquestion', 'POST',body);
    //  setLoadingStatus(false);
    if( !questionData.questions ){
      Alert.alert('No Questions on Server , Please Try Again ');
      return;
    }
       await setApiQues(questionData)
       await setQuestions(questionData?.questions)
    //  setuserProfileData(profileData);
       setLoadingStatus(false)
  }
 
  
    //Get User checkGameEligiblility
    const checkGameEligiblility = async () => {
      setLoadingStatus(true)

      const ds = await getToken();
    const data = await JSON.parse(ds)
 
    let body = {
      user_id:data.id
    }
    const checkGameEligibility = await CallApiJson('checkGameEligibility', 'POST',body);
    // const data = await JSON.parse(seting)
        if( checkGameEligibility.error==true  ){

          setLoadingStatus(false)
          Alert.alert(checkGameEligibility.msg);
          navigation.navigate('Home');
          return;
        }else{
        await  showApplovinRewarded();
          return ;
        }

    }
useEffect(() => {
  
  checkGameEligiblility()
  loadUserInfo();
  reset()
   return  ()=>{
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
    appLovinIntrestial();
    appLovinRewarded();

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


    const OnSelectOption = (index, x) => {
      const tempData = questions;
      tempData.map((item, ind) => {
        if (index == ind) {

          if (item.marked !== -1) {
            item.marked = -1;
          } else {
            item.marked = x;
          }
        }
      });
      let temp = [];
      tempData.map(item => {
        temp.push(item);
      });
      setQuestions(temp);
       
        
    };

    const getTextScore = () => {
      let marks = 0;
      questions.map(item => {
        if (item.marked !== -1) {
         
          if(item.marked == item.correct){
            marks = marks + 1;
          }
          
        }
      });
      authCtx.quiz(marks);
      return marks;
    };

    const reset = () => {
      const tempData = questions;
      tempData.map((item, ind) => {
        item.marked = -1;
      });
      let temp = [];
      tempData.map(item => {
        temp.push(item);
      });
      setQuestions(temp);
    };



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
              <Icon  onPress={()=>{navigation.navigate('Wallet')}} name="wallet" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(5)}} />
              <TouchableOpacity onPress={()=>{navigation.navigate('Profile')}}>
              <Icon  name="person" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(3) }} />
              </TouchableOpacity>
            </View>
          
        ),
  
      });
    }, []);


  return (

 
    <View style={{flex:1,backgroundColor: '#0a203e' }} >
    <Loader loadingStatus = {loadingStatus} />
   

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: responsiveWidth(5),
        }}>
        <Text
          style={{
            fontSize: responsiveFontSize(2.4),
            fontWeight: '600',

            marginLeft: responsiveWidth(5),
            color: '#fff',
          }}>
          Questions :{' ' + currentIndex + '/' + apiQues?.questions?.length}
        </Text>
        <Text
          style={{
            marginRight: responsiveWidth(5),
            fontSize: responsiveFontSize(2.4),
            fontWeight: '600',
            color: '#fff',
          }}
          onPress={() => {
            reset();
            listRef.current.scrollToIndex({animated: true, index: 0});
          }}>
          Reset
        </Text>
      </View>
        <View style={{marginTop: responsiveWidth(7.5)}}>
        <FlatList
       onScroll={e=>{
        const x = e.nativeEvent.contentOffset.x / windowWidth + 1;
            setCurrentIndex(x.toFixed(0));
       }}
            ref={listRef}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
         pagingEnabled
         horizontal
          data={apiQues.questions}
          renderItem={({item, index}) => {
            return (
              <Questions
                data={item}

                selectedOption={x =>{
                  
                  OnSelectOption(index,x)
                }}
                quesNo={currentIndex}

              />
            );
          }}
        />
      </View>

      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',position:'absolute',bottom:responsiveWidth(25),width:'100%'}}>
          
        {/* <TouchableOpacity style={{
           backgroundColor: currentIndex > 1 ?'#1f4c86':'gray',
           height:responsiveHeight(5.95),
           width:responsiveWidth(24.5),
           borderRadius:responsiveWidth(2.45),
           marginLeft:responsiveWidth(5),
           justifyContent:'center',
           alignItems:'center'
        }}  
        
        onPress={ async () => {
          await showApplovinRewarded();

            // console.log(parseInt(currentIndex) - 1);
            if (currentIndex > 1) {
              listRef.current.scrollToIndex({
                animated: true,
                index: parseInt(currentIndex) - 2,
              });
            } 
          }}  >
          
           <Text style={{color:'#fff'}} >
              Previous
           </Text>

        </TouchableOpacity> */}


      {currentIndex==10 ? (
        <TouchableOpacity style={styles.submitButton}  
        onPress={ async ()=>{

              //  await showApplovinRewarded();
              // setModalVisible(true)
              getTextScore()
              navigation.navigate('QuizReward',{category:route.params.category,totalques:apiQues?.questions?.length})
              // reset()
        } } >
          
           <Text style={{color:'#fff'}} >
              Submit
           </Text>

        </TouchableOpacity>
      ): (
        <TouchableOpacity style={styles.nextButton} 
         onPress={ async ()=>{


          // if( currentIndex%3==0){
          //   await showApplovinRewarded()

          // }

          if(questions[currentIndex-1].marked !== -1){

            if (currentIndex < questions.length) {
            listRef.current.scrollToIndex({
                    animated: true,
                    index: currentIndex ,
                  });
          }
          }

            
        } } >
          
           <Text style={{color:'#fff'}}  >
              Next
           </Text>

        </TouchableOpacity>
      )}

     

   
      </View>
    

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
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
                  style={styles.modelLinerScore}>
          {/* <View
            style={{
              backgroundColor: '#1f4c86',
              width: '90%',
              
              borderRadius: 10,
            }}> */}
            <Text
              style={styles.scoreText}>
              SCORE
            </Text>
            <Text 
              style={styles.scoreNumber}>
              {/* {getTextScore()} */}
            </Text>
            <TouchableOpacity
              style={styles.closeBUtton}
              onPress={() => {
                // setModalVisible(!modalVisible);
                navigation.navigate('Home')
                // reset()
              }}>
              <Text style={styles.closeBUttonText}>Close</Text>
            </TouchableOpacity>
          {/* </View> */}
          </LinearGradient>
        </View>
      </Modal>

    
    </View>
  
  )
}

export default Quiz;