import { configureStore } from '@reduxjs/toolkit';

import exercisesSlice from './exercisesSlice';
import templatesSlice from './template/index';
import workoutIndexSlice from './workout';
import workOutTemplateReducer from './workoutTemplateSlice';

export const store = configureStore({
  reducer: {
    workoutTemplateSlice: workOutTemplateReducer,
    exercisesSlice: exercisesSlice,
    templatesSlice: templatesSlice,
    workoutIndexSlice: workoutIndexSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
