import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Appearance } from 'react-native-appearance';
import AsyncStorage from '@react-native-community/async-storage';

const ColorModeContext = React.createContext({});

const ColorModeProvider = ({ children }) => {
  const [colorMode, setColorMode] = useState(Appearance.getColorScheme());

  const toggleColorMode = async (colorModeToSet) => {
    await AsyncStorage.setItem('colorMode', colorModeToSet);
    setColorMode(colorModeToSet);
  };

  useEffect(() => {
    // On  every device color mode change, change the app color mode
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorMode(colorScheme);
    });

    const getTheme = async () => {
      const previouslySetColorMode = await AsyncStorage.getItem('colorMode');
      if (previouslySetColorMode) {
        setColorMode(previouslySetColorMode);
      } else {
        // First time, use device color schema
        const deviceColorMode = Appearance.getColorScheme();
        setColorMode(deviceColorMode);
      }
    };

    getTheme();

    return subscription.remove;
  }, []);

  return (
    <ColorModeContext.Provider
      value={{
        colorMode,
        toggleColorMode,
      }}
    >
      {children}
    </ColorModeContext.Provider>
  );
};

ColorModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useColorMode = () => useContext(ColorModeContext);

export { useColorMode };
export default ColorModeProvider;
