import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import KeyboardAwareScroll from '@templates/keyboard-aware-scroll';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { emailPattern } from '@config/constants';
import { Icon, Button } from '@ui-kitten/components';
import { Content, Header, Title, Subtitle, Input, SigninButton } from './elements';

const Login = ({ setIsLogged }) => {
  const { top } = useSafeAreaInsets();
  const { navigate } = useNavigation();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [submittedTry, setSubmittedTry] = useState(false);
  const [isEmailError, setIsEmailError] = useState(true);
  const [isPasswordError, setIsPasswordError] = useState(true);

  useEffect(() => {
    setIsEmailError(!emailPattern.test(form.email));
  }, [form.email]);

  useEffect(() => {
    setIsPasswordError(!form.password);
  }, [form.password]);

  const submit = () => {
    if (isEmailError || isPasswordError) {
      setSubmittedTry(true);
      return;
    }

    setIsLogged(true);
  };

  return (
    <KeyboardAwareScroll>
      <StatusBar style="auto" />
      <Header pt={top} level="2">
        <Title category="h3">Bienvenido</Title>
        <Subtitle category="h6">Inicia sesión</Subtitle>
      </Header>
      <Content>
        <Input
          autoCapitalize="none"
          autoCompleteType="email"
          value={form.email}
          label="Correo"
          placeholder="Ingresa tu correo electrónico"
          caption={submittedTry && isEmailError && 'Ingresa un correo electrónico válido'}
          status={submittedTry && isEmailError && 'warning'}
          captionIcon={(props) =>
            submittedTry && isEmailError && <Icon {...props} name="alert-circle-outline" />
          }
          accessoryLeft={(props) => <Icon {...props} name="person-outline" />}
          onChangeText={(nextValue) => setForm({ ...form, email: nextValue })}
        />
        <Input
          autoCapitalize="none"
          autoCompleteType="password"
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
        <Button onPress={() => navigate('RecoverPassword')} appearance="ghost" size="tiny">
          ¿Olvidaste tu contraseña?
        </Button>
        <SigninButton
          accessoryRight={(props) => <Icon {...props} name="arrowhead-right-outline" />}
          onPress={submit}
        >
          Iniciar sesión
        </SigninButton>
        <Button onPress={() => navigate('Signup')} appearance="ghost">
          ¿No tienes cuenta? Crea una.
        </Button>
      </Content>
    </KeyboardAwareScroll>
  );
};

Login.propTypes = {
  setIsLogged: PropTypes.func.isRequired,
};

export default Login;
