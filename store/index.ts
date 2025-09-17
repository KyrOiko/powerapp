import { configureStore } from '@reduxjs/toolkit';

import exercisesSlice from './exercisesSlice';
import workOutTemplateReducer from './workoutTemplateSlice';

export const store = configureStore({
  reducer: {
    workoutTemplateSlice: workOutTemplateReducer,
    exercisesSlice: exercisesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
