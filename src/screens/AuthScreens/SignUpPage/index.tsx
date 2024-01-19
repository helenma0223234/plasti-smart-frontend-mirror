import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { signUp } from '../../../redux/slices/authSlice';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import FormatStyle from '../../../utils/FormatStyle';
import TextStyles from '../../../utils/TextStyles';

const SignUpPage = () => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSubmit = () => {
    // Send only if all fields filled in
    if (!name) alert('Please enter your name!');
    else if (!email) alert('Please enter an email address!');
    else if (!password) alert('Please enter a password!');
    else if (!confirmPassword) alert('Please confirm your password!');
    else if (!(password === confirmPassword)) alert('Passwords do not match!');
    else {
      dispatch(signUp({ email, password, name }));
    }
  };

  return (
    <SafeAreaView style={FormatStyle.container}>
      <Text style={TextStyles.title}>Sign Up</Text>
      <Text style={TextStyles.subTitle}>Name</Text>
      <AppTextInput
        onChangeText={(text) => setName(text)}
        value={name}
        placeholder='Name'
      />
      <Text style={TextStyles.subTitle}>Email</Text>
      <AppTextInput
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder='Email'
      />
      <Text style={TextStyles.subTitle}>Password</Text>
      <AppTextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder='Password'
        secureTextEntry={true}
      />
      <Text style={TextStyles.subTitle}>Confirm Password</Text>
      <AppTextInput
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        placeholder='Confirm Password'
        secureTextEntry
      />
      <AppButton
        onPress={handleSubmit}
        title={'Sign Up'}
      />
    </SafeAreaView>
  );
};

export default SignUpPage;
