import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { signIn } from '../../../redux/slices/authSlice';
import AppTextInput from '../../../components/AppTextInput';
import FormatStyle from '../../../utils/FormatStyle';
import TextStyles from '../../../utils/TextStyles';
import OnboardingProgress from 'components/OnboardingProgress';
import { AuthStackRoutes } from 'navigation/routeTypes';
import { useNavigation } from '@react-navigation/native';
import NavType from 'utils/NavType';
import Button from 'components/Button';
// import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import Penguin from '../../../assets/Group.svg';



const OnboardingPage = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [step, setStep] = useState(0);

  const handleNext = (steps: number) => {
    setStep(step + 1);
  };


  const handleSubmit = () => {
    // Send only if all fields filled in
    if (!email) alert('Please enter an email address!');
    else if (!password) alert('Please enter a password!');
    else {
      dispatch(signIn({ email, password }));
    }
  };
  const navigation = useNavigation<NavType>();

  return (

    <SafeAreaView style={FormatStyle.container}>
      <View style={{
        top: 0,
        backgroundColor: 'blue',
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
        alignContent: 'center',
      }}>
        <View style={{ flex: 1, flexDirection: 'row', gap: 10, position: 'absolute' }}>
          <TouchableOpacity
            onPress={() => step > 0 && setStep(step - 1)}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <OnboardingProgress steps={2} currentStep={step}></OnboardingProgress>
        </View>

        {step == 0 &&
          <View style={{ backgroundColor: 'red', marginTop: 100 }}>
            <Text style={{ ...TextStyles.subTitle, marginTop: 40, textAlign: 'center' }}>
              EDIT MASCOT
            </Text>
          </View>

        }
        {step == 1 &&
          <View style={{ backgroundColor: 'red', marginTop: 100 }}>
            <View style={{ backgroundColor: 'green', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Penguin
                style={{
                  width: 0,
                  height: 0,
                }}
              />
              <Text style={TextStyles.subTitle}>
                What are your goals?
              </Text>
            </View>
          </View>
        }

        <View style={{ position: 'absolute', bottom: 0, marginBottom: 50, backgroundColor: 'red', flex: 1 }}>
          {step < 2 &&
            <>
              <Button
                onPress={() => handleNext(1)}
                title={'Continue'}
                fullWidth
              />
              <Button
                onPress={() => navigation.navigate(AuthStackRoutes.SIGNUP)}
                title={'Change Mascot'}
                fullWidth
                inverted
              />
            </>
          }
          {step == 2 &&
            <Button
              onPress={() => handleNext(1)}
              title={'Submit'}
              fullWidth
            />
          }
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingPage;
