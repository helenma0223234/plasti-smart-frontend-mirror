import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { signIn } from '../../../redux/slices/authSlice';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import FormatStyle from '../../../utils/FormatStyle';
import TextStyles from '../../../utils/TextStyles';

const SignInPage = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // Send only if all fields filled in
    if (!email) alert('Please enter an email address!');
    else if (!password) alert('Please enter a password!');
    else {
      dispatch(signIn({ email, password }));
    }
  };

  return (
    <SafeAreaView style={FormatStyle.container}>
      <Text style={TextStyles.title}>Login</Text>
      <Text style={TextStyles.subTitle}>Email</Text>
      <AppTextInput
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder='Type your email'
      />
      <Text style={TextStyles.subTitle}>Password</Text>
      <AppTextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder='Type your password'
        secureTextEntry={true}
      />
      <AppButton
        onPress={handleSubmit}
        title={'Log in'}
      />
    </SafeAreaView>
  );
};

export default SignInPage;
