import { useContext } from 'react';
import { AuthContext } from './context';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, Profile, Login, Register } from './pages';
import './App.css';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Home /> : <Navigate to="/register" replace />}
      />
      <Route path="/profile/:username" element={<Profile />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" replace /> : <Register />}
      />
    </Routes>
  );
}

export default App;
