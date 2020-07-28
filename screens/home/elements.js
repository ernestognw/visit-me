import styled from 'styled-components/native';

const ButtonContainer = styled.TouchableOpacity`
  width: 100px;
  height: 40px;
  padding: 12px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.primary};
`;

const ButtonText = styled.Text`
  font-size: 15px;
  color: ${(props) => props.theme.colors.lighter};
  text-align: center;
`;

const Container = styled.View`
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.lighter};
`;

export { ButtonContainer, ButtonText, Container };
