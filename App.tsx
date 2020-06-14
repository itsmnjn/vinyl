import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  YellowBox,
  StatusBar,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { getWidthFromMargin } from './util';
import CustomRecord from './components/CustomRecord';

YellowBox.ignoreWarnings(['.811']); // get rid of annoying ".811%" warning

const App: React.FC<{}> = () => {
  const margin = 48;
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <CustomRecord width={getWidthFromMargin(margin)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
