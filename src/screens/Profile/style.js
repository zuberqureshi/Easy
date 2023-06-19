import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";


export default styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:responsiveWidth(2.5)
    },
    userInfoSection: {
      paddingHorizontal: responsiveWidth(7.3),
      marginBottom: responsiveWidth(6.10),
    },
    title: {
      fontSize: responsiveFontSize(2.85),
      fontWeight: 'bold',
    },
    caption: {
      fontSize: responsiveFontSize(1.65),
      lineHeight: responsiveFontSize(1.65),
      fontWeight: '500',
    },
    row: {
      flexDirection: 'row',
      marginBottom: responsiveWidth(2.5),
    },
    infoBoxWrapper: {
      borderBottomColor: '#dddddd',
      borderBottomWidth: responsiveWidth(0.2),
      borderTopColor: '#dddddd',
      borderTopWidth: responsiveWidth(0.2),
      flexDirection: 'row',
      height: responsiveHeight(11.8),
    },
    infoBox: {
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuWrapper: {
      marginTop: responsiveWidth(2.5),
    },
    menuItem: {
      flexDirection: 'row',
      paddingVertical: responsiveWidth(3.65),
      paddingHorizontal: responsiveWidth(7.30),
    },
    menuItemText: {
      color: '#777777',
      marginLeft: responsiveWidth(4.8),
      fontWeight: '600',
      fontSize: responsiveFontSize(1.9),
      lineHeight: responsiveFontSize(2.8),
    },
  });