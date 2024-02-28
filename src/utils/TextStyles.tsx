import { StyleSheet } from 'react-native';
import Colors from './Colors';

export default StyleSheet.create({
  logo: {
    fontFamily: 'ITC Cheltenham Std',
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 28, /* 93.333% */
    letterSpacing: -0.4,
    color: Colors.primary.dark,

  },
  title: {
    fontSize: 36,
    fontFamily: 'Raleway_800ExtraBold',
    color: Colors.primary.dark,
  },
  subTitle: {
    fontSize: 22,
    fontFamily: 'Raleway_600SemiBold',
    color: Colors.primary.dark,
  },
  regular: {
    fontSize: 18,
    fontFamily: 'Raleway_400Regular',
    color: Colors.primary.dark,
  },
  small: {
    fontSize: 15,
    fontFamily: 'Raleway_400Regular',
    color: Colors.primary.dark,
  },
});
