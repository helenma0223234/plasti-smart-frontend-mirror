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
import useAppSelector from 'hooks/useAppSelector';
import { buyAvatar, buyAvatarColor, buyAvatarAccessory, equipAccessory, equipAvatar, equipColor } from 'redux/slices/usersSlice';
import FullAlertModal from '../HomePage/fullAlertModal';

import { IUser } from 'types/users';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const gridWidth = screenWidth * 0.85;
const gridHeight = screenHeight * 0.435;
const gridItemWidth = gridWidth * 0.3;
const gridItemHeight = gridWidth * 0.3;
const modalHeight = screenHeight * 0.3;
const modalWidth = screenWidth * 0.8;

const AvatarCustomizationPage = () => {
  const user = useAppSelector((state) => state.users.selectedUser);
  const dispatch = useAppDispatch();
  
  const navigation = useNavigation<NavType>();
  const [selectedButton, setSelectedButton] = useState(1);
  const buttonLabels = ['Color', 'Avatar', 'Accessories'];

  const [modalVisible, setModalVisible] = useState(false);
  const [modalBuyType, setModalBuyType] = useState(1);
  const [modalBuyID, setModalBuyID] = useState(1);

  const [alertModalVisible, setAlertModalVisible] = React.useState(false);
  const [alertModalMessage, setAlertModalMessage] = React.useState('');

  const userPoints = user.points;
  const avatarID = user.avatarID;
  const color = user.avatarColor;
  const accessory = user.avatarAccessoryEquipped;

  const avatarCustomization = user.avatarCustomization;

  const getCost = (buyType: number, buyID: number): number => {
    if (buyType === 0) {
      return avatarCustomization.AvatarsOwned[user.avatarID-1].colors[buyID-1].cost;
    } else if (buyType === 1) {
      return avatarCustomization.AvatarsOwned[buyID-1].cost;
    } else if (buyType === 2) {
      return avatarCustomization.AvatarAccessories[buyID-1].cost;
    }
    return -1;
  };

  const buyItem = (buyType: number, buyID: number) => {
    const cost = getCost(buyType, buyID);
    if (cost > userPoints) {
      alert('You don\'t have enough points to buy this');
      return;
    }

    if (buyType === 0){
      dispatch(buyAvatarColor({id: user.id, colorID: buyID}));
    } else if (buyType === 1) {
      dispatch(buyAvatar({id: user.id, avatarID: buyID}));
    } else if (buyType === 2) {
      dispatch(buyAvatarAccessory({id: user.id, accessoryID: buyID}));
    }

    setModalVisible(false);
  };

  const equipItem = (equipType: number, equipID: number) => {
    // TODO: make equip via app dispatch once redux is setup
    // TOOD: call this in onPress for grid items that are unlocked
    if (equipType === 0) {
      dispatch(equipColor({id: user.id, colorID: equipID}));
    } else if (equipType === 1) {
      dispatch(equipAvatar({id: user.id, avatarID: equipID}));
    } else if (equipType === 2) {
      dispatch(equipAccessory({id: user.id, accessoryID: equipID}));
    }
    return;
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

          {modalBuyType === 0 && <Avatar avatarID={user.avatarID} color={modalBuyID} size={modalHeight*0.5} shadow={true} accessory={-1}></Avatar>}
          {modalBuyType === 1 && <Avatar avatarID={modalBuyID} color={1} size={modalHeight*0.5} shadow={true} accessory={-1}></Avatar>}
          {modalBuyType === 2 && <Avatar avatarID={user.avatarID} color={user.avatarColor} size={modalHeight*0.5} shadow={true} accessory={modalBuyID}></Avatar>}

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
          
          <Avatar avatarID={user.avatarID} color={user.avatarColor} size={screenHeight * 0.225} accessory={user.avatarAccessoryEquipped}
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

            {selectedButton === 0 && avatarCustomization.AvatarsOwned[user.avatarID-1].colors.map((color, index) => (
              <GridItem unlocked={color.unlocked} cost={color.cost} setModalVisible={setModalVisible} 
                setModalBuyType={setModalBuyType} setModalBuyID={setModalBuyID} buyType={0} buyID={color.id} 
                equipItem={equipItem} user={user}
                component={ () =>
                <Avatar avatarID={user.avatarID} color={color.id} size={gridItemWidth* 0.95} accessory={-1} shadow={true}></Avatar>
              }></GridItem>
            ))}

            {selectedButton === 1 && avatarCustomization.AvatarsOwned.map((avatar, index) => (
              <GridItem unlocked={avatar.unlocked} cost={avatar.cost} setModalVisible={setModalVisible} 
                setModalBuyType={setModalBuyType} setModalBuyID={setModalBuyID} buyType={1} buyID={avatar.id} 
                equipItem={equipItem} user={user} component={ () =>
                <Avatar avatarID={avatar.id} color={1} size={gridItemWidth* 0.95} accessory={-1} shadow={true}></Avatar>
              }></GridItem>
            ))}

            {selectedButton === 2 && avatarCustomization.AvatarAccessories.map((accessory, index) => (
              <GridItem unlocked={accessory.unlocked} cost={accessory.cost} setModalVisible={setModalVisible} 
              setModalBuyType={setModalBuyType} setModalBuyID={setModalBuyID} buyType={2} buyID={accessory.id}
              equipItem={equipItem} user={user}></GridItem>
            ))}
          
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
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
  user: IUser | null;
  equipItem?: (equipType: number, equipID: number) => void;
}

const GridItem: React.FC<GridItemProps>= ({unlocked, cost, component, buyType, buyID, setModalVisible, setModalBuyType, setModalBuyID, user, equipItem} : GridItemProps) => {  
  
  return (
    unlocked ?
      <TouchableOpacity style={styles.gridItemBox} 
        onPress={() => {equipItem && equipItem(buyType, buyID);}} >
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