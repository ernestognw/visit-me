import React from 'react';
import PropTypes from 'prop-types';
import { TopNavigation, TopNavigationAction, Icon, Layout } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TopBar = ({ navigation, previous, isLogged }) => {
  const { top } = useSafeAreaInsets();

  if (!isLogged) return <></>;

  return (
    <Layout
      style={{
        paddingTop: top,
      }}
    >
      <TopNavigation
        alignment="center"
        title="Visit Me"
        subtitle="Administrador de visitas"
        accessoryLeft={
          previous
            ? () => (
                <TopNavigationAction
                  onPress={navigation.goBack}
                  icon={(props) => <Icon {...props} name="arrow-back" />}
                />
              )
            : undefined
        }
        accessoryRight={() => (
          <TopNavigationAction
            onPress={() => navigation.navigate('New')}
            icon={(props) => <Icon {...props} name="plus-outline" />}
          />
        )}
      />
    </Layout>
  );
};

TopBar.defaultProps = {
  previous: undefined,
};

TopBar.propTypes = {
  navigation: PropTypes.object.isRequired,
  previous: PropTypes.bool,
  isLogged: PropTypes.bool.isRequired,
};

export default TopBar;
