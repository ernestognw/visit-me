import styled from 'styled-components/native';
import { Layout, Button } from '@ui-kitten/components';

const Container = styled(Layout)`
  flex-grow: 1;
  padding: 0 20px;
`;

const QRButton = styled(Button)`
  margin-top: 20px;
`;

export { Container, QRButton };
