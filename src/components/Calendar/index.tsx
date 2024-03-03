import React, { useState } from 'react';
import { Text, View } from 'react-native';

import FormatStyle from 'utils/FormatStyle';
import TextStyles from 'utils/TextStyles';
import Colors from 'utils/Colors';
import { ScrollView } from 'react-native-gesture-handler';


interface CalendarProps {
  // curr_date: number
  // dates: number[]
  children?: React.ReactNode
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


const Calendar = ({ }: CalendarProps) => {

  const dummyCircles = [1, 1];
  return (
    <View>
      <Text>Daily Goal</Text>
      <ScrollView horizontal={true} style={{ width: 350 }} contentOffset={{ x: 400, y: 0 }} bounces={true} showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', gap: 10, marginRight: 6 }}>
          {dates.map((date: number, key: number) => (
            <DateCircle circles={dummyCircles} date={date} key={key} active={key == 10} isPast={key < 10}></DateCircle>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

interface DateProps {
  date: number
  active?: boolean
  isPast: boolean
  circles: number[]
}

const DateCircle = ({ isPast, active, date, circles }: DateProps) => {
  return (
    <View style={{ flexDirection: 'column', marginBottom: 0, gap: -11, alignItems: 'center' }}>


      <View style={{
        ...FormatStyle.circle,
        backgroundColor: isPast && '#ADC0AB' || active && Colors.primary.dark || Colors.secondary.white,
        width: 40,
        height: 40,

      }}>
        <Text style={{ ...TextStyles.small, color: active && Colors.secondary.white }}>{date}</Text>
      </View>
      <View style={{ alignItems: 'center', flexDirection: 'row', gap: 4 }}>
        {circles.map((circle: number, key: number) => (
          <View style={{ ...FormatStyle.circle, backgroundColor: Colors.highlight, width: 6, height: 6, borderWidth: 0 }} key={key}></View>
        ))}
      </View>
    </View>
  );
};

export default Calendar;

