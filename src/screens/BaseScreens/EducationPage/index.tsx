import React, { useState } from 'react';
import { ScrollView, SafeAreaView, View, Text, StyleSheet, Modal, Pressable, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent, StyleProp } from 'react-native';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import FormatStyle from '../../../utils/FormatStyle';
import TextStyles from 'utils/TextStyles';
import { useNavigation } from '@react-navigation/native';
import NavType from 'utils/NavType';
import { BaseTabRoutes } from 'navigation/routeTypes';
import Colors from 'utils/Colors';
import { Dimensions } from 'react-native';
import {readInfoCard} from 'redux/slices/usersSlice';

import Cat from '../../../assets/Cat.svg';
import Trophy from '../../../assets/Trophy.svg';
import PlasticSymbol from 'components/RecycleSymbol';
import Globe from '../../../assets/Globe.svg';
import RecycleSymbol from '../../../assets/Recycle.svg';
import Polymer from '../../../assets/polymer.svg';
import MicrowaveFilm from '../../../assets/MicrowaveFilm.svg';
import PackingEnvelope from '../../../assets/PackingEnvelope.svg';
import WaterBottle from '../../../assets/WaterBottle.svg';
import MilkJars from '../../../assets/MilkJars.svg';
import CerealBag from '../../../assets/CerealBag.svg';
import Shampoo from '../../../assets/Shampoo.svg';
import Pipes from '../../../assets/Pipes.svg';
import FloorPanels from '../../../assets/FloorPanels.svg';
import MedicalApp from '../../../assets/MedicalApp.svg';
import PillableBag from '../../../assets/PillableBag.svg';
import SqueezeBottles from '../../../assets/SqueezeBottles.svg';
import FoodContainers from '../../../assets/FoodContainers.svg';
import BottleCaps from '../../../assets/BottleCaps.svg';
import PlasticFurniture from '../../../assets/PlasticFurniture.svg';
import BeverageContainer from '../../../assets/BeverageContainer.svg';
import CarTires from '../../../assets/CarTires.svg';
import Styrofoam from '../../../assets/Styrofoam.svg';
import ColdBeverageCup from '../../../assets/ColdBeverageCup.svg';
import Union from '../../../assets/Union.svg';
import ModalExit from '../../../assets/ModalExit.svg';

import AutopartsGreen from '../../../assets/AutopartsGreen.svg';
import BeverageContainerGreen from '../../../assets/BeverageContainerGreen.svg';
import BottleCapsGreen from '../../../assets/BottleCapsGreen.svg';
import CerealBagGreen from '../../../assets/CerealBagGreen.svg';
import ColdBeverageCupGreen from '../../../assets/ColdBeverageCupGreen.svg';
import FibersGreen from '../../../assets/FibersGreen.svg';
import FloorPanelsGreen from '../../../assets/FloorPanelsGreen.svg';
import FoodContainersGreen from '../../../assets/FoodContainersGreen.svg';
import FluidBagGreen from  '../../../assets/FluidBagGreen.svg';
import GardeningToolsGreen from '../../../assets/GardeningToolsGreen.svg';
import MilkJarsGreen from '../../../assets/MilkJarsGreen.svg';
import NoLandfillGreen from '../../../assets/NoLandfillGreen.svg';
import OvenableFilmGreen from '../../../assets/OvenableFilmGreen.svg';
import PackingEnvelopeGreen from '../../../assets/PackingEnvelopeGreen.svg';
import PillableBagGreen from '../../../assets/PillableBagGreen.svg';
import PipesGreen from '../../../assets/PipesGreen.svg';
import PlasticFurnitureGreen from '../../../assets/PlasticFurnitureGreen.svg';
import ShampooGreen from '../../../assets/ShampooGreen.svg';
import SqueezeBottlesGreen from '../../../assets/SqueezeBottlesGreen.svg';
import StyrofoamGreen from '../../../assets/StyrofoamGreen.svg';
import UnionGreen from '../../../assets/UnionGreen.svg';
import WaterBottleGreen from '../../../assets/WaterBottleGreen.svg';
import Avatar from 'components/Avatar';




const info = [
  {
    title: 'Polyethylene Terephthalate',
    color: '#CC554E',
    modalInfo: '*PET/PETE* is currently the most recycled plastic in the world. They’re used to make water bottles oven-able films, and packaging. Recycled PET can be used again for packaging or as fibers used in clothing. Check for a microwave-safe label before microwaving.',
    info: '*PET* (or PETE) is pretty *common*! They’re used to make bottles for soda, water, and other drinks. Recycled PET can be used again for packaging or as fibers used in clothing.',
    foundIn: [
      { title: 'Ovenable film', SvgComponent: MicrowaveFilm },
      { title: 'Water bottle', SvgComponent: WaterBottle },
      { title: 'Packing envelope', SvgComponent: PackingEnvelope },
    ],
    modalFoundIn: [
      { title: 'Ovenable film', SvgComponent: OvenableFilmGreen },
      { title: 'Water bottle', SvgComponent: WaterBottleGreen },
      { title: 'Packing envelope', SvgComponent: PackingEnvelopeGreen },
    ],
    reusedToMake: [
      { title: 'Fibers', SvgComponent: FibersGreen },
      { title: 'Packaging\nMaterials', SvgComponent: PackingEnvelopeGreen },
    ],
  },
  {
    title: 'High-Density Polyethylene',
    color: '#50776F',
    modalInfo: '*HDPE* is currently widely *recycled!* You can find HDPE in cereal bags, milk jars, and shampoo bottles. Recycled HDPE can be reprocessed into non-food-related applications such as plastic bins, and agricultural pipes. HDPE is *typically safe* to microwave, but check labels.',
    info: '*HDPE* is widely *recycled*! You can find HDPE in cereal bags, milk jars, and even shampoo bottles. Recycled HDPE can be reprocessed into plastic bins, and agricultural pipes.',
    foundIn: [
      { title: 'Milk jars', SvgComponent: MilkJars },
      { title: 'Cereal bags', SvgComponent: CerealBag },
      { title: 'Shampoo bottles', SvgComponent: Shampoo },
    ],
    modalFoundIn: [
      { title: 'Milk jars', SvgComponent: MilkJarsGreen },
      { title: 'Cereal bags', SvgComponent: CerealBagGreen },
      { title: 'Shampoo bottles', SvgComponent: ShampooGreen },
    ],
    reusedToMake: [
      { title: 'Plastic bins', SvgComponent: NoLandfillGreen },
      { title: 'Agricultural pipes', SvgComponent: PipesGreen },
    ],
  },
  {
    title: 'Polyvinyl Chloride',
    color: '#CD775C',
    modalInfo: '*PVC*, although widely used, is *not currently recycled*. PVC can be found in water and sewage pipes, floor panels, and other materials. PVC is *rarely* used for food, and is typically not microwave-safe.',
    info: '*PVC*, although widely used, is *not* currently recycled. PVC can be found in water and sewage pipes, floor panels, and other materials.',
    foundIn: [
      { title: 'Pipes', SvgComponent: Pipes },
      { title: 'Floor panels', SvgComponent: FloorPanels },
      { title: 'Medical\napplications', SvgComponent: MedicalApp },
    ],
    modalFoundIn: [
      { title: 'Pipes', SvgComponent: PipesGreen },
      { title: 'Floor panels', SvgComponent: FloorPanelsGreen },
      { title: 'Medical\napplications', SvgComponent: FluidBagGreen },
    ],
  },
  {
    title: 'Low-Density Polyethylene',
    color: '#586E97',
    modalInfo: '*LDPE* is a *recyclable* polymer. The recycling rate, however, is low (but increasing). LDPE can be found in thin and pliable bags, squeeze bottles, etc. Once recycled, LDPE can be used as garbage bags, trash bins, etc. LDPE is less heat-tolerant, so avoid when microwaving food.',
    info: '*LDPE* is a *recyclable* polymer. LDPE can be found in thin and pliable bags, squeeze bottles, etc. Once recycled, LDPE can be used as garbage bags, trash bins, etc.',
    foundIn: [
      { title: 'Thin, pliable\nbags', SvgComponent: PillableBag },
      { title: 'Squeeze bottles', SvgComponent: SqueezeBottles },
      { title: 'Flexible\npackaging', SvgComponent: PackingEnvelope },
    ],
    modalFoundIn: [
      { title: 'Thin, pliable\nbags', SvgComponent: PillableBagGreen },
      { title: 'Squeeze bottles', SvgComponent: SqueezeBottlesGreen },
      { title: 'Flexible\npackaging', SvgComponent: PackingEnvelopeGreen },
    ],
    reusedToMake: [
      { title: 'Garbage bags', SvgComponent: NoLandfillGreen },
      { title: 'Trash bins', SvgComponent: PillableBagGreen },
      { title: 'Packaging Materials', SvgComponent: PackingEnvelopeGreen },
    ],
  },
  {
    title: 'Polypropylene',
    color: '#DBA26D',
    modalInfo: '*PP* is currently *widely recycled* in the US and the world. PP can be found in *microwave-safe* food containers, bottle caps, and plastic furniture. Recycled PP can be found in gardening tools, trash bins, and auto parts. This is the safest polymer for microwaving.',
    info: '*PP* is currently widely *recycled* in the US and the world. PP can be found in microwave-safe food containers, bottle caps, and plastic furniture. Recycled PP can be found in gardening tools, trash bins, etc.',
    foundIn: [
      { title: 'Microwave-safe food containers', SvgComponent: FoodContainers },
      { title: 'Bottle caps', SvgComponent: BottleCaps },
      { title: 'Plastic furniture', SvgComponent: PlasticFurniture },
    ],
    modalFoundIn: [
      { title: 'Microwave-safe food containers', SvgComponent: FoodContainersGreen },
      { title: 'Bottle caps', SvgComponent: BottleCapsGreen },
      { title: 'Plastic furniture', SvgComponent: PlasticFurnitureGreen },
    ],
    reusedToMake: [
      { title: 'Gardening Tools', SvgComponent: GardeningToolsGreen },
      { title: 'Trash bins', SvgComponent: NoLandfillGreen },
      { title: 'Autoparts', SvgComponent: AutopartsGreen },
    ],
  },
  {
    title: 'Polystyrene',
    color: '#5E5672',
    modalInfo: '*PS* is *not recycled*. It is often used in *beverage* containers, packaging peanuts (as styrofoam), and in synthetic rubber tires. ',
    info: '*PS* is a polymer that is *not* recycled. It is often found in beverage containers and packaging peanuts, and in synthetic rubber tires.',
    foundIn: [
      { title: 'Beverage containers', SvgComponent: BeverageContainer },
      { title: 'Styrofoam', SvgComponent: Styrofoam },
      { title: 'Synthetic rubber tires', SvgComponent: CarTires },
    ],
    modalFoundIn: [
      { title: 'Beverage containers', SvgComponent: BeverageContainerGreen },
      { title: 'Styrofoam', SvgComponent: StyrofoamGreen },
      { title: 'Synthetic rubber tires', SvgComponent: AutopartsGreen },
    ],
  },
  {
    title: 'Miscellaneous/Other',
    color: '#676761',
    modalInfo: 'Polymer 7 is considered an *umbrella polymer* for mixed plastics. There are two distinct polymers, however, that fall under Polymer 7:\n*Polylactic acid (PLA)* is a *sustainable bioplastic* that can be made from *renewable* biological sources. PLA is not widely considered recyclable—only selected recycling facilities can perform mechanical recycling of this polymer.\n*Polycarbonate (PC)* is *not widely recycled* but can be found in water dispensers, lightning fixtures, and construction materials.',
    info: 'This polymer is considered an *umbrella* category for *mixed* plastics. There are two distinct polymers, however, that fall under Polymer 7: *Polylactic acid* (PLA; this is a sustainable bioplastic!), and *Polycarbonate (PC)*. Explore more inside this card.',
    foundIn: [
      { title: 'Cold\nbeverage cups', SvgComponent: ColdBeverageCup },
      { title: 'Alternatives\nto PS coating', SvgComponent: Union },
    ],
    modalFoundIn: [
      { title: 'Cold\nbeverage cups', SvgComponent: ColdBeverageCupGreen },
      { title: 'Alternatives\nto PS coating', SvgComponent: UnionGreen },
    ],
  },
];

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const modalCardWidth = screenWidth * 0.85;
const modalCardHeight = screenHeight * 0.78;
const polymerCardWidth = screenWidth * 0.85;
const polymerCardHeight = screenHeight * 0.7;
const progressCardWidth = screenWidth * 0.425;



const EducationPage = () => {
  const user = useAppSelector((state) => state.users.selectedUser);
  const [currCard, setCurrCard] = useState(1);
  const [currCardPlastic, setCurrCardPlastic] = useState(1);

  const navigation = useNavigation<NavType>();
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setCurrCardPlastic(Math.floor(((event.nativeEvent.contentOffset.x)) / modalCardWidth));
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modalPlasticType, setModalPlasticType] = useState(1);

  const handlePress = (index: number) => {
    setCurrCard(index);
    setCurrCardPlastic(index);
  };

  const collectedTypes = {
    1: user.Type1Collected,
    2: user.Type2Collected,
    3: user.Type3Collected,
    4: user.Type4Collected,
    5: user.Type5Collected,
    6: user.Type6Collected,
    7: user.Type7Collected,
  };

  const recycledTypes = {
    1: user.Type1Recycled,
    2: user.Type2Recycled,
    3: user.Type3Recycled,
    4: user.Type4Recycled,
    5: user.Type5Recycled,
    6: user.Type6Recycled,
    7: user.Type7Recycled,
  };
  
  const reusedTypes = {
    1: user.Type1Reused,
    2: user.Type2Reused,
    3: user.Type3Reused,
    4: user.Type4Reused,
    5: user.Type5Reused,
    6: user.Type6Reused,
    7: user.Type7Reused,
  };

  const maxRecycledType = Object.entries(recycledTypes).reduce((max, [type, value]) => {
    return value > max.value ? { type: Number(type), value } : max;
  }, { type: 1, value: user?.Type1Recycled });

  const maxReusedType = Object.entries(reusedTypes).reduce((max, [type, value]) => {
    return value > max.value ? { type: Number(type), value } : max;
  }, { type: 1, value: user?.Type1Reused });

  const totalReused = Object.values(reusedTypes).reduce((a, b) => a + b, 0);
  const totalRecycled = Object.values(recycledTypes).reduce((a, b) => a + b, 0);

  return (
    <SafeAreaView style={{ ...FormatStyle.container }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={{ flex: 1, alignSelf: 'center' }}
      >
        <View style={styles.modalOuterContainer}>
          <View style={styles.modalInnerContainer}>
            <View style={{
              width: screenHeight * 0.075,
              height: screenHeight * 0.075,
              borderTopLeftRadius: 20,
              borderBottomRightRadius: 20,
              backgroundColor: info[modalPlasticType - 1].color,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 2,
            }}>
              <PlasticSymbol color={Colors.secondary.white}
                width={screenHeight * 0.06}
                height={screenHeight * 0.06}
                number={modalPlasticType}
                top={15}
                left={23} />
            </View>
            <View style={{ flex: 1 }}>
                      

              <View style={{ zIndex: 1 }}>
                <TouchableOpacity onPress={() => setModalVisible(false)}
                  style={{ position: 'absolute', right: 0, top: 0, zIndex: 1 }}>
                  <ModalExit width={35} height={35} />
                </TouchableOpacity>
              </View>

              <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: -30, marginTop: -20 }}>
                <Polymer style={{ position: 'relative', maxHeight: polymerCardHeight * 0.25 }} />
              </View>

              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ ...styles.PolymerCardTitle, color: Colors.primary.dark }}>
                  {info[modalPlasticType - 1].title}
                </Text>
              </View>

              <View style={{
                alignItems: 'center',
                marginTop: modalCardHeight * 0.02,
                width: '100%',
                alignSelf: 'center',
                maxHeight: modalCardHeight * 0.6,
                justifyContent: 'space-evenly',
              }}>
                <View style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: modalCardHeight * 0.2,
                }}>
                  <TextBolded text={info[modalPlasticType - 1].modalInfo}
                    regularStyles={styles.ModalText}
                    boldStyles={styles.ModalTextBold} />
                </View>

                <Text style={{
                  ...TextStyles.small,
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: modalCardHeight * 0.027,
                  marginTop: modalCardHeight * 0.0075,
                  color: Colors.primary.dark,
                }}>Found in:</Text>
                <View style={styles.ExampleObjectsContainer}>
                  {info[modalPlasticType - 1].modalFoundIn.map((item) => (
                    <ExampleObjects title={item.title}
                      SvgComponent={item.SvgComponent}
                      textColor={Colors.primary.dark} />
                  ))}
                </View>

                {info[modalPlasticType - 1].reusedToMake && (
                  <View style={{ alignItems: 'center', alignSelf: 'center', marginTop: modalCardHeight * 0.03 }}>
                    <Text style={{
                      ...TextStyles.small,
                      fontFamily: 'Inter_600SemiBold',
                      fontSize: modalCardHeight * 0.0255,
                    }}>Reused in:</Text>
                    <View style={styles.ExampleObjectsContainer}>
                      {info[modalPlasticType - 1].reusedToMake?.map((item) => (
                        <ExampleObjects title={item.title}
                          SvgComponent={item.SvgComponent}
                          textColor={Colors.primary.dark} />
                      ))}
                    </View>
                  </View>
                )}

              </View>

              <View style={{
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'flex-end',
                flex: 1,
                minHeight: modalCardHeight * 0.03,
              }}>
                <TouchableOpacity onPress={() => { }}>
                  <Text style={{
                    ...styles.ModalTextBold,
                    textDecorationLine: 'underline',
                    fontSize: modalCardHeight * 0.02,
                  }}>Still Curious? Learn More Here!</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>


      <ScrollView bounces={false} showsVerticalScrollIndicator={false} >
        <View style={{ margin: 20, overflow: 'visible', gap: 20 }}>
          <Text style={{ ...TextStyles.title }}>
            Hello, {user?.username ?? 'you!'}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'flex-end' }}>
            <Text style={{ ...TextStyles.subTitle }}>Your Progress</Text>
            <Text onPress={() => navigation.navigate(BaseTabRoutes.PROGRESS)} style={{ ...TextStyles.small, textDecorationLine: 'underline' }}>See All</Text>
          </View>
          
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            
            <View style={{ gap: 10, flexDirection: 'row' }}>

              <ProgressCard
                title={'Top Plastic'}
                number={totalRecycled>0 ? maxRecycledType.type : undefined}
                text={totalRecycled>0 ? `You've recycled ${maxRecycledType.value ? maxRecycledType.value : 0} No.${maxRecycledType.type} plastics this month. Great work!` : 'Get started recycling!'}
                cornerComponent={
                  <Trophy width={60} height={60} style={{ left: -6, top:6 }}></Trophy>
                }
              >
              </ProgressCard>
              <ProgressCard
                title={'Earth Conscious'}
                text={totalReused>0 ? `You've reused ${totalReused} plastics this month! Keep going!` : 'You haven\'t reused this month. Get started!'}
                cornerComponent={
                  <View>
                    <Globe width={60} height={60}></Globe>
                    <View style={{ position: 'relative', bottom: 40, justifyContent: 'center', alignItems: 'center' }}>
                      {totalReused>0 && <Text style={{ fontSize: 18, fontWeight: '700', color:Colors.primary.dark }}>{totalReused}</Text>}
                    </View>
                  </View>
                }>
              </ProgressCard>
              
              <ProgressCard
                title={'Green Vision'}
                text={totalRecycled>0 ? `You’ve recycled ${totalRecycled} plastics this month! Keep going!` : `You haven't recycled this month. Get started!`}
                cornerComponent={
                  <View>
                    <RecycleSymbol height={70} width={70} style={{ left: -10, bottom: 5 }}></RecycleSymbol>
                    <View style={{ position: 'relative', left: -10, bottom: 50, justifyContent: 'center', alignItems: 'center' }}>
                      {totalRecycled>0&&<Text style={{ fontSize: 18, fontWeight: '700', color:Colors.primary.dark }}>{totalRecycled}</Text>}
                    </View>
                  </View>
                }>

              </ProgressCard>

              <ProgressCard
                title={'Pal Points'}
                text={user.monthlyPoints>0 ?`You’ve gained ${user.monthlyPoints} points for your pal this month. Your pal says thanks!` : 'Get started earning points! Your pal is waiting!'}
                cornerComponent={<Avatar avatarID={user.avatarID} color={user.avatarColor} shadow={false} size={progressCardWidth*0.5} accessory={user.avatarAccessoryEquipped} style={{right:progressCardWidth*0.075}}></Avatar>}>
              </ProgressCard>
            </View>
          </ScrollView>
          <View style={{ gap: 10 }}>
            <Text style={{ ...TextStyles.subTitle }}>Learn about polymers</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {info.map((card, index) => (
                // eslint-disable-next-line max-len
                <TouchableOpacity style={{ ...FormatStyle.circle, marginTop: 0, width: 43, height: 43, backgroundColor: currCardPlastic != index ? Colors.secondary.white : Colors.primary.dark }} onPress={() => handlePress(index)}>
                  <PlasticSymbol color = {currCardPlastic == index ? Colors.secondary.white : Colors.primary.dark} width={35} height={35} number={index + 1} top={10} left={15}></PlasticSymbol>
                </TouchableOpacity >
              ))}
            </View>
          </View>

          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentOffset={{ x: 340 * currCard, y: 0 }} onScroll={handleScroll} scrollEventThrottle={16}>
            <View style={{ gap: 10, flexDirection: 'row' }}>
              {info.map((card, index) => (
                <PolymerCard number={index + 1} setModalVisible={setModalVisible} setModalPlasticType={setModalPlasticType} />
              ))}

            </View>
          </ScrollView>

        </View>

        <View style={{ height: screenHeight * 0.001 }}>

        </View>
      </ScrollView>
    </SafeAreaView >
  );
};

interface ProgressCardProps {
  cornerComponent: JSX.Element;
  title: string;
  text: string;
  number?: number
}

const ProgressCard = ({ cornerComponent, title, text, number }: ProgressCardProps) => {
  return (
    <View style={{ ...styles.card, width: progressCardWidth, height: 250, padding: 10, gap: 10 }}>
      <View style={{
        position: 'absolute', alignItems: 'flex-start', top: 10, left: 15,
      }}>
        {cornerComponent}
      </View>
      {number &&
        <View style={{ ...FormatStyle.circle, alignSelf: 'flex-end', marginTop: 0, width: 50, height: 50, backgroundColor: Colors.secondary.white, position: 'absolute', top: 10, right: 10 }}>
          <PlasticSymbol color={Colors.primary.dark} width={35} height={35} number={number} top={10} left={15}></PlasticSymbol>
        </View>
      }

      <View style={{ marginTop: 100, gap: 5 }}>
        <Text style={{ ...TextStyles.subTitle, fontSize: 16, flexWrap: 'wrap' }}>{title}</Text>
        <Text style={{ flexWrap: 'wrap', fontSize: 14 }}>{text}</Text>
      </View>
    </View>
  );
};


interface PolymerCardProps {
  number: number;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setModalPlasticType: React.Dispatch<React.SetStateAction<number>>;
}

const PolymerCard = ({ number, setModalVisible, setModalPlasticType }: PolymerCardProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users.selectedUser);
  const loginHistoryArray = useAppSelector((state) => state.loginhistory.history);
  const loginHistoryToday = loginHistoryArray[0];

  return (
    <View style={{ ...styles.card, borderRadius: 20, width: polymerCardWidth, 
      maxHeight: polymerCardHeight, padding: 20, flexDirection: 'column', backgroundColor: info[number - 1].color }}>

      <View style={{
        width: 60, height: 60,
        borderTopLeftRadius: 20, borderBottomRightRadius: 20,
        alignItems: 'center', justifyContent: 'center',
        position: 'absolute',
      }}>

        <View>
          <PlasticSymbol color={Colors.secondary.white} width={50} height={50} number={number} top={14} left={22}></PlasticSymbol>
        </View>

      </View>
      
      <View style={{ justifyContent: 'center', left: 40 }}>
        <Text style={styles.PolymerCardTitle}>{info[number - 1].title}</Text>
      </View>

      

      <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 20,  maxWidth: '85%', alignSelf: 'center', maxHeight: polymerCardHeight * 0.6 }}>

        <View style={{ alignItems: 'center', justifyContent: 'center', minHeight: polymerCardHeight * 0.25, marginBottom: 5, marginTop: 5 }}>
          <TextBolded text={info[number - 1].info} boldStyles={styles.PolymerCardTextBold} regularStyles={styles.PolymerCardText}></TextBolded>
        </View>

        <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 18, marginTop: 10, color:'white' }}>Found in:</Text>
        <View style = {{ ...styles.ExampleObjectsContainer }}>
          {info[number - 1].foundIn.map((item) => {
            return <ExampleObjects title={item.title} SvgComponent={item.SvgComponent} textColor={'white'}></ExampleObjects>;
          })}
        </View>
        
        <View style={{ flex: 1, alignItems: 'flex-end', marginTop: 15 }}>
          <TouchableOpacity onPress={() => {
            setModalVisible(true); 
            setModalPlasticType(number);
            if (!loginHistoryToday.greenGoal){
              dispatch(readInfoCard({id: user.id}));
            }}}
            >
            <Text style={{ ...styles.PolymerCardText, textDecorationLine:'underline', marginTop: 10 }}>Tap to explore</Text>
          </TouchableOpacity>
        </View>


      </View>
    </View>
  );
};

interface TextBoldedProps {
  text: string;
  boldStyles: any;
  regularStyles: any;
}

const TextBolded = ({ text, boldStyles, regularStyles } : TextBoldedProps) => {
  // Split text by asterisks, treat odd-indexed entries as bold
  const parts = text.split('*');
  return (
    <Text style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
      {parts.map((part, index) => {
        // Apply bold style to odd parts (between the asterisks)
        const textStyle = index % 2 === 1 ? boldStyles : regularStyles;
        return <Text key={index} style={textStyle}>{part}</Text>;
      })}
    </Text>
  );
};

interface ExampleObjectProps {
  title: string;
  SvgComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  textColor : string;
}

const ExampleObjects = ({ title, SvgComponent, textColor }: ExampleObjectProps) => {
  return (
    <View style={styles.ExampleObject}>
      <View style={styles.ExampleObjectTextContainer}>
        <Text style={{ ...styles.PolymerCardText, fontSize:screenWidth * 0.035, color: textColor }}>{title}</Text>
      </View>
      <SvgComponent width={60} height={60} />
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F4F3E7',
    borderRadius: 10,
  },
  PolymerCardTitle: {
    ...TextStyles.subTitle,
    fontFamily: 'Inter_700Bold',
    fontSize: 19,
    marginTop: -5,
    textAlign: 'left',
    color: 'white',
  },
  PolymerCardText: {
    ...TextStyles.small,
    fontFamily: 'Inter_400Regular',
    fontSize: screenWidth * 0.04,
    textAlign: 'center',
    color: 'white',
    
  },
  PolymerCardTextBold: {
    ...TextStyles.small,
    fontFamily: 'Inter_600SemiBold',
    fontSize: screenWidth * 0.04,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  ModalText: {
    ...TextStyles.small,
    fontFamily: 'Inter_400Regular',
    fontSize: screenWidth * 0.0375,
    textAlign: 'center',
    color: Colors.primary.dark,
    
  },
  ModalTextBold: {
    ...TextStyles.small,
    fontFamily: 'Inter_600SemiBold',
    fontSize: screenWidth * 0.0375,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.primary.dark,
  },
  ExampleObjectsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    minWidth: polymerCardWidth * 0.9,
  },
  ExampleObject: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  ExampleObjectTextContainer: {
    height: modalCardHeight * 0.05,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  modalOuterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: screenHeight * 0.075,
  },
  modalInnerContainer: {
    borderRadius: 20,
    width: modalCardWidth,
    maxHeight: modalCardHeight,
    padding: 20,
    flexDirection: 'column',
    backgroundColor: Colors.secondary.normal,
    flex: 1,
  },
});

export default EducationPage;
