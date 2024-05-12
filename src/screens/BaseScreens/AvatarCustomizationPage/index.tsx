import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { BaseTabRoutes } from 'navigation/routeTypes';
import { useNavigation } from '@react-navigation/native';
import NavType from 'utils/NavType';
import Colors from 'utils/Colors';
import Avatar from 'components/Avatar';
import { Ionicons } from '@expo/vector-icons';
import Award from '../../../assets/award.svg'
import CircleBG from '../../../assets/Ellipse 66.svg';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const AvatarCustomizationPage = () => {
    const navigation = useNavigation<NavType>();
    const [selectedButton, setSelectedButton] = useState(1);
    const buttonLabels = ['Color', 'Avatar', 'Accessories'];

    const avatarID = 1;
    const color = 1;
    const accessory = 1;

    

    return (
        <SafeAreaView style={{...styles.container, flexDirection: 'column'}}>
          <View style={styles.header}>
            <TouchableOpacity
              style={{...styles.button, position: 'absolute', left: '4%'}}
              onPress={() => {
                navigation.navigate(BaseTabRoutes.HOME, {});
              }}>
              <View style={styles.backButtonContainer}>
                <Ionicons name="arrow-back-outline" size={screenHeight*0.03} color={Colors.primary.dark} />
              </View>
            </TouchableOpacity>
            
            <View style={styles.headerTextContainer}>
              <Award/>
              <Text style={styles.headerText}> 20 Points</Text>
            </View>
            <TouchableOpacity
                style={{...styles.button, position: 'absolute', right: '4%'}}
                onPress={() => {
                  navigation.navigate(BaseTabRoutes.HOME, {});
                }}>
              <View style={styles.checkButtonContainer}>
                <Ionicons name="checkmark-sharp" size={screenHeight*0.035} color={Colors.primary.dark} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.circleContainer}>
            <CircleBG style={styles.circleBG} width={screenHeight * 0.75} height={screenHeight * 0.75} />
            <View style={styles.rectangle}>
              
              <Avatar avatarID={avatarID} color={color} size={screenHeight * 0.225} accessory={accessory}
                style={{bottom: screenHeight * 0.15}} shadow={true}
              />

              <View style={styles.rowButtonContainer}>
                {buttonLabels.map((label, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                        styles.rowButton,
                        index === 0 && styles.leftButton,
                        index === buttonLabels.length - 1 && styles.rightButton,
                        index !== 0 && index !== buttonLabels.length - 1 && styles.middleButton,
                        selectedButton === index && styles.selectedButton,]}
                    onPress={() => setSelectedButton(index)}>
                    <Text style={[
                      styles.buttonText,
                      selectedButton === index && styles.selectedButtonText]}>
                      {label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View>

              </View>

            </View>
          </View>


        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: Colors.secondary.white,
  },
  header: {
    height: 60,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: screenHeight*0.0275,
    color: Colors.primary.dark,
    fontFamily: 'Inter_700Bold'
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  backButtonContainer: {
    borderColor: Colors.primary.dark,
    borderWidth: 1,
    width: screenHeight*0.05,
    height: screenHeight*0.05,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkButtonContainer: {
    position: 'absolute',
    right: '4%',
    borderColor: Colors.primary.dark,
    borderWidth: 1,
    width: screenHeight*0.05,
    height: screenHeight*0.05,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    alignItems: 'center',
    // overflow: 'hidden', // to only show the top bit of the circle
  },
  circleBG: {
    position: 'absolute',
    top: 0, // to only show the top bit of the circle
  },
  rectangle: {
    position: 'absolute',
    top: screenHeight * 0.15, // adjust this value to control the visible amount of the circle
    width: '100%',
    height: screenHeight * 0.8, // adjust this value to control the height of the rectangle
    backgroundColor: Colors.secondary.normal,
    flexDirection: 'column',
    alignItems: 'center',
  },
  rowButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    width: screenWidth * 0.85, // 75% width of the screen
    alignSelf: 'center', // Center the container horizontally
    height: screenHeight * 0.03,
  },
  leftButton: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderRightWidth: 0,
  },
  middleButton: {
      borderRadius: 0,
      borderLeftWidth: 1,
      borderRightWidth: 1,
  },
  rightButton: {
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
      borderLeftWidth: 0,
  },
  selectedButton: {
      backgroundColor: Colors.primary.dark,
  },
  buttonText: {
      color: Colors.primary.dark,
      fontFamily: 'Inter_600SemiBold',
      fontSize: screenHeight*0.0165,
  },
  selectedButtonText: {
      color: 'white',
      fontFamily: 'Inter_600SemiBold',
      fontSize: screenHeight*0.0165,
  },
  rowButton: {
    flex: 1,
    // padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  grid :{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default AvatarCustomizationPage;