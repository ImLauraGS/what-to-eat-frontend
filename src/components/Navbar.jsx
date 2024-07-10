import React from 'react';
import { useUser } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useUser(); 
  const navigate = useNavigate(); 

  const handleLogoutClick = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className='mt-1'>
      <ul>
        {user ? (
          <>
            <li className='w-full p-4 bg-background-green border-b-4 border-primary-color'><a href="/add-recipe">Añadir receta</a></li>
            <li className='w-full p-4 bg-background-green border-b-4 border-primary-color'><a href="/my-recipes">Mis recetas</a></li>
            <li className='w-full p-4 bg-background-green border-b-4 border-primary-color'>
              <a href="#" onClick={handleLogoutClick}>Cerrar sesión</a>
            </li>
          </>
        ) : (
          <>
            <li className='w-full p-4 bg-background-green border-b-4 border-primary-color'><a href="/register">Registrarse</a></li>
            <li className='w-full p-4 bg-background-green border-b-4 border-primary-color'><a href="/login">Iniciar sesión</a></li>
          </>
        )}
      </ul>
    </nav>
  );
}
