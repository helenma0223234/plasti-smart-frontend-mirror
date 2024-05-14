import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, Modal, Alert } from 'react-native';
import { BaseTabRoutes } from 'navigation/routeTypes';
import { useNavigation } from '@react-navigation/native';
import NavType from 'utils/NavType';
import Colors from 'utils/Colors';
import Avatar from 'components/Avatar';
import { Ionicons } from '@expo/vector-icons';
import Award from '../../../assets/award.svg'
import CircleBG from '../../../assets/Ellipse 66.svg';
import {AvatarAccessories, AvatarsOwned, AvatarCustomization, AvatarColors} from 'types/avatars';
import useAppDispatch from 'hooks/useAppDispatch';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const gridWidth = screenWidth * 0.85;
const gridHeight = screenHeight * 0.435;
const gridItemWidth = gridWidth * 0.3;
const gridItemHeight = gridWidth * 0.3;
const modalHeight = screenHeight * 0.3;
const modalWidth = screenWidth * 0.8;

const AvatarCustomizationPage = () => {
  const navigation = useNavigation<NavType>();
  const [selectedButton, setSelectedButton] = useState(1);
  const buttonLabels = ['Color', 'Avatar', 'Accessories'];

  const [modalVisible, setModalVisible] = useState(false);
  const [modalBuyType, setModalBuyType] = useState(1);
  const [modalBuyID, setModalBuyID] = useState(1);

  //TODO: update these once redux is setup for user
  const userPoints = 20;
  const avatarID = 1;
  const color = 1;
  const accessory = 1;
    
  const defaultAvatarAccessories: AvatarAccessories[] = [
    { id: 1, unlocked: false, cost: 100},
    { id: 2, unlocked: false, cost: 100},
    { id: 3, unlocked: false, cost: 100},
    { id: 4, unlocked: false, cost: 100},
    { id: 5, unlocked: false, cost: 100},
    { id: 6, unlocked: false, cost: 100},
    { id: 7, unlocked: false, cost: 100},
    { id: 8, unlocked: false, cost: 100},
    { id: 9, unlocked: false, cost: 100},
  ];

  const defaultAvatarColors: AvatarColors[] = [
    { id: 1, unlocked: true, cost: 0},
    { id: 2, unlocked: false, cost: 150},
    { id: 3, unlocked: false, cost: 150},
  ];

  const defaultAvatarsOwned: AvatarsOwned[] = [
    { id: 1, unlocked: true, cost: 0, colors: defaultAvatarColors},
    { id: 2, unlocked: false, cost: 200, colors: defaultAvatarColors},
    { id: 3, unlocked: false, cost: 200, colors: defaultAvatarColors},
  ];

  const defaultAvatarCustomization: AvatarCustomization = {
    AvatarsOwned: defaultAvatarsOwned,
    AvatarAccessories: defaultAvatarAccessories
  };

  const getCost = (buyType: number, buyID: number): number => {
    if (buyType === 0) {
      return defaultAvatarCustomization.AvatarsOwned[avatarID-1].colors[buyID-1].cost;
    } else if (buyType === 1) {
      return defaultAvatarCustomization.AvatarsOwned[buyID-1].cost;
    } else if (buyType === 2) {
      return defaultAvatarCustomization.AvatarAccessories[buyID-1].cost;
    }
    return -1;
  };

  const buyItem = (buyType: number, buyID: number) => {
    const cost = getCost(buyType, buyID);
    if (cost > userPoints) {
      alert('You don\'t have enough points to buy this');
      return;
    }

    // TODO: make purchase via app dispatch once redux is setup

  };


  return (
    <SafeAreaView style={{...styles.container, flexDirection: 'column'}}>

      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          style={{ flex: 1, alignSelf: 'center' }}
      >
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => {setModalVisible(false);}} style={styles.modalClose}>
            <Ionicons name="close-circle-outline" size={screenHeight*0.03}  color={Colors.primary.dark}></Ionicons>
          </TouchableOpacity>

          {modalBuyType === 0 && <Avatar avatarID={avatarID} color={modalBuyID} size={modalHeight*0.5} shadow={true} accessory={-1}></Avatar>}
          {modalBuyType === 1 && <Avatar avatarID={modalBuyID} color={1} size={modalHeight*0.5} shadow={true} accessory={-1}></Avatar>}
          {modalBuyType === 2 && <Avatar avatarID={avatarID} color={color} size={modalHeight*0.5} shadow={true} accessory={modalBuyID}></Avatar>}

          <TouchableOpacity style={styles.modalBuyButton} onPress={() => {buyItem(modalBuyType, modalBuyID);}}>
            <Text style={styles.modalBuyButtonText}>Buy for {getCost(modalBuyType, modalBuyID)} points</Text>
          </TouchableOpacity>
        </View>
      </Modal>

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
          <Text style={styles.headerText}> {userPoints} Points</Text>
        </View>
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

          <View style={styles.grid}>

            {selectedButton === 0 && defaultAvatarCustomization.AvatarsOwned[avatarID-1].colors.map((color, index) => (
              <GridItem unlocked={color.unlocked} cost={color.cost} setModalVisible={setModalVisible} 
                setModalBuyType={setModalBuyType} setModalBuyID={setModalBuyID} buyType={0} buyID={color.id} component={ () =>
                <Avatar avatarID={avatarID} color={color.id} size={gridItemWidth* 0.95} accessory={-1} shadow={true}></Avatar>
              }></GridItem>
            ))}

            {selectedButton === 1 && defaultAvatarCustomization.AvatarsOwned.map((avatar, index) => (
              <GridItem unlocked={avatar.unlocked} cost={avatar.cost} setModalVisible={setModalVisible} 
                setModalBuyType={setModalBuyType} setModalBuyID={setModalBuyID} buyType={1} buyID={avatar.id} component={ () =>
                <Avatar avatarID={avatar.id} color={1} size={gridItemWidth* 0.95} accessory={-1} shadow={true}></Avatar>
              }></GridItem>
            ))}

            {selectedButton === 2 && defaultAvatarCustomization.AvatarAccessories.map((accessory, index) => (
              <GridItem unlocked={accessory.unlocked} cost={accessory.cost} setModalVisible={setModalVisible} 
              setModalBuyType={setModalBuyType} setModalBuyID={setModalBuyID} buyType={2} buyID={accessory.id}></GridItem>
            ))}
          
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const equipItem = (buyType: number, buyID: number) => {
  // TODO: make equip via app dispatch once redux is setup
  // TOOD: call this in onPress for grid items that are unlocked
  return;
};

interface GridItemProps {
  unlocked: boolean;
  cost: number;
  component?: () => React.ReactNode;
  buyType: number;
  buyID: number;
  setModalVisible: (visible: boolean) => void;
  setModalBuyType: (buyType: number) => void;
  setModalBuyID: (buyID: number) => void;
}

const GridItem = ({unlocked, cost, component, buyType, buyID, setModalVisible, setModalBuyType, setModalBuyID} : GridItemProps) => {
  return (
    unlocked ?
      <TouchableOpacity style={styles.gridItemBox} 
        onPress={() => {equipItem(buyType, buyID);}} >
        {component && component()}
      </TouchableOpacity> 
    : 
      <TouchableOpacity style={styles.lockedGridItemBox}
        onPress={() => {
          console.error(`buying item, buytype: ${buyType}, buyId ${buyID} `)
          setModalVisible(true);
          setModalBuyType(buyType);
          setModalBuyID(buyID);
        }} 
      >
        {component && component()}
        <View style={styles.overlay} />
        <Ionicons name="lock-closed-outline" size={screenHeight*0.03} color={Colors.secondary.white} style={styles.lockStyle}/>
        <View style={styles.gridItemCost}>
          <Text style={styles.gridItemCostText}>{cost} points</Text>
        </View>
      </TouchableOpacity>
  );
}

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
    marginBottom: screenHeight * 0.015,
    width: screenWidth * 0.85, // 75% width of the screen
    height: screenHeight * 0.03,
    bottom: screenHeight * 0.145,
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
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.primary.dark,
    borderWidth: 1,
  },
  grid :{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: gridWidth,
    minHeight: gridHeight,
    bottom: screenHeight * 0.135,
  },
  gridItemBox: {
    width: gridItemWidth,
    height: gridItemHeight,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: screenHeight * 0.015,
  },
  lockedGridItemBox: {
    width: gridItemWidth,
    height: gridItemHeight,
    backgroundColor: Colors.secondary.light,
    position: 'relative',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: screenHeight * 0.015,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.primary.dark,
    opacity: 0.4, 
    borderRadius: 15,
  },
  lockStyle: {
    position: 'absolute',
    bottom: gridItemHeight * 0.7,
    left: gridItemWidth * 0.7,
  },
  gridItemCost: {
    position: 'absolute',
    bottom: 0,
    width: '70%',
    height: '20%',
    backgroundColor: Colors.primary.dark,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  gridItemCostText: {
    fontFamily: 'Inter_600SemiBold',
    color: Colors.secondary.white,
    fontSize: screenWidth * 0.03
  },
  modalView: {
    backgroundColor: Colors.secondary.light,
    width: modalWidth,
    maxHeight: modalHeight,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: screenHeight * 0.075,
    marginTop: screenHeight * 0.3,
    borderRadius: 20,
    alignSelf: 'center',
    position:'relative'
  },
  modalClose: {
    position: 'absolute',
    top: screenHeight * 0.0125,
    right: screenWidth * 0.03,
  },
  modalBuyButton: {
    backgroundColor: Colors.primary.dark,
    borderRadius: 10,
    width: modalWidth * 0.7,
    height: modalHeight * 0.175,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: modalHeight * 0.05,
  },
  modalBuyButtonText: {
    fontFamily: 'Inter_700Bold',
    color: Colors.secondary.white,
    fontSize: screenWidth * 0.0375
  }
});

export default AvatarCustomizationPage;