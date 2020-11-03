import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import { Text, Divider, Icon, Button, Card, Modal, useTheme } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Container, Content, Row, OptionText } from './elements';

const Options = ({ setIsLogged }) => {
  const [exitModal, toggleExitModal] = useState(false);
  const theme = useTheme();
  const { top } = useSafeAreaInsets();

  return (
    <>
      <Container pt={top}>
        <StatusBar style="auto" />
        <Text category="h5">Options</Text>
        <Content>
          <TouchableOpacity onPress={() => toggleExitModal(true)}>
            <Row>
              <OptionText>Salir</OptionText>
              <Icon
                height={22}
                width={22}
                fill={theme['color-danger-600']}
                name="log-out-outline"
              />
            </Row>
          </TouchableOpacity>
          <Divider />
        </Content>
      </Container>
      <Modal visible={exitModal}>
        <Card disabled={true}>
          <Text>¿Estás seguro que deseas salir?</Text>
          <Button
            style={{ marginTop: 10 }}
            status="danger"
            appearance="outline"
            onPress={() => setIsLogged(false)}
          >
            Sí, salir.
          </Button>
          <Button style={{ marginTop: 10 }} onPress={() => toggleExitModal(false)}>
            No, quedarme.
          </Button>
        </Card>
      </Modal>
    </>
  );
};

Options.propTypes = {
  setIsLogged: PropTypes.func.isRequired,
};

export default Options;
