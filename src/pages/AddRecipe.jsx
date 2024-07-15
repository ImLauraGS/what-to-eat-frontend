import React, { useState } from 'react';
import { useRecipe } from '../context/recipeContext';
import ButtonCustom from '../components/ButtonCustom';
import { useNavigate } from 'react-router-dom';
import AlertConfirmation from '../components/AlertConfirmation';

export default function AddRecipe() {
    const { addRecipe } = useRecipe();
    const [showAlert, setShowAlert] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        ingredients: '',
        description: '',
        tiktok: '',
        youtube: '',
    });
    const navigate = useNavigate();

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
            const response = await addRecipe(formData);
            console.log("Receta añadida");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                navigate('/');
                
            }, 2000);
        } catch (error) {
            console.error("Error al añadir receta:", error);
        
        }
    };

    return (
        <section>
            <h1 className='text-2xl font-semibold p-5'>Añadir receta</h1>
            {showAlert && <AlertConfirmation text="La receta se ha añadido correctamente" status="success" />}
            <form className='flex flex-col items-center' onSubmit={handleSubmit}>
                <section className='bg-bg-dark-green w-full flex flex-col px-6 py-9 gap-5 mb-5' >
                    <label className='text-lg font-medium'>Titulo receta:
                        <input
                            className='w-full bg-white border rounded-lg p-2 placeholder:font-normal placeholder:text-base'
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Titulo"
                            required
                        />
                    </label>
                    <label className='text-lg font-medium'>Ingredientes y cantidades:
                        <input
                            className='w-full bg-white border rounded-lg p-2 placeholder:font-normal placeholder:text-base'
                            type="text"
                            name="ingredients"
                            value={formData.ingredients}
                            onChange={handleChange}
                            placeholder="Ingredients"
                            required
                        />
                    </label>

                    <label className='text-lg font-medium'>Descripción e instrucciones:
                        <input
                            className='w-full bg-white border rounded-lg p-2 placeholder:font-normal placeholder:text-base'
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Descripción"
                            required
                        />
                    </label>

                    <label className='text-lg font-medium'>Enlace Tiktok:
                        <input
                            className='w-full bg-white border rounded-lg p-2 placeholder:font-normal placeholder:text-base'
                            type="text"
                            name="tiktok"
                            value={formData.tiktok}
                            onChange={handleChange}
                            placeholder="Enlace tiktok"
                            required
                        />
                    </label>

                    <label className='text-lg font-medium'>Enlace Youtube:
                        <input
                            className='w-full bg-white border rounded-lg p-2 placeholder:font-normal placeholder:text-base'
                            type="text"
                            name="youtube"
                            value={formData.youtube}
                            onChange={handleChange}
                            placeholder="Enlace youtube"
                            required
                        />
                    </label>
                </section>
                <ButtonCustom
                    text="Añadir receta"
                    type="submit"
                />

            </form>
        </section>
    );
}
