import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CreateTemplateSet } from '@/models/dto/create_set_template';
import CreateWorkoutTemplate from '@/models/dto/create_workout_template';
import { RIR } from '@/models/enums';
import { workoutTemplateService } from '@/services';
import ExerciseData from '@/types/exercise';

export const createWorkoutTemplate = createAsyncThunk(
  'workoutTemplate/createWorkoutTemplate',
  async (workoutTemplate: CreateWorkoutTemplate) => {
    const response = await workoutTemplateService.create(workoutTemplate);
    return response;
  }
);

interface WorkoutTemplateState {
  template: CreateWorkoutTemplate;
  selectedExercises: ExerciseData[];
  loading: boolean;
}

const initialState: WorkoutTemplateState = {
  template: {
    name: 'My template',
    description: '',
    exercises: [],
  },
  selectedExercises: [],
  loading: false,
};

const defaultSet: CreateTemplateSet = {
  number: 1,
  expectedRIR: RIR.One,
  rest: 0,
  repRange: { lower: 4, upper: 6 },
  guides: '',
};

const workoutTemplateSlice = createSlice({
  name: 'workoutTemplateSlice',
  initialState,
  reducers: {
    updateTemplateField: (
      state,
      action: PayloadAction<{ field: keyof CreateWorkoutTemplate; value: string }>
    ) => {
      (state.template[action.payload.field] as string) = action.payload.value;
    },
    toggleSelectedExercise: (state, action: PayloadAction<{ exercise: ExerciseData }>) => {
      console.log('toggleSelectedExercise', action.payload.exercise.id);
      const existingIds = state.selectedExercises.map(e => e.id);
      if (existingIds.includes(action.payload.exercise.id)) {
        state.selectedExercises = state.selectedExercises.filter(
          e => e.id !== action.payload.exercise.id
        );
        state.template.exercises = state.template.exercises.filter(
          e => e.exercise.id !== action.payload.exercise.id
        );
      } else {
        state.selectedExercises = [...state.selectedExercises, action.payload.exercise];
        state.template.exercises = [
          ...state.template.exercises,
          { exercise: action.payload.exercise, sets: [defaultSet] },
        ];
      }
    },
    addSet: (state, action: PayloadAction<{ exerciseId: number }>) => {
      state.template.exercises = state.template.exercises.map(e => {
        if (e.exercise.id === action.payload.exerciseId) {
          return {
            ...e,
            sets: [
              ...e.sets,
              {
                ...defaultSet,
                number: e.sets.length + 1,
              },
            ],
          };
        }
        return e;
      });
    },
    removeSet: (state, action: PayloadAction<{ exerciseId: number; setNumber: number }>) => {
      state.template.exercises = state.template.exercises.map(e => {
        if (e.exercise.id === action.payload.exerciseId) {
          const newSets = e.sets.filter(set => set.number !== action.payload.setNumber);
          // Don't allow removing the last set
          if (newSets.length === 0) {
            return e;
          }
          return { ...e, sets: newSets };
        }
        return e;
      });
    },
    duplicateSet: (state, action: PayloadAction<{ exerciseId: number; setIndex: number }>) => {
      state.template.exercises = state.template.exercises.map(e => {
        if (e.exercise.id === action.payload.exerciseId) {
          console.log(action.payload.setIndex);
          console.log;
          console.log([
            ...e.sets,
            { ...e.sets[action.payload.setIndex], number: e.sets.length + 1 },
          ]);
          return {
            ...e,
            sets: [...e.sets, { ...e.sets[action.payload.setIndex], number: e.sets.length + 1 }],
          };
        }
        return e;
      });
    },
    updateRepRangeValue: (
      state,
      action: PayloadAction<{
        exerciseId: number;
        setIndex: number;
        which: 'lower' | 'upper';
        value: number;
      }>
    ) => {
      const exercise = state.template.exercises.find(
        e => e.exercise.id === action.payload.exerciseId
      );
      if (exercise) {
        exercise.sets[action.payload.setIndex].repRange[action.payload.which] =
          action.payload.value;
      }
    },
    removeExercise: (state, action: PayloadAction<{ exerciseId: number }>) => {
      state.template.exercises = state.template.exercises.filter(
        e => e.exercise.id !== action.payload.exerciseId
      );
      state.selectedExercises = state.selectedExercises.filter(
        e => e.id !== action.payload.exerciseId
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(createWorkoutTemplate.fulfilled, (state, action) => {
      state.template = action.payload;
    });
    builder.addCase(createWorkoutTemplate.rejected, (state, action) => {
      console.error(action.error);
    });
    builder.addCase(createWorkoutTemplate.pending, state => {
      state.loading = true;
    });
  },
});

export const {
  updateTemplateField,
  toggleSelectedExercise,
  addSet,
  removeSet,
  duplicateSet,
  updateRepRangeValue,
  removeExercise,
} = workoutTemplateSlice.actions;
export default workoutTemplateSlice.reducer;
