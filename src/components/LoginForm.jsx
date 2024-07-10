import React, { useState, useEffect } from 'react';
import { useUser } from '../context/userContext';
import ButtonCustom from './ButtonCustom';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const { login } = useUser();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
  
    useEffect(() => {
      const userToken = localStorage.getItem('token');
      if (userToken) {
        navigate('/');
      }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
            alert('login correcto')
            navigate('/');
        } catch (error) {
            console.error("Error during login:", error.response.data);
        }
    };

    return (
        <form className='flex flex-col items-center' onSubmit={handleSubmit}>
            <h1 className='text-2xl font-semibold p-5'>Iniciar Sesion</h1>
            <section className='bg-bg-dark-green w-full flex flex-col px-6 py-9 gap-5 mb-5' >
                <label className='text-lg font-medium'>Correo electronico:
                    <input
                        className='w-full bg-white border rounded-lg p-2 placeholder:font-normal placeholder:text-base'
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Correo electronico"
                        required
                    />
                </label>
                <label className='text-lg font-medium'>Contraseña:
                    <input
                        className='w-full bg-white border rounded-lg p-2 placeholder:font-normal placeholder:text-base'
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Contraseña"
                        required
                    />
                </label>
            </section>
            <ButtonCustom
                text="Iniciar sesion"
                type="submit"
            />
            
            <p className='mt-5 text-lg'>¿No tienes cuenta? <a className="font-semibold text-[#6CBD98]" href="/register">Regístrate ahora</a>.</p>

        </form>
    );
}
