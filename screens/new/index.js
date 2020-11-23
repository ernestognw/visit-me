import React, { useState } from 'react';
import shortid from 'shortid';
import firebase from 'firebase';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@providers/auth';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Text,
  Icon,
  Input,
  Spinner,
  RangeDatepicker,
  Select,
  SelectItem,
  IndexPath,
} from '@ui-kitten/components';
import { Container, AddButton } from './elements';

const Home = () => {
  const [submittedTry, setSubmittedTry] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { navigate, goBack } = useNavigation();

  const { user, reloadAccesses } = useAuth();
  const [form, setForm] = useState({
    visitor: '',
    dateRange: {},
    amountPeople: new IndexPath(0),
  });

  const submit = async () => {
    if (
      !form.visitor ||
      !form.dateRange.endDate ||
      !form.dateRange.startDate ||
      !form.amountPeople.row
    ) {
      setSubmittedTry(true);
      return;
    }

    setSubmitting(true);
    const id = Date.now().toString(); // Que verguenza nmms
    firebase
      .firestore()
      .collection('Visits')
      .doc(id)
      .set({
        visitorName: form.visitor,
        suburb: user.suburb,
        visitTo: user.uid,
        startDate: form.dateRange.startDate,
        endDate: form.dateRange.endDate,
        amountPeople: form.amountPeople.row + 1,
        id,
      });
    setSubmitting(false);
    goBack();
    navigate('Access', { accessId: id });
    reloadAccesses();
  };

  return (
    <Container>
      <StatusBar style="auto" />
      <Text category="h5">Nuevo acceso</Text>
      <Input
        style={{ marginTop: 10, marginBottom: 10 }}
        value={form.visitor}
        label="¿Quién te visita?"
        placeholder="Ingresa el nombre de tu visitante"
        status={submittedTry && !form.visitor && 'warning'}
        caption={submittedTry && !form.visitor && 'El nombre de tu visita es necesario'}
        captionIcon={(props) =>
          submittedTry && !form.visitor && <Icon {...props} name="alert-circle-outline" />
        }
        accessoryLeft={(props) => <Icon {...props} name="person-outline" />}
        onChangeText={(nextValue) => setForm({ ...form, visitor: nextValue })}
      />
      <RangeDatepicker
        style={{ marginTop: 10, marginBottom: 10 }}
        range={form.dateRange}
        label="¿Entre qué fechas es válida tu visita?"
        placeholder="Validez de la visita"
        status={submittedTry && (!form.dateRange.endDate || !form.dateRange.startDate) && 'warning'}
        caption={
          submittedTry &&
          (!form.dateRange.endDate || !form.dateRange.startDate) &&
          'El tiempo de validez del acceso es necesario'
        }
        captionIcon={(props) =>
          submittedTry &&
          (!form.dateRange.endDate || !form.dateRange.startDate) && (
            <Icon {...props} name="alert-circle-outline" />
          )
        }
        accessoryLeft={(props) => <Icon {...props} name="calendar-outline" />}
        onSelect={(dateRange) => setForm({ ...form, dateRange })}
      />
      <Select
        label="Cantidad de gente"
        placeholder="¿Cuántas personas entrarán?"
        value={`${form.amountPeople.row + 1} persona(s)`}
        selectedIndex={form.amountPeople}
        caption={submittedTry && !form.amountPeople && ''}
        status={submittedTry && !form.amountPeople && 'warning'}
        captionIcon={(props) =>
          submittedTry && !form.amountPeople && <Icon {...props} name="alert-circle-outline" />
        }
        accessoryLeft={(props) => <Icon {...props} name="home-outline" />}
        onSelect={(amountPeople) => setForm({ ...form, amountPeople })}
      >
        {new Array(20).fill().map((_, option) => (
          <SelectItem key={shortid.generate()} title={option + 1} />
        ))}
      </Select>
      <AddButton
        accessoryLeft={
          submitting
            ? (props) => (
                <View {...props}>
                  <Spinner size="small" />
                </View>
              )
            : undefined
        }
        disabled={submitting}
        onPress={submit}
        accessoryRight={(props) => <Icon {...props} name="plus-outline" />}
      >
        Crear acceso
      </AddButton>
    </Container>
  );
};

export default Home;
