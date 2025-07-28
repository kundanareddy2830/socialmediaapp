import { jwtDecode } from 'jwt-decode';
import api from './api';

export function getCurrentUserId(): number | null {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const decoded: any = jwtDecode(token);
    return decoded.userId || null;
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
} 