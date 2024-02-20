import React, { useMemo, useState } from 'react';
import { ScrollView, SafeAreaView, Text, View, Image, StyleSheet } from 'react-native';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { logout } from '../../../redux/slices/authSlice';
import AppButton from '../../../components/AppButton';
import FormatStyle from '../../../utils/FormatStyle';
import CircleBG from '../../../assets/Ellipse 66.svg';
import Title from 'components/Title';
import { AntDesign } from '@expo/vector-icons';


import Svg, { G, Circle } from 'react-native-svg';
import Animated from 'react-native-reanimated';
import CircularProgress from 'react-native-circular-progress-indicator';

import Cat from '../../../assets/Cat.svg';
import Heart from '../../../assets/Heart.svg'
import EmptyHeart from '../../../assets/EmptyHeart.svg'

import Calendar from 'components/Calendar';
import Colors from 'utils/Colors';




const HomePage = () => {


  const dispatch = useAppDispatch();
  const TOTAL = 40;
  const dummyDates = [29, 30, 1, 2, 3, 4, 5];
  const [progress, setProgress] = useState(TOTAL - 30);

  return (
    <SafeAreaView style={{ ...FormatStyle.container, justifyContent: 'flex-start' }}>
      <View style={{
        width: 400,
        overflow: 'hidden',
        aspectRatio: 1,

        alignItems: 'center',
        position: 'absolute',
        bottom: 0,

      }}>
        <Image source={require('../../../assets/Ellipse 66.svg')}></Image>
        <CircleBG></CircleBG>
      </View>


      <View style={{
        flex: 1,
        alignItems: 'center',
        width: '100%',
      }}>

        <Title></Title>
        <Text></Text>
        <View style={{ position: 'absolute', top: 120 }}>
          <Cat></Cat>
        </View>
        <Place number={1}></Place>
        <HappyScale happiness={3} ></HappyScale>


        <View style={{ flexDirection: 'column', position: 'absolute', right: 10, bottom: -80 }}>
          <CircularProgress
            value={progress / 40 * 100}
            radius={80}

            circleBackgroundColor={'transparent'}
            progressValueColor={'transparent'}
            activeStrokeColor={Colors.primary.dark}
            inActiveStrokeColor={'transparent'}
          />
          <View style={{ position: 'relative', bottom: 130, alignItems: 'center' }}>
            <Text style={{ alignSelf: 'center', fontSize: 30 }}>{progress}</Text>
            <View style={{ height: 2, backgroundColor: 'black', width: 30 }} />
            <Text style={{ alignSelf: 'center', fontSize: 25 }}>40</Text>
            <Text style={{ fontSize: 13, width: 100, flexWrap: 'wrap', textAlign: 'center' }}>February Monthly Goal</Text>
          </View>
        </View>

        <View style={{ ...styles.scroll, padding: 20 }}>
          <Calendar dates={dummyDates} curr_date={3}></Calendar>

        </View>
      </View>
    </SafeAreaView >
  );
};

interface HappyProps {
  happiness: number
}

const HappyScale = ({ happiness }: HappyProps) => {
  const empty = Math.max(0, 5 - happiness);
  return (
    <View style={{ flex: 1 }}>
      {/* <Text>Happiness</Text> */}
      <View style={{ width: 133.897, height: 31, borderRadius: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
        {Array(Math.min(5, happiness)).fill(1).map(() => (
          <Heart></Heart>
          // <AntDesign name="heart" size={24} color="red" />
        ))}
        {Array(empty).fill(1).map(() => (
          <EmptyHeart></EmptyHeart>
        ))}
      </View>
    </View>
  );
};

interface PlaceProps {
  number: number
}

const Place = ({ number } : PlaceProps) => {
  let suffix;
  if (number % 10 == 1) suffix = 'st'; 
  else if (number % 10 == 2) suffix = 'nd'; 
  else if (number % 10 == 3) suffix = 'rd'; 
  else suffix = 'th'; 

  return (
    <View style={{ ...FormatStyle.circle, backgroundColor: Colors.primary.dark, width: 70, height: 70, position: 'absolute',  gap: -5, left: 20, bottom: 340 }}>
      <Text style={{ color: Colors.secondary.light, fontSize: 30 }}>{number}{suffix}</Text>
      <Text style={{ color: Colors.secondary.light, fontSize: 15 }}>Place</Text>

    </View>
  );
};



const styles = StyleSheet.create({
  scroll: {
    // backgroundColor: 'gray',
    width: '100%',
    height: '48%',
    position: 'absolute',
    bottom: 0,
  },
  plusRect: {
    marginTop: 15,
    borderRadius: 6,
    backgroundColor: '#6A3D7F',
    width: 40,
    height: 40,
  },
});


export default HomePage;


