import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text } from 'react-native';
import { Container, ButtonContainer, ButtonText } from './elements';

const Home = () => {
  return (
    <Container>
      <StatusBar style="auto" />
      <Text>Home</Text>
      <ButtonContainer onPress={() => alert('Hi!')}>
        <ButtonText>Button</ButtonText>
      </ButtonContainer>
    </Container>
  );
};

export default Home;
