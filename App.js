import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as eva from '@eva-design/eva';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { ThemeProvider } from 'styled-components/native';
import BottomBar from '@templates/bottom-bar';
import { AppearanceProvider } from 'react-native-appearance';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import HomeScreen from '@screens/home';
import Profile from '@screens/profile';
import Login from '@screens/login';
import Signup from '@screens/signup';
import RecoverPassword from '@screens/recover-password';

const { Navigator: BottomNavigator, Screen } = createBottomTabNavigator();
const { Navigator: StackNavigator, Screen: AuthScreen } = createStackNavigator();

const TabNavigation = () => {
  const [isLogged, setIsLogged] = useState(true);

  return (
    <ThemeProvider theme={eva.dark}>
      <ApplicationProvider {...eva} theme={eva.dark}>
        {isLogged ? (
          <>
            <BottomNavigator tabBar={(props) => <BottomBar isLogged={isLogged} {...props} />}>
              <Screen name="Home" component={HomeScreen} />
              <Screen name="Profile">{() => <Profile setIsLogged={setIsLogged} />}</Screen>
            </BottomNavigator>
          </>
        ) : (
          <>
            <StackNavigator headerMode="none">
              <AuthScreen name="Login">{() => <Login setIsLogged={setIsLogged} />}</AuthScreen>
              <AuthScreen name="Signup">{() => <Signup setIsLogged={setIsLogged} />}</AuthScreen>
              <AuthScreen name="RecoverPassword">
                {() => <RecoverPassword setIsLogged={setIsLogged} />}
              </AuthScreen>
            </StackNavigator>
          </>
        )}
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
            <TabNavigation />
          </AppearanceProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
