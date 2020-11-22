import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as eva from '@eva-design/eva';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { ThemeProvider } from 'styled-components/native';
import BottomBar from '@templates/bottom-bar';
import TopBar from '@templates/top-bar';
import { AppearanceProvider } from 'react-native-appearance';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import New from '@screens/new';
import Home from '@screens/home';
import Profile from '@screens/profile';
import Login from '@screens/login';
import Signup from '@screens/signup';
import RecoverPassword from '@screens/recover-password';

const { Navigator: BottomNavigator, Screen: BottomScreen } = createBottomTabNavigator();
const { Navigator: AuthStackNavigator, Screen: AuthScreen } = createStackNavigator();
const { Navigator: AppStackNavigator, Screen: AppScreen } = createStackNavigator();

// eslint-disable-next-line react/prop-types
const AppNavigation = ({ isLogged, setIsLogged }) => (
  <AppStackNavigator headerMode="screen">
    <BottomScreen
      name="Tabs"
      options={{ header: (props) => <TopBar isLogged={isLogged} {...props} /> }}
    >
      {(props) => <TabNavigation isLogged={isLogged} setIsLogged={setIsLogged} {...props} />}
    </BottomScreen>
    <BottomScreen
      options={{ header: (props) => <TopBar isLogged={isLogged} {...props} /> }}
      name="New"
      component={New}
    />
  </AppStackNavigator>
);

// eslint-disable-next-line react/prop-types
const TabNavigation = ({ isLogged, setIsLogged }) => (
  <BottomNavigator tabBar={(props) => <BottomBar isLogged={isLogged} {...props} />}>
    <BottomScreen name="Home" component={Home} />
    <BottomScreen name="Profile">{() => <Profile setIsLogged={setIsLogged} />}</BottomScreen>
  </BottomNavigator>
);

// eslint-disable-next-line react/prop-types
const AuthNavigation = ({ setIsLogged }) => (
  <AuthStackNavigator headerMode="none">
    <AuthScreen name="Login">{() => <Login setIsLogged={setIsLogged} />}</AuthScreen>
    <AuthScreen name="Signup">{() => <Signup setIsLogged={setIsLogged} />}</AuthScreen>
    <AuthScreen name="RecoverPassword">
      {() => <RecoverPassword setIsLogged={setIsLogged} />}
    </AuthScreen>
  </AuthStackNavigator>
);

const MainNavigation = () => {
  const [isLogged, setIsLogged] = useState(true);

  if (isLogged) return <AppNavigation isLogged={isLogged} setIsLogged={setIsLogged} />;

  return <AuthNavigation setIsLogged={setIsLogged} />;
};

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <NavigationContainer>
        <SafeAreaProvider>
          <AppearanceProvider>
            <ThemeProvider theme={eva.dark}>
              <ApplicationProvider {...eva} theme={eva.dark}>
                <MainNavigation />
              </ApplicationProvider>
            </ThemeProvider>
          </AppearanceProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
