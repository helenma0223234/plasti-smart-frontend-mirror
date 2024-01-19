import React from 'react';
import { StyleProp, StyleSheet, TextInput, TextStyle } from 'react-native';
import Colors from 'utils/Colors';
import TextStyles from 'utils/TextStyles';

interface AppButtonProps {
  onChangeText: (text: string) => void
  value: string
  placeholder: string
  secureTextEntry?: boolean
  textStyle?: StyleProp<TextStyle>,
}

const AppTextInput = ({ onChangeText, value, placeholder, secureTextEntry, textStyle }: AppButtonProps) => (
  <TextInput
    onChangeText={onChangeText}
    value={value}
    placeholder={placeholder}
    placeholderTextColor={Colors.neutral[4]}
    style={[
      styles.appTextInputContainer,
      textStyle,
    ]}
    secureTextEntry={(secureTextEntry === null || secureTextEntry === undefined) ? false : secureTextEntry}
  />
);

const styles = StyleSheet.create({
  appTextInputContainer: {
    ...TextStyles.regular,
    borderColor: 'lightgrey',
    borderRadius: 4,
    borderWidth: 1,
    width: '75%',
    padding: 10,
    textAlign: 'center',
  },
});

export default AppTextInput;
