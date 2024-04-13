import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';

import { resendCode, verify } from '../../../redux/slices/authSlice';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import FormatStyle from '../../../utils/FormatStyle';
import TextStyles from '../../../utils/TextStyles';
import Button from 'components/Button';

const VerifyPage = () => {
  const dispatch = useAppDispatch();
  const { id, email } = useAppSelector((state) => state.auth);
  const [code, setCode] = useState<string>('');
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResendCode = () => {
    if (timer === 0) {
      dispatch(resendCode({ id, email }));
      setTimer(60); // Set timer to 60 seconds
    }
  };

  const handleSubmit = () => {
    // Send only if all fields filled in
    if (!code) alert('Please enter a code!');
    else {
      dispatch(verify({ id, email, code }));
    }
  };

  return (
    <SafeAreaView style={FormatStyle.topContainer}>
      <View style={{ marginTop: 50, width: 350, gap: 20 }}>
        <Text style={TextStyles.title}>Welcome!</Text>
        <View style={{ flex:0, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', gap: 20 }}>
          <Text style={TextStyles.subTitle}>VERIFICATION</Text>
        
          <Text style={{
            color: '#000',
            textAlign: 'center',
            fontFamily: 'Inter',
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 18,
            letterSpacing: 0.3,
          }}> We have sent a temporary verification code to your email address.</Text>
        
          <View style={{ marginTop: 20, gap: 1 }}>
            <AppTextInput
              onChangeText={(text) => setCode(text)}
              value={code}
              placeholder='Type your code'
            />
          </View>
        
          <AppButton
            onPress={handleResendCode}
            title={timer > 0 ? `Resend Code in 0:${timer}` : 'Resend Code'}
            transparent={true}
            underline={true}
            textStyle={{
              color: '#1B453C',
              textAlign: 'right',
              fontFamily: 'Inter',
              fontSize: 16,
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: 18,
              letterSpacing: 0.3,
              textDecorationLine: 'underline',
              textTransform: 'capitalize',
            }}
            disabled={timer > 0}
          />

          <Button
            onPress={handleSubmit}
            style={{ paddingTop: 15, paddingBottom: 15, width: '100%' }}
            title={'Verify'}
          />
        </View>
      </View>

    </SafeAreaView>
  );
};

export default VerifyPage;
