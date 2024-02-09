import React, { FC, useState, useEffect, useRef } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import FormatStyle from '../../../utils/FormatStyle';
import { Ionicons } from '@expo/vector-icons';

// line animation source: https://medium.com/@vivekjoy/creating-a-barcode-scanner-using-expo-barcode-scanner-in-a-react-native-cli-project-2d36a235ab41

const { width, height } = Dimensions.get('window');
const maskHeight = height * 0.55;

const CameraPage: FC = () => {
  const [type, setType] = useState<CameraType>(CameraType.back);
  const [permissions, requestPermission] = Camera.useCameraPermissions();
  const [animationLineHeight, setAnimationLineHeight] = useState<number>(0);
  const [focusLineAnimation, setFocusLineAnimation] = useState<Animated.Value>(new Animated.Value(0));

  useEffect(() => {
    (async () => {
      if (!permissions) await requestPermission();
    })();
  }, []);

  useEffect(() => {
    const animateLine = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(focusLineAnimation, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(focusLineAnimation, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    animateLine();
  }, [focusLineAnimation]);

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
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.overlay}>
          <View style={styles.unfocusedContainer}></View>
          <View style={styles.middleContainer}>
            <View style={styles.unfocusedContainer}></View>
            <View
              onLayout={e => setAnimationLineHeight(e.nativeEvent.layout.height)}
              style={styles.focusedContainer}>
              <Animated.View
                style={[
                  styles.animationLineStyle,
                  {
                    transform: [
                      {
                        translateY: focusLineAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, animationLineHeight],
                        }),
                      },
                    ],
                  },
                ]}
              />
            </View>
            <View style={styles.unfocusedContainer}></View>
          </View>
          <View style={styles.unfocusedContainer}></View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Ionicons name="camera-reverse-outline" size={36} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  unfocusedContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  middleContainer: {
    flexDirection: 'row',
    flex: 1.5,
  },
  focusedContainer: {
    flex: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.20)',
  },
  animationLineStyle: {
    height: 2,
    width: '100%',
    backgroundColor: 'white',
  },
  rescanIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CameraPage;
