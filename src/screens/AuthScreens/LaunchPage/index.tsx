import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import NavType from '../../../utils/NavType';
import { AuthStackRoutes } from '../../../navigation/routeTypes';
import LaunchShiba from '../../../assets/LaunchShiba.svg';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const FrontPage = () => {
  const navigation = useNavigation<NavType>();

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.catContainer}>
        <LaunchShiba width={400} />
      </View> */}
      <View style={styles.innerContainer}>
        <View style={styles.catContainer}>
          <LaunchShiba width={screenWidth * 0.8} />
        </View>
        <View style={styles.header}>
          
          <Text style={styles.logo}>PlastiSmart</Text>
          <Text style={styles.subtitle}>
          The fun and sustainable way to learn about plastic polymers: earn points, 
collect prizes and change the world!
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate(AuthStackRoutes.SIGNUP)}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.invertedButton]}
            onPress={() => navigation.navigate(AuthStackRoutes.SIGNIN)}
          >
            <Text style={styles.invertedButtonText}>
            I Already Have an Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FBFBF4',
  },
  innerContainer: {
    borderWidth: screenWidth * 0.05,
    borderTopWidth: screenHeight * 0.2,
    borderColor:'#FBFBF4',
    // backgroundColor:'blue',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 70,
    textAlign: 'center',
    color: '#1B453C',
    marginTop: 10,
    marginBottom: -60,
    zIndex:0,
  },
  catContainer: {
    position: 'absolute',
    bottom: screenHeight * 0.36,
    right:screenWidth * 0.04,
    zIndex: 0, // place the avatar in front the text
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 60,
    color: '#1B453C',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: 0.1,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50%',
    marginBottom: '-30%',
    width: '100%',
    alignSelf: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#1B453C',
    borderRadius: 10,
    marginTop: 16,
    minWidth: '90%',
    maxWidth: '90%',
    minHeight: 50,
    maxHeight: 50,
  },
  invertedButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#1B453C',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  invertedButtonText: {
    textAlign: 'center',
    color: '#1B453C',
    fontSize: 15,
    textTransform: 'uppercase',
  },
});

export default FrontPage;
