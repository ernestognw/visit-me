import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as eva from '@eva-design/eva';
import '@config/firebase';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { ThemeProvider } from 'styled-components/native';
import BottomBar from '@templates/bottom-bar';
import { AuthProvider, useAuth } from '@providers/auth';
import TopBar from '@templates/top-bar';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import New from '@screens/new';
import Home from '@screens/home';
import Profile from '@screens/profile';
import Login from '@screens/login';
import QRScanner from '@screens/qr-scanner';
import Access from '@screens/access';
import Signup from '@screens/signup';
import AccessList from '@screens/access-list';
import RecoverPassword from '@screens/recover-password';

const { Navigator: BottomNavigator, Screen: BottomScreen } = createBottomTabNavigator();
const { Navigator: AuthStackNavigator, Screen: AuthScreen } = createStackNavigator();
const { Navigator: AppStackNavigator, Screen: AppScreen } = createStackNavigator();

const TabNavigation = () => (
  <BottomNavigator tabBar={(props) => <BottomBar {...props} />}>
    <BottomScreen name="Home" component={Home} />
    <BottomScreen name="AccessList" component={AccessList} />
    <BottomScreen name="Profile" component={Profile} />
  </BottomNavigator>
);

const AppNavigation = () => (
  <AppStackNavigator headerMode="screen">
    <AppScreen name="Tabs" options={{ header: TopBar }} component={TabNavigation} />
    <AppScreen options={{ header: TopBar }} name="New" component={New} />
    <AppScreen options={{ header: TopBar }} name="Access" component={Access} />
    <AppScreen name="QRScanner" options={{ header: TopBar }} component={QRScanner} />
  </AppStackNavigator>
);

const AuthNavigation = () => (
  <AuthStackNavigator headerMode="none">
    <AuthScreen name="Login" component={Login} />
    <AuthScreen name="Signup" component={Signup} />
    <AuthScreen name="RecoverPassword" component={RecoverPassword} />
  </AuthStackNavigator>
);

const MainNavigation = () => {
  const { isLogged, loading } = useAuth();

  if (loading) return <></>;

  if (isLogged) return <AppNavigation />;

  return <AuthNavigation />;
};

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <NavigationContainer>
        <SafeAreaProvider>
          <ThemeProvider theme={eva.dark}>
            <ApplicationProvider {...eva} theme={eva.dark}>
              <AuthProvider>
                <MainNavigation />
              </AuthProvider>
            </ApplicationProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
