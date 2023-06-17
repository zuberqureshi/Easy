import React from 'react';
import {View, Image} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
export default function BannerSlider({data}) {
  return (
    <View>
      <Image
        source={data.image}
        style={{height: responsiveHeight(20), width: responsiveWidth(85), borderRadius: responsiveWidth(2.5)}}
      />
    </View>
  );
}