import React, { useState } from 'react';
import { ScrollView, SafeAreaView, View, Text, StyleSheet, Modal, Pressable, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent, StyleProp } from 'react-native';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { logout } from '../../../redux/slices/authSlice';
import FormatStyle from '../../../utils/FormatStyle';
import TextStyles from 'utils/TextStyles';
import { useNavigation } from '@react-navigation/native';
import NavType from 'utils/NavType';
import { BaseTabRoutes } from 'navigation/routeTypes';
import Colors from 'utils/Colors';
import { Dimensions } from 'react-native';

import Cat from '../../../assets/Cat.svg';
import Trophy from '../../../assets/Trophy.svg';
import useAppSelector from 'hooks/useAppSelector';
import PlasticSymbol from 'components/RecycleSymbol';
import Globe from '../../../assets/Globe.svg';
import RecycleSymbol from '../../../assets/Recycle.svg';
import Polymer from '../../../assets/polymer.svg';
import Detergent from '../../../assets/Detergent.svg';
import Fences from '../../../assets/Fences.svg';
import Fleece from '../../../assets/Fleece.svg';
import MilkJug from '../../../assets/MilkJug.svg';
import Furniture from '../../../assets/Furniture.svg';
import TrashBag from '../../../assets/TrashBag.svg';
import MicrowaveFilm from '../../../assets/MicrowaveFilm.svg';
import PackingEnvelope from '../../../assets/PackingEnvelope.svg';
import WaterBottle from '../../../assets/WaterBottle.svg';
import MilkJars from '../../../assets/MilkJars.svg';
import CerealBag from '../../../assets/CerealBag.svg';
import Shampoo from '../../../assets/Shampoo.svg';
import Pipes from '../../../assets/Pipes.svg';
import FloorPanels from '../../../assets/FloorPanels.svg';
import MedicalApp from '../../../assets/MedicalApp.svg';
import PliableBag from '../../../assets/PliableBag.svg';
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


const info = [
  {
    title: 'Polyethylene Terephthalate',
    color: '#CC554E',
    modalInfo: '*PET/PETE* is currently the most recycled plastic in the world. They’re used to make water bottles oven-able films, and packaging. Recycled PET can be used again for packaging or as fibers used in clothing. Check for a microwave-safe label before microwaving.',
    info: '*PET* (or PETE) is pretty *common*! They’re used to make bottles for soda, water, and other drinks. Recycled PET can be used again for packaging or as fibers used in clothing.',
    foundIn: [
      { title: 'Ovenable film', svg: MicrowaveFilm },
      { title: 'Water bottle', svg: WaterBottle },
      { title: 'Packing envelope', svg: PackingEnvelope }
    ],
    reusedIn: [
      { title: 'Fibers', svg: MicrowaveFilm },
      { title: 'Packaging Materials', svg: MicrowaveFilm },
    ]
  },
  {
    title: 'High-Density Polyethylene',
    color: '#50776F',
    modalInfo: '*HDPE* is currently widely *recycled!* You can find HDPE in cereal bags, milk jars, and shampoo bottles. Recycled HDPE can be reprocessed into non-food-related applications such as plastic bins, and agricultural pipes. HDPE is *typically safe* to microwave, but check labels.',
    info: '*HDPE* is widely *recycled*! You can find HDPE in cereal bags, milk jars, and even shampoo bottles. Recycled HDPE can be reprocessed into plastic bins, and agricultural pipes.',
    foundIn: [
      { title: 'Milk jars', svg: MilkJars },
      { title: 'Cereal bags', svg: CerealBag },
      { title: 'Shampoo bottles', svg: Shampoo }
    ]
  },
  {
    title: 'Polyvinyl Chloride',
    color: '#CD775C',
    modalInfo: '*PVC*, although widely used, is *not currently recycled*. PVC can be found in water and sewage pipes, floor panels, and other materials. PVC is *rarely* used for food, and is typically not microwave-safe.',
    info: '*PVC*, although widely used, is *not* currently recycled. PVC can be found in water and sewage pipes, floor panels, and other materials.',
    foundIn: [
      { title: 'Pipes', svg: Pipes },
      { title: 'Floor panels', svg: FloorPanels },
      { title: 'Medical\napplications', svg: MedicalApp }
    ]
  },
  {
    title: 'Low-Density Polyethylene',
    color: '#586E97',
    modalInfo: '*LDPE* is a *recyclable* polymer. The recycling rate, however, is low (but increasing). LDPE can be found in thin and pliable bags, squeeze bottles, etc. Once recycled, LDPE can be used as garbage bags, trash bins, etc. LDPE is less heat-tolerant, so avoid when microwaving food.',
    info: '*LDPE* is a *recyclable* polymer. LDPE can be found in thin and pliable bags, squeeze bottles, etc. Once recycled, LDPE can be used as garbage bags, trash bins, etc.',
    foundIn: [
      { title: 'Thin, pliable\nbags', svg: PliableBag },
      { title: 'Squeeze bottles', svg: SqueezeBottles },
      { title: 'Flexible\npackaging', svg: PackingEnvelope }
    ]
  },
  {
    title: 'Polypropylene',
    color: '#DBA26D',
    modalInfo: '*PP* is currently *widely recycled* in the US and the world. PP can be found in *microwave-safe* food containers, bottle caps, and plastic furniture. Recycled PP can be found in gardening tools, trash bins, and auto parts. This is the safest polymer for microwaving.',
    info: '*PP* is currently widely *recycled* in the US and the world. PP can be found in microwave-safe food containers, bottle caps, and plastic furniture. Recycled PP can be found in gardening tools, trash bins, etc.',
    foundIn: [
      { title: 'Microwave-safe food containers', svg: FoodContainers },
      { title: 'Bottle caps', svg: BottleCaps },
      { title: 'Plastic furniture', svg: PlasticFurniture }
    ]
  },
  {
    title: 'Polystyrene',
    color: '#5E5672',
    modalInfo: '*PS* is *not recycled*. It is often used in *beverage* containers, packaging peanuts (as styrofoam), and in synthetic rubber tires. ',
    info: '*PS* is a polymer that is *not* recycled. It is often found in beverage containers and packaging peanuts, and in synthetic rubber tires.',
    foundIn: [
      { title: 'Beverage containers', svg: BeverageContainer },
      { title: 'Styrofoam', svg: Styrofoam },
      { title: 'Synthetic rubber tires', svg: CarTires }
    ]
  },
  {
    title: 'Miscellaneous/Other',
    color: '#676761',
    modalInfo: 'Polymer 7 is considered an *umbrella polymer* for mixed plastics. There are two distinct polymers, however, that fall under Polymer 7:\n*Polylactic acid (PLA)* is a *sustainable bioplastic* that can be made from *renewable* biological sources. PLA is not widely considered recyclable—only selected recycling facilities can perform mechanical recycling of this polymer.\n*Polycarbonate (PC)* is *not widely recycled* but can be found in water dispensers, lightning fixtures, and construction materials.',
    info: 'This polymer is considered an *umbrella* category for *mixed* plastics. There are two distinct polymers, however, that fall under Polymer 7: *Polylactic acid* (PLA; this is a sustainable bioplastic!), and *Polycarbonate (PC)*. Explore more inside this card.',
    foundIn: [
      { title: 'Cold\nbeverage cups', svg: ColdBeverageCup },
      { title: 'Alternatives\nto PS coating', svg: Union }
    ]
  },
];

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const modalCardWidth = screenWidth * 0.85;
const modalCardHeight = screenHeight * 0.75;
const polymerCardWidth = screenWidth * 0.85;
const polymerCardHeight = screenHeight * 0.7;
const progressCardWidth = screenWidth * 0.425;



const EducationPage = () => {
  const user = useAppSelector((state) => state.users.selectedUser);
  const [currCard, setCurrCard] = useState(1);
  const [currCardPlastic, setCurrCardPlastic] = useState(1);

  const dispatch = useAppDispatch();
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

  const maxType = Object.entries(collectedTypes).reduce((max, [type, value]) => {
    return value > max.value ? { type: Number(type), value } : max;
  }, { type: 1, value: user?.Type1Collected });

  return (
    <SafeAreaView style={{ ...FormatStyle.container }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={{flex: 1, alignSelf:'center'}}>

        <View style={{ ...styles.card, borderRadius: 20, width: modalCardWidth, 
            maxHeight: modalCardHeight, padding: 20, flexDirection: 'column',
            backgroundColor: Colors.secondary.normal, marginLeft: screenWidth * 0.075,
            marginTop: screenHeight * 0.1, flex: 1}}>

          <View style={{
            width: screenHeight*0.075, height: screenHeight*0.075,
            borderTopLeftRadius: 20, borderBottomRightRadius: 20,
            backgroundColor: info[modalPlasticType - 1].color,
            alignItems: 'center', justifyContent: 'center',
            position: 'absolute',
          }}>

            <View>
              <PlasticSymbol color={Colors.secondary.white} width={screenHeight*0.06} height={screenHeight*0.06} number={modalPlasticType} top={15} left={23}></PlasticSymbol>
            </View>
          </View>

          <View style={{zIndex: 1}}>
            <TouchableOpacity onPress={() => {
              setModalVisible(false);
              console.log('PRESSED IT OMFL');
              }} 
              style={{position: 'absolute', right: 0, top: 0, zIndex: 1}}>
              <ModalExit width={35} height={35}></ModalExit>
            </TouchableOpacity>
          </View>

          <View style={{justifyContent: 'center', alignItems: 'center', marginBottom:-30, marginTop: -20}}>
            <Polymer style={{position:'relative', maxHeight: polymerCardHeight * 0.25}}></Polymer>
          </View>

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{...styles.PolymerCardTitle, color:Colors.primary.dark}}>{info[modalPlasticType-1].title}</Text>
          </View>

          <View style={{ alignItems: 'center', marginTop: 10,  width: '100%', alignSelf: 'center', maxHeight: modalCardHeight * 0.6,  justifyContent: 'space-evenly'}}>
            <View style={{alignItems: 'center', justifyContent: 'center', minHeight: modalCardHeight * 0.2, }}>
              <TextBolded text={info[modalPlasticType-1].modalInfo} regularStyles={styles.ModalText} boldStyles={styles.ModalTextBold}></TextBolded>
            </View>

            <Text style={{...TextStyles.small, fontFamily: 'Inter_600SemiBold', fontSize: 18, marginTop: 20, color: Colors.primary.dark}}>Found in:</Text>
            <View style = {{...styles.ExampleObjectsContainer}}>
              <ExampleObjects title={'Milk Jug'} svg={MilkJug} textColor={Colors.primary.dark}></ExampleObjects>
              <ExampleObjects title={'Trash Bag'} svg={TrashBag} textColor={Colors.primary.dark}></ExampleObjects>
              <ExampleObjects title={'Detergent'} svg={Detergent} textColor={Colors.primary.dark}></ExampleObjects>
            </View>

            {modalPlasticType != 7 && 
            <View style={{alignItems: 'center', alignSelf: 'center',}}>
              <Text style={{...TextStyles.small, fontFamily: 'Inter_600SemiBold', fontSize: 18, marginTop: 10}}>Reused in:</Text>
              <View style = {{...styles.ExampleObjectsContainer}}>
                <ExampleObjects title={'Milk Jug'} svg={MilkJug} textColor={Colors.primary.dark}></ExampleObjects>
                <ExampleObjects title={'Trash Bag'} svg={TrashBag} textColor={Colors.primary.dark}></ExampleObjects>
                <ExampleObjects title={'Detergent'} svg={Detergent} textColor={Colors.primary.dark}></ExampleObjects>
              </View>
            </View>
            }

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
                number={maxType.type}
                text={`You've recycled ${maxType.value} No.${maxType.type} plastics this month. Great work!`}
                cornerComponent={
                  <Trophy width={60} height={60} style={{ left: -6, top:6 }}></Trophy>
                }
              >
              </ProgressCard>
              <ProgressCard
                title={'Earth Conscious'}
                text={`You've reused ${user?.monthlyGoalPlasticAmount} plastics this month! Keep going!`}
                // number={user?.monthlyGoalPlasticType}
                cornerComponent={
                  <View>
                    <Globe width={60} height={60}></Globe>
                    <View style={{ position: 'relative', bottom: 40, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 18, fontWeight: '700', color:Colors.primary.dark }}>{user?.monthlyGoalPlasticAmount}</Text>
                    </View>
                  </View>
                }>
              </ProgressCard>
              
              <ProgressCard
                title={'Green Vision'}
                text={'You’ve recycled seven plastics this month! Keep going!'}
                cornerComponent={
                  <View>
                    <RecycleSymbol height={70} width={70} style={{ left: -10, bottom: 5 }}></RecycleSymbol>
                    <View style={{ position: 'relative', left: -10, bottom: 50, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 18, fontWeight: '700', color:Colors.primary.dark }}>{user?.monthlyGoalPlasticAmount}</Text>
                    </View>
                  </View>
                }>

              </ProgressCard>

              <ProgressCard
                title={'Pal Points'}
                text={'You’ve gained 250 points for your avatar this month. Your pal says thanks! '}
                cornerComponent={<Cat height={100} width={100} style={{ left: -20 }}></Cat>}>
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

        <View style={{height: screenHeight * 0.001}}>

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

const PolymerCard = ({number, setModalVisible, setModalPlasticType }: PolymerCardProps) => {
  return (
    <View style={{ ...styles.card, borderRadius: 20, width: polymerCardWidth, 
  maxHeight: polymerCardHeight, padding: 20, flexDirection: 'column', backgroundColor: info[number-1].color,}}>

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
      
      <View style={{justifyContent: 'center', left: 40}}>
          <Text style={styles.PolymerCardTitle}>{info[number-1].title}</Text>
      </View>

      

      <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 20,  maxWidth: '85%', alignSelf: 'center', maxHeight: polymerCardHeight * 0.6}}>

        <View style={{alignItems: 'center', justifyContent: 'center', minHeight: polymerCardHeight * 0.25, marginBottom: 5, marginTop: 5 }}>
          <TextBolded text={info[number-1].info} boldStyles={styles.PolymerCardTextBold} regularStyles={styles.PolymerCardText}></TextBolded>
        </View>

        <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 18, marginTop: 10, color:'white'}}>Found in:</Text>
        <View style = {{...styles.ExampleObjectsContainer}}>
          {info[number-1].foundIn.map((item) => {
            return <ExampleObjects title={item.title} svg={item.svg} textColor={'white'}></ExampleObjects>
          })}
        </View>
        
        <View style={{ flex: 1, alignItems: 'flex-end', marginTop: 15}}>
        <TouchableOpacity onPress={() => {
          setModalVisible(true); 
          setModalPlasticType(number);
          }}>
          <Text style={{...styles.PolymerCardText, textDecorationLine:'underline', marginTop: 10}}>Tap to explore</Text>
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
    <Text style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
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
  svg: React.FC<React.SVGProps<SVGSVGElement>>;
  textColor : string;
}

const ExampleObjects = ({title, svg: SvgComponent, textColor}: ExampleObjectProps) => {
  return (
    <View style={styles.ExampleObject}>
    
      <View style={styles.ExampleObjectTextContainer}>
        <Text style={{...styles.PolymerCardText, fontSize:screenWidth * 0.035, color: textColor}}>{title}</Text>
      </View>
      <SvgComponent width={55} height={55}/>
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F4F3E7",
    borderRadius: 10,
  },
  PolymerCardTitle: {
    ...TextStyles.subTitle,
    fontFamily: 'Inter_700Bold',
    fontSize: 19,
    marginTop: -5,
    textAlign: 'left',
    color: 'white'
  },
  PolymerCardText: {
    ...TextStyles.small,
    fontFamily: 'Inter_400Regular',
    fontSize: screenWidth * 0.04,
    textAlign: 'center',
    color: 'white'
    
  },
  PolymerCardTextBold: {
    ...TextStyles.small,
    fontFamily: 'Inter_600SemiBold',
    fontSize: screenWidth * 0.04,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white'
  },
  ModalText: {
    ...TextStyles.small,
    fontFamily: 'Inter_400Regular',
    fontSize: screenWidth * 0.04,
    textAlign: 'center',
    color: Colors.primary.dark
    
  },
  ModalTextBold: {
    ...TextStyles.small,
    fontFamily: 'Inter_600SemiBold',
    fontSize: screenWidth * 0.04,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.primary.dark
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
    minHeight: 50,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default EducationPage;
