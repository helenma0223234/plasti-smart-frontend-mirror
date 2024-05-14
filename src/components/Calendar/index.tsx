import React from 'react';
import { Text, View } from 'react-native';

import FormatStyle from 'utils/FormatStyle';
import TextStyles from 'utils/TextStyles';
import Colors from 'utils/Colors';
import { ScrollView } from 'react-native-gesture-handler';

import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

interface CalendarProps {
  children?: React.ReactNode;
  circlesArray: number[][];
}

// GET CALENDAR
const dates: number[] = [];

const today = new Date();

for (let i = 10; i > 0; i--) {
  const day = new Date(today);
  day.setDate(today.getDate() - i);
  dates.push(day.getDate());
}

dates.push(today.getDate());

for (let i = 1; i <= 3; i++) {
  const day = new Date(today);
  day.setDate(today.getDate() + i);
  dates.push(day.getDate()); // Format: YYYY-MM-DD
}

const Calendar = ({ circlesArray }: CalendarProps) => {
  const newCirclesArray = circlesArray.map((subArray) => {
    const numberOfOnes = subArray.filter((value) => value === 1).length;
    return Array(numberOfOnes).fill(1);
  });
  const isEmpty = newCirclesArray.every((subArray) => subArray.length === 0);

  return (
    <View style={{ marginTop: 8, marginLeft:6 }}>
      <Text style={{ color: Colors.primary.dark, marginBottom: -12 }}>
        Daily Goal
      </Text>
      <ScrollView
        horizontal={true}
        style={{ width: screenWidth * 0.88 }}
        contentOffset={{ x: 400, y: 0 }}
        bounces={true}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ flexDirection: 'row', gap: 10, marginRight: 6 }}>
          {dates.map((date: number, key: number) => (
            <DateCircle
              date={date}
              key={key}
              active={key == 10}
              isPast={key < 10}
              circles={newCirclesArray[key]}
              colorcircles={circlesArray[key]}
              isEmpty={isEmpty}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

interface DateProps {
  date: number;
  active?: boolean;
  isPast: boolean;
  colorcircles: number[];
  isEmpty?: boolean;
}

const DateCircle = ({
  isPast,
  active,
  date,
  colorcircles,
  isEmpty,
}: DateProps) => {
  const circleColors = [
    Colors.secondary.red,
    Colors.secondary.yellow,
    Colors.primary.dark,
  ];

  const circleDim = screenWidth * 0.018;

  return (
    <View
      style={{
        flexDirection: 'column',
        marginBottom: 10,
        gap: -11,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          ...FormatStyle.circle,
          backgroundColor:
            (isPast && '#ADC0AB') ||
            (active && Colors.primary.dark) ||
            Colors.secondary.white,
          width: screenWidth * 0.102,
          height: screenWidth * 0.102,
        }}
      >
        <Text
          style={{
            ...TextStyles.small,
            color: active && Colors.secondary.white,
          }}
        >
          {date}
        </Text>
      </View>
      <View style={{ alignItems: 'center', flexDirection: 'row', gap: 4 }}>
        {/* {colorcircles.map((circle: number, key: number) => (
          circle === 1 ? (
            <View style={{
              ...FormatStyle.circle,
              backgroundColor: circleColors[key],
              width: 6,
              height: 6,
              borderWidth: 0,
            }} key={key}></View>
          ) : null
        ))} */}
        {isEmpty ? (
          <View style={{
            ...FormatStyle.circle,
            backgroundColor: 'transparent',
            width: circleDim,
            height: circleDim,
            borderWidth: 0,
          }}></View>
        ) : (
          colorcircles.map((circle: number, key: number) =>
            circle === 1 ? (
              <View
                style={{
                  ...FormatStyle.circle,
                  backgroundColor: circleColors[key],
                  width: circleDim,
                  height: circleDim,
                  borderWidth: 0,
                }}
                key={key}
              ></View>
            ) : null,
          )
        )}
      </View>
    </View>
  );
};

export default Calendar;
