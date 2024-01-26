import React, { FC } from "react";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BaseTabRoutes } from "../../../navigation/routeTypes";
import NavType from "../../../utils/NavType";

// import * as tf from "react-native-tensorflow";


const CameraPage = () => {
  const navigation = useNavigation<NavType>();
  const device = useCameraDevice("back", {
    physicalDevices: ["wide-angle-camera"],
  });

  return device == null ? (
    navigation.navigate(BaseTabRoutes.FORBIDDEN)
  ) : (
    <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
  );
};

export default CameraPage;
