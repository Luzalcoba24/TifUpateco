import React, { useContext } from 'react';  
import { Link } from 'react-router-dom';  
import { AuthContext } from '../contexts/AuthContext';  

const Navbar = () => {  
  const { auth, logout } = useContext(AuthContext);  

  return (  
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> {/* Cambiado a bg-dark y navbar-dark */}  
      <div className="container">  
        <Link className="navbar-brand" to="/">Home</Link>  
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">  
          <span className="navbar-toggler-icon"></span>  
        </button>  
        <div className="collapse navbar-collapse" id="navbarNav">  
          <ul className="navbar-nav ml-auto">  
            {auth.isAuthenticated ? (  
              <>  
                <li className="nav-item">  
                  <Link className="nav-link" to="/perfil">Ver Perfil</Link>  
                </li>  
                <li className="nav-item">  
                  <Link className="nav-link" to="/perfiles">Ver Usuarios Registrados</Link>  
                </li>  
                <li className="nav-item">  
                  <button className="nav-link btn btn-link" onClick={logout}>Cerrar Sesión</button>  
                </li>  
              </>  
            ) : (  
              <li className="nav-item">  
                <Link className="nav-link" to="/login">Login</Link>  
              </li>  
            )}  
          </ul>  
        </div>  
      </div>  
    </nav>  
  );  
};  

export default Navbar;