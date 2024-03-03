import React, { useMemo, useState } from 'react';
import { ScrollView, SafeAreaView, Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
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
import Heart from '../../../assets/Heart.svg';
import EmptyHeart from '../../../assets/EmptyHeart.svg';
import Snack from '../../../assets/Snack.svg';

import Calendar from 'components/Calendar';
import Colors from 'utils/Colors';
import DailyTasks from 'components/DailyTasks';



const HomePage = () => {
  const user = useAppSelector((state) => state.auth.user);

  if (user === null) {
    return <Text>Loading...</Text>;
  }
  
  const dispatch = useAppDispatch();
  const TOTAL = 30;
  const dummyDates = [29, 30, 1, 2, 3, 4, 5];
  const [progress, setProgress] = useState(TOTAL);
  const [hearts, setHearts] = useState(0);
  const [snacks, setSnacks] = useState(user.snacks);

  const addHeart = () => {
    setHearts(hearts + 1);
  };

  const eatSnacks = () => {
    setSnacks(Math.max(0, snacks - 1));
  };
  
  if (user === null) {
    return <Text>Loading...</Text>;
  }


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
        width: '100%',
        margin: 20,
      }}>

        <View style={{ position: 'absolute', top: 120, right: 20 }}>
          <Cat></Cat>
        </View>

        <View style={{ gap: 5, marginLeft: 20 }}>
          <Title></Title>
          <Text>Ready to Recycle, Jack?</Text>
          <HappyScale happiness={hearts} ></HappyScale>

          <View style={{ gap: 10, marginTop: 10 }}>
            <SnackButton snacks={snacks} setHearts={addHeart} setSnacks={eatSnacks}></SnackButton>
            <Place number={1}></Place>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', width: 70, gap: 5 }}>
              <CircularProgress
                value={(progress / 40) * 100}
                radius={35}

                circleBackgroundColor={'transparent'}
                progressValueColor={'transparent'}
                activeStrokeColor={Colors.primary.dark}
                inActiveStrokeColor={'transparent'}
              />
              <View style={{ position: 'absolute', bottom: 38, left: 23 }}>
                <Text style={{ fontSize: 20 }}>{progress}</Text>
                <View style={{ height: 2, backgroundColor: 'black', width: '100%' }} />
                <Text style={{ fontSize: 20 }}>40</Text>
              </View>
              <Text style={{ fontSize: 10, flexWrap: 'wrap', textAlign: 'center' }}>February monthly goal</Text>
            </View>
          </View>
        </View>




        <View style={{ ...styles.scroll, marginLeft: 20, marginRight: 100, gap: 20 }}>
          <Calendar dates={dummyDates} curr_date={3}></Calendar>
          <DailyTasks></DailyTasks>
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
    <View style={{}}>
      {/* <Text>Happiness</Text> */}
      <View style={{ width: 133.897, height: 31, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
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

const Place = ({ number }: PlaceProps) => {
  let suffix;
  if (number % 10 == 1) suffix = 'st';
  else if (number % 10 == 2) suffix = 'nd';
  else if (number % 10 == 3) suffix = 'rd';
  else suffix = 'th';

  return (
    <View style={{ ...FormatStyle.circle, marginTop: 0, backgroundColor: Colors.primary.dark, width: 70, height: 70, gap: -5 }}>
      <Text style={{ color: Colors.secondary.light, fontSize: 30 }}>{number}{suffix}</Text>
      <Text style={{ color: Colors.secondary.light, fontSize: 12 }}>place</Text>

    </View>
  );
};


interface SnackProps {
  snacks: number
  setHearts: () => void;
  setSnacks: () => void;

}

const SnackButton = ({ snacks, setHearts, setSnacks }: SnackProps) => {
  const handlePress = () => {
    // Increment the parent state by 1
    if (snacks > 0) {
      setHearts();
      setSnacks();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{ height: 70, width: 70, paddingTop: 0, justifyContent: 'flex-end', alignItems: 'center' }}>
      <View style={{
        ...FormatStyle.circle, marginTop: 0, backgroundColor: Colors.secondary.light,
        width: 30, height: 30, position: 'absolute', top: -10, right: 0, borderColor: 'transparent', zIndex: 1,
      }}>
        <Text>{snacks}</Text>
      </View>

      <View style={{ ...FormatStyle.circle, marginTop: 0, backgroundColor: Colors.primary.dark, width: 70, height: 70 }}>
        <Snack></Snack>

      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  scroll: {
    // backgroundColor: 'gray',
    width: '100%',
    position: 'absolute',
    top: 380,
    height: 300,
  },
  // plusRect: {
  //   marginTop: 15,
  //   borderRadius: 6,
  //   backgroundColor: '#6A3D7F',
  //   width: 40,
  //   height: 40,
  // },
});


export default HomePage;


