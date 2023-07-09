import React, {Component,} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Button,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

import WheelOfFortune from 'react-native-wheel-of-fortune';

const participants = [
  'WIN',
  'LOST',
  'WIN',
  'LOST',
  'LOST',
  'LOST',
  'WIN',
];
class Spiner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winnerValue: null,
      winnerIndex: null,
      started: false,
    };
    this.child = null;
  }

  buttonPress = () => {

    if( !this.props.spinAmount ){
      Alert.alert('Please Select Coins    ');
      return;
    }

    if( this.props.userWallet< this.props.spinAmount ){
      Alert.alert('Wallet Has not sufficent Coins , Earn or Recharge Coins   ');
      return;
    }
    
    this.setState({
      started: true,
    });
    this.child._onPress();
  };


  winPrice = () =>{
    console.warn(this.state.winnerValue)
  }
  
 
  render() {
    {this.props.setSpinValue(participants[this.state.winnerIndex])}
     
    const wheelOptions = {
      rewards: participants,
      knobSize: responsiveWidth(7.5),
      borderWidth: responsiveWidth(1.5),
      borderColor: '#ffd843',
      innerRadius: responsiveWidth(7.5),
      duration: 4000,
      backgroundColor: 'transparent',
      textAngle: 'horizontal',
      knobSource: require('../../assets/images/knob.png'),
      onRef: ref => (this.child = ref),
    };
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#1f4c86" />
        
        <WheelOfFortune
          options={wheelOptions}
          getWinner={(value, index) => {
            this.setState({winnerValue: value, winnerIndex: index});
            this.props.updateSpinnerWheelWinner(  )

          }}
        />



  <View style={{marginTop:'60%',flexDirection:'row',alignContent:'space-between',}}>
  <TouchableOpacity onPress={()=>{this.props.setSpinAmount(2);  this.props.showApplovinRewarded();  }    } >
      <View style={[styles.coinBox,{borderColor:this.props.spinAmount===2?'gold':'#1f4c86',}]}>

      <Text style={{color:'#fff',fontSize:responsiveFontSize(1.4)  } } >2 Place</Text> 
        <Image style={{width:responsiveWidth(6),height:responsiveHeight(2.5),resizeMode:'contain'}} source={require('../../assets/rupee.png')} />
        <Text style={{color:'#fff',fontSize:responsiveFontSize(1.4)}} >4 Get</Text> 
      
      </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>{this.props.setSpinAmount(5);  this.props.showApplovinRewarded();  }}>
      <View style={[styles.coinBox,{borderColor:this.props.spinAmount===5?'gold':'#1f4c86',}]}>

      <Text style={{color:'#fff',fontSize:responsiveFontSize(1.4)}} >5 Place</Text> 
        <Image style={{width:responsiveWidth(6),height:responsiveHeight(2.5),resizeMode:'contain'}} source={require('../../assets/rupee.png')} />
        <Text style={{color:'#fff',fontSize:responsiveFontSize(1.4)}} >10 Get</Text> 
      
      </View>
      </TouchableOpacity>

   <TouchableOpacity onPress={()=>{this.props.setSpinAmount(10);  this.props.showApplovinRewarded();  }}>
      <View style={[styles.coinBox,{borderColor:this.props.spinAmount===10?'gold':'#1f4c86',}]}>

      <Text style={{color:'#fff',fontSize:responsiveFontSize(1.4)}} >10 Place</Text> 
        <Image style={{width:responsiveWidth(6),height:responsiveHeight(2.5),resizeMode:'contain'}} source={require('../../assets/rupee.png')} />
        <Text style={{color:'#fff',fontSize:responsiveFontSize(1.4)}} >20 Get</Text> 
      
      </View>
      </TouchableOpacity>

   <TouchableOpacity onPress={()=>{this.props.setSpinAmount(20);  this.props.showApplovinRewarded();  }}>
      <View style={[styles.coinBox,{borderColor:this.props.spinAmount===20?'gold':'#1f4c86',}]}>

      <Text style={{color:'#fff',fontSize:responsiveFontSize(1.4)}} >20 Place</Text> 
        <Image style={{width:responsiveWidth(6),height:responsiveHeight(2.5),resizeMode:'contain'}} source={require('../../assets/rupee.png')} />
        <Text style={{color:'#fff',fontSize:responsiveFontSize(1.4)}} >40 Get</Text> 
      </View>
      </TouchableOpacity>
  </View>


        {!this.state.started && (
          <View style={styles.startButtonView}>



            <TouchableOpacity
              onPress={() => this.buttonPress() }
              style={styles.startButton}>
              <Text style={styles.startButtonText}>  Spin to win! </Text>
              <Image style={{width:responsiveWidth(6.25),height:responsiveHeight(2.5),resizeMode:'contain'}} source={require('../../assets/rupee.png')}/>
            </TouchableOpacity>
          </View>
        )}
        {this.state.winnerIndex != null && (
          <View style={styles.winnerView}>
            {/* <Text style={styles.winnerText}>
         
            {this.winPrice()}
              You win {participants[this.state.winnerIndex]}
            </Text> */}
            {/* <TouchableOpacity
              onPress={() => {
                this.setState({winnerIndex: null});
                this.child._tryAgain();
              }}
              style={styles.tryAgainButton}>
              <Text style={styles.tryAgainText}>TRY AGAIN</Text>
            </TouchableOpacity> */}
          </View>
        )}
   {/* <View style={{marginTop:280}}>
    <TouchableOpacity onPress={() => this.buttonPress()} style={{backgroundColor:'#1f4c86',padding:10,borderRadius:30,flexDirection:'row'}}>
        <Text style={{color:'#fff',fontSize:16}}>START SPIN </Text>
        <Image style={{width:25,height:20}} source={require('../../assets/coin.png')}/>
    </TouchableOpacity>
   </View> */}
    {/* <Text>{participants[this.state.winnerIndex]}</Text> */}

      </View>
    );
  }
}
export default Spiner;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:  '#0a203e',
    marginTop:'55%'
    
  },
  startButtonView: {
    // position: 'absolute',
    // marginTop:'20%'
  },
  startButton: {
    backgroundColor: '#1f4c86',
    marginTop:responsiveWidth(8),
    marginBottom:responsiveWidth(5.1),
    padding: responsiveWidth(2.5),
    borderRadius:responsiveWidth(5),
    flexDirection:'row'
  },
  startButtonText: {
    fontSize: responsiveFontSize(1.9),
    color: '#fff',
    fontWeight: 'bold',
  },
  winnerView: {
    marginTop:'10%',
    // position: 'absolute',
    // justifyContent:'flex-end',
    // bottom:60,
    alignItems: 'center',
  },
  winnerText: {
    fontSize: responsiveFontSize(2.1),
    color:'#fff',
    
  },
  tryAgainButton: {
    padding: responsiveWidth(2.5),
    backgroundColor: '#1f4c86',
    borderRadius:responsiveWidth(5),
  },
  tryAgainText: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: 'bold',
    color: '#fff',
  },
  coinBox:{
    width:responsiveWidth(14),
    backgroundColor:'#0a203e',
    height:responsiveHeight(8),
    marginHorizontal:responsiveWidth(2),
    borderWidth:responsiveWidth(0.2),
    
  borderRadius:responsiveWidth(1),
  alignItems:'center',
  justifyContent:'space-evenly'
},

});

