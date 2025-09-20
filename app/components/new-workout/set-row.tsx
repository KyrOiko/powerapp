import { Dimensions, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { CreateTemplateSet } from '@/models/dto/create_set_template';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function SetRow({
  index,
  set,
  onLowerChange,
  onUpperChange,
  onDelete,
  onDuplicateSet,
}: {
  index: number;
  set: CreateTemplateSet;
  onLowerChange: (text: string) => void;
  onUpperChange: (text: string) => void;
  onDelete?: () => void;
  onDuplicateSet?: () => void;
}) {
  const translateX = useSharedValue(0);

  const gesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-10, 10])
    .onUpdate(event => {
      translateX.value = Math.min(0, event.translationX);
    })
    .onEnd(event => {
      if (event.translationX < -0.1 * SCREEN_WIDTH) {
        translateX.value = withSpring(-0.3 * SCREEN_WIDTH);
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
      {/* Hidden delete button */}
      <View style={styles.hidden}>
        <Pressable
          style={[styles.hiddenButton, { borderColor: 'white' }]}
          onPress={() => {
            onDuplicateSet?.();
            translateX.value = withSpring(0);
          }}
        >
          <Ionicons name="duplicate-outline" size={18} color="white" />
        </Pressable>
        <Pressable
          style={[styles.hiddenButton, { borderColor: 'red' }]}
          onPress={() => {
            onDelete?.();
            translateX.value = withSpring(0);
          }}
        >
          <Ionicons name="remove-circle" size={18} color="red" />
        </Pressable>
      </View>

      {/* Animated content */}
      <GestureDetector gesture={gesture}>
        <Animated.View style={animatedViewStyle}>
          <View style={styles.gridRow}>
            <View style={[styles.baseGridItem, styles.gridItem1]}>
              <ThemedText type="smallSubtitle">{index + 1}</ThemedText>
            </View>
            <View style={[styles.baseGridItem, styles.gridItem4]}>
              <View style={styles.repRangeInputContainer}>
                <TextInput
                  style={styles.repRangeInput}
                  returnKeyType="next"
                  keyboardType="numeric"
                  onChangeText={text => {
                    onLowerChange(text);
                  }}
                >
                  {set.repRange.lower}
                </TextInput>
                <ThemedText type="smallTitle">-</ThemedText>
                <TextInput
                  style={styles.repRangeInput}
                  returnKeyType="next"
                  keyboardType="numeric"
                  onChangeText={text => {
                    onUpperChange(text);
                  }}
                >
                  {set.repRange.upper}
                </TextInput>
              </View>
            </View>
            <View style={[styles.baseGridItem, styles.gridItem3]}>
              <ThemedText type="smallSubtitle">{set.expectedRIR}</ThemedText>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderWidth: 1,
  },
  hidden: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  hiddenButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'black',
  },
  baseGridItem: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItem1: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  gridItem3: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  gridItem4: {
    flex: 4,
  },
  repRangeInputContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  repRangeInput: {
    textAlign: 'center',
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: 'gray',
    borderRadius: 10,
    color: 'white',
    fontSize: 12,
    width: 60,
  },
  addSetButton: {
    height: 20,
  },
});
