import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { firestore } from 'firebase';
import { useAuth } from '@providers/auth';
import { Alert } from 'react-native';
import { Text, Card } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { Container, QRButton } from './elements';

const Home = () => {
  const { accesses } = useAuth();

  const { navigate } = useNavigation();

  return (
    <Container>
      <StatusBar style="auto" />
      <Card status="primary">
        <Text category="c1">Has tenido</Text>
        <Text category="h1">{accesses.length}</Text>
        <Text category="c1">visitas</Text>
      </Card>
      <QRButton
        onPress={() =>
          navigate('QRScanner', {
            onScanned: async ({ data }) => {
              const snapshot = await firestore().collection('Visits').where('id', '==', data).get();

              if (!snapshot.empty) {
                let access;
                snapshot.forEach((doc) => {
                  access = doc.data();
                });
                navigate('Access', { accessId: access.id });
              } else {
                Alert.alert('Error', 'Este QR es inválido');
              }
            },
          })
        }
      >
        Escanear QR
      </QRButton>
    </Container>
  );
};

export default Home;
