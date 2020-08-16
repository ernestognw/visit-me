import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableWithoutFeedback } from 'react-native';
import { emailPattern } from '@config/constants';
import { Icon, Button } from '@ui-kitten/components';
import { Content, Header, Title, Subtitle, Input, SigninButton } from './elements';

const Login = ({ setIsLogged }) => {
  const { top } = useSafeAreaInsets();
  const [form, setForm] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [submittedTry, setSubmittedTry] = useState(false);
  const [isEmailError, setIsEmailError] = useState(true);
  const [isPasswordError, setIsPasswordError] = useState(true);

  useEffect(() => {
    setSubmittedTry(false);
  }, [form]);

  useEffect(() => {
    setIsEmailError(emailPattern.test(form.email));
  }, [form.email]);

  useEffect(() => {
    setIsPasswordError(!form.password);
  }, [form.password]);

  const submit = () => {
    if (isEmailError || isPasswordError) {
      setSubmittedTry(true);
      return;
    }

    // TODO(jabdo): Replace with actual login here
    setIsLogged(true);
  };

  return (
    <>
      <StatusBar style="auto" />
      <Header pt={top} level="2">
        <Title category="h3">Bienvenido</Title>
        <Subtitle category="h6">Inicia sesión</Subtitle>
      </Header>
      <Content>
        <Input
          value={form.email}
          label="Correo"
          placeholder="Ingresa tu correo electrónico"
          caption={submittedTry && isEmailError && 'Ingresa un correo electrónico válido'}
          status={submittedTry && isEmailError && 'warning'}
          captionIcon={(props) =>
            submittedTry && isEmailError && <Icon {...props} name="alert-circle-outline" />
          }
          accessoryLeft={(props) => <Icon {...props} name="person-outline" />}
          onChangeText={(nextValue) => setForm({ ...form, username: nextValue })}
        />
        <Input
          value={form.password}
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          status={submittedTry && isPasswordError && 'warning'}
          accessoryRight={(props) => (
            <TouchableWithoutFeedback onPress={() => setSecureTextEntry(!secureTextEntry)}>
              <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
            </TouchableWithoutFeedback>
          )}
          accessoryLeft={(props) => <Icon {...props} name="unlock-outline" />}
          secureTextEntry={secureTextEntry}
          onChangeText={(nextValue) => setForm({ ...form, password: nextValue })}
        />
        <Button appearance="ghost" size="tiny">
          ¿Olvidaste tu contraseña?
        </Button>
        <SigninButton onPress={submit}>Iniciar sesión</SigninButton>
        <Button appearance="ghost">¿No tienes cuenta? Crea una.</Button>
      </Content>
    </>
  );
};

Login.propTypes = {
  setIsLogged: PropTypes.func.isRequired,
};

export default Login;