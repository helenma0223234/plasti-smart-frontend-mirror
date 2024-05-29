import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet, Dimensions, Animated } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { TouchableOpacity } from 'react-native';
import { setAvatarFirstTime } from '../../../redux/slices/usersSlice';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import FormatStyle from '../../../utils/FormatStyle';
import TextStyles from '../../../utils/TextStyles';
import GoRightButton from '../../../assets/GoRightButton.svg';
import GoLeftButton from '../../../assets/GoLeftButton.svg';
import { BaseTabRoutes } from 'navigation/routeTypes';
import { useNavigation } from '@react-navigation/native';
import NavType from 'utils/NavType';
import { cameraClosed, cameraOpened } from 'redux/slices/cameraSlice';
import { createDefaultNotificationSettings, updateNotificationSettings } from 'redux/slices/notificationSlice';
import Avatar from '../../../components/Avatar';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from 'components/Notifications/registerNotifications';
import { scheduleAvatarPushNotification, scheduleDailyGoalPushNotification } from 'components/Notifications/pushNotifications';

// for device ID
import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const avatarContainerHeight = screenHeight * 0.3;

type carouselItem = {
  avatarID: number;
};
type renderItem = {
  item: carouselItem;
  index: number;
};

const carouselData: Array<carouselItem> = Array.from({ length: 4 }, (_, i) => ({ avatarID: i + 1 }));

const MascotPage = () => {
  const navigation = useNavigation<NavType>();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  dispatch(cameraOpened());

  const { id, email } = user || { id: '', email: '' };
  const userData = useAppSelector((state) => state.users.selectedUser);
  const [activeIndex, setActiveIndex] = useState(0);
  const animatedValues = useRef(carouselData.map(() => new Animated.Value(0))).current;
  const carouselRef = useRef(null);

  useEffect(() => {
    // Animate the active index size change
    animatedValues.forEach((animatedValue, index) => {
      Animated.timing(animatedValue, {
        toValue: index === activeIndex ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
  }, [activeIndex]);


  // CITE: source code for generating uuid for a device: https://stackoverflow.com/questions/46863644/expo-get-unique-device-id-without-ejecting
  const handleUpdateUser = async () => {
    if (user) {
      dispatch(setAvatarFirstTime({ id: user.id, avatarID: activeIndex + 1 }));
      // also init the notification settings and device ID
      dispatch(createDefaultNotificationSettings({ userID: user.id }));
      let deviceID = await SecureStore.getItemAsync('secure_deviceid');
      if (!deviceID) {
        try {
          const uuid = uuidv4();
          await SecureStore.setItemAsync('secure_deviceid', uuid);
          deviceID = await SecureStore.getItemAsync('secure_deviceid');
        } catch (error) {
          console.error('Error generating UUID:', error);
        }
      }
      
      // set up notifications
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldPlaySound: false,
          shouldSetBadge: false,
          shouldShowAlert: true,
        }),
      });
      // register for notifications
      registerForPushNotificationsAsync()
        .catch(error => {
          console.error(error);
        });
      // update device id
      dispatch(updateNotificationSettings({ userID: user.id, deviceID: deviceID ?? undefined }));
      
      // schedule both avatar and daily goal notifications as default
      scheduleAvatarPushNotification(8, 0);
      scheduleDailyGoalPushNotification(16, 0);
    }
    dispatch(cameraClosed());
  };

  const animateToIndex = (index: number) => {
    animatedValues.forEach((animatedValue, i) => {
      Animated.timing(animatedValue, {
        toValue: i === index ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
  };

  const _carousel: Carousel<carouselItem> | null = null;

  const _renderItem = ({ item, index }: renderItem) => {
    const size = animatedValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: [screenWidth * 0.3, screenWidth * 0.4],
    });

    return (
      <Animated.View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', width: size, height: size }}>
        <AnimatedAvatar avatarID={item.avatarID} color={1} accessory={-1} size={size} shadow={true} />
      </Animated.View>
    );
  };

  const getCarouselIndex = (): number => {
    if (_carousel) {
      return _carousel.currentIndex;
    }
    return -1;
  };

  const goPrev = () => {
    const newIndex = activeIndex > 0 ? activeIndex - 1 : carouselData.length - 1;
    setActiveIndex(newIndex);
    animateToIndex(newIndex);
    carouselRef.current.snapToItem(newIndex);
  };

  const goNext = () => {
    const newIndex = activeIndex < carouselData.length - 1 ? activeIndex + 1 : 0;
    setActiveIndex(newIndex);
    animateToIndex(newIndex);
    carouselRef.current.snapToItem(newIndex);
  };

  return (
    <SafeAreaView style={[FormatStyle.topContainer, { justifyContent: 'space-around' }]}>
      <View style={{ justifyContent: 'space-around', alignItems: 'center', flexDirection:'column' }}>
        <View style={{ width:screenWidth * 0.85, minHeight: screenHeight * 0.15 }}>
          <Text style={[TextStyles.subTitle, { textAlign: 'center', fontSize: screenHeight * 0.0375, fontFamily: 'Inter_600SemiBold' }]}>Choose your mascot</Text>
          <Text style={[TextStyles.regular, { textAlign:'center', fontSize:screenHeight * 0.0225, fontFamily: 'Inter_500Medium', marginTop: 10 }]}>
            This will be your adventure pal! Don’t worry, you can always make changes later</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Carousel
            ref={carouselRef}
            layout={'default'}
            data={carouselData}
            sliderWidth={screenWidth}
            itemWidth={screenWidth * 0.5}
            renderItem={_renderItem}
            onSnapToItem={index => {
              setActiveIndex(index);
              animateToIndex(index);
            }}
            enableSnap={true}
            enableMomentum={true}
          />
          <TouchableOpacity style={{ position: 'absolute', left: screenWidth * 0.19, bottom: avatarContainerHeight * 0.4, zIndex:1 }} onPress={goPrev}>
            <GoLeftButton  width={screenWidth * 0.1} height={screenWidth * 0.1}/>
          </TouchableOpacity>
          <TouchableOpacity style={{ position: 'absolute', right: screenWidth * 0.19, bottom: avatarContainerHeight * 0.4, zIndex:1 }} onPress={goNext}>
            <GoRightButton  width={screenWidth * 0.1} height={screenWidth * 0.1}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            handleUpdateUser();
            dispatch(cameraClosed());
            navigation.navigate(BaseTabRoutes.HOME, {});
          }}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

interface AnimatedAvatarProps {
  avatarID: number;
  color: number;
  accessory: number;
  size: Animated.AnimatedInterpolation;
  shadow: boolean;
}

const AnimatedAvatar = ({ avatarID, color, accessory, size, shadow }: AnimatedAvatarProps) => {
  const [avatarSize, setAvatarSize] = useState<number>(size.__getValue());

  useEffect(() => {
    const listenerId = size.addListener(({ value }) => {
      setAvatarSize(value);
    });
    return () => {
      size.removeListener(listenerId);
    };
  }, [size]);

  return <Avatar avatarID={avatarID} color={color} accessory={accessory} size={avatarSize} shadow={shadow} />;
};


const styles = StyleSheet.create({
  avatarContainer: {
    maxHeight:avatarContainerHeight,
    marginTop: screenHeight * 0.05,
    paddingTop: avatarContainerHeight * 0.175,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignContent: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 30,
    color: '#1B453C',
    fontSize: 18,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#1B453C',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    minWidth: '90%',
    maxWidth: '90%',
    minHeight: '10%',
    maxHeight: 50,
  },
  invertedButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#1B453C',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 18,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  invertedButtonText: {
    color: '#1B453C',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 18,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
});
export default MascotPage;
