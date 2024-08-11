import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { AuthContext } from '../Contexts/AuthContext';

export const NavBar = () => {
  const { state, actions } = useContext(AuthContext); // Accede al estado y las acciones del contexto de autenticación

  const handleLogout = () => {
    actions.logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">NotiPatos</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Buscar artículos" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Buscar</button>
          </form>
          <ul className="navbar-nav ml-auto">
            {!state.isAuthenticated ? (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Iniciar Sesión</Link>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="rounded-circle">
                    {state.token ? state.token[0].toUpperCase() : state.id}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Ver Perfil</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Cerrar Sesión</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
