import React, { useState } from 'react';
import firebase from 'firebase';
import { useAuth } from '@providers/auth';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import { Avatar, Text, Divider, Icon, Button, Card, Modal, useTheme } from '@ui-kitten/components';
import { Container, Content, Row, OptionText, AvatarSection, TextSection } from './elements';

const Options = () => {
  const [exitModal, toggleExitModal] = useState(false);
  const theme = useTheme();

  const { user } = useAuth();

  return (
    <>
      <Container>
        <StatusBar style="auto" />
        <AvatarSection>
          <Avatar
            size="giant"
            source={{
              uri:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgA1uaZBxqEjCa0JW4PR3LnWKfRJMDCdVivg&usqp=CAU',
            }}
          />
          <TextSection>
            <Text category="c2">Bienvenido</Text>
            <Text category="h6">
              {user.firstName} {user.lastName}
            </Text>
          </TextSection>
        </AvatarSection>
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
            onPress={() => firebase.auth().signOut()}
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

export default Options;
