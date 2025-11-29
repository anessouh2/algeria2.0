import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      // Redirect to login or handle logout
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (username, password) => api.post('/auth/login/', { username, password }),
  register: (userData) => api.post('/auth/register/', userData),
  refreshToken: (refresh) => api.post('/auth/token/refresh/', { refresh }),
  logout: () => api.post('/auth/logout/'),
  getProfile: () => api.get('/auth/profile/'),
};

export const marketAPI = {
  getProducts: () => api.get('/market/products/'),
  addProduct: (productData) => api.post('/farmer/products/', productData),
  predictBestCrops: (predictionData) => api.post('/farmer/predict-best-crop/', predictionData),
};

export const farmerAPI = {
  addProduct: (productData) => api.post('/farmer/products/', productData),
  getMyProducts: () => api.get('/farmer/products/my_products/'),
  getProfile: () => api.get('/farmer/farmer-profiles/me/'),
  getInsights: () => api.get('/farmer/insights/'),
  predictBestCrops: (predictionData) => api.post('/farmer/predict-best-crop/', predictionData),
};

export const transporterAPI = {
  getRoutes: () => api.get('/transporters/routes/'),
  optimizeRoute: (routeData) => api.post('/farmer/optimize-route/', routeData),
  getLocations: () => api.get('/farmer/locations/'),
  getAvailableTransporters: (startingPoint, destination) => 
    api.get(`/transporters/available/?starting_point=${encodeURIComponent(startingPoint)}&destination=${encodeURIComponent(destination)}`),
};

export default api;