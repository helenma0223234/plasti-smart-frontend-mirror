import React, { useEffect, useState } from 'react';
import { ScrollView, SafeAreaView, View, Text, Dimensions } from 'react-native';
import { SERVER_URL } from 'utils/constants';
import FormatStyle from '../../../utils/FormatStyle';
import CircleBG from '../../../assets/Ellipse 66.svg';
import TextStyles from 'utils/TextStyles';
import Colors from 'utils/Colors';
import axios from 'axios';
import Cat from '../../../assets/Cat.svg';
import useAppSelector from 'hooks/useAppSelector';
import usersSlice from 'redux/slices/usersSlice';
import Avatar from 'components/Avatar';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

interface leaderboardEntry {
  name: string;
  score: number;
  avatarID: number;
  avatarColor: number;
}

const LeaderboardPage = () => {
  const user = useAppSelector((state) => state.users.selectedUser);
  const [leaderboard, setLeaderboard] = useState([] as leaderboardEntry[]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(SERVER_URL + 'users/leaderboard');
        const leaderboardData = response.data.map((entry: { username: string, monthlyPoints: number, avatarID: number, avatarColor: string}) => {
          return { name: entry.username ? entry.username : 'username', score: entry.monthlyPoints, avatarID: entry.avatarID, avatarColor: entry.avatarColor};
        });
        setLeaderboard(leaderboardData);
      } catch (error) {
        console.error('Error when getting leaderboard', error);
      }
    })();
  }, []);

  return (
    leaderboard.length > 0 && <SafeAreaView style={{ ...FormatStyle.topContainer, alignItems: 'center' }}>
      <View style={{marginTop: screenHeight*0.025}}>
        <Text style={{ ...TextStyles.regular, fontSize: 30, alignSelf: 'flex-start', }} > 
          {(() => {return user.name.charAt(0).toUpperCase() + user.name.slice(1);})()}'s Leaderboard
        </Text>
      </View>
      
      <View
        style={{
          alignItems: 'center',
          alignSelf: 'center',
          bottom: screenHeight * 0.95,
        }}
      >
        <CircleBG height={screenHeight*3}  width={screenWidth*2} style={{position: 'absolute', top: screenHeight *0.04 }}></CircleBG>
      </View>

      <View style={{ position: 'absolute', zIndex: 1, alignItems: 'center', marginBottom: screenHeight*0.1 }}>
          <View style={{ position: 'absolute', top: screenHeight*0.18 }}>
            <Podium name={leaderboard[0].name} place={1} avatarColor={leaderboard[0].avatarColor} avatarID={leaderboard[0].avatarID}></Podium>
          </View>
          <View style={{ position: 'absolute', right: screenWidth*0.2, top: screenHeight*0.25 }}>
            <Podium name={leaderboard[1].name} place={2} avatarColor={leaderboard[1].avatarColor} avatarID={leaderboard[1].avatarID}></Podium>
          </View>
          <View style={{ position: 'absolute', left: screenWidth*0.2, top: screenHeight*0.25 }}>
            <Podium name={leaderboard[2].name} place={3} avatarColor={leaderboard[2].avatarColor} avatarID={leaderboard[2].avatarID}></Podium>
          </View>
        </View>


      <View style={{ justifyContent: 'center' }}>
        
        <View
          style={{
            gap: 20,
            position: 'relative',
            top: screenHeight * 0.35,
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

                  <Text style={{ ...TextStyles.regular, fontFamily:'Inter600_SemiBold', fontSize:screenHeight*0.022 }}>{place.name}</Text>
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
  avatarID: number;
  avatarColor: number;
}

const Podium = ({ name, place, avatarColor, avatarID }: PodiumProps) => {
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
        <Avatar avatarID={avatarID} color={avatarColor} size={screenWidth * 0.225} accessory={-1} shadow={false}></Avatar>
        
      </View>
      <View
        style={{
          ...FormatStyle.circle,
          width: screenWidth * 0.125,
          height: screenWidth * 0.125,
          marginTop: 0,
          backgroundColor: place == 1 ? Colors.primary.dark : '#1B453C',
        }}
      >
        <Text style={{ ...TextStyles.regular, color: Colors.secondary.white, fontFamily: 'Inter_400Regular', fontSize:screenHeight*0.025 }}>
          {place}
        </Text>
      </View>

      <Text style={{ ...TextStyles.regular, width: 100, textAlign: 'center', fontFamily:'Inter600_SemiBold', fontSize:screenHeight*0.022 }}>
        {name}
      </Text>
    </View>
  );
};

export default LeaderboardPage;
