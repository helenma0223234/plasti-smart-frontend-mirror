import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { logout } from '../../../redux/slices/authSlice';
import AppButton from '../../../components/AppButton';
import FormatStyle from '../../../utils/FormatStyle';

const FrontPage = () => {
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={FormatStyle.container}>
      <ScrollView>
        <AppButton
          onPress={() => dispatch(logout({}))}
          title={'Logout'}
          isArrow={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FrontPage;
