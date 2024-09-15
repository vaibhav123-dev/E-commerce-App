import API from "./axiosIntercept";

// GET request
export const getRequest = async (url, params = {}, config = {}) => {
  try {
    const response = await API.get(url, { params, ...config });
    return response.data;
  } catch (error) {
    console.error("GET request error:", error);
    throw error;
  }
};

// POST request
export const postRequest = async (url, data = {}, config = {}) => {
  try {
    const response = await API.post(url, data, { ...config });
    return response.data;
  } catch (error) {
    console.error("POST request error:", error);
    throw error;
  }
};

// PUT request
export const putRequest = async (url, data = {}, config = {}) => {
  try {
    const response = await API.put(url, data, { ...config });
    return response.data;
  } catch (error) {
    console.error("PUT request error:", error);
    throw error;
  }
};

// PATCH request
export const patchRequest = async (url, data = {}, config = {}) => {
  try {
    const response = await API.patch(url, data, { ...config });
    return response.data;
  } catch (error) {
    console.error("PATCH request error:", error);
    throw error;
  }
};

// DELETE request
export const deleteRequest = async (url, config = {}) => {
  try {
    const response = await API.delete(url, { ...config });
    return response.data;
  } catch (error) {
    console.error("DELETE request error:", error);
    throw error;
  }
};
