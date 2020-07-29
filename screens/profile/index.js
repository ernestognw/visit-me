import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@ui-kitten/components';
import { Container } from './elements';

const Profile = () => {
  const { top } = useSafeAreaInsets();

  return (
    <Container pt={top}>
      <StatusBar style="auto" />
      <Text category="h5">Profile</Text>
    </Container>
  );
};

export default Profile;
