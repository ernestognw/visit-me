import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Avatar, Text, Card, Icon } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Container, AvatarSection, TextSection, AddButton } from './elements';

const Home = () => {
  const { top } = useSafeAreaInsets();

  return (
    <Container pt={top}>
      <StatusBar style="auto" />
      <AvatarSection>
        <Avatar
          size="giant"
          source={{
            uri:
              'https://blockdemy-id.s3.us-east-2.amazonaws.com/users/5e67297b5de02d85cfa4b7f1/1597983282841..jpg',
          }}
        />
        <TextSection>
          <Text category="c2">Bienvenido</Text>
          <Text category="h6">Ernesto García</Text>
        </TextSection>
      </AvatarSection>
      <Card status="primary">
        <Text category="c1">You&apos;ve had</Text>
        <Text category="h1">6</Text>
        <Text category="c1">visits las month</Text>
      </Card>
      <AddButton accessoryRight={(props) => <Icon {...props} name="plus-outline" />}>
        Crear acceso
      </AddButton>
    </Container>
  );
};

export default Home;
