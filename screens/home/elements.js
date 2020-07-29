import styled from 'styled-components/native';
import { Layout } from '@ui-kitten/components';
import MapView from '@templates/map-view';

const Container = styled(Layout)`
  flex-grow: 1;
  padding: 20px;
  padding-top: ${(props) => (props.pt || 0) + 20}px;
`;

const BackgroundMap = styled(MapView)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

export { Container, BackgroundMap };
