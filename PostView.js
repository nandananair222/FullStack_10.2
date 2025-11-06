import React, { useEffect, useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../contexts/AuthContext';

export default function PostView({ match }) {
  const postId = match.params.id;
  const { user } = useContext(AuthContext);
  const [postData, setPostData] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(()=>{ api.get(`/posts/${postId}`).then(r=>setPostData(r.data)); }, [postId]);

  const addComment = async () => {
    if(!user) return alert('Login first');
    const res = await api.post('/comments', { postId, text: comment });
    setPostData(prev => ({ ...prev, comments: [...prev.comments, res.data] }));
    setComment('');
  };

  if(!postData) return <div>Loading...</div>;
  const { post, comments } = postData;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <small>by {post.author?.username}</small>

      <hr/>
      <h3>Comments</h3>
      {comments.map(c => (
        <div key={c._id}>
          <b>{c.author.username}</b>: {c.text}
        </div>
      ))}

      <div>
        <textarea value={comment} onChange={e=>setComment(e.target.value)}/>
        <button onClick={addComment}>Add Comment</button>
      </div>
    </div>
  );
}
