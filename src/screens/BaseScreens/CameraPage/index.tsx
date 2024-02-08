import React, { FC, useState, useEffect } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import FormatStyle from '../../../utils/FormatStyle';
import { Ionicons } from '@expo/vector-icons';

// import * as tf from "react-native-tensorflow";

const { width, height } = Dimensions.get('window');

const CameraPage: FC = () => {
  const [type, setType] = useState<CameraType>(CameraType.back);
  const [permissions, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    (async () => {
      if (!permissions) await requestPermission();
    })();
  }, []);

  if (!permissions) {
    return <View style={FormatStyle.container}><Text>Requesting permissions...</Text></View>;
  }

  if (!permissions.granted) {
    return (
      <View style={FormatStyle.container}>
        <Text>No access to camera</Text>
        <Button title="Grant Permission" onPress={() => requestPermission()} />
      </View>
    );
  }

  function toggleCameraType() {
    setType(currentType => (currentType === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View style={FormatStyle.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.maskOuter}>
          <View style={[styles.maskRow, styles.maskFrame]} />
          <View style={styles.maskCenter}>
            <View style={styles.maskFrame} />
            <View style={styles.sideFrame} />
            <View style={styles.maskInner} />
            <View style={styles.sideFrame} />
            <View style={styles.maskFrame} />
          </View>
          <View style={[styles.maskRow, styles.maskFrame]} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Ionicons name="camera-reverse-outline" size={36} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const maskHeight = height * 0.55;
const maskFrame = (height - maskHeight) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 26,
    right: 26,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 30,
  },
  maskOuter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskRow: {
    width: '100%',
  },
  maskFrame: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    height: maskFrame,
  },
  maskCenter: {
    flexDirection: 'row',
    width: '100%',
    height: maskHeight,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  maskInner: {
    height: maskHeight,
    width: '86%',
    backgroundColor: 'transparent',
    borderColor: 'white', // This sets the color of the trim
    borderWidth: 2,
  },
  sideFrame: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
  },
});

export default CameraPage;
