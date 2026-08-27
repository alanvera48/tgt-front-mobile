import {Text} from 'react-native';
import React from 'react';

{
  /* <string>AirbnbCereal_W_Bd.otf</string>
<string>AirbnbCereal_W_Bk.otf</string>
<string>AirbnbCereal_W_Blk.otf</string>
<string>AirbnbCereal_W_Lt.otf</string>
<string>AirbnbCereal_W_Md.otf</string>
<string>AirbnbCereal_W_XBd.otf</string> */
}

export default function TextBase({
  text,
  size,
  fontFamily,
  color,
  lines,
  style,
  props,
}) {
  return (
    <Text
      numberOfLines={lines ? lines : 1}
      style={{
        fontFamily,
        fontSize: size,
        color,
        ...style,
      }}
      {...props}>
      {text}
    </Text>
  );
}
