// src/components/UserProfile.jsx
import React, { useEffect, useState } from 'react';

export const UserProfile = ({ onLogout }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://sandbox.academiadevelopers.com//users/profiles/profile_data/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos del usuario');
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="user-profile">
      <h3>{userData.first_name} {userData.last_name}</h3>
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
      <p>Fecha de nacimiento: {userData.dob}</p>
      <p>Biografía: {userData.bio}</p>
      <button className="btn btn-danger" onClick={onLogout}>Cerrar sesión</button>
    </div>
  );
};

export default UserProfile;
