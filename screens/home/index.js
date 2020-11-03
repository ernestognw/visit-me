import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Container } from './elements';

const Home = () => {
  const { top } = useSafeAreaInsets();

  return (
    <Container pt={top}>
      <StatusBar style="auto" />
      <Text category="h5">Profile</Text>
    </Container>
  );
};

export default Home;
