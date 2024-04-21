import React, { useState, useRef } from 'react';
import { SafeAreaView, Text, View, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../redux/slices/usersSlice';

import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import FormatStyle from '../../../utils/FormatStyle';
import TextStyles from '../../../utils/TextStyles';
import Cat from '../../../assets/Cat.svg';
import Cat1 from '../../../assets/Cat1.svg';
import Cat2 from '../../../assets/Cat2.svg';
import GoRightButton from '../../../assets/GoRightButton.svg';
import GoLeftButton from '../../../assets/GoLeftButton.svg';

const { width: screenWidth } = Dimensions.get('window');

const svgs = [Cat, Cat1, Cat2];

const MascotPage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { id, email } = user || { id: '', email: '' };
  const userData = useAppSelector((state) => state.users.selectedUser);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleUpdateUser = () => {
    const updatedUser = {
      ...user,
      avatar: activeIndex,
    };
  
    dispatch(updateUser(updatedUser));
  };

  const goPrev = () => {
    carouselRef.current.snapToPrev();
  };

  const goNext = () => {
    carouselRef.current.snapToNext();
  };

  const renderItem = ({ item, index }) => {
    const SvgComponent = item;
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <SvgComponent style={{ transform: [{ scale: index === activeIndex ? 1 : 0.7 }] }} />
      </View>
    );
  };

  return (
    <SafeAreaView style={[FormatStyle.topContainer, { justifyContent: 'center' }]}>
      <View style={{ justifyContent: 'space-around', alignItems: 'center' }}>
        <Text style={[TextStyles.subTitle, { marginTop: -500, textAlign: 'center' }]}>Choose your mascot</Text>
        <View style={styles.catContainer}>
          <Carousel
            ref={carouselRef}
            layout={'default'}
            data={svgs}
            sliderWidth={screenWidth}
            itemWidth={180}
            renderItem={renderItem}
            onSnapToItem={index => setActiveIndex(index)}
            enableSnap={true}
            enableMomentum={true}
          />
          <TouchableOpacity style={{ position: 'absolute', right: 280, bottom: 204, zIndex:1 }} onPress={goPrev}>
            <GoLeftButton  width={40} height={40}/>
          </TouchableOpacity>
          <TouchableOpacity style={{ position: 'absolute', right: 78, bottom: 206, zIndex:1 }} onPress={goNext}>
            <GoRightButton  width={40} height={40}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.invertedButton]}
        >
          <Text style={styles.invertedButtonText}>
            Customize later
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  catContainer: {
    position: 'absolute',
    bottom: -300,
    zIndex: 0,
    minHeight:300,
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
    marginTop: '80%',
    marginBottom: '-70%',
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
