import styled from 'styled-components/native';
import { Layout, Button } from '@ui-kitten/components';

const Container = styled(Layout)`
  flex-grow: 1;
  padding: 0 20px;
`;

const AvatarSection = styled.View`
  flex-direction: row;
  padding: 20px 0;
`;

const TextSection = styled.View`
  justify-content: center;
  margin-left: 20px;
`;

const AddButton = styled(Button)`
  margin-top: 20px;
`;

export { Container, AvatarSection, TextSection, AddButton };
