import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  courses: [],
  singleCourse: {},
  allPublicCourse: [],
  CourseProgress: {},
  filteredCourse:[]
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
    setCourseProgress: (state, action) => {
      state.CourseProgress = action.payload;
    },
    setFilteredCourse: (state, action) => {
      state.filteredCourse = action.payload;
    }
  },
});

export const { userCoures, setSingleCourse, setPublicCourse ,setCourseProgress,setFilteredCourse} =
  courseSlice.actions;
export default courseSlice.reducer;
