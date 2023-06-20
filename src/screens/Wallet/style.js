import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";


export default styles = StyleSheet.create({

balanceLinearGradient:{
    flex: 0.2,
     borderRadius: responsiveWidth(2.5),
      height: 50, 
      elevation: responsiveWidth(1.5), 
      margin: responsiveWidth(5),
       borderWidth: responsiveWidth(0.2), 
       borderColor: '#1f4c86', 
       justifyContent: 'center' 
},
balanceLinearGradientCoin:{
    color: "#fff", fontSize:
     responsiveFontSize(3.5),
     fontWeight: 500 
},
balanceLinearGradientCoinText:{
    color: '#fff', 
    letterSpacing: responsiveWidth(0.37),
     fontSize: responsiveFontSize(1.9)
},
balanceLinearGradientImg:{
    width:responsiveWidth(22),
     height: responsiveHeight(8.3)
},
redeenTxt:{
    color: '#fff', 
    fontSize: responsiveFontSize(2.15) 
},
paytmLinearGradient:{
    flex: 0.2, 
    borderRadius: responsiveWidth(2.45),
     height: responsiveHeight(8.3), 
     elevation: responsiveWidth(1.5),
     marginVertical: responsiveWidth(5),
      borderWidth: responsiveWidth(0.2),
       borderColor: '#1f4c86',
        justifyContent: 'center' 
},
paytmLinearGradientImg:{
    width: responsiveWidth(15.5),
     height: responsiveHeight(7.9)
},
paytmLinearGradientMainTxt:{
    color: '#fff', 
    fontSize: responsiveFontSize(2.4)
},
paytmLinearGradientSubTxt:{
    color: '#fff', 
    fontSize: responsiveFontSize(1.9) 
},
paypalLinearGradient:{
    flex: 0.2,
     borderRadius: responsiveWidth(2.45),
      height: responsiveHeight(8.3), 
      elevation: responsiveWidth(1.5), 
      marginVertical: responsiveWidth(5), 
      borderWidth: responsiveWidth(0.2),
       borderColor: '#1f4c86',
     justifyContent: 'center' 
},
paypalLinearGradientImg:{
    width: responsiveWidth(13.6), 
    height: responsiveHeight(6.5) 
},
paypalLinearGradientMainTxt:{
    color: '#fff', 
    fontSize: responsiveFontSize(2.4)
},
paypalLinearGradientSubTxt:{
    color: '#fff', 
    fontSize: responsiveFontSize(1.9) 
},
modelPaypalLinearGradient:{
    borderRadius: responsiveWidth(2.45), 
    elevation: responsiveWidth(1.5),
     borderWidth: responsiveWidth(0.2),
     width: '90%',
            
    borderColor:  '#1f4c86',
},
modelPaypalTextInputCintainer:{
    borderWidth: responsiveFontSize(0.1),
     borderColor: '#0a203e', 
     borderRadius: responsiveWidth(6.25),
     width: responsiveWidth(48.5),
      alignItems: 'center',
       marginTop: responsiveWidth(5), 
       alignSelf: 'center' 
},
modelPaypalLinearGradientCard:{
    borderRadius: responsiveWidth(2.45),
     height: responsiveHeight(7), 
     elevation: responsiveWidth(1.5),
      borderWidth: responsiveWidth(0.2),
       width: responsiveWidth(24.6), 
       alignItems: 'center', 
       flexDirection: 'row',
        justifyContent: 'space-evenly' 
},
modelPaypalSubmitButton:{
    alignSelf: 'center',
    height: responsiveHeight(4.8),
    padding: responsiveWidth(2.45),

    borderRadius: responsiveWidth(2.45),
    marginTop: responsiveWidth(5),
    marginBottom: responsiveWidth(5),
    backgroundColor: '#0a203e',
    color: '#fff',
    elevation: responsiveWidth(1.5),
    marginRight: responsiveWidth(7.5)
},
modelPaypalSubmitButtonTxet:{
    color: '#fff', 
    paddingHorizontal: responsiveWidth(2.45),
     letterSpacing: responsiveWidth(0.2) 
},
modelPaypalCloseButton:{
    alignSelf: 'center',
    height: responsiveHeight(4.8),
    padding: responsiveWidth(2.45),

    borderRadius: responsiveWidth(2.45),
    marginTop: responsiveWidth(5),
    marginBottom: responsiveWidth(5),
    backgroundColor: '#0a203e',
    color: '#fff',
    elevation: responsiveWidth(1.5),
},
modelPaypalCloseButtonText:{
    color: '#fff',
     paddingHorizontal:  responsiveWidth(2.45),
      letterSpacing: responsiveWidth(0.2)
},
modelPaytmLinearGradient:{
    borderRadius: responsiveWidth(2.45), 
    elevation: responsiveWidth(1.5),
     borderWidth: responsiveWidth(0.2),
     width: '90%',
            
    borderColor:  '#1f4c86',
},
modelPaytmTextInputCintainer:{
    borderWidth: responsiveFontSize(0.1),
     borderColor: '#0a203e', 
     borderRadius: responsiveWidth(6.25),
     width: responsiveWidth(48.5),
      alignItems: 'center',
       marginTop: responsiveWidth(5), 
       alignSelf: 'center' 
},
modelPaytmLinearGradientCard:{
    borderRadius: responsiveWidth(2.45),
     height: responsiveHeight(7), 
     elevation: responsiveWidth(1.5),
      borderWidth: responsiveWidth(0.2),
       width: responsiveWidth(24.6), 
       alignItems: 'center', 
       flexDirection: 'row',
        justifyContent: 'space-evenly' 
},
successModel:{
    borderRadius: responsiveWidth(2.45), 
    elevation:  responsiveWidth(1.5), 
    borderWidth: responsiveWidth(0.2),  
     width: '65%',
            
              
              alignItems: 'center',
              
              justifyContent: 'center',
                  borderColor:  '#1f4c86',
},
successModelText:{
    color:'#fff',
    fontSize:responsiveFontSize(2.15),
    marginTop:responsiveWidth(7.45),
    fontWeight:500
}

})