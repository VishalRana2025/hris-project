import axios from "axios";

/* 🔥 BASE INSTANCE */
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`
});

/* 🔥 COMMON AUTH HEADER */
const auth = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});


// ================= AUTH =================
export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);


// ================= EMPLOYEES =================
export const getEmployees = (t) => API.get("/employees", auth(t));
export const addEmployee = (d, t) => API.post("/employees", d, auth(t));
export const updateEmployee = (id, d, t) =>
  API.put(`/employees/${id}`, d, auth(t));
export const deleteEmployee = (id, t) =>
  API.delete(`/employees/${id}`, auth(t));
export const getMyEmployee = (t) => API.get("/employees/me", auth(t));


// ================= ATTENDANCE =================
export const checkIn = (t) => API.post("/attendance/checkin", {}, auth(t));
export const checkOut = (t) => API.post("/attendance/checkout", {}, auth(t));
export const getTodayAttendance = (t) =>
  API.get("/attendance/today", auth(t));
export const getAttendanceHistory = (t) =>
  API.get("/attendance/history", auth(t));


// ================= LEAVES =================
export const applyLeave = (d, t) => API.post("/leaves", d, auth(t));
export const getLeaves = (t) => API.get("/leaves", auth(t));

/* ✅ NEW (IMPORTANT FOR DASHBOARD) */
export const getMyLeaves = (t) => API.get("/leaves/my", auth(t));

export const updateLeaveStatus = (id, status, t) =>
  API.put(`/leaves/${id}`, { status }, auth(t));


// ================= PROFILE =================
export const getProfile = (t) => API.get("/profile", auth(t));
export const updateProfile = (d, t) => API.put("/profile", d, auth(t));

export const uploadDocument = (file, t) => {
  const formData = new FormData();
  formData.append("file", file);

  return API.post("/profile/upload", formData, {
    headers: {
      Authorization: `Bearer ${t}`,
      "Content-Type": "multipart/form-data"
    }
  });
};


// ================= ORG =================

// 🔹 GENERIC HELPERS
const get = (url, t) => API.get(url, auth(t));
const post = (url, d, t) => API.post(url, d, auth(t));
const put = (url, id, d, t) => API.put(`${url}/${id}`, d, auth(t));
const del = (url, id, t) => API.delete(`${url}/${id}`, auth(t));


// 🔸 LEGAL
export const getLegal = (t) => get("/org/legal", t);
export const addLegal = (d, t) => post("/org/legal", d, t);
export const updateLegal = (id, d, t) => put("/org/legal", id, d, t);
export const deleteLegal = (id, t) => del("/org/legal", id, t);


// 🔸 LOCATION
export const getLocation = (t) => get("/org/location", t);
export const addLocation = (d, t) => post("/org/location", d, t);
export const updateLocation = (id, d, t) =>
  put("/org/location", id, d, t);
export const deleteLocation = (id, t) =>
  del("/org/location", id, t);


// 🔸 BUSINESS
export const getBusiness = (t) => get("/org/business", t);
export const addBusiness = (d, t) => post("/org/business", d, t);
export const updateBusiness = (id, d, t) =>
  put("/org/business", id, d, t);
export const deleteBusiness = (id, t) =>
  del("/org/business", id, t);


// 🔸 DEPARTMENT
export const getDepartments = (t) => get("/org/department", t);
export const addDepartment = (d, t) =>
  post("/org/department", d, t);
export const updateDepartment = (id, d, t) =>
  put("/org/department", id, d, t);
export const deleteDepartment = (id, t) =>
  del("/org/department", id, t);


// 🔸 JOB
export const getJobs = (t) => get("/org/job", t);
export const addJob = (d, t) => post("/org/job", d, t);
export const updateJob = (id, d, t) =>
  put("/org/job", id, d, t);
export const deleteJob = (id, t) =>
  del("/org/job", id, t);