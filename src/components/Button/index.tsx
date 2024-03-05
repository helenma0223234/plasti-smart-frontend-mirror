import React from 'react';
import { GestureResponderEvent, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from 'utils/Colors';
import TextStyles from 'utils/TextStyles';

interface AppButtonProps {
  onPress: (event: GestureResponderEvent) => void
  title: string
  fullWidth?: boolean
  isArrow?: boolean
  backgroundColor?: string
  textColor?: string
  style?: StyleProp<ViewStyle>
  inverted?: boolean
  disabled?: boolean
  textStyle?: StyleProp<TextStyle>
}

const Button = ({
  onPress,
  title,
  isArrow,
  fullWidth,
  style,
  textStyle,
  backgroundColor = Colors.primary.dark,
  textColor = 'white',
  inverted = false,
  disabled = false,
}: AppButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    style={{
      ...styles.appButtonContainer,
      backgroundColor,
      ...(style as object),
      ...(inverted) && { backgroundColor: Colors.secondary.white, borderColor: Colors.primary.dark, borderWidth: 1 },
      ...(fullWidth) && { width: '100%' },
      ...(disabled) && { backgroundColor: Colors.secondary.light },
      
    }}>
    <Text style={[styles.appButtonText, { color: textColor, ...(inverted) && { color: Colors.primary.dark }, ...(disabled) && { color: Colors.primary.dark } }, textStyle]}>{title}</Text>
    {
      isArrow && <AntDesign name='caretright' size={25} color='white' />
    }
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: Colors.primary.normal,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: 14,
    alignContent: 'center',

  },
  appButtonText: {
    ...TextStyles.subTitle,
    color: 'white',
    alignSelf: 'center',
    textTransform: 'uppercase',
    fontSize: 20,
  },
});

export default Button;
