const apiBaseFromEnv = import.meta.env.VITE_API_URL;

const API_URL = typeof apiBaseFromEnv === 'string' && apiBaseFromEnv.startsWith('/')
  ? apiBaseFromEnv.replace(/\/$/, '')
  : '';

export default API_URL;
