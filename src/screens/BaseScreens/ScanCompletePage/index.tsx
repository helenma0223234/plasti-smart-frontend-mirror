import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import useAppDispatch from 'hooks/useAppDispatch';
import { BaseTabRoutes, BaseNavigationList } from 'navigation/routeTypes';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useEffect } from 'react';
// import { useFocusEffect } from '@react-navigation/native';
import { cameraClosed } from 'redux/slices/cameraSlice';

import CircleBG from '../../../assets/Ellipse 66.svg';
import Confetti from '../../../assets/confetti.svg';

type ScanCompletePageProps = {
  navigation: StackNavigationProp<BaseNavigationList>;
};

const ScanCompletePage = ({ navigation }: ScanCompletePageProps) => {
  return (
    <View style={styles.container}>

      <View style={{
        width: 400,
        overflow: 'hidden',
        aspectRatio: 1,

        alignItems: 'center',
        position: 'absolute',
        top: '4%',

      }}>
        <Image source={require('../../../assets/confetti.svg')}></Image>
        <Confetti />
      </View>

      <View style={{
        width: 400,
        overflow: 'hidden',
        aspectRatio: 1,

        alignItems: 'center',
        position: 'absolute',
        bottom: -50,

      }}>
        <Image source={require('../../../assets/Ellipse 66.svg')}></Image>
        <CircleBG></CircleBG>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Congratulations! You've just earned points
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.scanButtonContainer}>
          <TouchableOpacity 
            style={styles.scanButton}
            onPress={() => {navigation.navigate(BaseTabRoutes.EDUCATION, {});}}
          >
            <Text style={styles.scanButtonText}>LEARN MORE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.homeButtonContainer}>
          <TouchableOpacity 
            style={styles.homeButton}
            onPress={() => {
              navigation.navigate(BaseTabRoutes.HOME, {});
            }}
          >
            <Text style={styles.homeButtonText}>RETURN HOME</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFBF4',
    flexDirection: 'column',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 200,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    marginTop: 40,
  },
  scanButtonContainer: {
    position: 'relative',
    backgroundColor: 'transparent',
    borderColor: '#1B453C',
    borderWidth: 3,
    borderRadius: 10,
    width: 175,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButton: {
    justifyContent: 'center',
    alignItems: 'center',
    border: 1,
    borderColor: '#1B453C',
  },
  scanButtonText: {
    color: '#1B453C',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  homeButtonContainer: {
    backgroundColor: '#1B453C',
    borderWidth: 1,
    borderRadius: 10,
    width: 175,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  homeButton: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#FBFBF4',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

export default ScanCompletePage;
