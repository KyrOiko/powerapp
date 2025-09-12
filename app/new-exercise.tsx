import { ThemedButton } from "@/components/themed-button";
import { ThemedSelectionModal } from "@/components/themed-selection-modal";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { RadioButton } from "react-native-paper";

enum ExerciseType {
  Strength = "Strength",
  Cardio = "Cardio",
  Flexibility = "Flexibility",
  Balance = "Balance",
  Mobility = "Mobility",
  Endurance = "Endurance",
  Power = "Power",
  Smorn = "Smorn",
  Lojban = "Lojban",
  Other = "Other",
  dslk = "dslk",
}

enum ExerciseMuscleGroup {
  UpperBody = "Upper Body",
  LowerBody = "Lower Body",
  FullBody = "Full Body",
  Chest = "Chest",
  Back = "Back",
  Arms = "Arms",
  Legs = "Legs",
  Core = "Core",
}

enum ExerciseMachine {
  Machine = "Machine",
  Bodyweight = "Bodyweight",
}

export default function NewExercise() {
    const [exerciseType, setExerciseType] = useState<ExerciseType | null>(null);

    const modalizeRef = useRef<Modalize>(null);


    const openModal = () => {
        modalizeRef.current?.open();
    }

    return (
    <ThemedView>
      <ThemedText type="title">New Exercise</ThemedText>
      <ThemedView style={styles.inputContainer}>
        <ThemedText type="subtitle">Exercise Name</ThemedText>
        <TextInput style={styles.input} placeholder="Exercise Name" />
        <ThemedText type="subtitle">Exercise Description</ThemedText>
        <TextInput style={styles.input} placeholder="Exercise Description" />

        <Pressable onPress={openModal}>
        <ThemedText type="subtitle">Exercise Type</ThemedText>
          <TextInput style={styles.input} placeholder="Exercise Type" editable={false} />
        </Pressable>
      </ThemedView>

      <ThemedSelectionModal modalizeRef={modalizeRef}  withHandle={false} modalHeight={310} >
        <ScrollView
        style={{ maxHeight: 300,width: '100%',flex: 1}}
        >
        <RadioButton.Group onValueChange={(value) => setExerciseType(value as ExerciseType)} value={exerciseType ?? ''}>
            {Object.values(ExerciseType).map((type) => (
                <View  key={type} style={styles.radioButtonContainer}>
              <RadioButton.Item label={type} value={type} position="leading" labelStyle={styles.radioButtonItem}/>
              </View>

            ))}
            </RadioButton.Group>
        </ScrollView>

      </ThemedSelectionModal>

      <ThemedButton title="Save" onPress={() => {router.push('/exercises')}} />
    </ThemedView>
    );
}

const styles = StyleSheet.create({
  inputContainer: {
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    color: 'black',
    backgroundColor: 'white',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  radioButtonItem: {
    fontSize: 16,
    fontWeight: 500,
    color: 'black',
    padding: 0,
    margin: 0,
  },
});
