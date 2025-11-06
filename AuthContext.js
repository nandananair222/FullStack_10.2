import React, { createContext, useState, useEffect } from 'react';
import { setAuthToken } from '../api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  useEffect(() => {
    setAuthToken(token);
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
