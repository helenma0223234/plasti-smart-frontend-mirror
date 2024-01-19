import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppButton from '../../../components/AppButton';
import FormatStyle from '../../../utils/FormatStyle';
import NavType from '../../../utils/NavType';
import { AuthStackRoutes } from '../../../navigation/routeTypes';
import LogoImage from '../../../assets/dali_dark.svg';

const FrontPage = () => {
  const navigation = useNavigation<NavType>();

  return (
    <SafeAreaView style={FormatStyle.container}>
      <ScrollView>
        <LogoImage
          style={{
            width: 309,
            height: 117,
          }}
        />
        <AppButton
          onPress={() => navigation.navigate(AuthStackRoutes.SIGNIN)}
          title={'Sign In'}
          isArrow={true}
        />
        <AppButton
          onPress={() => navigation.navigate(AuthStackRoutes.SIGNUP)}
          title={'Sign Up'}
          isArrow={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FrontPage;
