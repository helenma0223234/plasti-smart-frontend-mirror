import React, { useState } from 'react';
import FormatStyle from 'utils/FormatStyle';
import TextStyles from 'utils/TextStyles';
import Colors from 'utils/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, View } from 'react-native';

interface DailyTasksProps {
  fea: number
}

const DailyTasks = () => {
  return (
    <ScrollView>
      <View style={{ gap: 10, marginBottom: 30 }}>
        <Task complete={true} title={'Get your money up'}></Task>
        <Task complete={true} title={'Inject the cat with microplastics'}></Task>
        <Task complete={true} title={'Call mom'}></Task>
      </View>
    </ScrollView>
  );
};

interface TaskProps {
  complete: boolean
  title: string
}

const Task = ({ complete, title }: TaskProps) => {
  return (
    <View style={{ borderColor: Colors.primary.dark, borderWidth: 2, padding: 20, borderRadius: 15, width: 350 }}>
      <Text style={{ ...TextStyles.regular }}>{title}</Text>
    </View>
  );
};

export default DailyTasks;