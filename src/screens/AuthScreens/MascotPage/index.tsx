import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';

import { verify } from '../../../redux/slices/authSlice';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import FormatStyle from '../../../utils/FormatStyle';
import TextStyles from '../../../utils/TextStyles';
import Button from 'components/Button';

const MascotPage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { id, email } = user || { id: '', email: '' };

  const handleSubmit = () => {
    alert('Please enter a code!');
  };

  return (
    <SafeAreaView style={FormatStyle.topContainer}>
      <Text style={[TextStyles.title, { width:350, marginTop: 50, textAlign: 'left' }]}>Welcome!</Text>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <View style={{ width: 350, alignItems: 'center' }}>
          <Text style={[TextStyles.subTitle, { marginTop: 20 }]}>VERIFICATION</Text>
          <Text style={{
            color: '#000',
            textAlign: 'center',
            fontFamily: 'Inter',
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 18,
            letterSpacing: 0.3,
            marginTop: 8,
          }}> byebye </Text>

          <Button
            onPress={handleSubmit}
            style={{ paddingTop: 15, paddingBottom: 15, width: '100%', marginTop: 100 }}
            title={'Verify'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MascotPage;
