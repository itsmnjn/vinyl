import { Dimensions } from 'react-native';

export const getWidthFromMargin = (margin: number): number => {
  const screenWidth = Math.round(Dimensions.get('window').width);
  return screenWidth - margin * 2;
};
