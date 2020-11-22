import React from 'react';
import PropTypes from 'prop-types';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BottomTabBar = ({ navigation, state, isLogged }) => {
  const { bottom } = useSafeAreaInsets();

  if (!isLogged) return <></>;

  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
      style={{
        paddingBottom: bottom,
        paddingTop: 20,
      }}
    >
      <BottomNavigationTab icon={(props) => <Icon {...props} name="home-outline" />} />
      <BottomNavigationTab icon={(props) => <Icon {...props} name="person-outline" />} />
    </BottomNavigation>
  );
};

BottomTabBar.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  isLogged: PropTypes.bool.isRequired,
};

export default BottomTabBar;
