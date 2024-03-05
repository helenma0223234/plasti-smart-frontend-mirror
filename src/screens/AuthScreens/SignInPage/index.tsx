import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { signIn } from '../../../redux/slices/authSlice';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import FormatStyle from '../../../utils/FormatStyle';
import TextStyles from '../../../utils/TextStyles';
import Button from 'components/Button';
import { useNavigation } from '@react-navigation/native';
import NavType from 'utils/NavType';
import { AuthStackRoutes } from 'navigation/routeTypes';

const SignInPage = () => {
  const navigation = useNavigation<NavType>();

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
    <SafeAreaView style={{ ...FormatStyle.topContainer }}>
      <View style={{ marginTop: 50, width: 350, gap: 20 }}>
        <Text style={TextStyles.title}>Welcome Back!</Text>
        <View style={{ marginTop: 20, gap: 5 }}>
          <Text style={TextStyles.subTitle}>Email</Text>
          <AppTextInput
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder='Email'
          />
        </View>
        <View style={{ gap: 5 }}>
          <Text style={TextStyles.subTitle}>Password</Text>
          <AppTextInput
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder='Password'
            secureTextEntry={true}
          />

        </View>
        <View style={{ alignItems: 'center', width: '100%', gap: 10 }}>
          <Button
            style={{ paddingTop: 15, paddingBottom: 15, width: '100%' }}
            onPress={handleSubmit}
            title={'Log in'}
            disabled={!email || !password}
          />
          <Text style={TextStyles.small}>Don't have an account? <Text style={{ textDecorationLine: 'underline' }} onPress={() => navigation.navigate(AuthStackRoutes.SIGNUP)}>Sign up!</Text></Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInPage;
