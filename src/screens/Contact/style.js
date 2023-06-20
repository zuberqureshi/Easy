import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";


export default styles = StyleSheet.create({

    action: {
        flexDirection: 'row',
        marginTop: responsiveWidth(5.1),
        marginBottom: responsiveWidth(2.45),
        borderBottomWidth: responsiveWidth(0.25),
        borderBottomColor: '#000',
        paddingBottom: responsiveWidth(1.2),
    },
    actionError: {
        flexDirection: 'row',
        marginTop: responsiveWidth(2.45),
        borderBottomWidth: responsiveWidth(0.25),
        borderBottomColor: '#FF0000',
        paddingBottom: responsiveWidth(1.2),
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : responsiveWidth(-3),
        paddingLeft: responsiveWidth(2.45),
        color: '#05375a',
    },  commandButton: {
        padding: responsiveWidth(3.6),
        borderRadius: responsiveWidth(2.5),
        backgroundColor: '#1f4c86',
        alignItems: 'center',
        marginTop: responsiveWidth(5),
    },    panelButtonTitle: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        color: 'white',
    },

    dropdown: {
        width:responsiveWidth(70),
        margin: responsiveWidth(2.5),
        height: responsiveHeight(2.4),
        // borderBottomColor: 'gray',
        // borderBottomWidth: 0.5,
      },
      // icon: {
      //   marginRight: 5,
      // },
      placeholderStyle: {
        fontSize: responsiveFontSize(1.9),
      },
      selectedTextStyle: {
        fontSize: responsiveFontSize(1.9),
      },
      // iconStyle: {
      //   width: 20,
      //   height: 20,
      // },
    //   inputSearchStyle: {
    //     height: 40,
    //     fontSize: 16,
    //   },


})