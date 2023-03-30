import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  exampleValue: 123,
};
const exampleSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setExample(state, action) {},
  },
});
export const { setExample } = exampleSlice.actions;
export default exampleSlice.reducer;
