import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { emailPattern } from '@config/constants';
import KeyboardAwareScroll from '@templates/keyboard-aware-scroll';
import { Icon, Button, Select, SelectItem, Spinner } from '@ui-kitten/components';
import { Content, Header, Title, Subtitle, Input, SigninButton } from './elements';

const options = ['Fraccionamiento 1', 'Fraccionamiento 2', 'Fraccionamiento 3'];

const Signup = () => {
  const { top } = useSafeAreaInsets();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    suburb: '',
    password: '',
    confirmPassword: '',
  });
  const [submittedTry, setSubmittedTry] = useState(false);
  const [isEmailError, setIsEmailError] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [noPasswordError, setNoPasswordError] = useState(true);
  const [differentPasswordsError, setDifferentPasswordsError] = useState(true);
  const { navigate } = useNavigation();

  useEffect(() => {
    setIsEmailError(!emailPattern.test(form.email));
  }, [form.email]);

  useEffect(() => {
    setNoPasswordError(!form.password);
  }, [form.password]);

  useEffect(() => {
    setDifferentPasswordsError(form.password !== form.confirmPassword);
  }, [form.confirmPassword, form.password]);

  const submit = async () => {
    if (isEmailError || noPasswordError || differentPasswordsError) {
      setSubmittedTry(true);
      return;
    }
    if (isEmailError || noPasswordError || differentPasswordsError) {
      setSubmittedTry(true);
      return;
    }
    setSubmitting(true);
    const newUser = { ...form, suburb: options[form.suburb.row] };
    delete newUser.confirmPassword;

    const snapshot = await firebase
      .firestore()
      .collection('Users')
      .where('email', '==', newUser.email)
      .get();

    if (snapshot.empty) {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password);

      firebase.firestore().collection('Users').doc(user.uid).set({
        email: newUser.email,
        uid: user.uid,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        suburb: newUser.suburb,
      });
    }
  };

  return (
    <KeyboardAwareScroll>
      <StatusBar style="auto" />
      <Header pt={top} level="2">
        <Title category="h3">¿No tienes cuenta?</Title>
        <Subtitle category="h6">Crea una</Subtitle>
      </Header>
      <Content>
        <Input
          autoCapitalize="none"
          value={form.email}
          autoCompleteType="email"
          label="Correo"
          placeholder="Ingresa tu correo electrónico"
          caption={submittedTry && isEmailError && 'Ingresa un correo electrónico válido'}
          captionIcon={(props) =>
            submittedTry && isEmailError && <Icon {...props} name="alert-circle-outline" />
          }
          status={submittedTry && isEmailError && 'warning'}
          accessoryLeft={(props) => <Icon {...props} name="person-outline" />}
          onChangeText={(nextValue) => setForm({ ...form, email: nextValue })}
        />
        <Input
          autoCapitalize="words"
          autoCompleteType="name"
          value={form.firstName}
          label="Nombre"
          placeholder="Ingresa tu nombre"
          caption={submittedTry && !form.firstName && 'Ingresa un nombre válido'}
          status={submittedTry && !form.firstName && 'warning'}
          captionIcon={(props) =>
            submittedTry && !form.firstName && <Icon {...props} name="alert-circle-outline" />
          }
          accessoryLeft={(props) => <Icon {...props} name="menu-outline" />}
          onChangeText={(nextValue) => setForm({ ...form, firstName: nextValue })}
        />
        <Input
          autoCapitalize="words"
          autoCompleteType="name"
          value={form.lastName}
          label="Apellidos"
          placeholder="Ingresa tu apellido"
          caption={submittedTry && !form.lastName && 'Ingresa un apellido válido'}
          status={submittedTry && !form.lastName && 'warning'}
          captionIcon={(props) =>
            submittedTry && !form.lastName && <Icon {...props} name="alert-circle-outline" />
          }
          accessoryLeft={(props) => <Icon {...props} name="menu-outline" />}
          onChangeText={(nextValue) => setForm({ ...form, lastName: nextValue })}
        />
        <Select
          label="Fraccionamiento"
          placeholder="Selecciona tu fraccionamiento"
          selectedIndex={form.suburb}
          caption={submittedTry && !form.suburb && 'Selecciona un fraccionamiento'}
          status={submittedTry && !form.suburb && 'warning'}
          captionIcon={(props) =>
            submittedTry && !form.suburb && <Icon {...props} name="alert-circle-outline" />
          }
          accessoryLeft={(props) => <Icon {...props} name="home-outline" />}
          onSelect={(suburb) => setForm({ ...form, suburb })}
        >
          {options.map((option) => (
            <SelectItem key={option} title={option} />
          ))}
        </Select>
        <Input
          autoCapitalize="none"
          autoCompleteType="password"
          value={form.password}
          label="Contraseña"
          secureTextEntry
          placeholder="Ingresa tu contraseña"
          status={submittedTry && noPasswordError && 'warning'}
          caption={submittedTry && noPasswordError && 'Se requiere contraseña'}
          captionIcon={(props) =>
            submittedTry && noPasswordError && <Icon {...props} name="alert-circle-outline" />
          }
          accessoryLeft={(props) => <Icon {...props} name="unlock-outline" />}
          onChangeText={(nextValue) => setForm({ ...form, password: nextValue })}
        />
        <Input
          autoCapitalize="none"
          autoCompleteType="password"
          value={form.confirmPassword}
          secureTextEntry
          label="Confirmar contraseña"
          placeholder="Repite tu contraseña"
          status={submittedTry && differentPasswordsError && 'danger'}
          caption={submittedTry && differentPasswordsError && 'Las contraseñas no coinciden'}
          captionIcon={(props) =>
            submittedTry &&
            differentPasswordsError && <Icon {...props} name="alert-circle-outline" />
          }
          accessoryLeft={(props) => <Icon {...props} name="unlock-outline" />}
          onChangeText={(nextValue) => setForm({ ...form, confirmPassword: nextValue })}
        />
        <SigninButton
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
        >
          Regístrate
        </SigninButton>
        <Button appearance="ghost" onPress={() => navigate('Login')}>
          ¿Ya tienes cuenta? Ingresa.
        </Button>
      </Content>
    </KeyboardAwareScroll>
  );
};

export default Signup;
