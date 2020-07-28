import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text } from 'react-native';
import { Container, ButtonContainer, ButtonText } from './elements';

const Options = () => {
  return (
    <Container>
      <StatusBar style="auto" />
      <Text>Options</Text>
      <ButtonContainer onPress={() => alert('Hi!')}>
        <ButtonText>Button</ButtonText>
      </ButtonContainer>
    </Container>
  );
};

export default Options;
