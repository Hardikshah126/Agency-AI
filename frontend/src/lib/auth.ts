import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

export async function signup(data: {
  email: string;
  password: string;
  name?: string;
}) {
  const res = await axios.post(`${API_BASE}/auth/signup`, data);
  const token = res.data.access_token;
  localStorage.setItem("access_token", token);
  return token;
}

export async function login(data: {
  email: string;
  password: string;
}) {
  const res = await axios.post(`${API_BASE}/auth/login`, data);
  const token = res.data.access_token;
  localStorage.setItem("access_token", token);
  return token;
}

export function logout() {
  localStorage.removeItem("access_token");
}
