import {StyleSheet} from  'react-native';
import { responsiveHeight,responsiveWidth,responsiveFontSize} from "react-native-responsive-dimensions";


export default styles = StyleSheet.create({
  
    item: {
        // padding: responsiveWidth(4.8),
        paddingVertical:responsiveWidth(1.2),
        marginVertical: responsiveWidth(1.9),
        marginHorizontal: responsiveWidth(3.8),
        flexDirection:'row',
        borderRadius:responsiveWidth(1.3)
      },
      title: {
        fontSize: responsiveFontSize(2.1),
        marginLeft:responsiveWidth(4),
      },
      drawerTop:{
        flex:0.25,
        paddingTop:responsiveWidth(4),
        paddingHorizontal:responsiveWidth(3.5),
        borderColor:'#000',
        borderBottomWidth:responsiveWidth(0.2),
        backgroundColor:'#215295',
    },
    drawerTopIcon:{
        height:responsiveHeight(10),
        width:responsiveWidth(20),
        borderRadius:responsiveWidth(10),
    },
    drawerTopName:{
        fontWeight:'bold',
        fontSize:responsiveFontSize(3.3),
        marginTop:responsiveWidth(3),
        color:'#fff'
    },
    drawerTopCoin:{
        fontSize:responsiveFontSize(2.1),
        marginTop:responsiveWidth(0.5),
        color:'#fff',
        marginLeft:responsiveWidth(0.9)
    },
    drawerMid:{ 
        flex: 0.55, 
        borderColor: '#000',
         borderBottomWidth: responsiveWidth(0.2),
         },

    



});