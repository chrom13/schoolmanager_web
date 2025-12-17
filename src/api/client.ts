import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor - agregar token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - manejar errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el token expiró o es inválido
    if (error.response?.status === 401) {
      // Solo redirigir si NO estamos en la página de login o registro
      const currentPath = window.location.pathname
      const isAuthPage = currentPath === '/login' || currentPath === '/register'

      if (!isAuthPage) {
        localStorage.removeItem('auth_token')
        window.location.href = '/login'
      }
    }

    // Error de red
    if (!error.response) {
      console.error('Network error:', error)
    }

    return Promise.reject(error)
  }
)

export default apiClient
