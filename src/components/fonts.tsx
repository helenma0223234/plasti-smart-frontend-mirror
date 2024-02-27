import * as Font from 'expo-font';
import {   Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold } from '@expo-google-fonts/inter';
import { useEffect, useState } from 'react';

export const useFonts = (): Promise<boolean> => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    const loadFontsAsync = async () => {
      try {
        await Font.loadAsync({
          // Inter fonts from Google Fonts
          'Inter-Regular': Inter_400Regular,
          'Inter-Medium': Inter_500Medium,
          'Inter-SemiBold': Inter_600SemiBold,
          'Inter-Bold': Inter_700Bold,
          // Custom font
          'ITCCheltenhamStdBook': require('../assets/fonts/ITCCheltenhamStdBook.otf'),
        });
        setFontsLoaded(true);
      } catch (e) {
        console.error('Error loading fonts', e);
        setFontsLoaded(false);
      }
    };
        
    loadFontsAsync();
  }, []);
        
  return Promise.resolve(fontsLoaded);
};