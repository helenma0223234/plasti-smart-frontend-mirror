/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-len */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import FormatStyle from '../../../utils/FormatStyle';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';
import { cameraClosed, cameraOpened } from 'redux/slices/cameraSlice';
import { reusedRedux, recycledRedux } from 'redux/slices/scanSlice';
import { createScan } from 'redux/slices/usersSlice';
import { BaseTabRoutes, BaseNavigationList } from 'navigation/routeTypes';
import type { StackNavigationProp } from '@react-navigation/stack';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import { PinchGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { REPLICATE_URL, REPLICATE_VERSION, REPLICATE_API_TOKEN } from '../../../utils/constants';
import * as ImageManipulator from 'expo-image-manipulator';


// components
import RBSheet from 'react-native-raw-bottom-sheet';
import ReuseWarningModal from '../UnknownPlasticPage/reuseWarningModal';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const plasticTypes = {
  1: 'Polyethylene Terephthalate',
  2: 'High-Density Polyethylene',
  3: 'Polyvinyl Chloride',
  4: 'Low-Density Polyethylene',
  5: 'Polypropylene',
  6: 'Polystyrene',
  7: 'Miscellaneous/Other',
  8: 'Unknown',
};

// line animation source: https://medium.com/@vivekjoy/creating-a-barcode-scanner-using-expo-barcode-scanner-in-a-react-native-cli-project-2d36a235ab41

type CameraPageProps = {
  navigation: StackNavigationProp<BaseNavigationList>;
};

const CameraPage = ({ navigation }: CameraPageProps) => {
  const [type, setType] = useState<CameraType>(CameraType.back);
  const [permissions, requestPermission] = Camera.useCameraPermissions();
  const [animationLineHeight, setAnimationLineHeight] = useState<number>(0);
  const [focusLineAnimation, setFocusLineAnimation] = useState<Animated.Value>(
    new Animated.Value(0),
  );

  const [capturedPhoto, setCapturedPhoto] = useState<string | undefined>(undefined);
  const cameraRef = useRef<Camera | null>(null);

  const [modelVerdict, setModelVerdict] = useState<number>(0);
  const dispatch = useAppDispatch();
  
  const user = useAppSelector((state) => state.users.selectedUser);

  const [isAnimating, setIsAnimating] = useState(true);
  const [zoom, setZoom] = useState(0);
  const [reuseModalVisible, setReuseModalVisible] = React.useState(false);

  // bottom sheet
  const bottomSheetRef = useRef(null);
  
  useEffect(() => {
    (async () => {
      if (!permissions) await requestPermission();
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setIsAnimating(true);
      setCapturedPhoto(null);
      setZoom(0);
      dispatch(cameraOpened());
  
      let animation: Animated.CompositeAnimation | undefined;
      if (isAnimating) {
        animation = Animated.loop(
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
        );
    
        animation.start();
      }
    
      return () => animation && animation.stop();
    }, [navigation, isAnimating]),
  );

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
        const options = { base64: true };
        const photo = await cameraRef.current.takePictureAsync(options);

        if (photo.uri) {

          const imageWidth = photo.width;
          const imageHeight = photo.height;

          // Define the cropping rectangle based on the image dimensions
          const cropRect = {
            originX: imageWidth * 0.175, 
            originY: imageHeight * 0.25, 
            width: imageWidth * 0.675, 
            height: imageHeight * 0.35, 
          };

          const croppedPhoto = await ImageManipulator.manipulateAsync(
            photo.uri,
            [{ crop: cropRect }],
            { base64: true }
          );
          console.log(croppedPhoto.base64);
          setCapturedPhoto(croppedPhoto.base64);

          setModelVerdict(1);

          // API call
          // const response = await fetch(`${REPLICATE_URL}`, {
          //   method: 'POST',
          //   headers: {
          //     'Authorization': `Bearer ${REPLICATE_API_TOKEN}`,
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify({
          //     version: `${REPLICATE_VERSION}`,
          //     input: {
          //       image: croppedPhoto.base64,
          //     },
          //   }),
          // });

          // if (!response.ok) {
          //   throw new Error(`HTTP error! status: ${response.status}`);
          // }
          // const data = await response.json();
          // console.log(response);
          // if (data.type) {
          //   setModelVerdict(data.type);
          //   bottomSheetRef.current?.open();
          // }
          bottomSheetRef.current?.open();
        } else {
          console.error('Failed to capture photo');
        }
      } catch (error) {
        console.error('Error taking picture:', error);
        alert('Failed to take picture. Please try again.'); // alert the user
      }
    }
  };

  const onPinchGestureEvent = (event: PinchGestureHandlerGestureEvent) => {
    const { scale } = event.nativeEvent;
    const newZoom = Math.min(Math.max(0, scale / 80), 1); // clamp zoom between 0 and 1
    setZoom(newZoom);
  };

  // camera page recylce icon
  const svgMarkup = `
  <svg xmlns="http://www.w3.org/2000/svg" width="144" height="133" viewBox="0 0 144 133" fill="none">
    <path d="M78.974 103.374L65.1143 116.507M65.1143 116.507L78.974 129.64M65.1143 116.507H127.483C129.691 116.399 131.84 115.793 133.75 114.738C135.66 113.683 137.275 112.21 138.462 110.442C139.649 108.675 140.373 106.664 140.573 104.578C140.772 102.492 140.442 100.39 139.61 98.4493L135.799 91.8828" stroke="white" stroke-opacity="0.9" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M54.8858 63.9789L49.8079 45.9688M49.8079 45.9688L30.857 50.7946M49.8079 45.9688L18.5936 97.3496C17.5872 99.2227 17.067 101.297 17.0762 103.4C17.0855 105.503 17.624 107.574 18.6468 109.439C19.6697 111.304 21.1471 112.909 22.9558 114.121C24.7645 115.333 26.8519 116.116 29.0439 116.405L36.9587 116.561" stroke="white" stroke-opacity="0.9" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M102.942 63.977L121.893 68.8028M121.893 68.8028L126.971 50.7927M121.893 68.8028L90.6789 17.422C89.4752 15.6572 87.8448 14.1917 85.9237 13.1478C84.0026 12.1039 81.8466 11.5119 79.6357 11.4212C77.4248 11.3305 75.2232 11.7438 73.2146 12.6265C71.206 13.5093 69.4488 14.8358 68.0896 16.4955L63.9899 22.9315" stroke="white" stroke-opacity="0.9" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

  /***************** Carousel *****************/

  const carouselSVG =
    '<svg width="141" height="129" viewBox="0 0 141 129" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g id="pol 3">\n<g id="Vector" filter="url(#filter0_i_2375_19914)">\n<path d="M49.6918 39.8521L20.441 91.0468C19.4998 92.9125 19.0182 94.9763 19.0364 97.0661C19.0545 99.1559 19.5718 101.211 20.5451 103.06C21.5185 104.909 22.9196 106.498 24.6317 107.695C26.3437 108.892 28.317 109.662 30.3868 109.941L37.8571 110.065" stroke="#1B453C" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>\n</g>\n<g id="Vector_2" filter="url(#filter1_i_2375_19914)">\n<path d="M64.4138 109.916H123.347C125.433 109.808 127.464 109.203 129.268 108.15C131.073 107.097 132.6 105.627 133.722 103.864C134.843 102.1 135.527 100.094 135.716 98.0118C135.904 95.9299 135.593 93.833 134.806 91.8962L131.205 85.3437M54.8273 57.4953L50.0341 39.5938L32.1445 44.3902" stroke="#1B453C" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>\n</g>\n<g id="Vector_3" filter="url(#filter2_i_2375_19914)">\n<path d="M118.567 62.1172L89.0999 11.0466C87.9632 9.29334 86.424 7.83758 84.6106 6.80075C82.7973 5.76392 80.7625 5.17609 78.6759 5.08632C76.5894 4.99654 74.5116 5.40742 72.616 6.28467C70.7205 7.16191 69.062 8.48009 67.7791 10.1292L63.9092 16.5245" stroke="#1B453C" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>\n</g>\n<g id="Vector_4" filter="url(#filter3_i_2375_19914)">\n<path d="M77.5104 96.8086L64.4141 109.914L77.5104 123.019" stroke="#1B453C" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>\n</g>\n<g id="Vector_5" filter="url(#filter4_i_2375_19914)">\n<path d="M101.688 57.2974L119.536 62.2492L124.484 44.3895" stroke="#1B453C" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>\n</g>\n</g>\n<defs>\n<filter id="filter0_i_2375_19914" x="14.0371" y="34.8516" width="40.6543" height="82.2148" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n<feOffset dy="2"/>\n<feGaussianBlur stdDeviation="3"/>\n<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>\n<feColorMatrix type="matrix" values="0 0 0 0 0.886275 0 0 0 0 0.898039 0 0 0 0 0.901961 0 0 0 1 0"/>\n<feBlend mode="normal" in2="shape" result="effect1_innerShadow_2375_19914"/>\n</filter>\n<filter id="filter1_i_2375_19914" x="27.1436" y="34.5938" width="113.626" height="82.3203" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n<feOffset dy="2"/>\n<feGaussianBlur stdDeviation="3"/>\n<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>\n<feColorMatrix type="matrix" values="0 0 0 0 0.886275 0 0 0 0 0.898039 0 0 0 0 0.901961 0 0 0 1 0"/>\n<feBlend mode="normal" in2="shape" result="effect1_innerShadow_2375_19914"/>\n</filter>\n<filter id="filter2_i_2375_19914" x="58.9082" y="0.0742188" width="64.6592" height="69.043" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n<feOffset dy="2"/>\n<feGaussianBlur stdDeviation="3"/>\n<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>\n<feColorMatrix type="matrix" values="0 0 0 0 0.886275 0 0 0 0 0.898039 0 0 0 0 0.901961 0 0 0 1 0"/>\n<feBlend mode="normal" in2="shape" result="effect1_innerShadow_2375_19914"/>\n</filter>\n<filter id="filter3_i_2375_19914" x="59.4141" y="91.8086" width="23.0967" height="38.2109" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n<feOffset dy="2"/>\n<feGaussianBlur stdDeviation="3"/>\n<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>\n<feColorMatrix type="matrix" values="0 0 0 0 0.886275 0 0 0 0 0.898039 0 0 0 0 0.901961 0 0 0 1 0"/>\n<feBlend mode="normal" in2="shape" result="effect1_innerShadow_2375_19914"/>\n</filter>\n<filter id="filter4_i_2375_19914" x="96.6885" y="39.3867" width="32.7959" height="29.8633" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n<feOffset dy="2"/>\n<feGaussianBlur stdDeviation="3"/>\n<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>\n<feColorMatrix type="matrix" values="0 0 0 0 0.886275 0 0 0 0 0.898039 0 0 0 0 0.901961 0 0 0 1 0"/>\n<feBlend mode="normal" in2="shape" result="effect1_innerShadow_2375_19914"/>\n</filter>\n</defs>\n</svg>\n';
  
  /**************** Done Carousel ****************/


  /**************** Nav functions ****************/
  const handleReusePress = () => {  
    if (modelVerdict == 1 || modelVerdict == 3 || modelVerdict >= 6) {  
      setIsAnimating(false);
      setReuseModalVisible(true);
    } else if (capturedPhoto && modelVerdict && user) {
      dispatch(createScan({ scannedBy: user.id, plasticNumber: modelVerdict, image: capturedPhoto, reused: true, recycled: false }));
      dispatch(reusedRedux());
      setIsAnimating(false);
      setCapturedPhoto(null);
      dispatch(cameraClosed());
      bottomSheetRef.current?.close();
      navigation.navigate(BaseTabRoutes.SCAN_COMPLETE, {});
    }
  };

  const selectButtonPressed = () => {
    if (capturedPhoto && modelVerdict && user) {
      dispatch(recycledRedux());
      dispatch(createScan({ scannedBy: user.id, plasticNumber: modelVerdict, image: capturedPhoto, reused: false, recycled: true }));
    }
    setIsAnimating(false);
    setCapturedPhoto(null);
    dispatch(cameraClosed());
    bottomSheetRef.current?.close();
    navigation.navigate(BaseTabRoutes.SCAN_COMPLETE, {});
  };

  const goToFrontPage = () => {
    setCapturedPhoto(null);
    setIsAnimating(false);
    dispatch(cameraClosed());
    navigation.navigate(BaseTabRoutes.HOME, {});
  };
  /**************** Done Nav functions ****************/

  return (
    <View style={styles.container}>
      <PinchGestureHandler
        onGestureEvent={onPinchGestureEvent}
      >
        <Camera style={styles.camera} type={type} ref={cameraRef} flashMode={Camera.Constants.FlashMode.auto} 
          autoFocus={Camera.Constants.AutoFocus.on} zoom={zoom}>
          <View style={styles.overlay}>
            <View style={styles.topContainer}>
              <View style={styles.backButtonContainer}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => goToFrontPage()}
                >
                  <Ionicons name="arrow-back-outline" size={36} color="white" />
                </TouchableOpacity>

              </View>
            </View>
            <View style={styles.cameraTextContainer}>
              <Text style={styles.cameraText}>
                {capturedPhoto ? 'Polymer captured, recognizing...' : 'Center the polymer icon'}
              </Text>
            </View>
            <View style={styles.middleContainer}>
              <View style={styles.unfocusedContainer}></View>
              <View
                onLayout={(e) =>
                  setAnimationLineHeight(e.nativeEvent.layout.height)
                }
                style={styles.focusedContainer}
              >
                {capturedPhoto ? (
                  <ActivityIndicator size="large" color="white" style={{ alignSelf: 'center', position:'absolute', bottom:'45%' }}/>
                ) : (
                  <>
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
                    <SvgXml xml={svgMarkup} style={{ position: 'absolute', right:'18.5%', bottom:'15.5%' }} width="70%" height="70%" />
                  </>
                )}
              </View>
              <View style={styles.unfocusedContainer}></View>
            </View>

            <View style={styles.bottomContainer}>
              <View style={styles.flipButtonContainer}>
                <TouchableOpacity
                  style={styles.flipButton}
                  onPress={toggleCameraType}
                >
                  <Ionicons
                    name="camera-reverse-outline"
                    size={36}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.captureButtonContainer}>
                <TouchableOpacity
                  style={styles.captureButton}
                  onPress={takePicture}
                ></TouchableOpacity>
              </View>
            </View>
          </View>
        </Camera>
      </PinchGestureHandler>
      <RBSheet
        ref={bottomSheetRef}
        height={350}
        openDuration={250}
        closeDuration={200}
        closeOnDragDown={false}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          container: {
            backgroundColor: '#FBFBF4',
            justifyContent: 'center',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          // only shows up when closeOnDragDown is true
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
      >
        <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 20, borderColor: 'black', marginTop:12 }}>
            
          <View style={{ justifyContent:'center', alignItems:'center', borderColor:'black', width: '50%', maxHeight: '40%', marginBottom: 8, marginTop:20  }}>
            <SvgXml
              style={styles.bottomSheetsvg}
              xml={carouselSVG}
              width="105%"
              height="105%"
            />
            <Text style={[styles.bottomSheetTitle]}>{modelVerdict}</Text>
          </View>
          <Text style={{ fontSize: 16, color: '#1B453C', marginBottom: 20 }}>
            {plasticTypes[modelVerdict as keyof typeof plasticTypes]}
          </Text>
          
          <TouchableOpacity
            style={[styles.bottomSheetSelectButton, { backgroundColor: '#1B453C', marginBottom: 14 }]}
            onPress={handleReusePress}
          >
            <Text style={styles.bottomSheetSelectButtonText}>I'M REUSING</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.bottomSheetSelectButton, { borderColor: '#1B453C', borderWidth: 1, backgroundColor: 'transparent' }]}
            // disabled={isModelRunning}
            onPress={selectButtonPressed}
          >
            <Text style={[styles.bottomSheetSelectButtonText, { color: '#1B453C' }]}>I'M RECYCLING</Text>
          </TouchableOpacity>
        </View>
        <ReuseWarningModal 
          modalVisible={reuseModalVisible} 
          setModalVisible={setReuseModalVisible} 
          plasticType={modelVerdict} 
        />
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FBFBF4',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  backButtonContainer: {
    position: 'absolute',
    left: '3%',
    borderColor: 'red',
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: 'transparent',
  },
  manualEntryButtonContainer: {
    position: 'absolute',
    right: '5%',
  },
  manualEntryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(218, 229, 215, 0.83)',
  },
  manualEntryText: {
    color: '#1B453C',
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: -0.2,
  },
  flipButtonContainer: {
    position: 'absolute',
    right: '8%',
  },
  flipButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255,255,255,0.7)',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContainer: {
    flexDirection: 'row',
    flex: 1.5,
    paddingBottom: -40,
    // justifyContent: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 10,
    marginBottom: 80,
  },
  bottomContainer: {
    flexDirection: 'row',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 100,
    marginBottom: 60,
  },
  focusedContainer: {
    flex: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.20)',
    alignContent: 'center',
    // justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.20)',
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
  captureButtonContainer: {
    position: 'absolute',
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
  bottomSheetsvg: {
    position: 'relative',
    right: '4.5%',
  },
  bottomSheetSelectButton: {
    justifyContent: 'center',
    width: 180,
    height: 46,
    backgroundColor: '#1B453C',
    borderRadius: 10,
    borderWidth: 1,
  },
  bottomSheetSelectButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 14,
    letterSpacing: -0.3,
    textTransform: 'uppercase',
  },
  bottomSheetTitle: {
    fontSize: 35,
    color: '#1B453C',
    fontWeight: 'bold',
    position: 'absolute',
  },
  cameraTextContainer: {
    marginBottom: 12, 
  },
  cameraText: {
    color: '#FFF',
    textAlign: 'center',
    // fontFamily: 'Inter',
    fontSize: 21,
    fontWeight: '500',
    letterSpacing: -0.3,
    alignContent: 'center',
    alignSelf:'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    color: '#1B453C',
    fontWeight: 'bold',
    position: 'absolute',
  },
  svg: {
    position: 'relative',
    right: '5.5%',
    bottom: '1%',
    color: 'black',
  },
});

export default CameraPage;
