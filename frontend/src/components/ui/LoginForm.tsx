// src/components/auth/LoginForm.tsx
import React from "react";
import { signup, login, logout } from "@/lib/auth";

export default function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = React.useState<string | null>(null);

  const doSignup = async () => {
    setLoading(true);
    setMsg(null);
    try {
      const res = await signup({ email, password, name });
      setMsg("Signed up. Token saved.");
      console.log("signup res:", res);
    } catch (e: any) {
      setMsg(e?.response?.data?.detail || e?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const doLogin = async () => {
    setLoading(true);
    setMsg(null);
    try {
      const res = await login({ email, password });
      setMsg("Logged in. Token saved.");
      console.log("login res:", res);
    } catch (e: any) {
      setMsg(e?.response?.data?.detail || e?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 12, maxWidth: 380 }}>
      <h3>Dev Login</h3>
      <input placeholder="Name (for signup)" value={name} onChange={(e)=>setName(e.target.value)} style={{width:"100%", marginBottom:8}}/>
      <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} style={{width:"100%", marginBottom:8}}/>
      <input placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" style={{width:"100%", marginBottom:8}}/>
      <div style={{display:"flex", gap:8}}>
        <button onClick={doSignup} disabled={loading}>Sign up</button>
        <button onClick={doLogin} disabled={loading}>Log in</button>
        <button onClick={() => { logout(); setMsg("Logged out"); }}>Logout</button>
      </div>
      {msg && <div style={{marginTop:8}}>{msg}</div>}
    </div>
  );
}
