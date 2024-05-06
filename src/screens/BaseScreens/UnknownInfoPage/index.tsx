/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-len */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';
import { cameraClosed, cameraOpened } from 'redux/slices/cameraSlice';
import { BaseTabRoutes, BaseNavigationList } from 'navigation/routeTypes';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
// components
import TextStyles from 'utils/TextStyles';
import Colors from 'utils/Colors';

type UnknownInfoPageProps = {
  navigation: StackNavigationProp<BaseNavigationList>;
  route: RouteProp<BaseNavigationList, BaseTabRoutes.UNKNOWN_PLASTIC>;
};

const plasticTypeNumbers = {
  'first': 1,
  'second': 2,
  'third': 3,
  'fourth': 4,
  'fifth': 5,
  'sixth': 6,
  'seventh': 7,
  'eighth': 8,
};

const plasticTypes = {
  'first': 'Polyethylene Terephthalate',
  'second': 'High-Density Polyethylene',
  'third': 'Polyvinyl Chloride',
  'fourth': 'Low-Density Polyethylene',
  'fifth': 'Polypropylene',
  'sixth': 'Polystyrene',
  'seventh': 'Miscellaneous/Other',
  'eighth': 'Unknown',
};

const UnknownInfoPage = ({ navigation, route }: UnknownInfoPageProps ) => {
  const dispatch = useAppDispatch();
  // use user slice user instead of auth slice user?
  const user = useAppSelector((state) => state.users.selectedUser);
  type PlasticTypeKey = 'first' | 'second' | 'third' | 'fourth' | 'fifth' | 'sixth' | 'seventh' | 'eighth';
  const selectedValue: PlasticTypeKey = 'first' as PlasticTypeKey;
  // const selectedValue: PlasticTypeKey = route.params?.selectedValue ?? 'first' as PlasticTypeKey;

  /**************** Nav functions ****************/
  const selectButtonPressed = () => {
    // if (user) {
    //   // redux
    // }
    dispatch(cameraClosed());
    navigation.navigate(BaseTabRoutes.SCAN_COMPLETE, {});
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(cameraOpened());
      return () => {};
    }, [dispatch]),
  );

  const plasticMessages = {
    first: 'This plastic type is the currently most recycled in the world! Check labels to confirm.',
    third: 'This plastic type has a very low recycling rate; it is not typically recycled. Check labels to confirm.',
    second: 'This plastic type is usually recyclable. Check labels on item to confirm. ',
    fourth: 'This is a recyclable polymer, however its recycling rate is low. Check labels to confirm.',
    fifth: 'This polymer is a widely recycled polymer. Check labels to confirm.',
    sixth: 'This polymer is not recycled. Check labels to confirm.',
    seventh: 'This polymer is not recycled. Check labels to confirm.',
    default: 'This polymer is not recycled. Check labels to confirm.',
  };
  
  // const message = plasticMessages[selectedValue] || plasticMessages.default;
  const message = plasticMessages[selectedValue];
  
  const carouselSVG =
  '<svg width="141" height="129" viewBox="0 0 141 129" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g id="pol 3">\n<g id="Vector" filter="url(#filter0_i_2375_19914)">\n<path d="M49.6918 39.8521L20.441 91.0468C19.4998 92.9125 19.0182 94.9763 19.0364 97.0661C19.0545 99.1559 19.5718 101.211 20.5451 103.06C21.5185 104.909 22.9196 106.498 24.6317 107.695C26.3437 108.892 28.317 109.662 30.3868 109.941L37.8571 110.065" stroke="#1B453C" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>\n</g>\n<g id="Vector_2" filter="url(#filter1_i_2375_19914)">\n<path d="M64.4138 109.916H123.347C125.433 109.808 127.464 109.203 129.268 108.15C131.073 107.097 132.6 105.627 133.722 103.864C134.843 102.1 135.527 100.094 135.716 98.0118C135.904 95.9299 135.593 93.833 134.806 91.8962L131.205 85.3437M54.8273 57.4953L50.0341 39.5938L32.1445 44.3902" stroke="#1B453C" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>\n</g>\n<g id="Vector_3" filter="url(#filter2_i_2375_19914)">\n<path d="M118.567 62.1172L89.0999 11.0466C87.9632 9.29334 86.424 7.83758 84.6106 6.80075C82.7973 5.76392 80.7625 5.17609 78.6759 5.08632C76.5894 4.99654 74.5116 5.40742 72.616 6.28467C70.7205 7.16191 69.062 8.48009 67.7791 10.1292L63.9092 16.5245" stroke="#1B453C" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>\n</g>\n<g id="Vector_4" filter="url(#filter3_i_2375_19914)">\n<path d="M77.5104 96.8086L64.4141 109.914L77.5104 123.019" stroke="#1B453C" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>\n</g>\n<g id="Vector_5" filter="url(#filter4_i_2375_19914)">\n<path d="M101.688 57.2974L119.536 62.2492L124.484 44.3895" stroke="#1B453C" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>\n</g>\n</g>\n<defs>\n<filter id="filter0_i_2375_19914" x="14.0371" y="34.8516" width="40.6543" height="82.2148" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n<feOffset dy="2"/>\n<feGaussianBlur stdDeviation="3"/>\n<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>\n<feColorMatrix type="matrix" values="0 0 0 0 0.886275 0 0 0 0 0.898039 0 0 0 0 0.901961 0 0 0 1 0"/>\n<feBlend mode="normal" in2="shape" result="effect1_innerShadow_2375_19914"/>\n</filter>\n<filter id="filter1_i_2375_19914" x="27.1436" y="34.5938" width="113.626" height="82.3203" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n<feOffset dy="2"/>\n<feGaussianBlur stdDeviation="3"/>\n<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>\n<feColorMatrix type="matrix" values="0 0 0 0 0.886275 0 0 0 0 0.898039 0 0 0 0 0.901961 0 0 0 1 0"/>\n<feBlend mode="normal" in2="shape" result="effect1_innerShadow_2375_19914"/>\n</filter>\n<filter id="filter2_i_2375_19914" x="58.9082" y="0.0742188" width="64.6592" height="69.043" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n<feOffset dy="2"/>\n<feGaussianBlur stdDeviation="3"/>\n<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>\n<feColorMatrix type="matrix" values="0 0 0 0 0.886275 0 0 0 0 0.898039 0 0 0 0 0.901961 0 0 0 1 0"/>\n<feBlend mode="normal" in2="shape" result="effect1_innerShadow_2375_19914"/>\n</filter>\n<filter id="filter3_i_2375_19914" x="59.4141" y="91.8086" width="23.0967" height="38.2109" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n<feOffset dy="2"/>\n<feGaussianBlur stdDeviation="3"/>\n<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>\n<feColorMatrix type="matrix" values="0 0 0 0 0.886275 0 0 0 0 0.898039 0 0 0 0 0.901961 0 0 0 1 0"/>\n<feBlend mode="normal" in2="shape" result="effect1_innerShadow_2375_19914"/>\n</filter>\n<filter id="filter4_i_2375_19914" x="96.6885" y="39.3867" width="32.7959" height="29.8633" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n<feOffset dy="2"/>\n<feGaussianBlur stdDeviation="3"/>\n<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>\n<feColorMatrix type="matrix" values="0 0 0 0 0.886275 0 0 0 0 0.898039 0 0 0 0 0.901961 0 0 0 1 0"/>\n<feBlend mode="normal" in2="shape" result="effect1_innerShadow_2375_19914"/>\n</filter>\n</defs>\n</svg>\n';


  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              dispatch(cameraClosed());
              navigation.navigate(BaseTabRoutes.HOME, {});
            }}
          >
            <Ionicons name="arrow-back-outline" size={36} color="#1B453C" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={[TextStyles.subTitle, { fontSize: 30, marginLeft:20 }]}>Your plastic is most likely:</Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 20, marginTop:'14%' }}>
        <Text style={[TextStyles.subTitle, { fontSize: 34, marginLeft:20, marginBottom:8 }]}>
          {plasticTypes[selectedValue]}
        </Text>
        <Text style={[TextStyles.regular, { fontSize: 20, marginTop:0, marginHorizontal: 18, textAlign: 'center' }]}>
          {message}
        </Text>
      </View>
      <View style={styles.svgContainer}>
        <SvgXml
          style={styles.svg}
          xml={carouselSVG}
          width="70%"
          height="70%"
        />
      </View>
      <Text style={styles.svgTitle}>{plasticTypeNumbers[selectedValue]}</Text>

      <View style={styles.middleContainer}>
        <View style={styles.selectButtonContainer}>
          <TouchableOpacity
            style={[styles.bottomSheetSelectButton, { backgroundColor: '#1B453C', marginBottom: 14 }]}
            onPress={() => {
              selectButtonPressed();
            }}
          >
            <Text style={styles.bottomSheetSelectButtonText}>I'M REUSING</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.bottomSheetSelectButton, { borderColor: '#1B453C', borderWidth: 1, backgroundColor: 'transparent' }]}
            onPress={() => {
              // REDUX HERE
              selectButtonPressed();
            }}
          >
            <Text style={[styles.bottomSheetSelectButtonText, { color: '#1B453C' }]}>I'M RECYCLING</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FBFBF4',
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
    marginLeft:6,
  },
  middleContainer: {
    marginTop: 40,
    height: '50%',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    // flex: 1,
    // backgroundColor:'blue',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxHeight:'30%',
    marginTop:0,
  },
  svg: {
    position: 'relative',
    right: '3%',
    bottom: '0%',
  },
  svgTitle: {
    fontSize: 34,
    color: Colors.primary.dark,
    fontWeight: 'bold',
    right: '49%',
    bottom: '36%',
    position: 'absolute',
  },
  selectButtonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
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
});

export default UnknownInfoPage;