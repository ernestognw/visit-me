import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useColorMode } from '@providers/color-mode';
import { Text, Divider, Toggle } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Container, Content, Row, OptionText } from './elements';

const Options = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { top } = useSafeAreaInsets();

  return (
    <Container pt={top}>
      <StatusBar style="auto" />
      <Text category="h5">Options</Text>
      <Content>
        <Row>
          <OptionText>Dark Mode</OptionText>
          <Toggle
            checked={colorMode === 'dark'}
            onChange={(checked) => toggleColorMode(checked ? 'dark' : 'light')}
          />
        </Row>
        <Divider />
      </Content>
    </Container>
  );
};

export default Options;
