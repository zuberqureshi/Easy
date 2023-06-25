import { StyleSheet, Text, View } from 'react-native';
import React,{useEffect} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

function Loader(props) {
  
   
    return (
      <>
        <Spinner
            visible={props.loadingStatus}
            textContent={'Loading Please Wait ...'}
            textStyle={styles.spinnerTextStyle}
          />
  
         {/* { !net.isConnected?(<CheckInternet/>):  ()} */}
      </>
          
    );
  }
  
   const styles = StyleSheet.create({
    spinnerTextStyle: {
      color: '#FFF'
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5
    }
  });
  
  export default Loader;
  