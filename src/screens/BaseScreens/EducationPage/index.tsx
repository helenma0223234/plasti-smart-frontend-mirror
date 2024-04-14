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

import Svg, { G, Circle } from 'react-native-svg';
import Animated from 'react-native-reanimated';
import CircularProgress from 'react-native-circular-progress-indicator';
import Cat from '../../../assets/Cat.svg';
import Trophy from '../../../assets/Trophy.svg';
import useAppSelector from 'hooks/useAppSelector';
import PlasticSymbol from 'components/RecycleSymbol';
// import PlasticSymbol from 'components/RecycleSymbol';


const info = [
  {
    title: 'Polyethylene Terephthalate',
  },
  {
    title: 'High Density Polyethylene',
  },
  {
    title: 'Polyvinyl Chloride',
  },
  {
    title: 'Low-Density Polyethylene',
  },
  {
    title: 'Polypropylene',
  },
  {
    title: 'Polystyrene',
  },
  {
    title: 'Miscellaneous/Other',
  },
];


const EducationPage = () => {
  const user = useAppSelector((state) => state.users.selectedUser);
  const [currCard, setCurrCard] = useState(1);
  const [currCardPlastic, setCurrCardPlastic] = useState(1);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavType>();

  const [modalVisible, setModalVisible] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // console.log(event.nativeEvent.contentOffset.y);
    setCurrCardPlastic(Math.floor(((event.nativeEvent.contentOffset.x)) / 330));
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
  

  // useEffect(() => {

  // }, [currCard]);


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

      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={{ margin: 20, overflow: 'visible', gap: 20, marginBottom: 50 }}>
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
                title={'Monthly Challenge'}
                text={`You've recycled ${user?.monthlyGoalPlasticAmount} out of ${user?.monthlyGoalPlasticTotal} PET plastics this month. Keep going to get the prize!`}
                number={user?.monthlyGoalPlasticType}
                cornerComponent={
                  <View>

                    <CircularProgress
                      value={(user?.monthlyGoalPlasticAmount / user?.monthlyGoalPlasticTotal) * 100}
                      radius={40}
                      circleBackgroundColor={'transparent'}
                      progressValueColor={'transparent'}
                      activeStrokeColor={Colors.highlight}
                      inActiveStrokeColor={'transparent'}
                    />
                    <View style={{ position: 'relative', bottom: 48, alignItems: 'center' }}>
                      <Text style={{ fontSize: 16, fontWeight: '800' }}>{user?.monthlyGoalPlasticAmount}/{user?.monthlyGoalPlasticTotal}</Text>
                    </View>
                  </View>
                }>
              </ProgressCard>
              <ProgressCard
                title={'Top Plastic'}
                text={'You\'ve recycled a lot!'}
                number={maxType.type}
                text={`You've recycled ${maxType.value} No.${maxType.type} plastics this month. Great work!`}
                cornerComponent={
                  <Trophy width={60} height={60} style={{ left: -6, top:6 }}></Trophy>
                }
              >
              </ProgressCard>
              <ProgressCard
                title={'Avatar Points'}
                text={'You monthly challenge progress has gained you the most points!'}
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
                <PolymerCard title={card.title} number={index + 1} />
              ))}

            </View>
          </ScrollView>

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
    <View style={{ ...styles.card, width: 180, height: 250, padding: 10, gap: 10 }}>
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
}

const PolymerCard = ({ title, number }: PolymerCardProps) => {
  return (
    <View style={{ ...styles.card, borderRadius: 20, width: 330, height: 400, padding: 20 }}>
      <View style={{
        width: 50, height: 50,
        borderTopLeftRadius: 20, borderBottomRightRadius: 20,
        backgroundColor: Colors.primary.dark,
        alignItems: 'center', justifyContent: 'center',
        position: 'absolute',
      }}>
        <View>
          <PlasticSymbol color={Colors.secondary.white} width={35} height={35} number={number} top={10} left={15}></PlasticSymbol>
        </View>
      </View>
      <Text style={{ ...TextStyles.subTitle, fontSize: 20, marginLeft: 40, marginTop: -5 }}>{title}</Text>

      <View style={{ alignItems: 'center', gap: 20, marginTop: 40 }}>
        <Text style={{ ...TextStyles.small, fontSize: 17, textAlign: 'center', width: 250 }}>
          {title} is pretty <Text style={{ fontWeight: '800' }}>common!</Text> It's used to make bottles for soda, water, and other drinks. These are dangerous when exposed to heat.
        </Text>
        <Text>Found in:</Text>
        <View>
          <View>

          </View>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.secondary.light,
    borderRadius: 10,
  },
});

export default EducationPage;
