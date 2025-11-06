import React, { useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../contexts/AuthContext';

export default function Register() {
  const { setUser, setToken } = useContext(AuthContext);
  const [form, setForm] = useState({ username:'', email:'', password:'' });

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', form);
      setToken(res.data.token);
      setUser(res.data.user);
    } catch (err) { alert(err.response?.data?.message || 'Error'); }
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="username" value={form.username} onChange={e=>setForm({...form, username:e.target.value})}/>
      <input placeholder="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
      <input placeholder="password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})}/>
      <button>Register</button>
    </form>
  );
}
