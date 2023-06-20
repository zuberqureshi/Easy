import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";


export default styles = StyleSheet.create({
    slider: {
        flex: 0.20,
        marginTop: responsiveWidth(5),
      
        alignItems: 'center',
    },
    getFreeMainText: {
        fontSize: responsiveFontSize(2.15),
        fontWeight: 600,
        marginLeft: responsiveWidth(5),
        color: '#f7feff',
    },
    getFreeMainContainer: {
        backgroundColor: '#215295',
        width: responsiveWidth(90),
        height: responsiveHeight(9.5),
        borderRadius: responsiveWidth(2.6),
        flexDirection: 'row',
        alignItems: 'center'
    },
    getFreeCoin: {
        width: responsiveWidth(13.05),
        height: responsiveHeight(6.35),
        marginLeft: responsiveWidth(2.5),
    },
    videoIcon: {
        width: responsiveWidth(13.05),
        height: responsiveHeight(6.35),
        marginLeft: responsiveWidth(2.5),
    },
    surveyIcon: {
        width: responsiveWidth(13.05),
        height: responsiveHeight(6.35),
        marginLeft: responsiveWidth(2.5),
    },
    spineMainText: {
        fontSize: responsiveFontSize(2.15),
        fontWeight: 600,
        marginLeft: responsiveWidth(5),
        color: '#f7feff',
    },
    spineImgView: {
        backgroundColor: '#1f4c86',
        width: responsiveWidth(90),
        height: responsiveHeight(23.7),
        borderRadius: responsiveWidth(2.6),
        alignItems: 'center',
        justifyContent: 'center',
        zIndex:0.1,
        bottom:responsiveWidth(3.5)
    },
    spineImg: {
        width: responsiveWidth(85),
        height:responsiveHeight(22),

        borderRadius: responsiveWidth(2.6),
       
    },
    gameZoneContainer: {
        backgroundColor: '#1f4c86',
        width: responsiveWidth(90),
        height: responsiveHeight(18.9),
        borderRadius: responsiveWidth(2.6)
    },
    gameZoneMainText: {
        fontSize: responsiveFontSize(2.4),
        fontWeight: 400,
        marginLeft: responsiveWidth(5),
        color: '#f7feff',
        marginTop: responsiveWidth(2.5)
    },
    gameZoneMainImgView: {
        flexDirection: 'row',
        marginTop: responsiveWidth(6),
        alignItems: 'center',
        marginHorizontal: responsiveWidth(2.5),
    },
    gameZoneSingleImgView: {
        flexDirection: 'column',
        marginLeft: responsiveWidth(1.7),
        alignItems: 'center'
    },
    gameZoneSingleImg: {
        width: responsiveWidth(14.5),
        height: responsiveHeight(6.5),
        marginLeft: responsiveWidth(2.5),
        marginBottom: responsiveWidth(1.2),
        borderRadius:responsiveWidth(1.2)
    },
    gameZoneImgText: {
        color: '#fff',
        fontSize: responsiveFontSize(1.65),
        marginLeft: responsiveWidth(2.45),
    },
    contestZoneContainer: {
        backgroundColor: '#092646',
        width: responsiveWidth(90),
        height: responsiveHeight(27.3),
        borderRadius: responsiveWidth(2.6),
    },
    contestZoneMainText: {
        fontSize: responsiveFontSize(2.4),
        fontWeight: 400,
        marginLeft: responsiveWidth(5),
        color: '#f7feff',
        marginTop: responsiveWidth(2.5),
    },
    contestZoneImg: {
        width: responsiveWidth(85),
        height: responsiveHeight(17.8),
        marginLeft: responsiveWidth(2.5)
    },
    contestZoneAvailableText: {
        color: '#fff',
        fontSize: responsiveFontSize(2.6),
        marginLeft: responsiveWidth(2.5)
    },
    surveyContainer: {
        backgroundColor: '#1f4c86',
        width: responsiveWidth(90),
        height: responsiveHeight(23),
        borderRadius: responsiveWidth(2.6),
       
    },
    surveyText: {
        fontSize: responsiveFontSize(2.4),
        fontWeight: 400,
        marginLeft: responsiveWidth(3),
        color: '#f7feff',
        marginVertical: responsiveWidth(2.5),
    },
    surveyImg: {
        width: responsiveWidth(31),
        height: responsiveHeight(15),
        // marginLeft: responsiveWidth(2.5),
        alignSelf:'center',
    },
 
    videoMainText: {
        fontSize: responsiveFontSize(2.15),
        fontWeight: 600,
        marginLeft: responsiveWidth(5),
        color: '#f7feff',
    },
    videoImgView:{ 
    backgroundColor: '#1f4c86',
    width: responsiveWidth(90),
    height: responsiveHeight(20),
    borderRadius: responsiveWidth(2.6),
    alignItems: 'center',
    justifyContent: 'center',
},
videoImg:{
    width:responsiveHeight(20),
    height:responsiveHeight(15),
}

});