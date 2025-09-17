import { CreateTemplateSet } from "@/models/dto/create_set_template";
import CreateWorkoutTemplate from "@/models/dto/create_workout_template";
import { RIR } from "@/models/enums";
import ExerciseData from "@/types/exercise";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WorkoutTemplateState {
  template: CreateWorkoutTemplate;
  selectedExercises: ExerciseData[];
}

const initialState: WorkoutTemplateState = {
  template: {
    name: 'My template',
    description: '',
    exercises: [],
  },
  selectedExercises: [],
}

const defaultSet: CreateTemplateSet = {
  number: 1,
  expectedRIR: RIR.One,
  rest: 0,
  repRange: {lower: 4, upper: 6},
  guides: '',
}

const workoutTemplateSlice = createSlice({
  name: "workoutTemplateSlice",
  initialState,
  reducers: {
    updateTemplateField: (state, action: PayloadAction<{field: keyof CreateWorkoutTemplate, value: string}>) => {
      (state.template[action.payload.field] as string) = action.payload.value;
    },
    toggleSelectedExercise: (state, action: PayloadAction<{exercise: ExerciseData}>) => {
      const existingIds = state.selectedExercises.map((e) => e.id);
      if (existingIds.includes(action.payload.exercise.id)) {
        state.selectedExercises = state.selectedExercises.filter((e) => e.id !== action.payload.exercise.id);
        state.template.exercises = state.template.exercises.filter((e) => e.exercise.id !== action.payload.exercise.id);
      } else {
        state.selectedExercises = [...state.selectedExercises, action.payload.exercise];
        state.template.exercises = [...state.template.exercises, {exercise: action.payload.exercise, sets: [
          defaultSet,
        ]}];
      }
    },
  },
})

export const { updateTemplateField, toggleSelectedExercise } = workoutTemplateSlice.actions;
export default workoutTemplateSlice.reducer;
