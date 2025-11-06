import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  useEffect(()=>{ api.get('/posts').then(r=>setPosts(r.data)); }, []);
  return (
    <div>
      <h2>Posts</h2>
      {posts.map(p=>(
        <div key={p._id}>
          <Link to={`/post/${p._id}`}><h3>{p.title}</h3></Link>
          <small>by {p.author?.username}</small>
        </div>
      ))}
    </div>
  );
}
