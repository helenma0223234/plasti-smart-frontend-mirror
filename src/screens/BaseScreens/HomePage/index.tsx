/* eslint-disable max-len */
import React, { useMemo, useState } from 'react';
import { SafeAreaView, Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
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

import Heart from '../../../assets/Heart.svg';
import EmptyHeart from '../../../assets/EmptyHeart.svg';
import Snack from '../../../assets/Snack.svg';
import HomeShiba from '../../../assets/HomeShiba.svg';
import HomeAvaShadow from '../../../assets/HomeAvaShadow.svg';
import Wardrobe from '../../../assets/Wardrobe.svg';
import Lamp from '../../../assets/Lamp.svg';
import HomeTrophy from '../../../assets/HomeTrophy.svg';
import Bowl from '../../../assets/Bowl.svg';
import Bookshelf from '../../../assets/Bookshelf.svg';
import HomePointBadge from '../../../assets/HomePointBadge.svg';
import HomeShelf from '../../../assets/HomeShelf.svg';
import HomeBook from '../../../assets/HomeBook.svg';


import Calendar from 'components/Calendar';
import Colors from 'utils/Colors';
import DailyTasks from 'components/DailyTasks';

import { useDispatch } from 'react-redux';
import { feedAvatar } from '../../../redux/slices/usersSlice'; // import the action
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import type { StackNavigationProp } from '@react-navigation/stack';
import { BaseTabRoutes, BaseNavigationList } from 'navigation/routeTypes';

import FullAlertModal from './fullAlertModal';

type HomePageProps = {
  navigation: StackNavigationProp<BaseNavigationList>;
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HomePage = ({ navigation }: HomePageProps) => {
  const user = useAppSelector((state) => state.users.selectedUser);
  const currentLoginHist = useAppSelector((state) => state.loginhistory.history);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = React.useState(false);

  
  interface SnackProps {
    snacks: number
    uid: string
    uhealth: number
  }
  const handleSnackPress = ({ snacks, uid, uhealth }: SnackProps) => {
    if (snacks > 0 && uhealth < 5) {
      dispatch(feedAvatar({ id: uid }));
    } else {
      setModalVisible(true);
    }
  };

  if (user === null) {
    return <Text>Loading...</Text>;
  }

  const today = new Date();
  // today.setUTCHours(0, 0, 0, 0);

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
    day.setHours(0, 0, 0, 0);
    day.setDate(today.getDate() - i);
  
    const loginHistoryForDay = currentLoginHist.find(history => {
      const historyDate = new Date(history.date);
      return historyDate.toDateString() === day.toDateString();
    });
  
    if (loginHistoryForDay) {
      taskCompletionStatuses.push([+loginHistoryForDay.redGoal, +loginHistoryForDay.yellowGoal, +loginHistoryForDay.greenGoal]);    
    } else {
      taskCompletionStatuses.push([]);
    }
  }
  // for today
  taskCompletionStatuses.push([+todayTasksCompletion[0], +todayTasksCompletion[1], +todayTasksCompletion[2]]);  
  // next 3 days are empty
  for (let j = 0; j < 3; j++) {
    taskCompletionStatuses.push([]);
  }

  function getPointsStyle(points: number) {
    if (points < 100) {
      return styles.smallPoints;
    } else if (points < 1000) {
      return styles.mediumPoints;
    } else {
      return styles.largePoints;
    }
  }

  return (
    <SafeAreaView style={{ ...FormatStyle.container, justifyContent: 'flex-start' }}>
      <View style={{
        width: '100%',
        overflow: 'hidden',

        alignItems: 'center',
        position: 'absolute',
        top: screenHeight * 0.45,
      }}>
        <Image source={require('../../../assets/Ellipse 66.svg')}></Image>
        <CircleBG width={screenWidth * 6} height={screenHeight * 1.1}></CircleBG>
      </View>

      
      <ScrollView style={{
        flex: 1,
        width: '100%',
        margin: screenHeight * 0.018,
      }}>
        <View style={{ position: 'absolute', top: screenHeight * 0.78, right:screenWidth * 0.001 }}>
          <HomePointBadge style={{ position: 'absolute', bottom: screenHeight * 0.55, right: screenWidth * 0.63 }} width={screenWidth * 0.32} height ={screenHeight * 0.32}></HomePointBadge>

          <View style={styles.badgeContainer}>
            <Text style={getPointsStyle(20)}>20 </Text>
            <Text style={styles.badgeText}>POINTS</Text>
          </View>
          <TouchableOpacity style={{ position: 'absolute', bottom: screenHeight * 0.545, right: -screenWidth * 0.04 }} onPress={() => navigation.navigate(BaseTabRoutes.EDUCATION, {})}>
            <HomeBook width={screenWidth * 0.25} height ={screenHeight * 0.3}></HomeBook>
          </TouchableOpacity>
          <HomeShelf style={{ position: 'absolute', bottom: screenHeight * 0.37, right: -screenWidth * 0.14 }} width={screenWidth * 0.65} height ={screenHeight * 0.65}></HomeShelf>
          <Wardrobe style={{ position: 'absolute', bottom: screenHeight * 0.1, right: -screenWidth * 0.15 }} width={screenWidth * 0.65} height ={screenHeight * 0.65}></Wardrobe>
          <Lamp style={{ position: 'absolute', bottom: screenHeight * 0.435, right: screenWidth * 0.22 }} width={screenWidth * 0.28} height ={screenHeight * 0.28}></Lamp>
          <TouchableOpacity style={{ position: 'absolute', bottom: screenHeight * 0.45, right: screenWidth * 0.017 }} onPress={() => navigation.navigate(BaseTabRoutes.LEADERBOARD, {})}>
            <HomeTrophy width={screenWidth * 0.2} height ={screenHeight * 0.2}></HomeTrophy>
          </TouchableOpacity>
        </View>
        
        <View style={{ position: 'absolute', top: screenHeight * 0.25, left:screenWidth * 0.02 }}>
          <HomeAvaShadow style={{ position: 'absolute', top: screenHeight * 0.09, right: screenWidth * 0.06 }} width={screenWidth * 0.5} height ={screenHeight * 0.45}></HomeAvaShadow>
          <HomeShiba width={screenWidth * 0.45} height ={screenHeight * 0.45}></HomeShiba>
          <TouchableOpacity style={{ position: 'absolute', top: screenHeight * 0.17, right: -screenWidth * 0.19 }} onPress={() => handleSnackPress({ snacks: user.snacks, uid: user.id, uhealth: user.avatarHealth })}>
            <Bowl width={screenWidth * 0.33} height ={screenHeight * 0.33}></Bowl>
          </TouchableOpacity>
        </View>


        <View style={{ marginLeft: 20 }}>
          <HappyScale happiness={user?.avatarHealth} ></HappyScale>
        </View>

        <View style={{ ...styles.scroll, marginLeft: 20, marginTop:screenHeight * 0.58 }}>
          <Calendar circlesArray={taskCompletionStatuses}></Calendar>
          <DailyTasks taskCompletionStatuses={todayTasksCompletion}></DailyTasks>
        </View>
      </ScrollView>
      <FullAlertModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </SafeAreaView>
  );
};

interface HappyProps {
  happiness: number

}

const HappyScale = ({ happiness }: HappyProps) => {
  if (typeof happiness !== 'number') {
    // throw new Error('Invalid happiness value');
    happiness = 3;
  }
  // hardcode for bug right now...
  if (happiness >= 5 ) happiness = 5;
  if (happiness <= 0 ) happiness = 0;
  const empty = Math.max(0, 5 - happiness);
  return (
    <View>
      <View style={{ width: screenWidth * 0.38, height: screenHeight * 0.03, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
        {Array(Math.min(5, happiness)).fill(1).map(() => (
          <Heart width={28} height={28}></Heart>
        ))}
        {Array(empty).fill(1).map(() => (
          <EmptyHeart width={28} height={28}></EmptyHeart>
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
    width: '100%',
  },
  badgeContainer: {
    flexDirection: 'row',
    position: 'absolute', 
    bottom: screenHeight * 0.695, 
    right: screenWidth * 0.65,
  },
  badgeText: {
    fontSize: screenHeight * 0.015,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 22,
    letterSpacing: 0.1,
    color: Colors.primary.dark,
  },
  smallPoints: {
    fontSize: screenHeight * 0.015,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 22,
    letterSpacing: 0.1,
    color: Colors.primary.dark,
  },
  mediumPoints: {
    fontSize: screenHeight * 0.013,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: 0.03,
    color: Colors.primary.dark,
  },
  largePoints: {
    fontSize: screenHeight * 0.011,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: 0.01,
    color: Colors.primary.dark,
  },
});


export default HomePage;


