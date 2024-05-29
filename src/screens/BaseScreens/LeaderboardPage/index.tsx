import React, { useEffect, useState } from 'react';
import { ScrollView, SafeAreaView, View, Text, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SERVER_URL } from 'utils/constants';
import FormatStyle from '../../../utils/FormatStyle';
import CircleBG from '../../../assets/Ellipse 66.svg';
import TextStyles from 'utils/TextStyles';
import Colors from 'utils/Colors';
import axios from 'axios';
import useAppSelector from 'hooks/useAppSelector';
import usersSlice from 'redux/slices/usersSlice';
import ProfilePicture from 'components/ProfilePicture';
import Avatar from 'components/Avatar';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

interface leaderboardEntry {
  name: string;
  score: number;
  avatarID: number;
  avatarColor: number;
  avatarAccessoryEquipped: number;
}

const LeaderboardPage = () => {
  const user = useAppSelector((state) => state.users.selectedUser);
  const [leaderboard, setLeaderboard] = useState([] as leaderboardEntry[]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchLeaderboard = async () => {
        try {
          const response = await axios.get(SERVER_URL + 'users/leaderboard');
          
          const leaderboardData = response.data.map((entry: { username: string, monthlyPoints: number, avatarID: number, avatarColor: number, avatarAccessoryEquipped: number  }) => {
            return { name: entry.username, score: entry.monthlyPoints, avatarID: entry.avatarID, avatarColor: entry.avatarColor, avatarAccessoryEquipped: entry.avatarAccessoryEquipped };
          });
          console.log('Leaderboard data:', leaderboardData);
          // for loop through leaderboardData and print name if any field is either null or undefined
          for (let i = 0; i < leaderboardData.length; i++) {
            if (leaderboardData[i].name === null || leaderboardData[i].name === undefined) {
              console.log('Name is null or undefined at index:', i);
            }
            if (leaderboardData[i].score === null || leaderboardData[i].score === undefined) {
              console.log('Score is null or undefined at index:', i);
            }
            if (leaderboardData[i].avatarID === null || leaderboardData[i].avatarID === undefined) {
              console.log('Avatar ID is null or undefined at index:', i);
            }
            if (leaderboardData[i].avatarColor === null || leaderboardData[i].avatarColor === undefined) {
              console.log('Avatar color is null or undefined at index:', i);
            }
            if (leaderboardData[i].avatarAccessoryEquipped === null || leaderboardData[i].avatarAccessoryEquipped === undefined) {
              console.log('Avatar accessory is null or undefined at index:', i);
            }
          }
          setLeaderboard(leaderboardData);
        } catch (error) {
          console.log('Error when getting leaderboard', error);
        }
      };

      fetchLeaderboard();
    }, [])
  );

  // const userRank = user?.rank || 100;
  const userRank = 22;

  return (
    leaderboard.length > 0 && <SafeAreaView style={{ ...FormatStyle.topContainer, alignItems: 'center' }}>
      <View style={{ marginTop: screenHeight * 0.025 }}>
        <Text style={{ ...TextStyles.regular, fontSize: 30, alignSelf: 'flex-start' }} > 
          Plasti Global Leaderboard
        </Text>
      </View>
      
      <View
        style={{
          alignItems: 'center',
          alignSelf: 'center',
          bottom: screenHeight * 0.95,
          marginBottom: 8,
        }}
      >
        <CircleBG height={screenHeight * 3}  width={screenWidth * 2} style={{ position: 'absolute', top: screenHeight * 0.04 }}></CircleBG>
      </View>

      <View style={{ position: 'absolute', zIndex: 1, alignItems: 'center', marginBottom: screenHeight * 0.1 }}>
        <View style={{ position: 'absolute', top: screenHeight * 0.18 }}>
          <Podium name={leaderboard[0].name} place={1} avatarColor={leaderboard[0].avatarColor} avatarID={leaderboard[0].avatarID} avatarAccessoryEquipped={leaderboard[0].avatarAccessoryEquipped}></Podium>
        </View>
        <View style={{ position: 'absolute', right: screenWidth * 0.2, top: screenHeight * 0.25 }}>
          <Podium name={leaderboard[1].name} place={2} avatarColor={leaderboard[1].avatarColor} avatarID={leaderboard[1].avatarID} avatarAccessoryEquipped={leaderboard[1].avatarAccessoryEquipped}></Podium>
        </View>
        <View style={{ position: 'absolute', left: screenWidth * 0.2, top: screenHeight * 0.25 }}>
          <Podium name={leaderboard[2].name} place={3} avatarColor={leaderboard[2].avatarColor} avatarID={leaderboard[2].avatarID} avatarAccessoryEquipped={leaderboard[2].avatarAccessoryEquipped}></Podium>
        </View>
      </View>


      <View style={{ justifyContent: 'center' }}>
        
        <View
          style={{
            // gap: 20,
            position: 'relative',
            top: screenHeight * 0.34,
            width: screenWidth * 0.86,
            height: screenHeight * 0.55,
            justifyContent: 'center',
          }}
        >
          <ScrollView
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              paddingBottom: screenHeight * 0.16,
              paddingTop: screenHeight * 0.028,
              
            }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={20}
          >
            {leaderboard.slice(3, 23).map((place, index) => {
              const rank = index + 4;
              return (
                <View style={{ gap: 10, width: '100%' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 0,
                      height: rank === userRank ? screenHeight * 0.06 : 'auto',
                      borderRadius: rank === userRank ? 18 : 0,
                      padding: 3,
                      backgroundColor: rank === userRank ? '#FBFBF4' : 'transparent',
                      shadowColor: rank === userRank ? '#000' : 'transparent',
                      shadowOffset: {
                        width: 1,
                        height: rank === userRank ? 1 : 0,
                      },
                      marginLeft: rank === userRank ? 4 : 0,
                      shadowOpacity: rank === userRank ? 0.25 : 0,
                      shadowRadius: rank === userRank ? 3.84 : 0,
                      elevation: rank === userRank ? 5 : 0,
                      width: rank === userRank ? '98%' : '100%',
                    }}
                  >
                    {rank === userRank ? (
                      <>
                        {(place.avatarID !== null && place.avatarID !== undefined && place.avatarColor !== null && place.avatarColor !== undefined) && 
                          <ProfilePicture size={40} avatarID={place.avatarID} color={place.avatarColor} accessory={place.avatarAccessoryEquipped}></ProfilePicture>}
                        <View
                          style={{
                            ...FormatStyle.circle,
                            width: 20,
                            height: 20,
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
                            {userRank}
                          </Text>
                        </View>
                        <Text style={{ ...TextStyles.regular, fontFamily:'Inter600_SemiBold', fontSize:screenHeight * 0.022, marginRight: screenWidth * 0.4 }}>
                          {user.username}
                        </Text>
                      </>
                    ) : (
                      <>
                        {(place.avatarID !== null && place.avatarID !== undefined && place.avatarColor !== null && place.avatarColor !== undefined) && 
                          <ProfilePicture size={40} avatarID={place.avatarID} color={place.avatarColor} accessory={place.avatarAccessoryEquipped}></ProfilePicture>}
                        <View
                          style={{
                            ...FormatStyle.circle,
                            width: 40,
                            height: 40,
                            marginTop: 0,
                            backgroundColor: Colors.secondary.white,
                          }}
                        >
                        </View>
                        <View
                          style={{
                            ...FormatStyle.circle,
                            width: 20,
                            height: 20,
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
                            {rank}
                          </Text>
                        </View>
                        <Text style={{ ...TextStyles.regular, fontFamily:'Inter600_SemiBold', fontSize:screenHeight * 0.022 }}>{place.name}</Text>
                      </>
                    )}
                  </View>
                  {rank < leaderboard.length ? (
                    <View
                      style={{
                        backgroundColor: Colors.secondary.white,
                        height: 2,
                      }}
                    ></View>
                  ) : null}
                </View>
              );
            })}
          </ScrollView>
          {userRank > 20 && 
      <View style={{
        position: 'absolute',
        top: screenHeight * 0.34,
        left: -screenWidth * 0.04,
        width: '110%',
        height: screenHeight * 0.062,
        backgroundColor: '#FBFBF4',
        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row',
        gap: 0,
        padding: 3,
      }}>
        {/* <View
          style={{
            ...FormatStyle.circle,
            width: 40,
            height: 40,
            marginTop: 0,
            backgroundColor: Colors.primary.dark,
          }}
        ></View> */}
        {(user.avatarID !== null && user.avatarID !== undefined && user.avatarColor !== null && user.avatarColor !== undefined) && 
                          <ProfilePicture size={40} avatarID={user.avatarID} color={user.avatarColor} accessory={user.avatarAccessoryEquipped}></ProfilePicture>}
        <View
          style={{
            ...FormatStyle.circle,
            width: 20,
            height: 20,
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
            {userRank}
          </Text>
        </View>
        <Text style={{ ...TextStyles.regular, fontFamily:'Inter600_SemiBold', fontSize:screenHeight * 0.022, marginRight: screenWidth * 0.4 }}>
          {user.username}
        </Text>
      </View>
          }
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
  avatarAccessoryEquipped: number;
}

const Podium = ({ name, place, avatarColor, avatarID, avatarAccessoryEquipped }: PodiumProps) => {
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
        <Avatar avatarID={avatarID} color={avatarColor} size={screenWidth * 0.225} accessory={avatarAccessoryEquipped} shadow={false}></Avatar>
        
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
        <Text style={{ ...TextStyles.regular, color: Colors.secondary.white, fontFamily: 'Inter_400Regular', fontSize:screenHeight * 0.025 }}>
          {place}
        </Text>
      </View>

      <Text style={{ ...TextStyles.regular, width: 100, textAlign: 'center', fontFamily:'Inter600_SemiBold', fontSize:screenHeight * 0.022 }}>
        {name}
      </Text>
    </View>
  );
};

export default LeaderboardPage;
