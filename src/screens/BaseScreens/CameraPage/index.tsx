/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from "react";
import { Camera, CameraType } from "expo-camera";
import { View, Text, Button, StyleSheet, TouchableOpacity, Animated, Image } from "react-native";
import FormatStyle from "../../../utils/FormatStyle";
import { Ionicons } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";
import * as tf from "@tensorflow/tfjs-react-native";
import * as tfjs from "@tensorflow/tfjs";
import useAppSelector from "../../../hooks/useAppSelector";
import { RootState } from "redux/store";

// line animation source: https://medium.com/@vivekjoy/creating-a-barcode-scanner-using-expo-barcode-scanner-in-a-react-native-cli-project-2d36a235ab41

// const { width, height } = Dimensions.get('window');
// const maskHeight = height * 0.55;


const CameraPage = () => {
  const [type, setType] = useState<CameraType>(CameraType.back);
  const [permissions, requestPermission] = Camera.useCameraPermissions();

  const [animationLineHeight, setAnimationLineHeight] = useState<number>(0);
  const [focusLineAnimation, setFocusLineAnimation] = useState<Animated.Value>(new Animated.Value(0));

  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const cameraRef = useRef<Camera | null>(null);

  const [modelVerdict, setModelVerdict] = useState<number | null>(null);
  const model = useAppSelector((state: RootState) => state.model.model);

  const [manualEntryMode, setManualEntryMode] = useState<boolean>(false);

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
        ])
      ).start();
    };

    animateLine();
  }, [focusLineAnimation]);

  useEffect(() => {
    const classifyImage = async () => {
      if (capturedPhoto && model) {
        try {
          console.log("classifying image");
          // Load image
          const response = await fetch(capturedPhoto);
          const imageDataArrayBuffer = await response.arrayBuffer();
          const imageTensor = tf.decodeJpeg(new Uint8Array(imageDataArrayBuffer), 3);

          // Preprocess image
          const resizedImage = tfjs.image.resizeBilinear(imageTensor, [200, 200]);
          const batchedImage = resizedImage.expandDims(0);

          // Classify image
          const prediction = await model.predict(batchedImage);
          console.log("Prediction", prediction);
          //TODO: need to change
          setModelVerdict(1);
        } catch (error) {
          console.error("Error classifying image:", error);
        }
      }
    };

    classifyImage();
  }, [capturedPhoto]);


  if (!permissions) {
    return (
      <View style={FormatStyle.container}>
        <Text>Requesting permissions...</Text>
      </View>
    );
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

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log('photo', photo);
        setCapturedPhoto(photo.uri); // Store the photo URI in state
      } catch (error) {
        console.error('Error taking picture:', error);
        alert('Failed to take picture. Please try again.'); // Optionally alert the user
      }
    }
  };

  const svgMarkup = `
  <svg xmlns="http://www.w3.org/2000/svg" width="144" height="133" viewBox="0 0 144 133" fill="none">
    <path d="M78.974 103.374L65.1143 116.507M65.1143 116.507L78.974 129.64M65.1143 116.507H127.483C129.691 116.399 131.84 115.793 133.75 114.738C135.66 113.683 137.275 112.21 138.462 110.442C139.649 108.675 140.373 106.664 140.573 104.578C140.772 102.492 140.442 100.39 139.61 98.4493L135.799 91.8828" stroke="white" stroke-opacity="0.9" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M54.8858 63.9789L49.8079 45.9688M49.8079 45.9688L30.857 50.7946M49.8079 45.9688L18.5936 97.3496C17.5872 99.2227 17.067 101.297 17.0762 103.4C17.0855 105.503 17.624 107.574 18.6468 109.439C19.6697 111.304 21.1471 112.909 22.9558 114.121C24.7645 115.333 26.8519 116.116 29.0439 116.405L36.9587 116.561" stroke="white" stroke-opacity="0.9" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M102.942 63.977L121.893 68.8028M121.893 68.8028L126.971 50.7927M121.893 68.8028L90.6789 17.422C89.4752 15.6572 87.8448 14.1917 85.9237 13.1478C84.0026 12.1039 81.8466 11.5119 79.6357 11.4212C77.4248 11.3305 75.2232 11.7438 73.2146 12.6265C71.206 13.5093 69.4488 14.8358 68.0896 16.4955L63.9899 22.9315" stroke="white" stroke-opacity="0.9" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.overlay}>
          <View style={styles.unfocusedContainer}></View>
          <View style={styles.middleContainer}>
            <View style={styles.unfocusedContainer}></View>
            <View
              onLayout={(e) =>
                setAnimationLineHeight(e.nativeEvent.layout.height)
              }
              style={styles.focusedContainer}
            >
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
              <SvgXml xml={svgMarkup} width="90%" height="95%" />
            </View>
            <View style={styles.unfocusedContainer}></View>
          </View>
          <View style={styles.unfocusedContainer}></View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Ionicons name="camera-reverse-outline" size={36} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.captureButtonContainer}>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
      {capturedPhoto && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedPhoto }} style={styles.previewImage} />
          <Button title="Close Preview" onPress={() => setCapturedPhoto(null)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '4%',
    right: '8%',
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 30,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  unfocusedContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  middleContainer: {
    flexDirection: "row",
    flex: 1.5,
  },
  focusedContainer: {
    flex: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.20)',
    // justifyContent: 'center',
  },
  animationLineStyle: {
    height: 2,
    width: "100%",
    backgroundColor: "white",
  },
  rescanIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonContainer: {
    position: 'absolute',
    bottom: '4%',
    right: '40%',
  },
  captureButton: {
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewContainer: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  previewImage: {
    width: '100%',
    height: '80%',
  },
});

export default CameraPage;
