import React, { useState } from 'react';
import { StyleSheet, Dimensions, Text, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import FormatStyle from 'utils/FormatStyle';
import TextStyles from 'utils/TextStyles';
import Colors from 'utils/Colors';


interface CalendarProps {
  curr_date: number
  dates: number[]
  children?: React.ReactNode
}




const Calendar = ({ curr_date, dates, children }: CalendarProps) => {
  const dummyCircles = [1, 1];
  return (
    <View >
      <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        <Feather name="calendar" size={24} color="black" />
        <Text>June 2024</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {dates.map((date: number, key: number) => (
          <Date circles={dummyCircles} date={date} key={key} active={key == 4} isPast={key < 4}></Date>
        ))}
      </View>
    </View>
  );
};

interface DateProps {
  date: number
  active?: boolean
  isPast: boolean
  circles: number[]
}

const Date = ({ isPast, active, date, circles }: DateProps) => {
  return (
    <View style={{ flexDirection: 'column', marginBottom: 0, gap: -10, alignItems: 'center' }}>


      <View style={{
        ...FormatStyle.circle,
        backgroundColor: isPast == true ? Colors.primary.dark : Colors.secondary.white,
        width: 40,
        height: 40,
        borderWidth: active ? 5 : 0,
        borderColor: active ? Colors.primary.dark : '',

      }}>
        <Text style={{ ...TextStyles.small, color: isPast == true ? Colors.secondary.light : Colors.primary.dark }}>{date}</Text>
      </View>
      <View style={{ alignItems: 'center', flexDirection: 'row', gap: 2 }}>
        {circles.map((circle: number, key: number) => (
          <View style={{ ...FormatStyle.circle, backgroundColor: 'red', width: 5, height: 5, borderWidth: 0 }} key={key}></View>
        ))}
      </View>
    </View>
  );
};

export default Calendar;

