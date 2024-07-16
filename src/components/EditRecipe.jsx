import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipe } from '../context/recipeContext';
import AlertConfirmation from '../components/AlertConfirmation';
import ButtonCustom from '../components/ButtonCustom';

export default function EditRecipe() {
    const { id } = useParams(); // Obtener el ID de la receta desde la URL
    const { updateRecipe, fetchRecipe } = useRecipe();
    const [showAlert, setShowAlert] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        ingredients: '',
        description: '',
        tiktok: '',
        youtube: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const recipeDetails = await fetchRecipe(id); // Obtener los detalles de la receta actual
                setFormData({
                    title: recipeDetails.title,
                    ingredients: recipeDetails.ingredients,
                    description: recipeDetails.description,
                    tiktok: recipeDetails.tiktok,
                    youtube: recipeDetails.youtube,
                });
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            }
        };

        fetchRecipeDetails();
    }, [id, fetchRecipe]);

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
            const response = await updateRecipe(id, formData); // Llama a updateRecipe con el ID y los datos actualizados
            console.log("Receta actualizada");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                navigate('/');
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error("Error al actualizar receta:", error);
        }
    };

    return (
        <section>
            <h1 className='text-2xl font-semibold p-5 text-center'>Editar receta</h1>
            {showAlert && <AlertConfirmation text="La receta se ha actualizado correctamente" status="success" />}
            <form className='flex flex-col items-center' onSubmit={handleSubmit}>
                <section className='bg-bg-dark-green w-full flex flex-col px-6 py-10 gap-9 mb-9'>
                    <label className='text-lg font-medium'>Título de receta:
                        <input
                            className='w-full bg-white border rounded-lg p-2 placeholder:font-normal placeholder:text-base'
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Título"
                            required
                        />
                    </label>
                    <label className='text-lg font-medium'>Ingredientes y cantidades:
                        <input
                            className='w-full bg-white border rounded-lg h-60 p-2 placeholder:font-normal placeholder:text-base'
                            type="text"
                            name="ingredients"
                            value={formData.ingredients}
                            onChange={handleChange}
                            placeholder="Ingredientes"
                            required
                        />
                    </label>

                    <label className='text-lg font-medium'>Descripción e instrucciones:
                        <input
                            className='w-full bg-white h-60 border rounded-lg p-2 placeholder:font-normal placeholder:text-base'
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
                    text="Actualizar receta"
                    type="submit"
                />
            </form>
        </section>
    );
}
