import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { emailPattern } from '@config/constants';
import KeyboardAwareScroll from '@templates/keyboard-aware-scroll';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { Icon, Button } from '@ui-kitten/components';
import { Content, Header, Title, Subtitle, Input, BackButton } from './elements';

const Login = () => {
  const { top } = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [submittedTry, setSubmittedTry] = useState(false);
  const [isEmailError, setIsEmailError] = useState(true);
  const { goBack, navigate } = useNavigation();

  useEffect(() => {
    setIsEmailError(!emailPattern.test(email));
  }, [email]);

  const submit = () => {
    if (isEmailError) {
      setSubmittedTry(true);
      return;
    }

    Alert.alert('Correo de recuperación enviado');

    // TODO(jabdo): Replace with recover password logic here
    navigate('Login');
  };

  return (
    <KeyboardAwareScroll>
      <StatusBar style="auto" />
      <Header pt={top} level="2">
        <Title category="h5">¿Olvidaste tu contraseña?</Title>
        <Subtitle category="h6">
          Provee un correo electrónico, y si está en nuestra base de datos, te enviaremos un correo
          de recuperación
        </Subtitle>
      </Header>
      <Content>
        <Input
          autoCapitalize="none"
          autoCompleteType="email"
          value={email}
          label="Correo"
          placeholder="Ingresa tu correo electrónico"
          caption={submittedTry && isEmailError && 'Ingresa un correo electrónico válido'}
          status={submittedTry && isEmailError && 'warning'}
          captionIcon={(props) =>
            submittedTry && isEmailError && <Icon {...props} name="alert-circle-outline" />
          }
          accessoryLeft={(props) => <Icon {...props} name="person-outline" />}
          onChangeText={setEmail}
        />
        <Button
          style={{ marginTop: 10 }}
          accessoryRight={(props) => <Icon {...props} name="arrowhead-right-outline" />}
          onPress={submit}
        >
          Recuperar contraseña
        </Button>
        <BackButton
          accessoryLeft={(props) => <Icon {...props} name="arrow-back-outline" />}
          appearance="outline"
          onPress={goBack}
        >
          Regresar
        </BackButton>
        <Button appearance="ghost" onPress={() => navigate('Signup')}>
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
