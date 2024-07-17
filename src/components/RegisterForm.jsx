import React, { useState, useEffect } from 'react';
import { useUser } from '../context/userContext';
import ButtonCustom from './ButtonCustom';
import { useNavigate } from 'react-router-dom';
import AlertConfirmation from './AlertConfirmation';


const Register = () => {
    const { register } = useUser();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        privacyPolicies: false,
    });
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
  
    useEffect(() => {
      const userToken = localStorage.getItem('token');
      if (userToken) {
        navigate('/');
      }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await register(formData);
            console.log("Registration successful");
            setShowAlert(true);
            window.scrollTo(0, 0);
            setTimeout(() => {
                setShowAlert(false);
                navigate('/');
                window.location.reload();
            }, 2000); 
        } catch (error) {
            if (error.response && error.response.data.validation_errors) {
                console.error("Validation errors:", error.response.data.validation_errors);
            } else {
                console.error("Error during registration:", error.response.data);
            }
        }
    };

    return (
        <form className='flex flex-col items-center' onSubmit={handleSubmit}>
            <h1 className='text-2xl font-semibold p-5'>¡Unete a What to Eat!</h1>
            {showAlert && <AlertConfirmation text="Registro exitoso!" status="success" />}
            <section className='bg-bg-dark-green w-full flex flex-col px-6 py-10 gap-5 mb-5' >
                <label className='text-lg font-medium'>Nombre:
                <input
                    className='w-full bg-white border rounded-lg p-2 placeholder:font-normal placeholder:text-base'
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nombre"
                    required
                />
                </label>
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
                <label className='text-lg font-medium'>Repite la contraseña:
                <input
                    className='w-full bg-white border rounded-lg p-2 placeholder:font-normal placeholder:text-base'
                    type="password"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    placeholder="Repite la contraseña"
                    required
                />
                </label>
                <label className='flex gap-3 text-lg font-medium'>
                    <input
                        type="checkbox"
                        name="privacyPolicies"
                        checked={formData.privacyPolicies}
                        onChange={handleChange}
                        required
                    />
                    Acepto la politica de privacidad.
                </label>

            </section>
            <ButtonCustom
                text="Registrate"
                type="submit"
            />

            <p className='mt-5 text-lg'>¿Ya tienes cuenta? <a className="font-semibold text-[#6CBD98]" href="/login">Iniciar sesión</a>.</p>

        </form>

    );
};

export default Register;
