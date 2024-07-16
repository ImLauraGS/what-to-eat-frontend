import React, {useState} from 'react';
import { useUser } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import AlertConfirmation from './AlertConfirmation';

export default function Navbar() {
  const { user, logout } = useUser(); 
  const navigate = useNavigate(); 
  const [showAlert, setShowAlert] = useState(false);

  const handleLogoutClick = async () => {
    try {
      await logout();
      setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                navigate('/');
                window.location.reload();
            }, 2000);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className='mt-1'>
      <ul>
        {user ? (
          <>
            <li className='w-full p-4 bg-background-green border-b-4 border-primary-color'><a className='w-full' href="/add">Añadir receta</a></li>
            <li className='w-full p-4 bg-background-green border-b-4 border-primary-color'><a className='w-full' href="/favorites">Mis recetas</a></li>
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
      {showAlert && <AlertConfirmation text="Se ha cerrado la sesion correctamente." status="success" />}
    </nav>
  );
}
