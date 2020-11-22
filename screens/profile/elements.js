import styled from 'styled-components/native';
import { Text, Layout } from '@ui-kitten/components';

const Container = styled(Layout)`
  flex-grow: 1;
  padding: 20px;
  padding-top: ${(props) => (props.pt || 0) + 20}px;
`;

const Content = styled(Layout)`
  margin-top: 20px;
`;

const Row = styled(Layout)`
  flex-direction: row;
  padding: 20px 0px;
  align-items: center;
`;

const OptionText = styled(Text)`
  margin-right: auto;
`;

export { Container, Content, Row, OptionText };
