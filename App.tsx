import { StyleSheet, View, Text as RNText } from 'react-native';
import React, { useState } from 'react';
import ButtonRead from './src/components/ButtonRead';
import SwipeButton from './src/components/SwipeButton';

export default function App() {
  const [invertColors, setInvertColors] = useState(false);

  const handleSwipeButtonRelease = () => {
    setInvertColors(!invertColors);
  };

  const Text = () => {
    if (invertColors) {
      return "Tema white";
    } else {
      return "Tema dark";
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: invertColors ? 'black' : 'white' }]}>
      <ButtonRead invertColors={invertColors} />
      <SwipeButton
        buttonText={<RNText>{Text()}</RNText>}
        onRelease={handleSwipeButtonRelease}
        invertColors={invertColors}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '15%',
  },
});
