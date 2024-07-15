import React from 'react'
import ButtonCustom from './ButtonCustom'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';


export default function MainHero() {
    const navigate = useNavigate();
    const { user } = useUser(); 

    const handleButtonClick = () => {
        user ? navigate('/search') : navigate('/register')
    };

    return (
        <section className='relative'>
            <div className='bg-background-green flex flex-col items-center text-center p-5 m-5 rounded-xl gap-4 shadow-md'>
            {user ? (<h1 className='text-xl font-semibold'>¡Hola, {user.name}!</h1>
        ) : (
        <h1 className='text-xl font-semibold'>La inspiración que necesitas en la cocina.</h1>)}
                
                <p>¿Qué hay para comer? Te ayudamos a responder esa pregunta diaria de manera fácil y deliciosa.</p>
                {user ? (<ButtonCustom
                    text="Buscar Recetas"
                    onClick={handleButtonClick}
                />
        ) : (
            <ButtonCustom
            text="Registrate"
            onClick={handleButtonClick}
        />)}
                
                
            </div>

            <div className='sticky -mt-40 -z-10'>
                <img src="./heroimg.jpeg" alt="hortalizas en tabla de cortar" />
            </div>

        </section>
    )
}
