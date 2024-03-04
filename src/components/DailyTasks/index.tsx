import React, { useState } from 'react';
import FormatStyle from 'utils/FormatStyle';
import TextStyles from 'utils/TextStyles';
import Colors from 'utils/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, View } from 'react-native';
import CompletedDot from 'components/CompletedDot';

interface DailyTasksProps {
  taskCompletionStatuses?: boolean[]
}

const DailyTasks = ({ taskCompletionStatuses = [] }: DailyTasksProps) => {
  const taskTitles = ['Feed your plasty', 'Recycle a plastic', 'Over 50% happiness'];
  const dotColors = [Colors.secondary.red, Colors.secondary.yellow, Colors.primary.dark];
  // console.log(taskCompletionStatuses);
  return (
    <ScrollView>
      <View style={{ gap: 10, marginBottom: 30 }}>
        {taskCompletionStatuses.map((taskComplete, index) => (
          <Task key={index} complete={taskComplete} title={taskTitles[index]} color={dotColors[index]}/>
        ))}
      </View>
    </ScrollView>
  );
};

interface TaskProps {
  complete: boolean
  title: string
  color: string
}

const Task = ({ complete, title, color }: TaskProps) => {
  return (
    <View style={{ borderColor: Colors.primary.dark, borderWidth: 2, padding: 20, borderRadius: 15, width: 350, flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ ...TextStyles.regular }}>{title}</Text>
      <CompletedDot color={color} completed={complete}></CompletedDot>
    </View>
  );
};

export default DailyTasks;