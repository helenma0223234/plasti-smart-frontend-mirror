import React, { useMemo, useState } from 'react';
import { ScrollView, SafeAreaView, Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
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

import { useDispatch } from 'react-redux';
import { feedAvatar } from '../../../redux/slices/usersSlice'; // import the action
import { useSelector } from 'react-redux';



const HomePage = () => {
  const user = useSelector((state) => state.users.selectedUser);
  const currentLoginHist = useAppSelector((state) => state.loginhistory.history);

  if (user === null) {
    return <Text>Loading...</Text>;
  }
  
  if (user === null) {
    return <Text>Loading...</Text>;
  }

  const today = new Date();
  today.setUTCHours(5, 0, 0, 0);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // console.log(currentLoginHist);
  let todayTasksCompletion = [false, false, false];
  if (currentLoginHist.length > 0) {
    const firstHist = new Date(currentLoginHist[0].date);
    if (today.toDateString() === firstHist.toDateString()) {
      todayTasksCompletion = [currentLoginHist[0].redGoal, currentLoginHist[0].yellowGoal, currentLoginHist[0].greenGoal];
    }
  }

  const taskCompletionStatuses = [];
  for (let i = 10; i > 0; i--) {
    const day = new Date(today);
    day.setUTCHours(5, 0, 0, 0);
    day.setDate(today.getDate() - i);
  
    const loginHistoryForDay = currentLoginHist.find(history => {
      const historyDate = new Date(history.date);
      return historyDate.toDateString() === day.toDateString();
    });
  
    if (loginHistoryForDay) {
      const sub = [];
      sub.push(+loginHistoryForDay.redGoal);
      sub.push(+loginHistoryForDay.yellowGoal);
      sub.push(+loginHistoryForDay.greenGoal);
      taskCompletionStatuses.push(sub);    
    } else {
      taskCompletionStatuses.push([]);
    }
  }
  // for today
  const tod = [];
  if (todayTasksCompletion[0]) {
    tod.push(+todayTasksCompletion[0]);
  }
  if (todayTasksCompletion[1]) {
    tod.push(+todayTasksCompletion[1]);
  }
  if (todayTasksCompletion[2]) {
    tod.push(+todayTasksCompletion[2]);
  }
  taskCompletionStatuses.push(tod);  
  for (let j = 0; j < 3; j++) {
    taskCompletionStatuses.push([]);
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
          <Text>Ready to Recycle, {user?.username ?? 'now'}?</Text>
          <HappyScale happiness={user.avatarHealth} ></HappyScale>

          <View style={{ gap: 10, marginTop: 10 }}>
            <SnackButton snacks={user.snacks} uid={user.id} uhealth={user.avatarHealth}></SnackButton>
            <Place number={1}></Place>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', width: 70, gap: 5 }}>
              <View style={{ borderWidth: 2, borderColor: Colors.primary.dark, borderRadius: 38, alignItems:'center', justifyContent:'center' }}>
                <CircularProgress
                  value={(user.monthlyGoalPlasticAmount / user.monthlyGoalPlasticTotal) * 100}
                  radius={35}

                  circleBackgroundColor={'transparent'}
                  progressValueColor={'transparent'}
                  activeStrokeColor={Colors.primary.dark}
                  inActiveStrokeColor={'transparent'}
                />
              </View>
              <View style={{ position: 'absolute', alignItems: 'center', bottom: 40, left: 22 }}>
                <Text style={{ fontSize: 20 }}>{user.monthlyGoalPlasticAmount}</Text>
                <View style={{ height: 2, backgroundColor: 'black', width: '100%' }} />
                <Text style={{ fontSize: 20 }}>{user.monthlyGoalPlasticTotal}</Text>
              </View>
              <Text style={{ fontSize: 10, flexWrap: 'wrap', textAlign: 'center' }}>{months[today.getMonth()]} monthly goal</Text>
            </View>
          </View>
        </View>

        <View style={{ ...styles.scroll, marginLeft: 20, marginRight: 100, gap: 20 }}>
          <Calendar circlesArray={taskCompletionStatuses}></Calendar>
          <DailyTasks taskCompletionStatuses={todayTasksCompletion}></DailyTasks>
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
  uid: string
  uhealth: number
}

const SnackButton = ({ snacks, uid, uhealth }: SnackProps) => {
  const dispatch = useDispatch();
  const handlePress = () => {
    if (snacks > 0 && uhealth < 5) {
      dispatch(feedAvatar({ id: uid }));
    } else {
      alert('Can not feed Plasti sorry~');
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


