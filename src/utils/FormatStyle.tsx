import { StyleSheet, Dimensions } from 'react-native';
import Colors from './Colors';

const FormatStyle = StyleSheet.create({
  topContainer: {
    flex: 1,
    backgroundColor: Colors.secondary.white,
    alignItems: 'center',
  },
  
  container: {
    flex: 1,
    backgroundColor: Colors.secondary.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  innerContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    width: Dimensions.get('window').width * (6 / 7),
    paddingBottom: 0,
  },

  button: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    height: 100,
    backgroundColor: '#C4C4C4',
    marginTop: 60,
  },

  circle: {
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#C4C4C4',
    marginTop: 20,
  },

  circle2: {
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'transparent',
    marginTop: 20,
  },

  lf: {
    fontSize: 27.5,
  },
});

export default FormatStyle;
