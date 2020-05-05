import axios from "axios";

const { URL_BACKEND } = process.env;
const token = localStorage.getItem("token");
class AxiosHelper {
  static get = path => {
    return new Promise((resolve, reject) => {
      return axios
        .get(`${URL_BACKEND}${path}`, {
          headers: {
            "access-token": token || "",
          }
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  static post = (path, data) => {
    return new Promise((resolve, reject) => {
      return axios
        .post(`${URL_BACKEND}${path}`, data, {
          headers: {
            "access-token": token || null,
          }
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  static put = (path, data) => {
    return new Promise((resolve, reject) => {
      return axios
        .put(`${URL_BACKEND}${path}`, data, {
          headers: {
            "access-token": token,
          }
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  static patch = (path, data) => {
    return new Promise((resolve, reject) => {
      return axios
        .patch(`${URL_BACKEND}${path}`, data, {
          headers: {
            "access-token": token,
          }
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  // post with formData
   static postFormData = (path, data) => {
     return new Promise((resolve, reject) => {
      return axios
        .post(`${URL_BACKEND}${path}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            "access-token": token || null,
          }
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  // post with formData
   static patchFormData = (path, data) => {
     return new Promise((resolve, reject) => {
      return axios
        .patch(`${URL_BACKEND}${path}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            "access-token": token || null,
          }
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
}

export default AxiosHelper;
