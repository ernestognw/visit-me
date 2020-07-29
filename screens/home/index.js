import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { Text } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackgroundMap, Container } from './elements';

const Home = () => {
  const { top } = useSafeAreaInsets();

  return (
    <Container pt={top}>
      <StatusBar style="auto" />
      <BackgroundMap provider={PROVIDER_GOOGLE} />
      <Text category="h5">Home</Text>
    </Container>
  );
};

export default Home;
