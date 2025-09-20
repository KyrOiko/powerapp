import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import ExerciseData from '@/domain/exercise';
import { exerciseService } from '@/services';

export const fetchExercises = createAsyncThunk('exercises/fetchExercises', async () => {
  const exercises = await exerciseService.getMany();
  return exercises;
});

interface ExercisesState {
  exercises: ExerciseData[];
}

const initialState: ExercisesState = {
  exercises: [],
};

const exercisesSlice = createSlice({
  name: 'exercisesSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchExercises.fulfilled, (state, action) => {
      state.exercises = [...action.payload];
    });
    builder.addCase(fetchExercises.rejected, (state, action) => {
      console.error(action.error);
      state.exercises = [];
    });
    builder.addCase(fetchExercises.pending, (state, action) => {
      state.exercises = [];
    });
  },
});

export default exercisesSlice.reducer;
