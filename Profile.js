import React, { useContext, useState, useEffect } from 'react';
import api from '../api';
import { AuthContext } from '../contexts/AuthContext';

export default function Profile(){
  const { user, setUser } = useContext(AuthContext);
  const [bio, setBio] = useState(user?.bio || '');

  const save = async () => {
    const res = await api.put('/users/me', { bio });
    setUser(res.data);
    alert('Saved');
  };

  if(!user) return <div>Login to view profile</div>;
  return (
    <div>
      <h2>{user.username}</h2>
      <p>{user.email}</p>
      <textarea value={bio} onChange={e=>setBio(e.target.value)} />
      <button onClick={save}>Save</button>
    </div>
  );
}
