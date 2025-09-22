import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import Template from '@/domain/template';
import { templateService } from '@/services';

export const fetchTemplates = createAsyncThunk('templates/fetchTemplates', async () => {
  const templates = await templateService.getMany();
  return templates;
});

interface TemplateState {
  templates: Template[];
  loading: boolean;
}

const initialState: TemplateState = {
  templates: [],
  loading: false,
};

const templateSlice = createSlice({
  name: 'templateSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTemplates.fulfilled, (state, action) => {
      console.log('fetchTemplates fulfilled');
      console.log(action.payload);
      console.log('state.templates');
      console.log(action.payload[0].exercises[0].exercise);
      state.templates = action.payload;
    });
    builder.addCase(fetchTemplates.rejected, (state, action) => {
      console.error(action.error);
    });
    builder.addCase(fetchTemplates.pending, state => {
      state.loading = true;
    });
  },
});

export default templateSlice.reducer;
