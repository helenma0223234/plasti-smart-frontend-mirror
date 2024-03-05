import React from 'react';
import { ScrollView, SafeAreaView, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormatStyle from '../../../utils/FormatStyle';
import NavType from '../../../utils/NavType';
import { AuthStackRoutes } from '../../../navigation/routeTypes';
import Cat from '../../../assets/Cat.svg';
import Button from 'components/Button';
import TextStyles from 'utils/TextStyles';


const FrontPage = () => {
  const navigation = useNavigation<NavType>();

  return (
    <SafeAreaView style={FormatStyle.container}>
      {/* <ScrollView> */}
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      }}>
        <Cat width={400} style={{ position: 'absolute', top: 70, zIndex: '1' }}/>
        <Text style={{ ...TextStyles.logo, fontSize: 70 }} >
          PlastiCycle
        </Text>
        <Text style={{ ...TextStyles.regular, textAlign: 'center' }}>
          The free, fun, and effective way to learn, recycle, and compete with friends
        </Text>
      </View>
      <View style={{ position: 'absolute', bottom: 0, marginBottom: 50 }}>
        <Button
          onPress={() => navigation.navigate(AuthStackRoutes.ONBOARD)}
          title={'Get Started'}
          fullWidth
        />
        <Button
          onPress={() => navigation.navigate(AuthStackRoutes.SIGNIN)}
          title={'I Already Have an Account'}
          fullWidth
          inverted
        />
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default FrontPage;
