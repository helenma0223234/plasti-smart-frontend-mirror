import React, { FC } from "react";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import FormatStyle from "../../../utils/FormatStyle";

// import * as tf from "react-native-tensorflow";

const CameraPage = () => {
  const device = useCameraDevice("back", {
    physicalDevices: ["wide-angle-camera"],
  });

  return (
    <SafeAreaView style={FormatStyle.container}>
      {device == null ? (
        <h1>No camera</h1>
      ) : (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
        />
      )}
    </SafeAreaView>
  );
};

export default CameraPage;
