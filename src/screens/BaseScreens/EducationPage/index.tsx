import React, { useState } from 'react';
import { ScrollView, SafeAreaView, View, Text, StyleSheet, Modal, Pressable, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
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
import Detergent from '../../../assets/Detergent.svg';
import Fences from '../../../assets/Fences.svg';
import Fleece from '../../../assets/Fleece.svg';
import MilkJug from '../../../assets/MilkJug.svg';
import Furniture from '../../../assets/Furniture.svg';
import TrashBag from '../../../assets/TrashBag.svg';

// import PlasticSymbol from 'components/RecycleSymbol';


const info = [
  {
    title: 'Polyethylene Terephthalate',
    color: '#CC554E',
    info: '*PET/PETE* is currently the most recycled plastic in the world. They’re used to make water bottles oven-able films, and packaging. Recycled PET can be used again for packaging or as fibers used in clothing. Check for a microwave-safe label before microwaving.',
    reusedInfo : true,
  },
  {
    title: 'High Density Polyethylene',
    color: '#50776F',
    info: '*HDPE* is currently widely *recycled!* You can find HDPE in cereal bags, milk jars, and shampoo bottles. Recycled HDPE can be reprocessed into non-food-related applications such as plastic bins, and agricultural pipes. HDPE is *typically safe* to microwave, but check labels.',
    reusedInfo : true,
  },
  {
    title: 'Polyvinyl Chloride',
    color: '#CD775C',
    info: '*PVC*, although widely used, is *not currently recycled*. PVC can be found in water and sewage pipes, floor panels, and other materials. PVC is *rarely* used for food, and is typically not microwave-safe.',
    reusedInfo : true,
  },
  {
    title: 'Low-Density Polyethylene',
    color: '#586E97',
    info: '*LDPE* is a *recyclable* polymer. The recycling rate, however, is low (but increasing). LDPE can be found in thin and pliable bags, squeeze bottles, etc. Once recycled, LDPE can be used as garbage bags, trash bins, etc. LDPE is less heat-tolerant, so avoid when microwaving food.',
    reusedInfo : true,
  },
  {
    title: 'Polypropylene',
    color: '#DBA26D',
    info: '*PP* is currently *widely recycled* in the US and the world. PP can be found in *microwave-safe* food containers, bottle caps, and plastic furniture. Recycled PP can be found in gardening tools, trash bins, and auto parts. This is the safest polymer for microwaving.',
    reusedInfo : true,
  },
  {
    title: 'Polystyrene',
    color: '#5E5672',
    info: '*PS* is *not recycled*. It is often used in *beverage* containers, packaging peanuts (as styrofoam), and in synthetic rubber tires. ',
    reusedInfo : true,
  },
  {
    title: 'Miscellaneous/Other',
    color: '#676761',
    info: 'Polymer 7 is considered an *umbrella polymer* for mixed plastics. There are two distinct polymers, however, that fall under Polymer 7:\n*Polylactic acid (PLA)* is a *sustainable bioplastic* that can be made from *renewable* biological sources. PLA is not widely considered recyclable—only selected recycling facilities can perform mechanical recycling of this polymer.\n*Polycarbonate (PC)* is *not widely recycled* but can be found in water dispensers, lightning fixtures, and construction materials.',
    reusedInfo: false,
  },
];

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const polymerCardWidth = screenWidth * 0.85;
const polymerCardHeight = screenHeight * 0.75;
const progressCardWidth = screenWidth * 0.425;


const EducationPage = () => {
  const user = useAppSelector((state) => state.users.selectedUser);
  const [currCard, setCurrCard] = useState(1);
  const [currCardPlastic, setCurrCardPlastic] = useState(1);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavType>();

  const [modalVisible, setModalVisible] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setCurrCardPlastic(Math.floor(((event.nativeEvent.contentOffset.x)) / polymerCardWidth));
  };

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
        visible={modalVisible}>

        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
          <View style={{ backgroundColor: Colors.secondary.normal, borderRadius: 10, padding: 20, width: '85%', height: '60%' }}>
            <ScrollView>
              <Text style={{}}>Hello World!</Text>
              <Pressable
                style={{}}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={{}}>Hide Modal</Text>
              </Pressable>
            </ScrollView>
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
                <PolymerCard title={card.title} number={index + 1} color={card.color} info={card.info} reusedInfo={card.reusedInfo} />
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
  cornerComponent?: JSX.Element;
  title: string;
  text?: string;
  plastic?: JSX.Element;
  number: number;
  color: string;
  info: string;
  reusedInfo : boolean;
}

const PolymerCard = ({ title, number, color, info, reusedInfo }: PolymerCardProps) => {
  return (
    <View style={{ ...styles.card, borderRadius: 20, width: polymerCardWidth, 
    maxHeight: polymerCardHeight, padding: 20, flexDirection: 'column'}}>

      <View style={{
        width: 50, height: 50,
        borderTopLeftRadius: 20, borderBottomRightRadius: 20,
        backgroundColor: color,
        alignItems: 'center', justifyContent: 'center',
        position: 'absolute',
      }}>

        <View>
          <PlasticSymbol color={Colors.secondary.white} width={35} height={35} number={number} top={10} left={15}></PlasticSymbol>
        </View>
      </View>

      {/*<View style={{justifyContent: 'center', alignItems: 'center', marginBottom:-30}}>
        <Polymer style={{position:'relative', maxHeight: polymerCardHeight * 0.25}}></Polymer>
      </View>*/}

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.PolymerCardTitle}>{title}</Text>
      </View>

      <View style={{ alignItems: 'center', marginTop: 10,  width: '100%', alignSelf: 'center', maxHeight: polymerCardHeight * 0.6}}>
        <View style={{alignItems: 'center', justifyContent: 'center', minHeight: polymerCardHeight * 0.2, }}>
          <TextBolded text={info}></TextBolded>
        </View>

        <Text style={{...TextStyles.small, fontFamily: 'Inter_600SemiBold', fontSize: 18, marginTop: 10}}>Found in:</Text>
        <View style = {{...styles.ExampleObjectsContainer}}>
          <ExampleObjects title={'Milk Jug'} svg={<MilkJug></MilkJug>}></ExampleObjects>
          <ExampleObjects title={'Trash Bag'} svg={<TrashBag></TrashBag>}></ExampleObjects>
          <ExampleObjects title={'Detergent'} svg={<Detergent></Detergent>}></ExampleObjects>
        </View>

        {reusedInfo && (
          <>
          <Text style={{...TextStyles.small, fontFamily: 'Inter_600SemiBold', fontSize: 18, marginTop: 10}}>Reused to make:</Text>
          <View style = {{...styles.ExampleObjectsContainer}}>
            <ExampleObjects title={'Furniture'} svg={<Furniture></Furniture>}></ExampleObjects>
            <ExampleObjects title={'Fleece'} svg={<Fleece></Fleece>}></ExampleObjects>
            <ExampleObjects title={'Fences'} svg={<Fences></Fences>}></ExampleObjects>
          </View>
          </>
        )}

      </View>
    </View>
  );
};

interface TextBoldedProps {
  text: string;
}

const TextBolded = ({ text } : TextBoldedProps) => {
  // Split text by asterisks, treat odd-indexed entries as bold
  const parts = text.split('*');
  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
      {parts.map((part, index) => {
        // Apply bold style to odd parts (between the asterisks)
        const textStyle = index % 2 === 1 ? styles.PolymerCardTextBold : styles.PolymerCardText;
        return <Text key={index} style={textStyle}>{part}</Text>;
      })}
    </View>
  );
};

interface ExampleObjectProps {
  title: string;
  svg: JSX.Element;
}

const ExampleObjects = ({title, svg}: ExampleObjectProps) => {
  return (
    <View style={{flexDirection: 'column', gap: 10}}>
      <Text>{title}</Text>
        {svg}
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
    textAlign: 'center',
  },
  PolymerCardText: {
    ...TextStyles.small,
    fontFamily: 'Inter_400Regular',
    fontSize: screenWidth * 0.035,
    textAlign: 'center',
    
  },
  PolymerCardTextBold: {
    ...TextStyles.small,
    fontFamily: 'Inter_600SemiBold',
    fontSize: screenWidth * 0.035,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  ExampleObjectsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  }
});

export default EducationPage;
