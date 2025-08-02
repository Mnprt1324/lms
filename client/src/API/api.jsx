import axios from "axios";
import { data } from "react-router-dom";

const base = import.meta.env.VITE_BASE_URL;
console.log(base);
const api = axios.create({
  baseURL: "http://localhost:4000",
});

console.log(import.meta.env.VITE_BASE_URL);
export const functionToSignup = async (data) => {
  return await api.post("/user/register", data, { withCredentials: true });
};
export const functionToLogin = async (data) => {
  return await api.post("/user/login", data, { withCredentials: true });
};
export const functionToLogout = async () => {
  return await api.post("/user/logout", {}, { withCredentials: true });
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
export const functionToPublishCourse = ({ courseId, isPublished }) => {
  return api.put(
    `/course/${courseId}?publish=${isPublished}`,
    {},
    {
      withCredentials: true,
    }
  );
};

export const functionToGetCourse = (courseId) => {
  return api.get(`/course/${courseId}`, {
    withCredentials: true,
  });
};
export const functionToGetLecture = (lectureId) => {
  return api.get(`/course/lecture/${lectureId}`, {
    withCredentials: true,
  });
};
export const functionToGetPublishCourses = () => {
  return api.get(`/course/published-courses`, {
    withCredentials: true,
  });
};
export const functionToCreateOrder = (courseId) => {
  return api.post(
    `/course/payment/create-order`,
    { courseId },
    {
      withCredentials: true,
    }
  );
};

export const functionToVerifyPayment = (courseId) => {
  return api.post(
    `/course/${courseId}/payment/verify`,
    {},
    {
      withCredentials: true,
    }
  );
};

export const functionToPayUpdateStatus = (data) => {
  return api.put(
    `/course/payment/update`,
    { data },
    {
      withCredentials: true,
    }
  );
};

export const functionTogetCoursesProgress = (courseId) => {
  return api.get(`/progress/${courseId}`, {
    withCredentials: true,
  });
};
export const functionTogetUpdatePrgress = ({ courseId, lectureId }) => {
  return api.post(
    `progress/${courseId}/lecture/${lectureId}`,
    {},
    {
      withCredentials: true,
    }
  );
};
export const functionToMarkCompelete = (data) => {
  const { courseId, isComplete } = data;
  return api.post(
    `progress/${courseId}/iscomplete`,
    { isComplete },
    { withCredentials: true }
  );
};

export const functionTogetFiltredCourse = (data) => {
  return api.post(
    `/course/course-filter/a`,
    { data },
    {
      withCredentials: true,
    }
  );
};

export const functionToCreateCommnet = (data) => {
  const { lectureId, comment } = data;
  return api.post(
    `/comment/${lectureId}/create`,
    { comment },
    {
      withCredentials: true,
    }
  );
};

export const funcTOGetAllPurchasedCourse = () => {
  return api.get("/course/purchased/aa", { withCredentials: true });
};

export const functionToPostFeedBack = (data) => {
  return api.post("/feedback/", { data }, { withCredentials: true });
};
export const functionToGetFeedBack =async () => {
  const res=await api.get("/feedback/", { withCredentials: true });
  return res.data.allFeedBack;
};
