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
  Image,
} from 'react-native';
import FormatStyle from '../../../utils/FormatStyle';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import * as tf from '@tensorflow/tfjs-react-native';
import * as tfjs from '@tensorflow/tfjs';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';
import { cameraClosed, cameraOpened } from 'redux/slices/cameraSlice';
import { RootState } from 'redux/store';
import { BaseTabRoutes, BaseNavigationList } from 'navigation/routeTypes';
import type { StackNavigationProp } from '@react-navigation/stack';

// components
import RBSheet from 'react-native-raw-bottom-sheet';
import Carousel from 'react-native-snap-carousel';

// line animation source: https://medium.com/@vivekjoy/creating-a-barcode-scanner-using-expo-barcode-scanner-in-a-react-native-cli-project-2d36a235ab41

type CameraPageProps = {
  navigation: StackNavigationProp<BaseNavigationList>;
};
type carouselItem = {
  plasticNumber: number;
};
type renderItem = {
  item: carouselItem;
  index: number;
};

const CameraPage = ({ navigation }: CameraPageProps) => {
  const [type, setType] = useState<CameraType>(CameraType.back);
  const [permissions, requestPermission] = Camera.useCameraPermissions();

  const [animationLineHeight, setAnimationLineHeight] = useState<number>(0);
  const [focusLineAnimation, setFocusLineAnimation] = useState<Animated.Value>(
    new Animated.Value(0),
  );

  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const cameraRef = useRef<Camera | null>(null);

  const [modelVerdict, setModelVerdict] = useState<number | null>(null);
  const model = useAppSelector((state: RootState) => state.model.model);
  const dispatch = useAppDispatch();

  const [manualEntryMode, setManualEntryMode] = useState<boolean>(false);

  /**************** Button sheet ****************/
  const bottomSheetRef = useRef(null);
  useEffect(() => {
    (async () => {
      if (!permissions) await requestPermission();
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(cameraOpened());
      console.log('CameraPage was focused');
    }, []),
  );

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
  });

  useEffect(() => {
    console.log(model);
    const classifyImage = async () => {
      if (capturedPhoto && model) {
        try {
          console.log('classifying image');
          // // Load image
          // const response = await fetch(capturedPhoto);
          // const imageDataArrayBuffer = await response.arrayBuffer();
          // const imageTensor = tf.decodeJpeg(new Uint8Array(imageDataArrayBuffer), 3);

          // // Preprocess image
          // const resizedImage = tfjs.image.resizeBilinear(imageTensor, [200, 200]);
          // const batchedImage = resizedImage.expandDims(0);

          // // Classify image
          // const prediction = await model.predict(batchedImage);
          // console.log('Prediction', prediction);
          //TODO: need to change
          setModelVerdict(1);
          bottomSheetRef.current?.open();
        } catch (error) {
          console.error('Error classifying image:', error);
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

  // camera page recylce icon
  const svgMarkup = `
  <svg xmlns="http://www.w3.org/2000/svg" width="144" height="133" viewBox="0 0 144 133" fill="none">
    <path d="M78.974 103.374L65.1143 116.507M65.1143 116.507L78.974 129.64M65.1143 116.507H127.483C129.691 116.399 131.84 115.793 133.75 114.738C135.66 113.683 137.275 112.21 138.462 110.442C139.649 108.675 140.373 106.664 140.573 104.578C140.772 102.492 140.442 100.39 139.61 98.4493L135.799 91.8828" stroke="white" stroke-opacity="0.9" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M54.8858 63.9789L49.8079 45.9688M49.8079 45.9688L30.857 50.7946M49.8079 45.9688L18.5936 97.3496C17.5872 99.2227 17.067 101.297 17.0762 103.4C17.0855 105.503 17.624 107.574 18.6468 109.439C19.6697 111.304 21.1471 112.909 22.9558 114.121C24.7645 115.333 26.8519 116.116 29.0439 116.405L36.9587 116.561" stroke="white" stroke-opacity="0.9" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M102.942 63.977L121.893 68.8028M121.893 68.8028L126.971 50.7927M121.893 68.8028L90.6789 17.422C89.4752 15.6572 87.8448 14.1917 85.9237 13.1478C84.0026 12.1039 81.8466 11.5119 79.6357 11.4212C77.4248 11.3305 75.2232 11.7438 73.2146 12.6265C71.206 13.5093 69.4488 14.8358 68.0896 16.4955L63.9899 22.9315" stroke="white" stroke-opacity="0.9" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;
  // const _BottomSheetRenderItem = ({ item, index }: renderItem) => {
  //   return (
  //     <View style={manualEntryStyles.slide}>
  //       <SvgXml
  //         style={manualEntryStyles.svg}
  //         xml={svgMarkup}
  //         width="105%"
  //         height="105%"
  //       />
  //       <Text style={manualEntryStyles.title}>{item.plasticNumber}</Text>
  //     </View>
  //   );
  // };

  /***************** Carousel *****************/

  const carouselSVG =
    '<svg width="141" height="129" viewBox="0 0 141 129" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g id="pol 3">\n<g id="Vector" filter="url(#filter0_i_2375_19914)">\n<path d="M49.6918 39.8521L20.441 91.0468C19.4998 92.9125 19.0182 94.9763 19.0364 97.0661C19.0545 99.1559 19.5718 101.211 20.5451 103.06C21.5185 104.909 22.9196 106.498 24.6317 107.695C26.3437 108.892 28.317 109.662 30.3868 109.941L37.8571 110.065" stroke="#1B453C" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>\n</g>\n<g id="Vector_2" filter="url(#filter1_i_2375_19914)">\n<path d="M64.4138 109.916H123.347C125.433 109.808 127.464 109.203 129.268 108.15C131.073 107.097 132.6 105.627 133.722 103.864C134.843 102.1 135.527 100.094 135.716 98.0118C135.904 95.9299 135.593 93.833 134.806 91.8962L131.205 85.3437M54.8273 57.4953L50.0341 39.5938L32.1445 44.3902" stroke="#1B453C" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>\n</g>\n<g id="Vector_3" filter="url(#filter2_i_2375_19914)">\n<path d="M118.567 62.1172L89.0999 11.0466C87.9632 9.29334 86.424 7.83758 84.6106 6.80075C82.7973 5.76392 80.7625 5.17609 78.6759 5.08632C76.5894 4.99654 74.5116 5.40742 72.616 6.28467C70.7205 7.16191 69.062 8.48009 67.7791 10.1292L63.9092 16.5245" stroke="#1B453C" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>\n</g>\n<g id="Vector_4" filter="url(#filter3_i_2375_19914)">\n<path d="M77.5104 96.8086L64.4141 109.914L77.5104 123.019" stroke="#1B453C" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>\n</g>\n<g id="Vector_5" filter="url(#filter4_i_2375_19914)">\n<path d="M101.688 57.2974L119.536 62.2492L124.484 44.3895" stroke="#1B453C" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>\n</g>\n</g>\n<defs>\n<filter id="filter0_i_2375_19914" x="14.0371" y="34.8516" width="40.6543" height="82.2148" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n<feOffset dy="2"/>\n<feGaussianBlur stdDeviation="3"/>\n<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>\n<feColorMatrix type="matrix" values="0 0 0 0 0.886275 0 0 0 0 0.898039 0 0 0 0 0.901961 0 0 0 1 0"/>\n<feBlend mode="normal" in2="shape" result="effect1_innerShadow_2375_19914"/>\n</filter>\n<filter id="filter1_i_2375_19914" x="27.1436" y="34.5938" width="113.626" height="82.3203" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n<feOffset dy="2"/>\n<feGaussianBlur stdDeviation="3"/>\n<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>\n<feColorMatrix type="matrix" values="0 0 0 0 0.886275 0 0 0 0 0.898039 0 0 0 0 0.901961 0 0 0 1 0"/>\n<feBlend mode="normal" in2="shape" result="effect1_innerShadow_2375_19914"/>\n</filter>\n<filter id="filter2_i_2375_19914" x="58.9082" y="0.0742188" width="64.6592" height="69.043" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n<feOffset dy="2"/>\n<feGaussianBlur stdDeviation="3"/>\n<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>\n<feColorMatrix type="matrix" values="0 0 0 0 0.886275 0 0 0 0 0.898039 0 0 0 0 0.901961 0 0 0 1 0"/>\n<feBlend mode="normal" in2="shape" result="effect1_innerShadow_2375_19914"/>\n</filter>\n<filter id="filter3_i_2375_19914" x="59.4141" y="91.8086" width="23.0967" height="38.2109" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n<feOffset dy="2"/>\n<feGaussianBlur stdDeviation="3"/>\n<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>\n<feColorMatrix type="matrix" values="0 0 0 0 0.886275 0 0 0 0 0.898039 0 0 0 0 0.901961 0 0 0 1 0"/>\n<feBlend mode="normal" in2="shape" result="effect1_innerShadow_2375_19914"/>\n</filter>\n<filter id="filter4_i_2375_19914" x="96.6885" y="39.3867" width="32.7959" height="29.8633" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n<feOffset dy="2"/>\n<feGaussianBlur stdDeviation="3"/>\n<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>\n<feColorMatrix type="matrix" values="0 0 0 0 0.886275 0 0 0 0 0.898039 0 0 0 0 0.901961 0 0 0 1 0"/>\n<feBlend mode="normal" in2="shape" result="effect1_innerShadow_2375_19914"/>\n</filter>\n</defs>\n</svg>\n';

  let _carousel: Carousel<carouselItem> | null = null;

  const _renderItem = ({ item, index }: renderItem) => {
    return (
      <View style={manualEntryStyles.slide}>
        <SvgXml
          style={manualEntryStyles.svg}
          xml={carouselSVG}
          width="105%"
          height="105%"
        />
        <Text style={manualEntryStyles.title}>{item.plasticNumber}</Text>
      </View>
    );
  };

  const carouselItems: Array<carouselItem> = Array.from(
    { length: 7 },
    (_, i) => ({ plasticNumber: i + 1 }),
  );

  const getCarouselIndex = (): number => {
    if (_carousel) {
      return _carousel.currentIndex;
    }
    return -1;
  };

  /**************** Done Carousel ****************/


  /**************** Nav functions ****************/
  const selectButtonPressed = () => {
    const plasticNum = getCarouselIndex() + 1;
    console.log('Selected plastic number: ', plasticNum);

    setModelVerdict(plasticNum);
    setManualEntryMode(false);

    //TODO: Send API request to backend with plastic number, plastic letter, and userID
    dispatch(cameraClosed());
    navigation.navigate(BaseTabRoutes.SCAN_COMPLETE, {});
  };

  const ManualEntryPage = () => {
    return (
      <View style={manualEntryStyles.container}>
        <View style={manualEntryStyles.topContainer}>
          <View style={manualEntryStyles.backButtonContainer}>
            <TouchableOpacity
              style={manualEntryStyles.backButton}
              onPress={() => {
                setManualEntryMode(false);
              }}
            >
              <Ionicons name="arrow-back-outline" size={36} color="#1B453C" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={manualEntryStyles.textContainer}>
          <Text style={manualEntryStyles.text}>
            Manually enter the polymer on your plastic
          </Text>
        </View>
        <View style={manualEntryStyles.middleContainer}>
          <View style={manualEntryStyles.carouselContainer}>
            <Carousel
              ref={(c) => {
                _carousel = c;
              }}
              data={carouselItems}
              renderItem={_renderItem}
              sliderWidth={450}
              itemHeight={200}
              itemWidth={150}
              enableSnap={true}
              enableMomentum={true}
            />
          </View>
          <View style={manualEntryStyles.selectButtonContainer}>
            <TouchableOpacity
              style={manualEntryStyles.selectButton}
              onPress={() => {
                selectButtonPressed();
              }}
            >
              <Text style={manualEntryStyles.selectButtonText}>SELECT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const goToFrontPage = () => {
    dispatch(cameraClosed());
    console.log('camera closed');
    navigation.navigate(BaseTabRoutes.FRONT, {});
  };
  /**************** Done Nav functions ****************/

  return (
    manualEntryMode ? (
      <ManualEntryPage />
    ) : (
      <View style={styles.container}>
        <Camera style={styles.camera} type={type} ref={cameraRef}>
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
              <View style={styles.manualEntryButtonContainer}>
                <TouchableOpacity
                  style={styles.manualEntryButton}
                  onPress={() => {
                    setManualEntryMode(true);
                  }}
                >
                  <Text style={styles.manualEntryText}>Manually Enter</Text>
                </TouchableOpacity>
              </View>
            </View>
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
        {/* {capturedPhoto && (
          <View style={styles.previewContainer}>
            <Image
              source={{ uri: capturedPhoto }}
              style={styles.previewImage}
            />
          </View>
        )} */}
        <RBSheet
          ref={bottomSheetRef}
          height={300}
          openDuration={250}
          closeDuration={200}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            container: {
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FBFBF4',
            },
          }}
        >
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            
            <View style={manualEntryStyles.container}>
              <View style={manualEntryStyles.slide}>
                <SvgXml
                  style={manualEntryStyles.svg}
                  xml={svgMarkup}
                  width="105%"
                  height="105%"
                />
                <Text style={manualEntryStyles.title}>{modelVerdict}</Text>
              </View>
              <Text style={manualEntryStyles.title}>{`Plastic Type: ${modelVerdict}`}</Text>
            </View>
          
            <TouchableOpacity
              style={[manualEntryStyles.selectButton, { backgroundColor: '#1B453C' }]}
              onPress={() => {
                setManualEntryMode(false);
                dispatch(cameraClosed());
                navigation.navigate(BaseTabRoutes.SCAN_COMPLETE);
                // TODO: add integrate backend api here
                bottomSheetRef.current?.close();
              }}
            >
              <Text style={manualEntryStyles.selectButtonText}>Add to Diary</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[manualEntryStyles.selectButton, { borderColor: '#1B453C', borderWidth: 1, backgroundColor: 'transparent' }]}
              onPress={() => {
                setManualEntryMode(true);
                bottomSheetRef.current?.close();
              }}
            >
              <Text style={[manualEntryStyles.selectButtonText, { color: '#1B453C' }]}>Wrong Symbol</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </View>
    )
  );
};

const manualEntryStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backButtonContainer: {
    position: 'absolute',
    left: '4%',
    borderColor: '#1B453C',
    borderWidth: 1,
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 40,
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  textContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  text: {
    color: '#1B453C',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '400',
    lineHeight: 35,
    letterSpacing: -0.3,
  },
  middleContainer: {
    marginTop: 60,

    height: '50%',
  },
  carouselContainer: {
    margin: 20,
    flex: 1,
    maxHeight: '50%',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  selectButtonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectButton: {
    justifyContent: 'center',
    width: 200,
    height: 60,
    backgroundColor: '#1B453C',
    borderRadius: 10,
    borderWidth: 1,
  },
  selectButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 25,
    fontWeight: '500',
    letterSpacing: -0.1,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
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
  },
  middleContainer: {
    flexDirection: 'row',
    flex: 1.5,
    paddingBottom: -40,
  },
  topContainer: {
    flexDirection: 'row',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 40,
    marginBottom: 100,
  },
  bottomContainer: {
    flexDirection: 'row',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 100,
    marginBottom: 60,
  },
  focusedContainer: {
    flex: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.20)',
    // justifyContent: 'center',
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
});

export default CameraPage;
