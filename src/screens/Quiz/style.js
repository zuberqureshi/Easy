import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";


export default styles = StyleSheet.create({

 ques:{
    fontSize:responsiveFontSize(2.4),
    fontWeight:600,
    color:'#fff',
    marginLeft:responsiveWidth(5),
    marginRight:responsiveWidth(5) 
 },
 quesOption:{
    width:'90%',height:responsiveHeight(5.95),
    elevation:responsiveWidth(1),
   
    borderRadius:responsiveWidth(2.5),
          marginTop:responsiveWidth(2.45),
          marginBottom:responsiveWidth(2.45),
          alignSelf:'center',
          alignItems:'center',
          paddingLeft:responsiveWidth(3.5),
          flexDirection:'row'
 },
 optionNumberView:{
    width:responsiveWidth(7.4),
    height:responsiveHeight(3.5),
    borderRadius:responsiveWidth(3.5),
  
    justifyContent:'center',
    alignItems:'center'
 },
 closeBUttonText:{
    color:'#fff',
    paddingHorizontal:responsiveWidth(2.80),
    letterSpacing:responsiveWidth(0.2)
 },
 closeBUtton:{
    alignSelf: 'center',
    height: responsiveHeight(4.8),
    padding: responsiveWidth(2.45),
  
    borderRadius: responsiveWidth(2.45),
    marginTop: responsiveWidth(5),
    marginBottom: responsiveWidth(5),
    backgroundColor:'#0a203e',
    color:'#fff',
    elevation:responsiveWidth(1.5)
 },
 scoreNumber:{
    fontSize: responsiveFontSize(4.8),
    fontWeight: '800',
    alignSelf: 'center',
    marginTop: responsiveWidth(5),
    color: 'green',
 },
 scoreText:{
    fontSize: responsiveFontSize(2.5),
    letterSpacing:responsiveWidth(0.35),
    fontWeight: '800',
    alignSelf: 'center',
    marginTop: responsiveWidth(5),
    color:'#fff'
  },
  scoreTextHeading:{
   fontSize: responsiveFontSize(2.2),
   letterSpacing:responsiveWidth(0.35),
   fontWeight: '800',
   alignSelf: 'center',
   marginTop: responsiveWidth(8),
   color:'#fff'
 },
  

  modelLinerScore:{
     borderRadius: responsiveWidth(2.45), 
    elevation: responsiveWidth(1),
     borderWidth: responsiveWidth(0.3),
     width: '90%',
            
  borderColor:  '#1f4c86',
 },
 nextButton:{
    backgroundColor:'#1f4c86',
    height:responsiveHeight(5.95),
    width:responsiveWidth(24.5),
    borderRadius:responsiveWidth(2.45),
    marginLeft:'70%',
    justifyContent:'center',
    alignItems:'center'
 },
 submitButton:{
    backgroundColor:'green',
    height:responsiveHeight(5.95),
    width:responsiveWidth(24.5),
    borderRadius:responsiveWidth(2.45),
    marginLeft:'70%',
    justifyContent:'center',
    alignItems:'center'
 },



})