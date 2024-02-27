import React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import RootNavigation from './src/navigation';
// import { useFonts, Raleway_400Regular, Raleway_600SemiBold, Raleway_800ExtraBold } from '@expo-google-fonts/raleway';
import { useFonts } from './src/components/fonts';

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   Raleway_400Regular,
  //   Raleway_600SemiBold,
  //   Raleway_800ExtraBold,
  // });
  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return <View />;
  }
  
  return (
    <Provider store={store}>
      <StatusBar barStyle = 'dark-content' />
      <RootNavigation />
    </Provider>
  );
}
