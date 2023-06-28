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
import { BannerAdSize,BannerAd,AppOpenAd, RewardedAd, RewardedAdEventType,  TestIds, AdEventType,InterstitialAd } from 'react-native-google-mobile-ads';

const adUnitId =  'ca-app-pub-5493577236373808/8452330072';
const adUnitIdrewarded =  'ca-app-pub-5493577236373808/2741101726';
const adUnitIdIntrestial  = 'ca-app-pub-5493577236373808/6488775047';

const interstitial = InterstitialAd.createForAdRequest(adUnitIdIntrestial, { 
});
const rewarded = RewardedAd.createForAdRequest(adUnitIdrewarded,{} );

import  { AuthContext } from "../../utiles/auth-context";
const Quiz = ({route}) => {
    // alert(JSON.stringify(quizdata[1].question))

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

  const showAds = (currentIndex)=>{

    if( currentIndex%5==0)      {
      interstitial.addAdEventListener(AdEventType.LOADED, () => {
        console.log('interstitialad Loaded' )
        interstitial.show();
    
       });

    }


  }
  
useEffect(() => {
  

  loadUserInfo();
  reset()
   return  ()=>{
    console.log('return')
  }
}, [])



useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      rewarded.show();
 
  });
  const unsubscribeEarned = rewarded.addAdEventListener(
    RewardedAdEventType.EARNED_REWARD,
    reward => {
 
 
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
    unsubscribe();
    unsubscribeLoaded();
    unsubscribeEarned();
  };
 }, []);

    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(1);
   
    const [questions, setQuestions] = useState([]);
     const listRef = useRef();
    const [modalVisible, setModalVisible] = useState(false);
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
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />

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
              />
            );
          }}
        />
      </View>

      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',position:'absolute',bottom:responsiveWidth(12),width:'100%'}}>
          
        <TouchableOpacity style={{
           backgroundColor: currentIndex > 1 ?'#1f4c86':'gray',
           height:responsiveHeight(5.95),
           width:responsiveWidth(24.5),
           borderRadius:responsiveWidth(2.45),
           marginLeft:responsiveWidth(5),
           justifyContent:'center',
           alignItems:'center'
        }}  
        
        onPress={() => {
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

        </TouchableOpacity>


      {currentIndex==10 ? (
        <TouchableOpacity style={styles.submitButton}  
        onPress={ ()=>{
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
         onPress={ ()=>{

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
      <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />

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