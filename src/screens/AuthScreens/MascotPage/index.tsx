import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import SvgUri from 'react-native-svg-uri';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import FormatStyle from '../../../utils/FormatStyle';
import TextStyles from '../../../utils/TextStyles';
import Cat from '../../../assets/Cat.svg';
import Cat1 from '../../../assets/Cat1.svg';
import Cat2 from '../../../assets/Cat2.svg';

const { width: screenWidth } = Dimensions.get('window');

// const Cat1 = () => <SvgUri width="100" height="100" source={require('../../../assets/Cat.svg')} />;
// const Cat2 = () => <SvgUri width="100" height="100" source={require('../../../assets/Cat1.svg')} />;
// const Cat3 = () => <SvgUri width="100" height="100" source={require('../../../assets/Cat2.svg')} />;

const svgs = [Cat, Cat1, Cat2];

const MascotPage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { id, email } = user || { id: '', email: '' };

  const handleSubmit = () => {
    alert('Please enter a code!');
  };

  const [activeIndex, setActiveIndex] = useState(0);

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
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={[TextStyles.subTitle, { marginTop: -600, textAlign: 'center' }]}>Choose your mascot</Text>
        <View style={styles.catContainer}>
          <Carousel
            layout={'default'}
            data={svgs}
            sliderWidth={screenWidth}
            itemWidth={200}
            renderItem={renderItem}
            onSnapToItem={index => setActiveIndex(index)}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(AuthStackRoutes.SIGNUP)}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.invertedButton]}
          onPress={() => navigation.navigate(AuthStackRoutes.SIGNIN)}
        >
          <Text style={styles.invertedButtonText}>
            Customize later
          </Text>
        </TouchableOpacity>
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  catContainer: {
    position: 'absolute',
    bottom: -200,
    zIndex: 0,
    minHeight:400,
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 30,
    color: '#1B453C',
    fontSize: 18,
  },
  buttonContainer: {
    borderRadius:1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50%',
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
    marginBottom: -12,
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
