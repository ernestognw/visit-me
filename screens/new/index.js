import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, Icon } from '@ui-kitten/components';
import { Container, AddButton } from './elements';

const Home = () => {
  return (
    <Container>
      <StatusBar style="auto" />
      <Text category="h5">Nuevo acceso</Text>
      <AddButton accessoryRight={(props) => <Icon {...props} name="plus-outline" />}>
        Crear acceso
      </AddButton>
    </Container>
  );
};

export default Home;
