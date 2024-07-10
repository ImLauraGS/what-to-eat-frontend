import React, { useState } from 'react';
import { useUser } from '../context/userContext';


const Register = () => {
    const { register } = useUser();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        privacyPolicies: false, 
    });

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
            console.log("Registration successful:", response.data);
        } catch (error) {
            if (error.response && error.response.data.validation_errors) {
                // Manejar errores de validación específicos del backend
                console.error("Validation errors:", error.response.data.validation_errors);
            } else {
                console.error("Error during registration:", error.response.data);
            }
        }
    };
    

    console.log(formData)

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />
            <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
            />
            <label>
                <input
                    type="checkbox"
                    name="privacyPolicies"
                    checked={formData.privacyPolicies}
                    onChange={handleChange}
                    required
                />
                Accept Privacy Policies
            </label>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
