import React from 'react';
import { Text, View } from 'react-native';

import FormatStyle from 'utils/FormatStyle';
import TextStyles from 'utils/TextStyles';
import Colors from 'utils/Colors';
import { ScrollView } from 'react-native-gesture-handler';

import { Dimensions } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

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
    <View style={{ marginTop: 8, marginLeft:6, marginBottom: screenHeight*0.01 }}>
      <Text style={{ color: Colors.primary.dark, marginBottom: -12, fontSize: screenWidth*0.06 }}>
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
  const radius = screenWidth * 0.051;
  const thickness = radius*0.3;

  const createArcPath = (startAngle: number, endAngle: number, radius: number) => {
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    const start = polarToCartesian(radius, radius, radius - thickness / 2, endAngle);
    const end = polarToCartesian(radius, radius, radius - thickness / 2, startAngle);

    return [
      'M', start.x, start.y,
      'A', (radius - thickness / 2), (radius - thickness / 2), 0, largeArcFlag, 0, end.x, end.y
    ].join(' ');
  };


  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  const arcs = [
    { color: Colors.secondary.red, startAngle: 2.5, endAngle: 117.5, completed: colorcircles[0] },
    { color: Colors.secondary.yellow, startAngle: 122.5, endAngle: 237.5, completed: colorcircles[1] },
    { color: Colors.primary.dark, startAngle: 242, endAngle: 358, completed: colorcircles[2] }
  ];

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
            (isPast && Colors.secondary.light) ||
            (active && "#ADC0AB") ||
            Colors.secondary.light,
          width: screenWidth * 0.102,
          height: screenWidth * 0.102,
        }}
      >
        <Svg height={radius * 2} width={radius * 2} style={{position: 'absolute'}}>
          {arcs.map((arc, index) => arc.completed === 1 && (
            <Path
              key={index}
              d={createArcPath(arc.startAngle, arc.endAngle, radius)}
              fill="none"
              stroke={arc.color}
              strokeWidth={thickness}
            />
          ))}
        </Svg>
        <Text
          style={{
            ...TextStyles.small,
            // color: active && Colors.secondary.white,
          }}
        >
          {date}
        </Text>
      </View>
    </View>
  );
};

export default Calendar;
