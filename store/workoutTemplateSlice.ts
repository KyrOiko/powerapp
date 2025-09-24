import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import ExerciseData from '@/domain/exercise';
import { CreateTemplateSet } from '@/models/dto/create_set_template';
import CreateWorkoutTemplate from '@/models/dto/create_workout_template';
import { RIR } from '@/models/enums';
import { templateService } from '@/services';

export const createWorkoutTemplate = createAsyncThunk(
  'workoutTemplate/createWorkoutTemplate',
  async (workoutTemplate: CreateWorkoutTemplate) => {
    const savedTemplate = await templateService.create(workoutTemplate);
    return savedTemplate;
  }
);

interface WorkoutTemplateState {
  template: CreateWorkoutTemplate;
  selectedExercises: ExerciseData[];
  loading: boolean;
  editSetId: number | null;
  editExerciseId: number | null;
}

const initialState: WorkoutTemplateState = {
  template: {
    name: 'My template',
    description: '',
    exercises: [],
  },
  editSetId: null,
  editExerciseId: null,
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
    setEditedExercise: (state, action: PayloadAction<{ setId: number; exerciseId: number }>) => {
      state.editSetId = action.payload.setId;
      state.editExerciseId = action.payload.exerciseId;
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
    updateRIRValue: (state, action: PayloadAction<{ value: RIR }>) => {
      console.log('updateRIRValue', action.payload.value);
      console.log('state.editExerciseId', state.editExerciseId);
      console.log('state.editSetId', state.editSetId);
      const exercise = state.template.exercises.find(e => e.exercise.id === state.editExerciseId);
      console.log('exercise', exercise);

      if (exercise && state.editSetId !== null) {
        const setToUpdate = exercise.sets.find(s => s.number === state.editSetId);

        if (setToUpdate) {
          console.log('MPAINW - updating RIR to:', action.payload.value);
          setToUpdate.expectedRIR = action.payload.value;
        } else {
          console.log('Set not found with number:', state.editSetId);
        }
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
    builder
      .addCase(createWorkoutTemplate.pending, state => {
        state.loading = true;
      })
      .addCase(createWorkoutTemplate.fulfilled, (state, action) => {
        state.loading = false;
        // Reset the form after successful creation
        state.template = {
          name: 'My template',
          description: '',
          exercises: [],
        };
        state.selectedExercises = [];
        console.log('Template created successfully:', action.payload);
      })
      .addCase(createWorkoutTemplate.rejected, (state, action) => {
        state.loading = false;
        console.error('Failed to create template:', action.error);
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
  updateRIRValue,
  setEditedExercise,
} = workoutTemplateSlice.actions;
export default workoutTemplateSlice.reducer;
