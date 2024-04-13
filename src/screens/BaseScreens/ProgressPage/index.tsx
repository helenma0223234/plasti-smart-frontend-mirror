import React, { useState } from 'react';
import { ScrollView, SafeAreaView, View, Text, StyleSheet, Modal, Pressable, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { logout } from '../../../redux/slices/authSlice';
import FormatStyle from '../../../utils/FormatStyle';
import TextStyles from 'utils/TextStyles';
import { useNavigation } from '@react-navigation/native';
import NavType from 'utils/NavType';
import { BaseTabRoutes } from 'navigation/routeTypes';
import Colors from 'utils/Colors';

import Svg, { G, Circle } from 'react-native-svg';
import Animated from 'react-native-reanimated';
import CircularProgress from 'react-native-circular-progress-indicator';
import PlasticSymbol from 'components/RecycleSymbol';

import * as Progress from 'react-native-progress';
import { AntDesign } from '@expo/vector-icons';
import useAppSelector from 'hooks/useAppSelector';

const ProgressPage = () => {
  const user = useAppSelector((state) => state.users.selectedUser);
  const navigation = useNavigation<NavType>();

  const goals = [
    { progress: 0 },
    { progress: 4 },
    { progress: 10 },
    { progress: 3 },
    { progress: 6 },
    { progress: 4 },
    { progress: 1 },
  ];

  const collectedTypes = {
    1: user.Type1Collected,
    2: user.Type2Collected,
    3: user.Type3Collected,
    4: user.Type4Collected,
    5: user.Type5Collected,
    6: user.Type6Collected,
    7: user.Type7Collected,
  };

  const maxType = Object.entries(collectedTypes).reduce((max, [type, value]) => {
    return value > max.value ? { type: Number(type), value } : max;
  }, { type: 1, value: user?.Type1Collected });
  
  return (
    <SafeAreaView style={{ ...FormatStyle.container }}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 40, overflow: 'visible', gap: 20, marginBottom: 30 }}>
          <Text style={{ ...TextStyles.title, fontSize: 30, marginLeft: 0, alignSelf: 'flex-start' }}>
            Your Progress Report
          </Text>
        </View>
        <View style={{ gap: 25, flexDirection: 'column', marginBottom: 50 }}>
          <ProgressCard
            title={'Top Plastic'}
            text={'You\'ve recycled a lot!'}
            number={maxType.type}
            cornerComponent={
              <PlasticSymbol color={Colors.highlight} width={80} height={100} number={maxType.type} top={35} left={35}></PlasticSymbol>
            }>
          </ProgressCard>
          <ProgressCard
            title={'Monthly Challenge'}
            text={'You\'ve recycled out of 10 PET plastics this month. Keep going to get the prize!'}
            number={1}
            cornerComponent={
              <View>

                <CircularProgress
                  value={(user?.monthlyGoalPlasticAmount / user?.monthlyGoalPlasticTotal) * 100}
                  radius={50}
                  circleBackgroundColor={'transparent'}
                  progressValueColor={'transparent'}
                  activeStrokeColor={Colors.highlight}
                  inActiveStrokeColor={'transparent'}
                />
                <View style={{ position: 'relative', bottom: 60, alignItems: 'center' }}>
                  <Text style={{ fontSize: 20, fontWeight: '800' }}>{user?.monthlyGoalPlasticAmount}/{user?.monthlyGoalPlasticTotal}</Text>
                </View>
              </View>
            }>
          </ProgressCard>

          <View style={{ ...styles.card, gap: 20 }}>
            <Text style={{ ...TextStyles.subTitle, fontSize: 20, flexWrap: 'wrap', alignSelf: 'flex-start' }}>Your Monthly Summary</Text>

            {goals.map((goal, index) => (
              <Goal number={index + 1} progress={goal.progress} total={10}></Goal>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


interface ProgressCardProps {
  cornerComponent: JSX.Element;
  title: string;
  text: string;
  number?: number
}


const ProgressCard = ({ cornerComponent, title, text, number }: ProgressCardProps) => {
  return (
    <View style={{ ...styles.card, gap: 10 }}>
      {cornerComponent}

      <View style={{ marginTop: 0, gap: 10 }}>
        <Text style={{ ...TextStyles.subTitle, fontSize: 24, flexWrap: 'wrap', textAlign: 'center' }}>{title}</Text>
        <Text style={{ flexWrap: 'wrap', fontSize: 18, textAlign: 'center' }}>{text}</Text>
      </View>
    </View>
  );
};

interface GoalProps {
  number: number;
  total: number;
  progress: number;
}

const Goal = ({ number, total, progress }: GoalProps) => {
  const p = progress / total;

  return (
    <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
      <PlasticSymbol color={Colors.primary.dark} width={40} height={40} number={number} top={12} left={17}></PlasticSymbol>
      <View style={{ flexDirection: 'column', gap: 3 }}>
        <Text>
          {total - progress > 0 && total - progress < total && `${total - progress} more to reach you goal`}
          {total == progress && 'Great Job!'}
          {total - progress == total && 'Keep recycling to earn!'}
        </Text>
        <View>
          <Progress.Bar
            progress={p}
            color={Colors.primary.dark}
            unfilledColor={Colors.secondary.white}
            width={200}
            height={20}
            borderWidth={0}
            borderRadius={100}
          />
          {progress != 1 &&
            <Text style={{
              position: 'absolute', left: 3 + 187 * p - (Math.min(progress, 1) * (30)), top: 1,
              color: progress > 0 ? Colors.secondary.white : Colors.primary.dark,
            }}>{progress}/{total}</Text>
          }
          {progress == total &&
            <AntDesign style={{ position: 'absolute', left: 7, top: 2 }} name="star" size={14} color={Colors.highlight} />
          }
        </View>
      </View>

    </View >
  );
};



const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.secondary.light,
    borderRadius: 10,
    minHeight: 200,
    width: 330,
    alignItems: 'center',
    textAlign: 'center',
    padding: 25,
  },
});





export default ProgressPage;