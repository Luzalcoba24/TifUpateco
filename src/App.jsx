import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './components/NavBar';
import { Articles } from './components/Articles';
import { Login } from './components/Login';
import { AuthProvider } from './Contexts/AuthContext';

export const App = () => {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <header className="bg-primary text-white text-center py-4">
          <h1>NotiPatos</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Articles />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <footer className="bg-dark text-white text-center py-4">
          <p>&copy; 2023 Mi Aplicación de Artículos</p>
        </footer>
      </AuthProvider>
    </Router>
  );
};

export default App;

