import styled from 'styled-components/native';
import { Layout, Text } from '@ui-kitten/components';

const Container = styled(Layout)`
  flex-grow: 1;
  padding: 20px;
  padding-bottom: 10px;
`;

const QRContainer = styled.View`
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

const Row = styled(Layout)`
  flex-direction: row;
  padding: 10px 0px;
  align-items: center;
`;

const RowText = styled(Text)`
  margin-left: 10px;
`;

export { Container, QRContainer, Row, RowText };
