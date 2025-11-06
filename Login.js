import React, { useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../contexts/AuthContext';

export default function Login(){
  const { setUser, setToken } = useContext(AuthContext);
  const [form, setForm] = useState({ emailOrUsername:'', password:'' });

  const submit=async e=>{
    e.preventDefault();
    try {
      const res=await api.post('/auth/login', form);
      setToken(res.data.token);
      setUser(res.data.user);
    } catch(err){ alert(err.response?.data?.message || 'Error'); }
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="email or username" value={form.emailOrUsername} onChange={e=>setForm({...form, emailOrUsername:e.target.value})}/>
      <input placeholder="password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})}/>
      <button>Login</button>
    </form>
  );
}
