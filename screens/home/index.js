import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Avatar, Text, Card } from '@ui-kitten/components';
import { Container, AvatarSection, TextSection } from './elements';

const Home = () => {
  return (
    <Container>
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
        <Text category="c1">Has tenido</Text>
        <Text category="h1">6</Text>
        <Text category="c1">visitas este mes</Text>
      </Card>
    </Container>
  );
};

export default Home;
