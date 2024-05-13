import React from 'react';
import FormatStyle from 'utils/FormatStyle';
import TextStyles from 'utils/TextStyles';
import Colors from 'utils/Colors';
import { Text, View } from 'react-native';
import CompletedDot from 'components/CompletedDot';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

interface DailyTasksProps {
  taskCompletionStatuses?: boolean[]
}

const DailyTasks = ({ taskCompletionStatuses = [] }: DailyTasksProps) => {
  const taskTitles = ['Feed your plasty', 'Recycle a plastic', 'Over 50% happiness'];
  const dotColors = [Colors.secondary.red, Colors.secondary.yellow, Colors.primary.dark];
  return (
    <View>
      <View style={{ gap: 10, marginBottom: 10 }}>
        {taskCompletionStatuses.map((taskComplete, index) => (
          <Task key={index} complete={taskComplete} title={taskTitles[index]} color={dotColors[index]}/>
        ))}
      </View>
    </View>
  );
};

interface TaskProps {
  complete: boolean
  title: string
  color: string
}

const Task = ({ complete, title, color }: TaskProps) => {
  return (
    <View style={{ borderColor: Colors.primary.dark, borderWidth: 2, padding: 20, borderRadius: 15, width: screenWidth * 0.89, flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ ...TextStyles.regular }}>{title}</Text>
      <CompletedDot color={color} completed={complete}></CompletedDot>
    </View>
  );
};

export default DailyTasks;