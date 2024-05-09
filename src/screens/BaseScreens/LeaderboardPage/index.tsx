import React, { useEffect, useState } from 'react';
import { ScrollView, SafeAreaView, View, Text } from 'react-native';
import { SERVER_URL } from 'utils/constants';
import FormatStyle from '../../../utils/FormatStyle';
import CircleBG from '../../../assets/Ellipse 66.svg';
import TextStyles from 'utils/TextStyles';
import Colors from 'utils/Colors';
import axios from 'axios';
import Cat from '../../../assets/Cat.svg';
import useAppSelector from 'hooks/useAppSelector';
import usersSlice from 'redux/slices/usersSlice';

interface leaderboardEntry {
  name: string;
  score: number;
}

const LeaderboardPage = () => {
  const user = useAppSelector((state) => state.users.selectedUser);
  const [leaderboard, setLeaderboard] = useState([] as leaderboardEntry[]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(SERVER_URL + 'users/leaderboard');
        // map response data from {username : string, monthlyTotalScans: number} to leaderboardEntry
        const leaderboardData = response.data.map((entry: { username: string, monthlyTotalScans: number }) => {
          return { name: entry.username ? entry.username : 'username', score: entry.monthlyTotalScans };
        });
        setLeaderboard(leaderboardData);
      } catch (error) {
        console.error('Error when getting leaderboard', error);
      }
    })();
  }, []);

  return (
    leaderboard.length > 0 && <SafeAreaView style={{ ...FormatStyle.topContainer, alignItems: 'center' }}>
      <View
        style={{
          width: '100%',
          height: 1000,
          overflow: 'hidden',
          aspectRatio: 1,
          alignItems: 'center',
          position: 'absolute',
          bottom: -420,
        }}
      >
        <CircleBG></CircleBG>
      </View>

      <>
        <View style={{ position: 'absolute', top: 120 }}>
          <Podium name={leaderboard[0].name} place={1}></Podium>
        </View>
        <View style={{ position: 'absolute', left: 10, top: 150 }}>
          <Podium name={leaderboard[1].name} place={2}></Podium>
        </View>
        <View style={{ position: 'absolute', right: 10, top: 150 }}>
          <Podium name={leaderboard[2].name} place={3}></Podium>
        </View>
      </>

      <View style={{ margin: 20, justifyContent: 'center' }}>
        <Text
          style={{
            ...TextStyles.regular,
            fontSize: 30,
            alignSelf: 'flex-start',
          }}
        >
          {(() => {return user.name.charAt(0).toUpperCase() + user.name.slice(1);})()}'s Leaderboard
        </Text>
        <View
          style={{
            gap: 20,
            position: 'relative',
            top: 250,
            width: 330,
            height: 392,
            justifyContent: 'center',
          }}
        >
          <ScrollView
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              paddingBottom: 50,
              paddingTop: 20,
            }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={20}
          >
            {leaderboard.slice(3).map((place, index) => (
              <View style={{ gap: 10, width: '100%' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 0,
                    height: 'auto',
                    padding: 3,
                  }}
                >
                  <View
                    style={{
                      ...FormatStyle.circle,
                      width: 40,
                      height: 40,
                      marginTop: 0,
                      backgroundColor: Colors.secondary.white,
                    }}
                  ></View>
                  <View
                    style={{
                      ...FormatStyle.circle,
                      width: 23,
                      height: 23,
                      marginTop: 0,
                      position: 'relative',
                      right: 42,
                      bottom: 15,
                    }}
                  >
                    <Text
                      style={{
                        ...TextStyles.small,
                        color: Colors.secondary.white,
                        fontSize: 13,
                      }}
                    >
                      {index + 4}
                    </Text>
                  </View>

                  <Text style={{ ...TextStyles.regular }}>{place.name}</Text>
                </View>
                {index + 4 < leaderboard.length ? (
                  <View
                    style={{
                      backgroundColor: Colors.secondary.white,
                      height: 2,
                    }}
                  ></View>
                ) : null}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

interface PodiumProps {
  name: string;
  place: number;
}

const Podium = ({ name, place }: PodiumProps) => {
  return (
    <View style={{ flexDirection: 'column', alignItems: 'center', gap: 5 }}>
      <View
        style={{
          width: 100,
          height: 'auto',
          // overflow: 'hidden',
          aspectRatio: 1,
          alignItems: 'center',
        }}
      >
        {/* <Cat></Cat> */}
      </View>
      <View
        style={{
          ...FormatStyle.circle,
          width: 40,
          height: 40,
          marginTop: 0,
          backgroundColor: place == 1 ? Colors.primary.dark : '#1B453C',
        }}
      >
        <Text style={{ ...TextStyles.regular, color: Colors.secondary.white }}>
          {place}
        </Text>
      </View>

      <Text style={{ ...TextStyles.regular, width: 100, textAlign: 'center' }}>
        {name}
      </Text>
    </View>
  );
};

export default LeaderboardPage;
