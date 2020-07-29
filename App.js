import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as eva from '@eva-design/eva';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { ThemeProvider } from 'styled-components/native';
import BottomBar from '@templates/bottom-bar';
import { AppearanceProvider } from 'react-native-appearance';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import ColorModeProvider, { useColorMode } from '@providers/color-mode';
import HomeScreen from '@screens/home';
import OptionsScreen from '@screens/options';
import Profile from '@screens/profile';

const { Navigator, Screen } = createBottomTabNavigator();

const TabNavigation = () => {
  const { colorMode } = useColorMode();

  return (
    <ThemeProvider theme={eva[colorMode]}>
      <ApplicationProvider {...eva} theme={eva[colorMode]}>
        <Navigator tabBar={(props) => <BottomBar {...props} />}>
          <Screen name="Home" component={HomeScreen} />
          <Screen name="Options" component={OptionsScreen} />
          <Screen name="Profile" component={Profile} />
        </Navigator>
      </ApplicationProvider>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <NavigationContainer>
        <SafeAreaProvider>
          <AppearanceProvider>
            <ColorModeProvider>
              <TabNavigation />
            </ColorModeProvider>
          </AppearanceProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
