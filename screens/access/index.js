import React, { useEffect, useState } from 'react';
import { firestore } from 'firebase';
import PropTypes from 'prop-types';
import QRCode from 'react-native-qrcode-svg';
import moment from 'moment';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Text, Spinner, Icon, useTheme } from '@ui-kitten/components';
import { Container, QRContainer, Row, RowText } from './elements';

const AccessList = ({
  route: {
    params: { accessId },
  },
}) => {
  const [access, setAccess] = useState();
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const get = async () => {
      const snapshot = await firestore().collection('Visits').where('id', '==', accessId).get();

      let accessToSet;
      snapshot.forEach((doc) => {
        accessToSet = doc.data();
      });

      setAccess(accessToSet);
      setLoading(false);
    };

    get();
  }, [accessId]);

  return (
    <Container>
      <StatusBar style="auto" />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Text category="h5">Acceso para {access.visitorName}</Text>
          <QRContainer>
            <QRCode value={access.id} size={300} />
          </QRContainer>
          <Row>
            <Icon height={22} width={22} fill={theme['color-success-600']} name="clock-outline" />
            <View>
              <RowText category="c1">Válido desde</RowText>
              <RowText category="c2">
                {moment(access.startDate.seconds * 1000).format('lll')}
              </RowText>
            </View>
          </Row>
          <Row>
            <Icon height={22} width={22} fill={theme['color-success-600']} name="clock-outline" />
            <View>
              <RowText category="c1">Válido hasta</RowText>
              <RowText category="c2">{moment(access.endDate.seconds * 1000).format('lll')}</RowText>
            </View>
          </Row>
          <Row>
            <Icon height={22} width={22} fill={theme['color-success-600']} name="people-outline" />
            <View>
              <RowText category="c1">Se permite entrar a</RowText>
              <RowText category="c2">{access.amountPeople} personas</RowText>
            </View>
          </Row>
        </>
      )}
    </Container>
  );
};

AccessList.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      accessId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default AccessList;
