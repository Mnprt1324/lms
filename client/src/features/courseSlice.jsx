import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  courses: [],
  singleCourse: {},
  allPublicCourse:[],
};

const courseSlice = createSlice({
  name: "courseSlice",
  initialState,
  reducers: {
    userCoures: (state, action) => {
      state.courses = action.payload;
    },
    setSingleCourse: (state, action) => {
      state.singleCourse = action.payload;
    },
    setPublicCourse: (state, action) => {
      state.allPublicCourse = action.payload;
    },
  },
});

export const { userCoures,setSingleCourse,setPublicCourse } = courseSlice.actions;
export default courseSlice.reducer;
