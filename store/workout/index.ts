import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import Workout from '@/domain/workout';
import { workoutService } from '@/services';

export const fetchWorkouts = createAsyncThunk('workouts/fetchWorkouts', async () => {
  const workouts = await workoutService.getMany();
  return workouts;
});

interface WorkoutIndexState {
  workouts: Workout[];
  loading: boolean;
}

const initialState: WorkoutIndexState = {
  workouts: [],
  loading: false,
};

const workoutIndexSlice = createSlice({
  name: 'workoutIndexSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchWorkouts.fulfilled, (state, action) => {
      state.workouts = [...action.payload];
    });
    builder.addCase(fetchWorkouts.rejected, (state, action) => {
      console.error(action.error);
    });
    builder.addCase(fetchWorkouts.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export default workoutIndexSlice.reducer;
