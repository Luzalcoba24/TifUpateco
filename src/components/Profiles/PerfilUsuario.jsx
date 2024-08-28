import React, { useEffect, useState } from "react";
import {userFetchData}  from "../../hooks/userFetchData"; // Asegúrate de que esta importación sea correcta

const PerfilUsuario = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await userFetchData();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  if (loading) {
    return <div className="alert alert-info" role="alert">Cargando perfil...</div>;
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (!profile) {
    return <div className="alert alert-info" role="alert">No se encontró el perfil.</div>;
  }

  return (
    <div className="container">
      <h1 className="my-4">Mi Perfil</h1>
      <div className="card">
        {profile.image ? (
          <img
            src={profile.image}
            className="card-img-top"
            alt={`${profile.username}'s profile`}
            style={{ height: "200px", objectFit: "cover" }}
          />
        ) : (
          <img
            src="https://via.placeholder.com/150?text=No+Imagen"
            className="card-img-top"
            alt="No Imagen"
            style={{ height: "200px", objectFit: "cover" }}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{profile.username}</h5>
          <p className="card-text">
            <strong>Nombre:</strong> {profile.first_name} {profile.last_name}
          </p>
          <p className="card-text">
            <strong>Email:</strong> {profile.email}
          </p>
          <p className="card-text">
            <strong>Fecha de Nacimiento:</strong> {profile.dob || "No disponible"}
          </p>
          <p className="card-text">
            <strong>Biografía:</strong> {profile.bio || "No disponible"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;
