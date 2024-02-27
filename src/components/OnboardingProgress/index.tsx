import React from 'react';
import { View, Text } from 'react-native';
import * as Progress from 'react-native-progress';
import Colors from 'utils/Colors';

interface ProgressTrackerProps {
  steps: number;
  currentStep: number;
}

const OnboardingProgress: React.FC<ProgressTrackerProps> = ({ steps, currentStep }) => {
  const progress = currentStep / steps;

  return (
    <View>      
      <Progress.Bar 
        progress={progress} 
        color={Colors.primary.light}
        unfilledColor={Colors.primary.dark}
        width={300}
        height={20}
        borderWidth={0}
        borderRadius={100}
      />

    </View>
  );
};

export default OnboardingProgress;