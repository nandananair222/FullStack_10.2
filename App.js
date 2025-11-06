import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import Register from './components/Register';
import Login from './components/Login';
import PostList from './components/PostList';
import PostView from './components/PostView';
import CreatePost from './components/CreatePost';
import Profile from './components/Profile';
import { setAuthToken } from './api';

function Nav() {
  const { user, setUser, setToken } = useContext(AuthContext);
  const logout = () => { setUser(null); setToken(null); setAuthToken(null); };
  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/create">Create</Link> | <Link to="/profile">Profile</Link>
      {user ? <button onClick={logout}>Logout</button> : <> <Link to="/login">Login</Link> <Link to="/register">Register</Link></>}
    </nav>
  );
}

export default function App(){
  return (
    <AuthProvider>
      <Router>
        <Nav/>
        <Switch>
          <Route exact path="/" component={PostList}/>
          <Route path="/post/:id" component={PostView}/>
          <Route path="/create" component={CreatePost}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
        </Switch>
      </Router>
    </AuthProvider>
  );
}
