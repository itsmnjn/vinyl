import React, { useRef } from 'react';
import { StyleSheet, Image, View, Animated, PanResponder } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import Record from '../assets/record.svg';

export interface CustomRecordProps {
  width: number;
}

const CustomRecord: React.FC<CustomRecordProps> = ({ width }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x }]),
      onPanResponderRelease: (e, gestureState) => {
        const vx = gestureState.vx;

        if (Math.abs(vx) >= 1.5) {
          Animated.decay(pan, {
            velocity: { x: vx, y: 0 },
            deceleration: 0.999,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            tension: 50,
            friction: 5,
          }).start();
        }
      },
    })
  ).current;

  const albumWidth = width * 0.36; // scale comes from actual SVG
  const holeWidth = 4;

  const styles = StyleSheet.create({
    animation: {
      transform: [{ translateX: pan.x }],
    },

    record: {
      position: 'absolute',
      zIndex: 1,
      top: -width / 2,
      left: -width / 2,
      shadowColor: '#000',
      shadowOpacity: 0.4,
      shadowOffset: { width: 0, height: 3 },
    },

    albumArt: {
      position: 'absolute',
      zIndex: 2,
      top: -albumWidth / 2,
      left: -albumWidth / 2,
      width: albumWidth,
      height: albumWidth,
      borderRadius: albumWidth / 2,
    },

    hole: {
      position: 'absolute',
      zIndex: 3,
      top: -holeWidth / 2,
      left: -holeWidth / 2,
    },
  });

  return (
    <Animated.View style={styles.animation} {...panResponder.panHandlers}>
      <Record width={width} height={width} style={styles.record} />
      <Image
        source={require('../assets/color-blind.jpg')}
        style={styles.albumArt}
      />
      <Svg width={holeWidth} height={holeWidth} style={styles.hole}>
        <Circle cx="50%" cy="50%" r={holeWidth / 2} fill="#eee" />
      </Svg>
    </Animated.View>
  );
};

export default CustomRecord;
