import React, { useState } from "react";
import { Text, View } from "react-native";

import FormatStyle from "utils/FormatStyle";
import TextStyles from "utils/TextStyles";
import Colors from "utils/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { transformer } from "../../../metro.config";

interface CalendarProps {
  // curr_date: number
  // dates: number[]
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
  console.log(isEmpty);
  return (
    <View style={{ marginTop: 8 }}>
      <Text style={{ color: Colors.primary.dark, marginBottom: -12 }}>
        Daily Goal
      </Text>
      <ScrollView
        horizontal={true}
        style={{ width: 350 }}
        contentOffset={{ x: 400, y: 0 }}
        bounces={true}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ flexDirection: "row", gap: 10, marginRight: 6 }}>
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

  return (
    <View
      style={{
        flexDirection: "column",
        marginBottom: 0,
        gap: -11,
        alignItems: "center",
      }}
    >
      <View
        style={{
          ...FormatStyle.circle,
          backgroundColor:
            (isPast && "#ADC0AB") ||
            (active && Colors.primary.dark) ||
            Colors.secondary.white,
          width: 40,
          height: 40,
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
      <View style={{ alignItems: "center", flexDirection: "row", gap: 4 }}>
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
          // <View style={FormatStyle.circle2} />
          <View style={{
            ...FormatStyle.circle,
            backgroundColor: 'transparent',
            width: 6,
            height: 6,
            borderWidth: 0,
          }}></View>
        ) : (
          colorcircles.map((circle: number, key: number) =>
            circle === 1 ? (
              <View
                style={{
                  ...FormatStyle.circle,
                  backgroundColor: circleColors[key],
                  width: 6,
                  height: 6,
                  borderWidth: 0,
                }}
                key={key}
              ></View>
            ) : null
          )
        )}
      </View>
    </View>
  );
};

export default Calendar;
