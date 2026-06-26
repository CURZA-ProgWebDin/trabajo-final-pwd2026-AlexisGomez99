import axios from "axios";
import { useAuthStore } from "../storage/auth";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useNotificationStore } from "../storage/notifications";

export const instance = axios.create({
  baseURL: "http://localhost:5001/api_v1/",
  timeout: 5000,
});

export const instance_auth = axios.create({
  baseURL: "http://localhost:5001/api_v1/",
  timeout: 5000,
});

instance_auth.interceptors.request.use(function (config) {
  const authStore = useAuthStore();
  const { jwt } = storeToRefs(authStore);
  if (jwt.value) {
    config.headers.Authorization = `Bearer ${jwt.value}`;
  }
  return config;
});
instance_auth.interceptors.response.use(
  (response) => {
    const notificationStore = useNotificationStore();
    const authStore = useAuthStore();
    const { jwt } = storeToRefs(authStore);
    if (response.data.refresh_token) {
      const authStore = useAuthStore();
      jwt.value = response.data.refresh_token;
    }
    if (response.data.message) {
      notificationStore.create(response.data.message, true);
    }

    return response.data;
  },
  (error) => {
    const authStore = useAuthStore();
    const notificationStore = useNotificationStore();
    if (error.response.data.message)
      notificationStore.create(error.response.data.message, true, "error");
    if (error.status === 401) {
      authStore.logout();
    }
    if (error.status === 409) {
      notificationStore.create(error.response.data.message, true, "warning");
    }

    if (error.status === 403) {
      authStore.goHome();
    }

    return Promise.reject(error);
  },
);