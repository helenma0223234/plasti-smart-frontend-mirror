/* eslint-disable max-len */
import React, { useRef } from 'react';
import { SafeAreaView, Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import useAppSelector from 'hooks/useAppSelector';
import FormatStyle from '../../../utils/FormatStyle';
import CircleBG from '../../../assets/Ellipse 66.svg';

import Heart from '../../../assets/Heart.svg';
import EmptyHeart from '../../../assets/EmptyHeart.svg';
import HomeAvaShadow from '../../../assets/HomeAvaShadow.svg';
import Wardrobe from '../../../assets/Wardrobe.svg';
import Lamp from '../../../assets/Lamp.svg';
import HomeTrophy from '../../../assets/HomeTrophy.svg';
import Bowl from '../../../assets/Bowl.svg';
import HomePointBadge from '../../../assets/HomePointBadge.svg';
import HomeShelf from '../../../assets/HomeShelf.svg';
import HomeBook from '../../../assets/HomeBook.svg';
import HomeFullBowl from '../../../assets/HomeFullBowl.svg';


import Calendar from 'components/Calendar';
import Colors from 'utils/Colors';
import DailyTasks from 'components/DailyTasks';

import { useDispatch } from 'react-redux';
import { feedAvatar } from '../../../redux/slices/usersSlice'; // import the action
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import type { StackNavigationProp } from '@react-navigation/stack';
import { BaseTabRoutes, BaseNavigationList } from 'navigation/routeTypes';
import { useFocusEffect } from '@react-navigation/native';

import FullAlertModal from './fullAlertModal';
import { cameraClosed } from 'redux/slices/cameraSlice';
import Avatar from 'components/Avatar';

type HomePageProps = {
  navigation: StackNavigationProp<BaseNavigationList>;
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HomePage = ({ navigation }: HomePageProps) => {
  const user = useAppSelector((state) => state.users.selectedUser);
  const currentLoginHist = useAppSelector((state) => state.loginhistory.history);
  const dispatch = useDispatch();

  console.log('user rank:', user?.rank);

  dispatch(cameraClosed());

  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState('');


  // for deaulting to top of the page
  const scrollViewRef = useRef<ScrollView>(null);

  useFocusEffect(
    React.useCallback(() => {
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
    }, []),
  );
  
  interface SnackProps {
    points: number
    uid: string
    uhealth: number
  }
  const handleSnackPress = ({ points, uid, uhealth }: SnackProps) => {
    if (points >= 5 && uhealth < 5) {
      dispatch(feedAvatar({ id: uid }));
    } else if (points < 5) {
      setModalMessage('You need at least 5 points to feed your pal!');
      setModalVisible(true);
    } else if (uhealth == 5) {
      setModalMessage('Your pal is full! Come back later when it’s hungry again.');
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

      
      <ScrollView ref={scrollViewRef} style={{
        flex: 1,
        width: '100%',
        marginTop: screenHeight * 0.018,
        marginLeft:screenHeight * 0.018,
        marginRight:screenHeight * 0.018,
      }}>
        <View style={{ position: 'absolute', top: screenHeight * 0.78, right:screenWidth * 0.001 }}>
          <HomePointBadge style={{ position: 'absolute', bottom: screenHeight * 0.55, right: screenWidth * 0.63 }} width={screenWidth * 0.32} height ={screenHeight * 0.32}></HomePointBadge>

          <View style={styles.badgeContainer}>
            <Text style={getPointsStyle(user?.points)}>{user?.points} </Text>
            <Text style={styles.badgeText}>POINTS</Text>
          </View>
          <HomeShelf style={{ position: 'absolute', bottom: screenHeight * 0.37, right: -screenWidth * 0.14 }} width={screenWidth * 0.65} height ={screenHeight * 0.65}></HomeShelf>
          <TouchableOpacity style={{ backgroundColor:'blue', position: 'absolute', bottom: screenHeight * 0.32, right: -screenWidth * 0.15, maxHeight: screenWidth * 0.45 }} onPress={() => navigation.navigate(BaseTabRoutes.AVATAR_CUSTOMIZATION, {})}>
            <Wardrobe style={{ position: 'absolute', bottom: 1, right: 3, maxHeight: screenWidth * 0.45 }} width={screenWidth * 0.65} height ={screenHeight * 0.65}></Wardrobe>
          </TouchableOpacity>
          <TouchableOpacity style={{ position: 'absolute', bottom: screenHeight * 0.545, right: -screenWidth * 0.04 }} onPress={() => navigation.navigate(BaseTabRoutes.EDUCATION, {})}>
            <HomeBook width={screenWidth * 0.25} height ={screenHeight * 0.3}></HomeBook>
          </TouchableOpacity>
          <Lamp style={{ position: 'absolute', bottom: screenHeight * 0.435, right: screenWidth * 0.22 }} width={screenWidth * 0.28} height ={screenHeight * 0.28}></Lamp>
          <TouchableOpacity style={{ position: 'absolute', bottom: screenHeight * 0.45, right: screenWidth * 0.017 }} onPress={() => navigation.navigate(BaseTabRoutes.LEADERBOARD, {})}>
            <HomeTrophy width={screenWidth * 0.2} height ={screenHeight * 0.2}></HomeTrophy>
          </TouchableOpacity>
        </View>
        
        <View style={{ position: 'absolute', top: screenHeight * 0.25, left:screenWidth * 0.02 }}>
          <HomeAvaShadow style={{ position: 'absolute', top: screenHeight * 0.09, right: screenWidth * 0.06 }} width={screenWidth * 0.5} height ={screenHeight * 0.45}></HomeAvaShadow>
          <Avatar avatarID={user.avatarID} color={user.avatarColor} size={screenWidth * 0.47} accessory={user.avatarAccessoryEquipped} shadow={false} style={{ top: screenHeight * 0.1 }} mirror={user.avatarID == 2}></Avatar>
          <TouchableOpacity style={{ position: 'absolute', top: screenHeight * 0.17, right: -screenWidth * 0.19 }} onPress={() => handleSnackPress({ points: user.points, uid: user.id, uhealth: user.avatarHealth })}>
            {user.points > 0 ? <HomeFullBowl width={screenWidth * 0.25} height ={screenHeight * 0.28} />  : <Bowl width={screenWidth * 0.33} height ={screenHeight * 0.33} />}
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
      <FullAlertModal modalVisible={modalVisible} setModalVisible={setModalVisible} modalMessage={modalMessage} />
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

const styles = StyleSheet.create({
  scroll: {
    width: '100%',
  },
  badgeContainer: {
    flexDirection: 'row',
    position: 'absolute', 
    bottom: screenHeight * 0.695, 
    right: screenWidth * 0.645,
  },
  badgeText: {
    fontSize: screenHeight * 0.014,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 22,
    letterSpacing: 0.1,
    color: Colors.primary.dark,
  },
  smallPoints: {
    fontSize: screenHeight * 0.014,
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
    fontSize: screenHeight * 0.012,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: 0.01,
    color: Colors.primary.dark,
  },
});


export default HomePage;


