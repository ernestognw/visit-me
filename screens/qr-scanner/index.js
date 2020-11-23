import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { View } from 'react-native';
import { Text, Icon } from '@ui-kitten/components';
import {
  Container,
  TitleContainer,
  CloseButton,
  PermissionsContainer,
  RequestAccessButton,
  Scanner,
} from './elements';

const QRScannerModal = ({
  navigation,
  route: {
    params: { onScanned = () => {} },
  },
}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const requestPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  const handleBarCodeScanned = (scan) => {
    setScanned(true);
    onScanned(scan);
    navigation.goBack();
  };

  return (
    <>
      <Container>
        <TitleContainer>
          <View>
            <Text category="h5">Escanea el QR</Text>
            <Text appearance="hint">Utiliza el código del acceso</Text>
          </View>
          <CloseButton
            appearance="ghost"
            status="danger"
            onPress={() => navigation.goBack()}
            accessoryLeft={(props) => <Icon {...props} name="close-outline" />}
          />
        </TitleContainer>
      </Container>
      {hasPermission === null && (
        <PermissionsContainer>
          <Text>Requesting for camera permission</Text>
        </PermissionsContainer>
      )}
      {hasPermission === false && (
        <PermissionsContainer>
          <Text>No access to camera</Text>
          <RequestAccessButton onPress={requestPermissions}>Give access</RequestAccessButton>
        </PermissionsContainer>
      )}
      {hasPermission && <Scanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} />}
    </>
  );
};

QRScannerModal.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      onScanned: PropTypes.func,
    }),
  }).isRequired,
};

export default QRScannerModal;
