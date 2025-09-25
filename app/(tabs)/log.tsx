import { useEffect } from 'react';

import { FlatList, StyleSheet, Text, View } from 'react-native';

import TitledPage from '@/components/pages/titled-page';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { fetchWorkouts } from '@/store/workout';

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: 'gray',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
});

export default function Log() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchWorkouts());
  }, []);
  const workouts = useAppSelector(state => state.workoutIndexSlice.workouts);

  return (
    <TitledPage title="Log" backButton={false}>
      <FlatList
        data={workouts}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.text}>{item.name}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={true}
      />
    </TitledPage>
  );
}
