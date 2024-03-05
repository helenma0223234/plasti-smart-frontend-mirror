import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { signUp } from '../../../redux/slices/authSlice';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import FormatStyle from '../../../utils/FormatStyle';
import TextStyles from '../../../utils/TextStyles';
import Button from 'components/Button';
import { useNavigation } from '@react-navigation/native';
import NavType from 'utils/NavType';
import { AuthStackRoutes } from 'navigation/routeTypes';

const SignUpPage = () => {
  const navigation = useNavigation<NavType>();


  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  // TODO: add user name to signup action
  const handleSubmit = () => {
    // Send only if all fields filled in
    if (!name) alert('Please enter your name!');
    else if (!email) alert('Please enter an email address!');
    else if (!password) alert('Please enter a password!');
    else if (!username) alert('Please confirm your password!');
    else {
      dispatch(signUp({ email, password, username }));
    }
  };

  return (
    <SafeAreaView style={FormatStyle.topContainer}>
      <View style={{ marginTop: 50, width: 350, gap: 20 }}>

        <Text style={TextStyles.title}>Welcome!</Text>
        <View style={{ marginTop: 20, gap: 5 }}>
          <Text style={TextStyles.subTitle}>Name</Text>
          <AppTextInput
            onChangeText={(text) => setName(text)}
            value={name}
            placeholder='Name'
          />
        </View>
        <View style={{ gap: 5 }}>
          <Text style={TextStyles.subTitle}>Email</Text>
          <AppTextInput
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder='Email'
          />
        </View>
        <View style={{ gap: 5 }}>
          <Text style={TextStyles.subTitle}>Username</Text>
          <AppTextInput
            onChangeText={(text) => setUsername(text)}
            value={username}
            placeholder='Username'
            secureTextEntry
          />
        </View >
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
            onPress={handleSubmit}
            style={{ paddingTop: 15, paddingBottom: 15, width: '100%' }}
            title={'Sign Up'}
            disabled={!email || !password || !name || !username}
          />
          <Text style={TextStyles.small}>Don't have an account? <Text style={{ textDecorationLine: 'underline' }}
            onPress={() => navigation.navigate(AuthStackRoutes.SIGNUP)}>Sign up!</Text></Text>

        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpPage;
