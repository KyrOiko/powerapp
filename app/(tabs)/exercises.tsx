import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { exercises } from "@/scripts/exercises";
import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";



export default function Exercises () {
    return (
    <ThemedView><ThemedText type="title">Exercises</ThemedText>
    <ScrollView>
    {exercises.map((exercise) => (
      <View key={exercise.id} style={styles.exercise}>
        <ThemedText type="smallTitle">{exercise.name}</ThemedText>
        <ThemedText type="smallSubtitle">{exercise.description}</ThemedText>
      </View>
    ))}
    </ScrollView>
    <ThemedButton
      title="Add Exercise"
      onPress={() => {router.push('/new-exercise')}}
    />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  exercise: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray"
  }
});
