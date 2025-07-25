import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

export const functionToSignup = async (data) => {
  return await api.post("/user/register", data, { withCredentials: true });
};
export const functionToLogin = async (data) => {
  return await api.post("/user/login", data, { withCredentials: true });
};
export const functionToLogout = async () => {
  return await api.post("/user/logout", { withCredentials: true });
};
export const functionToGetProfile = async () => {
  const res = await api.get("/user/getprofile", { withCredentials: true });
  return res.data;
};
export const functionToUpdateProfile = async (data) => {
  return await api.post("/user/update/profile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};

export const functionTocreateCourse = async (data) => {
  return api.post("/course/", data, { withCredentials: true });
};
export const functionTogetCourses = async () => {
  return api.get("/course/getAllCourse", { withCredentials: true });
};
export const functionToEditCourse = async (data) => {
  const { courseId, formData } = data;
  return api.post(`/course/${courseId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};

export const functionToCreateLecture = async (data) => {
  const { courseId, formData } = data;
  return api.post(`/course/lecture/${courseId}`, formData, {
    withCredentials: true,
  });
};
export const functionToGetLectures = async (courseId) => {
  return api.get(`/course/${courseId}/lecture`, {
    withCredentials: true,
  });
};

export const functionToEditLecture = (data) => {
  const { courseId, lectureId, formData } = data;
  return api.post(`/course/${courseId}/lecture/${lectureId}`, formData, {
    withCredentials: true,
  });
};

export const functionToUploadViedo = (data) => {
  console.log(data);
  const { formData, onProgress } = data;
  return api.post(`media/upload-video`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (e) => {
      const progress = Math.round((e.loaded * 100) / e.total);
      onProgress(progress);
    },
    withCredentials: true,
  });
};

export const functionToRemoveLecture = (data) => {
  const { lectureId } = data;
  return api.delete(`/course/lecture/${lectureId}`, {
    withCredentials: true,
  });
};
export const functionToPublishCourse = ({courseId,isPublished}) => {
  console.log("public course")
  return api.put(`/course/${courseId}?publish=${isPublished}`,{},{
    withCredentials: true,
  });
};
