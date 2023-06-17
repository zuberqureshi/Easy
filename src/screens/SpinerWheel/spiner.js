import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

import WheelOfFortune from 'react-native-wheel-of-fortune';

const participants = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
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
    this.setState({
      started: true,
    });
    this.child._onPress();
  };


  winPrice = () =>{
    console.warn(this.state.winnerValue)
  }

  render() {
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
          }}
        />
        {!this.state.started && (
          <View style={styles.startButtonView}>
            <TouchableOpacity
              onPress={() => this.buttonPress() }
              style={styles.startButton}>
              <Text style={styles.startButtonText}>Spin to win! </Text>
              <Image style={{width:responsiveWidth(6.25),height:responsiveHeight(2.5)}} source={require('../../assets/coin.png')}/>
            </TouchableOpacity>
          </View>
        )}
        {this.state.winnerIndex != null && (
          <View style={styles.winnerView}>
            <Text style={styles.winnerText}>
            {this.winPrice()}
              You win {participants[this.state.winnerIndex]}
            </Text>
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
    marginTop:'60%'
    
  },
  startButtonView: {
    // position: 'absolute',
    marginTop:'50%'
  },
  startButton: {
    backgroundColor: '#1f4c86',
    marginTop:responsiveWidth(12.1),
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
    marginTop:'58%',
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
});

