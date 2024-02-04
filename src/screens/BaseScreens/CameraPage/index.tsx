import React, { FC, useState } from "react";
import { Camera, CameraType } from 'expo-camera';
import { View } from "react-native";
import FormatStyle from "../../../utils/FormatStyle";

// import * as tf from "react-native-tensorflow";

const CameraPage: FC = () => {
  const [status, requestPermission] = Camera.useCameraPermissions();

  return (
    <View style={FormatStyle.container}>
      <Camera
        style={{width: '50%', height: '50%'}}
        type={CameraType.back}
        ref={requestPermission}
      />
    </View>
  );
};

export default CameraPage;
