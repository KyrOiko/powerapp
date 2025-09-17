import { Dimensions, Pressable, StyleSheet, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function AnimatedRow() {
  const translateX = useSharedValue(0);
  const gesture = Gesture.Pan()
    .onUpdate(event => {
      translateX.value = Math.min(0, event.translationX);
    })
    .onEnd(event => {
      if (event.translationX < -0.1 * SCREEN_WIDTH) {
        translateX.value = withSpring(-0.1 * SCREEN_WIDTH);
      } else {
        translateX.value = withSpring(0);
      }
    });
  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
  return (
    <View style={styles.container}>
      <View style={styles.hidden}>
        <Pressable
          style={styles.hiddenButton}
          onPress={() => {
            console.log('delete');
          }}
        >
          <Ionicons name="trash" size={24} color="white" />
        </Pressable>
      </View>

      <GestureDetector gesture={gesture}>
        <Animated.View style={animatedViewStyle}>
          <View style={styles.animatedRowContainer}>
            <ThemedText type="smallSubtitle">Animated Row</ThemedText>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'gray',
    overflow: 'hidden',
  },
  animatedRowContainer: {
    backgroundColor: 'red',
    height: 50,
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hidden: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  hiddenText: { color: '#fff', fontSize: 18 },
  hiddenButton: {
    height: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
});
