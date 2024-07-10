import React from 'react'
import ButtonCustom from './ButtonCustom'
import { useNavigate } from 'react-router-dom';

export default function MainHero() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/register');
    };

    return (
        <section className='relative'>
            <div className='bg-background-green flex flex-col items-center text-center p-5 m-5 rounded-xl gap-4 shadow-md'>
                <h1 className='text-xl font-semibold'>La inspiración que necesitas en la cocina.</h1>
                <p>¿Qué hay para comer? Te ayudamos a responder esa pregunta diaria de manera fácil y deliciosa.</p>
                <ButtonCustom
                    text="Registrate"
                    onClick={handleButtonClick}
                />
            </div>

            <div className='absolute top-24 -z-10'>
                <img src="./heroimg.jpeg" alt="hortalizas en tabla de cortar" />
            </div>

        </section>
    )
}
