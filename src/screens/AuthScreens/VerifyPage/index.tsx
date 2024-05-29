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
  const { user } = useAppSelector((state) => state.auth);
  const { id, email } = user || { id: '', email: '' };
  const [code, setCode] = useState<string>('');
  const [timer, setTimer] = useState<number>(0);

  // send a code to the user once they enter this page!
  useEffect(() => {
    if (id && email && id !== '' && email !== '') dispatch(resendCode({ id, email }));
  }, []);

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
      setTimer(60);
    }
  };

  const handleSubmit = () => {
    if (!code) alert('Please enter a code!');
    else {
      if (id && email && id !== '' && email !== '') {
        dispatch(verify({ id, email, code }));
      } else {
        alert('Please go to sign in page to continue');
        console.error('User ID or email is undefined');
      }
    }
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
          }}> We have sent a temporary verification code to your email address.</Text>
        
          <View style={{ marginTop: 18 }}>
            <AppTextInput
              onChangeText={(text) => setCode(text)}
              value={code}
              placeholder='Type your code'
            />
            <AppButton
              onPress={handleResendCode}
              title={timer > 0 ? `Resend Code in 0:${timer}` : 'Resend Code'}
              transparent={true}
              underline={true}
              textStyle={{
                color: '#1B453C',
                textAlign: 'right',
                fontSize: 16,
                fontStyle: 'normal',
                fontWeight: '600',
                lineHeight: 18,
                letterSpacing: 0.3,
                textDecorationLine: 'underline',
                textTransform: 'capitalize',
                textShadowColor: 'transparent',
              }}
              disabled={timer > 0}
              style={{ marginTop: 8 }}
            />
          </View>

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

export default VerifyPage;
