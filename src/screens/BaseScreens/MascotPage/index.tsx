import React, { useState, useRef } from 'react';
import { SafeAreaView, Text, View, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateUser, equipAvatar, setAvatarFirstTime } from '../../../redux/slices/usersSlice';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import FormatStyle from '../../../utils/FormatStyle';
import TextStyles from '../../../utils/TextStyles';
import Cat from '../../../assets/Cat.svg';
import Cat1 from '../../../assets/Cat1.svg';
import Cat2 from '../../../assets/Cat2.svg';
import GoRightButton from '../../../assets/GoRightButton.svg';
import GoLeftButton from '../../../assets/GoLeftButton.svg';
import type { StackNavigationProp } from '@react-navigation/stack';
import { BaseTabRoutes, BaseNavigationList } from 'navigation/routeTypes';
import { useNavigation } from '@react-navigation/native';
import NavType from 'utils/NavType';
import { cameraOpened } from 'redux/slices/cameraSlice';
import Avatar from '../../../components/Avatar';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const catContainerHeight = screenHeight*0.3;

type carouselItem = {
  avatarID: number;
};
type renderItem = {
  item: carouselItem;
  index: number;
};

const carouselData: Array<carouselItem> = Array.from({ length: 3 }, (_, i) => ({avatarID: i + 1}));

const svgs = [<Avatar avatarID={1} color={1} accessory={-1} size={screenWidth*0.5} shadow={false}></Avatar>, 
<Avatar avatarID={2} color={1} accessory={-1} size={screenWidth*0.5} shadow={false}></Avatar>,
<Avatar avatarID={3} color={1} accessory={-1} size={screenWidth*0.5} shadow={false}></Avatar>];

const MascotPage = () => {
  const navigation = useNavigation<NavType>();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  dispatch(cameraOpened())

  const { id, email } = user || { id: '', email: '' };
  const userData = useAppSelector((state) => state.users.selectedUser);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleUpdateUser = () => {
    dispatch(setAvatarFirstTime({id: user.id, avatarID: activeIndex+1}));
  };

  let _carousel: Carousel<carouselItem> | null = null;

  const _renderItem = ({ item, index }: renderItem) => {
    return (
      <View style={{alignSelf: 'center', justifyContent: 'center', alignItems: 'center', maxWidth:screenWidth*0.4}}>
        <Avatar avatarID={item.avatarID} color={1} accessory={-1} size={screenWidth*0.4} shadow={true}></Avatar>
      </View>
    );
  };

  const getCarouselIndex = (): number => {
    if (_carousel) {
      return _carousel.currentIndex;
    }
    return -1;
  };

  const goPrev = () => {
    carouselRef.current.snapToPrev();
  };

  const goNext = () => {
    carouselRef.current.snapToNext();
  };


  return (
    <SafeAreaView style={[FormatStyle.topContainer, { justifyContent: 'space-around' }]}>
      <View style={{ justifyContent: 'space-around', alignItems: 'center', flexDirection:'column' }}>
        <View style={{width:screenWidth*0.85, minHeight: screenHeight*0.15}}>
          <Text style={[TextStyles.subTitle, { textAlign: 'center', fontSize: screenHeight*0.0375, fontFamily: 'Inter_600SemiBold' }]}>Choose your mascot</Text>
          <Text style={[TextStyles.regular, {textAlign:'center', fontSize:screenHeight*0.0225, fontFamily: 'Inter_500Medium', marginTop: 10}]}>
            This will be your adventure pal! Don’t worry, you can always make changes later</Text>
        </View>
        <View style={styles.catContainer}>
          <Carousel
            ref={carouselRef}
            layout={'default'}
            data={carouselData}
            sliderWidth={screenWidth}
            itemWidth={screenWidth*0.5}
            renderItem={_renderItem}
            onSnapToItem={index => setActiveIndex(index)}
            enableSnap={true}
            enableMomentum={true}
          />
          <TouchableOpacity style={{ position: 'absolute', left: screenWidth*0.19, bottom: catContainerHeight*0.4, zIndex:1 }} onPress={goPrev}>
            <GoLeftButton  width={screenWidth*0.1} height={screenWidth*0.1}/>
          </TouchableOpacity>
          <TouchableOpacity style={{ position: 'absolute', right: screenWidth*0.19, bottom: catContainerHeight*0.4, zIndex:1 }} onPress={goNext}>
            <GoRightButton  width={screenWidth*0.1} height={screenWidth*0.1}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            handleUpdateUser();
            navigation.navigate(BaseTabRoutes.HOME, {});
          }}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  catContainer: {
    maxHeight:catContainerHeight,
    marginTop: screenHeight*0.05,
    paddingTop: catContainerHeight*0.175,
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
