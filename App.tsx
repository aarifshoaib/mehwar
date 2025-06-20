

import { StatusBar, StyleSheet, useColorScheme, View, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthContextProvider from './src/auth/redux/auth.context';
import AppMain from './AppMain';
import IconTest from './src/shared/IconTest';
import PickerTest from './src/shared/PickerTest';
import FontTest from './src/shared/FontTest';
import AppWithFontTest from './src/shared/AppWithFontTest';
import React, { useCallback, useContext, useEffect, useState, useRef } from 'react';
import { ToastProvider } from 'react-native-toast-notifications'
import SplashScreen from './src/shared/screens/splash.screen';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthContext } from './src/auth/redux/auth.context';
import AppSharedContextProvider, { AppSharedContext } from './src/shared/redux/app-shared.context';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useFonts } from './src/hooks/useFonts';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [appIsReady, setAppIsReady] = useState(false);
  const [mode, setMode] = useState('dark');
  const appSharedCtx = useContext(AppSharedContext);
  const authContext = useContext(AuthContext);


  const [fontsLoaded, fontError] = useFonts({
    'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Thin': require('./assets/fonts/Poppins-Thin.ttf'),
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'AdportsBold': require('./assets/fonts/ADPortsGroup-Bold.otf'),
    'AdportsRegular': require('./assets/fonts/ADPortsGroup-Regular.otf'),
    'AdportsThin': require('./assets/fonts/ADPortsGroup-Light.otf'),

  });

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      //await Splash.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setTimeout(() => {
          setAppIsReady(true);
          setMode('dark');
        }, 3000);
      }
    }

    prepare();
  }, [appIsReady]);

  return (

    <AuthContextProvider>
      <ToastProvider
        successColor="#78B16A"
        dangerColor="#BF5858"
        swipeEnabled={true}
        warningColor="#D99766"
        placement="top"
        duration={4000}
        animationType="slide-in"
      >
        <AppSharedContextProvider>
          <NavigationContainer>
            <GestureHandlerRootView style={{ flex: 1, }}>
                <StatusBar backgroundColor={(mode) == 'dark' ? 'light' : 'dark'} />
                {!appIsReady && <SplashScreen onLayoutRootView={onLayoutRootView} />}
                {fontsLoaded && appIsReady && (
                  <>
                  <AppMain />
                  </>
                )}
            </GestureHandlerRootView>
          </NavigationContainer>
        </AppSharedContextProvider>
      </ToastProvider>
    </AuthContextProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
