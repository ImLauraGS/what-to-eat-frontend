import React from 'react'
import ButtonCustom from './ButtonCustom'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';

export default function HeroAdd() {
    const navigate = useNavigate();
        const { user } = useUser();

    const handleButtonClick = () => {
         
        user ? navigate('/add') : navigate('/register')
    };

  return (
    <section className='flex flex-col justify-center items-center text-center px-2 py-7 gap-4'>
        <h3 className='text-lg'>
        También podrás añadir tus propias recetas!  Comparte tus creaciones con <span className='text-green-btn font-bold'>nuestra comunidad </span>nuestra comunidad de amantes de la cocina.
        </h3>
        {user ? (<ButtonCustom
                    text="Añadir Recetas"
                    onClick={handleButtonClick}
                />
        ) : (
            <ButtonCustom
            text="Registrate"
            onClick={handleButtonClick}
        />)}
    </section>
  )
}
