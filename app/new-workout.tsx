import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Exercise, exercises } from "@/scripts/exercises";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

enum RIR {
    One = 1,
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6,
    Seven = 7,
    Eight = 8,
    Nine = 9,
    Ten = 10,
    F = -1,
    FF = -1.5,
    Assisted = -2,
}


const ExerciseSections = ({set, repRange, rpe}: {set: number, repRange: string, rpe: RIR}) => {
        return <View style={styles.exerciseSettings}>
    <View style={styles.exerciseSettingsItem}>
        <ThemedText type="medium">{set}.</ThemedText>
    </View>
    <View style={styles.repRange}>
        <TextInput style={{...styles.repRangeInput, width: 70}}>{repRange}</TextInput>
        <ThemedText type="medium">to</ThemedText>
        <TextInput style={{...styles.repRangeInput, width: 70}}>{repRange}</TextInput>
    </View>
    <View>
        <TextInput style={{...styles.settingsInput, width: 50}}>{rpe.toString()}</TextInput>
    </View>
</View>
}

const NewExerciseSection = ({exercise}: {exercise: Exercise}) => {
    return (
    <View style={styles.exercisesContainer}>
        <View style={styles.exerciseHeader}>
            <ThemedText type="medium">{exercise.name}</ThemedText>
            <Ionicons name="settings" color={"green"} size={20}></Ionicons>
        </View>
        <View style={styles.exerciseSectionHeader}>
            <ThemedText type="medium">Set</ThemedText>
            <ThemedText type="medium">Rep range</ThemedText>
            <ThemedText type="medium">RPE</ThemedText>
        </View>
        <View style={styles.exerciseSection}>
            <ExerciseSections set={1} repRange="10-15" rpe={RIR.Ten} />
            <ExerciseSections set={2} repRange="10-15" rpe={RIR.Ten} />
            <ExerciseSections set={3} repRange="10-15" rpe={RIR.Ten} />
        </View>
    </View>
    )
}


export default function NewWorkout() {
    const [newExercises, setNewExercises] = useState<Exercise[]>([
        exercises[0],
        exercises[1],
    ]);
    return (
        <ThemedView>
            <ThemedText type="title">New Workout</ThemedText>
            <FlatList
            data={newExercises}
            renderItem={({item}) => (
                <NewExerciseSection key={item.id} exercise={item} />
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={styles.exerciseSeparator} />}
            showsVerticalScrollIndicator={false}
            />
            <ThemedButton title="Add exercise" onPress={() => {}} />
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    exercisesContainer: {
        flexDirection: 'column',
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
    },
    exerciseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height:20
    },
    exerciseSectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height:20,
        marginBottom: 10,
    },
    exerciseSection: {
        flexDirection: 'column',
        gap: 10,
        marginBottom: 0,
    },
    exerciseSettings: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    exerciseSettingsItem: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    settingsInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        height:10,
        color: 'text',
        backgroundColor: '#e0e0e0',
        maxWidth: 100,
      },
    repRange:  {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    repRangeInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        height:10,
        color: 'text',
        backgroundColor: '#e0e0e0',
        maxWidth: 50,
    },
    exerciseSeparator: {
        height: 10,
    },
})
