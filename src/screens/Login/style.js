import {StyleSheet} from  'react-native';
import { responsiveHeight,responsiveWidth,responsiveFontSize} from "react-native-responsive-dimensions";


export const styles = StyleSheet.create({

    mainContainer:{
        flex:1,
        // backgroundColor:'#203f81',
        alignItems:'center',
       
       

    },
    textWlcm:{
      color:'#fff',
      fontSize:responsiveFontSize(7),
      marginTop:responsiveWidth(8),
     fontFamily:'Poppins-BoldItalic',
     marginBottom:0,

    },
    textLogin:{
        color:'#fff',
     
        fontSize:responsiveFontSize(2.1),
        // marginBottom:responsiveWidth(10),
        fontFamily:'Poppins-ExtraLightItalic',
       
    },
    inputMain:{
        
        // borderLeftWidth:responsiveHeight(0.3),
        height:responsiveHeight(5),
        width:responsiveWidth(68.5),
        borderRadius:responsiveWidth(5),
        // backgroundColor:'#c5cdf1',
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:responsiveWidth(2),
        marginBottom:responsiveHeight(2),
        justifyContent:'center',
        shadowColor:'#000000',
        shadowOpacity: 0.6,
        elevation: 8,
        shadowOffset: {
          width: 0,
          height: 4
        }
      

         
    },
        buttonText:{
            color:'#fff',
            fontWeight:'bold',
      
           
           

        }
        
      
    



})