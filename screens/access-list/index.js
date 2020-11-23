import React from 'react';
import moment from 'moment';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@providers/auth';
import { Text, List, ListItem, Icon, Button } from '@ui-kitten/components';
import { Container } from './elements';

const AccessList = () => {
  const { accesses } = useAuth();
  const { navigate } = useNavigation();

  return (
    <>
      <Container>
        <StatusBar style="auto" />
        <Text category="h5">Accesos</Text>
      </Container>
      <List
        data={accesses}
        renderItem={({ item }) => {
          return (
            <ListItem
              title={`Visita de ${item.visitorName}`}
              description={`Válido del ${moment(item.startDate.seconds * 1000).format(
                'l'
              )} al ${moment(item.endDate.seconds * 1000).format('l')}`}
              accessoryLeft={(props) => <Icon {...props} name="person" />}
              accessoryRight={() => (
                <Button onPress={() => navigate('Access', { accessId: item.id })} size="tiny">
                  Ver
                </Button>
              )}
            />
          );
        }}
      />
    </>
  );
};

export default AccessList;
