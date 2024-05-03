/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-len */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';
import { cameraClosed, cameraOpened } from 'redux/slices/cameraSlice';
import { createScan } from 'redux/slices/usersSlice';
import { BaseTabRoutes, BaseNavigationList } from 'navigation/routeTypes';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';

// components
import TextStyles from 'utils/TextStyles';
import Carousel from 'react-native-snap-carousel';
import CircleBG from '../../../assets/Ellipse 66.svg';

type UnknownInfoPageProps = {
  navigation: StackNavigationProp<BaseNavigationList>;
};

type carouselItem = {
  plasticNumber: number;
};
  type renderItem = {
    item: carouselItem;
    index: number;
  };

const UnknownInfoPage = ({ navigation }: UnknownInfoPageProps ) => {
  const dispatch = useAppDispatch();
  // use user slice user instead of auth slice user?
  const user = useAppSelector((state) => state.users.selectedUser);
  
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

  const plasticTypes2 = {
    1: 'PET',
    2: 'HDPE',
    3: 'PVC',
    4: 'LDPE',
    5: 'PP',
    6: 'PS',
    7: 'Other',
    8: 'Unknown',
  };

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
        <Text style={[TextStyles.subTitle, { fontSize: 32, marginLeft:20, marginTop:8, marginBottom:0 }]}>Your plastic is most likely:</Text>
      </View>
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
    marginHorizontal: 10,
  },
  text: {
    color: '#1B453C',
    textAlign: 'center',
    fontSize: 25,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 35,
    letterSpacing: -0.3,
  },
  middleContainer: {
    marginTop: 40,
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
    color: 'black',
  },
  selectButtonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
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