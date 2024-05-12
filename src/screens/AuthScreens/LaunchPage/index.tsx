import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import NavType from '../../../utils/NavType';
import { AuthStackRoutes } from '../../../navigation/routeTypes';
import Cat from '../../../assets/Cat.svg';


const FrontPage = () => {
  const navigation = useNavigation<NavType>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <View style={styles.catContainer}>
            <Cat width={400} />
          </View>
          <Text style={styles.logo}>PlastiCycle</Text>
          <Text style={styles.subtitle}>
          The free, fun, and effective way to learn, recycle, and compete with
          friends
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
    borderColor: 'white',
    backgroundColor: '#FBFBF4',
  },
  innerContainer: {
    borderWidth: 10,
    borderTopWidth: '120%',
    borderColor:'#FBFBF4',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 70,
    textAlign: 'center', // Ensure logo text is centered
    color: '#1B453C',
    marginTop: 20,
    marginBottom: -20,
  },
  catContainer: {
    position: 'absolute',
    bottom: 30,
    zIndex: 0, // This will place the Cat behind the text
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 30, // Adjust spacing if needed
    color: '#1B453C',
    fontSize: 18,
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
    paddingHorizontal: 20,
    backgroundColor: '#1B453C',
    borderRadius: 5,
    marginTop: 10,
    minWidth: '90%',
    maxWidth: '90%',
    minHeight: '10%',
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
