import React, { useState } from 'react';
import { ScrollView, SafeAreaView, View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { logout } from '../../../redux/slices/authSlice';
import AppButton from '../../../components/AppButton';
import FormatStyle from '../../../utils/FormatStyle';
import TextStyles from 'utils/TextStyles';
import { useNavigation } from '@react-navigation/native';
import NavType from 'utils/NavType';
import { BaseTabRoutes } from 'navigation/routeTypes';
import Colors from 'utils/Colors';

import Svg, { G, Circle } from 'react-native-svg';
import Animated from 'react-native-reanimated';
import CircularProgress from 'react-native-circular-progress-indicator';
import Trophy from '../../../assets/Trophy.svg';
// import PlasticSymbol from 'components/RecycleSymbol';


const EducationPage = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavType>();

  const [modalVisible, setModalVisible] = useState(false);



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
            Hello, Jack
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'flex-end' }}>
            <Text style={{ ...TextStyles.subTitle }}>Your Progress</Text>
            <Text onPress={() => navigation.navigate(BaseTabRoutes.HOME)} style={{ ...TextStyles.small, textDecorationLine: 'underline' }}>See All</Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ gap: 10, flexDirection: 'row' }}>
              <ProgressCard
                title={'Monthly Challenge'}
                text={'You\'ve recycled 8 out of 10 PET plastics this month. Keep going to get the prize!'}
                cornerComponent={
                  <View>

                    <CircularProgress
                      value={60 / 60 * 100}
                      radius={40}
                      circleBackgroundColor={'transparent'}
                      progressValueColor={'transparent'}
                      activeStrokeColor={Colors.highlight}
                      inActiveStrokeColor={'transparent'}
                    />
                    <View style={{ position: 'relative', bottom: 48, alignItems: 'center' }}>
                      {/* NEED REDUX TO ADD P */}
                      <Text style={{ fontSize: 16, fontWeight: '800' }}>{40}/{40}</Text>
                    </View>
                  </View>
                }>
              </ProgressCard>
              <ProgressCard
                title={'Monthly Challenge'}
                text={'You\'ve recycled 8 out of 10 PET plastics this month. Keep going to get the prize!'}
                cornerComponent={
                  <View style={{ width: 20, height: 20, alignItems: 'center', backgroundColor: 'blue' }}>
                    <Trophy></Trophy>
                  </View>
                }>
              </ProgressCard>
              <ProgressCard
                title={'Monthly Challenge'}
                text={'You\'ve recycled 8 out of 10 PET plastics this month. Keep going to get the prize!'}
                cornerComponent={<></>}>
              </ProgressCard>
            </View>
          </ScrollView>
          <Text style={{ ...TextStyles.subTitle }}>Learn about polymers</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            <View style={{ gap: 10, flexDirection: 'row' }}>
              <PolymerCard
                title={'Polyethylene Terephthalate'}
                text={'PET (or PETE) is pretty common! They’re used to make bottles for soda, water, and other drinks. These are dangerous when exposed to heat.'}
              ></PolymerCard>
              <PolymerCard
                title={'Polyethylene Terephthalate'}
                text={'PET (or PETE) is pretty common! They’re used to make bottles for soda, water, and other drinks. These are dangerous when exposed to heat.'}
              ></PolymerCard>
              <PolymerCard
                title={'Polyethylene Terephthalate'}
                text={'PET (or PETE) is pretty common! They’re used to make bottles for soda, water, and other drinks. These are dangerous when exposed to heat.'}
              ></PolymerCard>
              <PolymerCard
                title={'Polyethylene Terephthalate'}
                text={'PET (or PETE) is pretty common! They’re used to make bottles for soda, water, and other drinks. These are dangerous when exposed to heat.'}
              ></PolymerCard>
              <PolymerCard
                title={'Polyethylene Terephthalate'}
                text={'PET (or PETE) is pretty common! They’re used to make bottles for soda, water, and other drinks. These are dangerous when exposed to heat.'}
              ></PolymerCard>
              <PolymerCard
                title={'Polyethylene Terephthalate'}
                text={'PET (or PETE) is pretty common! They’re used to make bottles for soda, water, and other drinks. These are dangerous when exposed to heat.'}
              ></PolymerCard>
              <PolymerCard
                title={'Polyethylene Terephthalate'}
                text={'PET (or PETE) is pretty common! They’re used to make bottles for soda, water, and other drinks. These are dangerous when exposed to heat.'}
              ></PolymerCard>
              <PolymerCard
                title={'Polyethylene Terephthalate'}
                text={'PET (or PETE) is pretty common! They’re used to make bottles for soda, water, and other drinks. These are dangerous when exposed to heat.'}
              ></PolymerCard>
              <PolymerCard
                title={'Polyethylene Terephthalate'}
                text={'PET (or PETE) is pretty common! They’re used to make bottles for soda, water, and other drinks. These are dangerous when exposed to heat.'}
              ></PolymerCard>
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
  plastic?: JSX.Element;
}

const ProgressCard = ({ cornerComponent, title, text, plastic }: ProgressCardProps) => {
  return (
    <View style={{ ...styles.card, width: 180, height: 250, padding: 10, gap: 10 }}>
      <View style={{
        position: 'absolute', top: 10, left: 15, height: 100,
      }}>
        {cornerComponent}
      </View>
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
  text: string;
  plastic?: JSX.Element;
}

const PolymerCard = ({ title, text }: PolymerCardProps) => {
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
          {/* <PlasticSymbol color={Colors.secondary.white}></PlasticSymbol> */}
        </View>
      </View>
      <Text style={{ ...TextStyles.subTitle, fontSize: 18, marginLeft: 40 }}>{title}</Text>

      <View style={{ alignItems: 'center', gap: 20, marginTop: 30 }}>
        <Text style={{ ...TextStyles.small, fontSize: 19, textAlign: 'center', width: 250 }}>
          {text}
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
