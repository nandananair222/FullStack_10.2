import React, { useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

export default function CreatePost(){
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [form, setForm] = useState({ title:'', body:'', tags:'' });

  const submit = async e => {
    e.preventDefault();
    if (!user) return alert('Login to create posts');
    const payload = { ...form, tags: form.tags.split(',').map(t=>t.trim()).filter(Boolean) };
    const res = await api.post('/posts', payload);
    history.push(`/post/${res.data._id}`);
  };

  return (
    <form onSubmit={submit}>
      <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="Title"/>
      <textarea value={form.body} onChange={e=>setForm({...form, body:e.target.value})} placeholder="Write..."/>
      <input value={form.tags} onChange={e=>setForm({...form, tags:e.target.value})} placeholder="tags comma separated"/>
      <button>Create</button>
    </form>
  );
}
