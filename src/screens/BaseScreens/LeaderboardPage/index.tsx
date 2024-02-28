import React from 'react';
import { ScrollView, SafeAreaView, View, Text } from 'react-native';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { logout } from '../../../redux/slices/authSlice';
import AppButton from '../../../components/AppButton';
import FormatStyle from '../../../utils/FormatStyle';
import CircleBG from '../../../assets/Ellipse 66.svg';
import TextStyles from 'utils/TextStyles';
import Colors from 'utils/Colors';
import Cat from '../../../assets/Cat.svg';

const LeaderboardPage = () => {
  const dispatch = useAppDispatch();


  const dummyPlaces = [
    { name: 'Jack Cool Guy Macy', score: 100 },
    { name: 'Jack Aight Macy', score: 100 },
    { name: 'Jack Meh Macy', score: 100 },
    { name: 'Jack', score: 100 },
    { name: 'Jack', score: 100 },
    { name: 'Jack', score: 100 },
    { name: 'Jack', score: 100 },
    { name: 'Jack', score: 100 },
  ];
  return (
    <SafeAreaView style={{ ...FormatStyle.topContainer, alignItems: 'center' }}>
      <View style={{
        width: 400,
        height: 1000,
        overflow: 'hidden',
        aspectRatio: 1,
        alignItems: 'center',
        position: 'absolute',
        bottom: -450,
      }}>
        <CircleBG></CircleBG>
      </View>

      <>
        <View style={{ position: 'absolute', top: 120 }}>
          <Podium name={dummyPlaces[0].name} place={1}></Podium>
        </View>
        <View style={{ position: 'absolute', left: 10, top: 150 }}>
          <Podium name={dummyPlaces[1].name} place={2}></Podium>
        </View>
        <View style={{ position: 'absolute', right: 10, top: 150 }}>
          <Podium name={dummyPlaces[2].name} place={3}></Podium>
        </View>
      </>

      <View style={{ margin: 20, justifyContent: 'center' }}>
        <Text style={{ ...TextStyles.regular, fontSize: 30, alignSelf: 'flex-start' }}>Jack's Leaderboard</Text>
        <View style={{ gap: 20, position: 'relative', top: 250, width: 330, height: 392, justifyContent: 'center' }}>
          <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', gap: 10, paddingBottom: 50, paddingTop: 20 }} showsVerticalScrollIndicator={false}
          >

            {dummyPlaces.slice(3).map((place, index) => (
              <View style={{ gap: 10, width: '100%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 0, height: 'auto', padding: 3 }}>
                  <View style={{ ...FormatStyle.circle, width: 40, height: 40, marginTop: 0, backgroundColor: Colors.secondary.white }}></View>
                  <View style={{ ...FormatStyle.circle, width: 23, height: 23, marginTop: 0, position: 'relative', right: 42, bottom: 15 }}>
                    <Text style={{ ...TextStyles.small, color: Colors.secondary.white, fontSize: 13 }}>{index + 4}</Text>
                  </View>

                  <Text style={{ ...TextStyles.regular }}>{place.name}</Text>
                </View>
                {index + 4 < dummyPlaces.length ?
                  <View style={{ backgroundColor: Colors.secondary.white, height: 2 }}></View>
                  : null}

              </View>
            ))}
          </ScrollView>

        </View>

      </View >

    </SafeAreaView >
  );
};

interface PodiumProps {
  name: string
  place: number
}

const Podium = ({ name, place }: PodiumProps) => {
  return (
    <View style={{ flexDirection: 'column', alignItems: 'center', gap: 5 }}>
      <View style={{
        width: 100,
        height: 'auto',
        // overflow: 'hidden',
        aspectRatio: 1,
        alignItems: 'center',
      }}>
        {/* <Cat ></Cat> */}
      </View>
      <View style={{ ...FormatStyle.circle, width: 40, height: 40, marginTop: 0, backgroundColor: (place == 1 ? Colors.primary.dark : '#1B453C') }}>
        <Text style={{ ...TextStyles.regular, color: Colors.secondary.white }}>{place}</Text>
      </View>

      <Text style={{ ...TextStyles.regular, width: 100, textAlign: 'center' }}>{name}</Text>
    </View>
  );
};



export default LeaderboardPage;
