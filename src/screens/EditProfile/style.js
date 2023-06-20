import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";


export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    commandButton: {
        padding: responsiveWidth(3.6),
        borderRadius: responsiveWidth(2.5),
        backgroundColor: '#1f4c86',
        alignItems: 'center',
        marginTop: responsiveWidth(2.5),
    },
    panel: {
        padding: responsiveWidth(5),
        backgroundColor: '#FFFFFF',
        paddingTop: responsiveWidth(5),
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
      
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        // shadowOffset: { width: responsiveWidth(-0.1), height: responsiveHeight(-0.3) },
        // shadowRadius: responsiveWidth(0.2),
        // shadowOpacity: responsiveWidth(0.1),
        // elevation: 5,
        paddingTop: responsiveWidth(5),
        borderTopLeftRadius: responsiveWidth(5),
        borderTopRightRadius:responsiveWidth(5),
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: responsiveWidth(9.8),
        height: responsiveHeight(1),
        borderRadius: responsiveWidth(1),
        backgroundColor: '#00000040',
        marginBottom: responsiveWidth(2.5),
    },
    panelTitle: {
        fontSize: responsiveFontSize(3.2),
        height: responsiveHeight(4.15),
    },
    panelSubtitle: {
        fontSize: responsiveFontSize(1.65),
        color: 'gray',
        height: responsiveHeight(3.5),
        marginBottom: responsiveWidth(2.5),
    },
    panelButton: {
        padding: responsiveWidth(3.15),
        borderRadius: responsiveWidth(2.5),
        backgroundColor: '#1f4c86',
        alignItems: 'center',
        marginVertical: responsiveWidth(1.7),
    },
    panelButtonTitle: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        color: 'white',
    },
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
    },
});