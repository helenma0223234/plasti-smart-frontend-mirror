import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { PieChartData} from '../../../components/DoughnutChart';
import DoughnutChart from '../../../components/DoughnutChart';
import { BaseTabRoutes } from 'navigation/routeTypes';
import { useNavigation } from '@react-navigation/native';
import NavType from 'utils/NavType';
import { Svg, Circle } from 'react-native-svg';

import { Ionicons } from '@expo/vector-icons';
import Colors from 'utils/Colors';
import useAppSelector from 'hooks/useAppSelector';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;



const ProgressReport = () => {
    const user = useAppSelector((state) => state.users.selectedUser);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const navigation = useNavigation<NavType>();

    const buttonLabels = ['Reused', 'All', 'Recycled'];
    const data: PieChartData[] = [
      { name: 'PET (Pol. 1)', population: user.Type1Recycled, color: '#CC554E' },
      { name: 'HDPE (Pol. 2)', population: user.Type2Recycled, color: '#50776F' },
      { name: 'PVC (Pol. 3)', population: user.Type3Recycled, color: '#CD775C' },
      { name: 'LDPE (Pol. 4)', population: user.Type4Recycled, color: '#586E97' },
      { name: 'PP (Pol. 5)', population: user.Type5Recycled, color: '#DBA26D' },
      { name: 'PS (Pol. 6)', population: user.Type6Recycled, color: '#5E5672' },
      { name: 'Other (Pol. 7)', population: user.Type7Recycled, color: '#676761' },
    ];
    const getPopulationData = (): PieChartData[] => {
        if (selectedIndex === 0) {
            return [
                { name: 'PET (Pol. 1)', population: user.Type1Reused, color: '#CC554E' },
                { name: 'HDPE (Pol. 2)', population:  user.Type2Reused, color: '#50776F' },
                { name: 'PVC (Pol. 3)', population:  user.Type3Reused, color: '#CD775C' },
                { name: 'LDPE (Pol. 4)', population:  user.Type4Reused, color: '#586E97' },
                { name: 'PP (Pol. 5)', population:  user.Type5Reused, color: '#DBA26D' },
                { name: 'PS (Pol. 6)', population:  user.Type6Reused, color: '#5E5672' },
                { name: 'Other (Pol. 7)', population:  user.Type7Reused, color: '#676761' },
            ];
        } else if (selectedIndex === 1) {
            return [
                { name: 'PET (Pol. 1)', population: user.Type1Reused + user.Type1Recycled, color: '#CC554E' },
                { name: 'HDPE (Pol. 2)', population: user.Type2Reused + user.Type2Recycled, color: '#50776F' },
                { name: 'PVC (Pol. 3)', population: user.Type3Reused + user.Type3Recycled, color: '#CD775C' },
                { name: 'LDPE (Pol. 4)', population: user.Type4Reused + user.Type4Recycled, color: '#586E97' },
                { name: 'PP (Pol. 5)', population: user.Type5Reused + user.Type5Recycled, color: '#DBA26D' },
                { name: 'PS (Pol. 6)', population: user.Type6Reused + user.Type6Recycled, color: '#5E5672' },
                { name: 'Other (Pol. 7)', population: user.Type7Reused + user.Type7Recycled, color: '#676761' },
            ];
        } else {
            return data;
        }
    };

    const isChartEmpty = ():Boolean => {
        return getPopulationData().every((item) => item.population === 0);
    }

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.topContainer}>
            <View style={styles.backButtonContainer}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                  navigation.navigate(BaseTabRoutes.EDUCATION, {});
                }}>
                <Ionicons name="arrow-back-outline" size={screenHeight*0.03} color="#1B453C" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.header}>Your Progress Report</Text>

          <View style={styles.buttonContainer}>
            {buttonLabels.map((label, index) => (
              <TouchableOpacity
                key={index}
                style={[
                    styles.button,
                    index === 0 && styles.leftButton,
                    index === buttonLabels.length - 1 && styles.rightButton,
                    index !== 0 && index !== buttonLabels.length - 1 && styles.middleButton,
                    selectedIndex === index && styles.selectedButton,]}
                onPress={() => setSelectedIndex(index)}>
                <Text style={[
                  styles.buttonText,
                  selectedIndex === index && styles.selectedButtonText]}>
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.chartContainer}>
              {!isChartEmpty() ? 
                <DoughnutChart data={getPopulationData()} size={screenWidth * 0.9} /> 
              : 
              <View style={{alignContent: 'center', justifyContent: 'center', alignSelf: 'center', minHeight: screenHeight * 0.4}}>
                <Text style={{textAlign: 'center',
                              fontSize: screenHeight * 0.0325,
                              fontFamily: 'Inter_500Medium',
                              marginBottom: 10,
                              color: Colors.primary.dark,}}>
                  No data to display
                </Text>
                <Text style={{textAlign: 'center',
                              fontSize: screenHeight * 0.03,
                              fontFamily: 'Inter_500Medium',
                              marginBottom: 10,
                              color: Colors.primary.dark,}}>
                  Start Recycling!
                </Text>
              </View>}
          </View>

          <View style={styles.legendContainer}>
            {getPopulationData().map((item, index) => (
              // item.population > 0 &&
                <View key={index} style={styles.legendItem}>
                    <Svg height="20" width="20">
                        <Circle cx="10" cy="10" r="10" fill={item.color} />
                    </Svg>
                    <Text style={styles.legendText}>{item.population} {item.name}</Text>
                </View>
            ))}
        </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      backgroundColor: Colors.secondary.white,
  },
  header: {
      textAlign: 'center',
      fontSize: screenHeight * 0.0325,
      fontFamily: 'Inter_500Medium',
      marginBottom: 10,
      color: Colors.primary.dark,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    width: screenWidth * 0.85, // 75% width of the screen
    alignSelf: 'center', // Center the container horizontally
  },
  button: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor:  Colors.primary.dark,
      borderWidth: 1,
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
      backgroundColor:  Colors.primary.dark,
  },
  buttonText: {
      color:  Colors.primary.dark,
  },
  selectedButtonText: {
      color: 'white',
  },
  chartContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
  },
  backButtonContainer: {
    position: 'absolute',
    left: '4%',
    borderColor: Colors.primary.dark,
    borderWidth: 1,
    width: screenHeight*0.05,
    height: screenHeight*0.05,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    height: screenHeight*0.07,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  legendContainer: {
    marginTop: screenHeight * 0.02,
    marginLeft: screenWidth * 0.1,
    width: screenWidth * 0.8,  
    minHeight: screenHeight * 0.7,
    alignSelf: 'center', 
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',  // Space between items
    gap: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '48%', 
  },
  legendText: {
    marginLeft: 5,
    fontSize: screenHeight * 0.0175,
    color: '#2C3E50',
    textAlign: 'center',
  },
});

export default ProgressReport;