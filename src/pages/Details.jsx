import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipe } from '../context/recipeContext';
import ButtonCustom from '../components/ButtonCustom';
import AlertConfirmation from '../components/AlertConfirmation';

export default function Details() {
    const { id } = useParams();
    const { fetchRecipe, addFavorites, isFavorite, deleteRecipe } = useRecipe();
    const [recipe, setRecipe] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        const getRecipeDetails = async () => {
            try {
                const data = await fetchRecipe(id);
                setRecipe(data);
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            }
        };

        getRecipeDetails();
    }, []);

    if (!recipe) {
        return <div>Cargando...</div>;
    }

    const currentUser = JSON.parse(localStorage.getItem('user'));

    const handleAddToFavorites = async () => {
        try {
            await addFavorites(id);
            setAlertMessage('Receta añadida a favoritos');
            setShowAlert(true);
            window.scrollTo(0, 0); 
            setTimeout(() => {
                setShowAlert(false);
                setAlertMessage('');
            }, 2000);
        } catch (error) {
            console.error('Error adding recipe to favorites:', error);
        }
    };

    const handleEditRecipe = () => {
        navigate(`/edit/recipe/${id}`);
    };

    const handleDeleteRecipe = async () => {
        try {
            await deleteRecipe(id);
            setAlertMessage('Receta eliminada correctamente');
            setShowAlert(true);
            window.scrollTo(0, 0); 
            setTimeout(() => {
                setShowAlert(false);
                setAlertMessage('');
                navigate('/favorites'); 
                window.location.reload();
            }, 2000); 
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    return (
        <section className='p-5 flex flex-col gap-4'>
            {showAlert && <AlertConfirmation text={alertMessage} status="success" />}
            <h1 className='text-3xl text-center font-bold'>{recipe.title}</h1>
            <div className='bg-bg-dark-green px-4 py-7'>
                <p className='text-lg mb-4 font-semibold'>Ingredientes y cantidades</p>
                <p>{recipe.ingredients}</p>
            </div>
            <div>
                <p className='text-lg mt-4'>{recipe.description}</p>
            </div>

            <ul className='flex flex-col gap-2'>
                <li className='flex gap-2'><img src="/tiktok.svg" alt="Tiktok" /><a href={recipe.tiktok}>Ver receta en Tiktok</a></li>
                <li className='flex gap-2'><img src="/teenyicons_youtube-solid.svg" alt="" /><a href={recipe.youtube}>Ver receta en Youtube</a></li>
            </ul>

            {!isFavorite(recipe.id) && (
                <ButtonCustom
                    text="Añadir a favoritos"
                    onClick={handleAddToFavorites}
                />
            )}

            {currentUser && currentUser.id === recipe.user_id && (
                <>
                    <ButtonCustom
                        text="Editar"
                        onClick={handleEditRecipe}
                    />

                    <ButtonCustom
                        text="Eliminar"
                        onClick={handleDeleteRecipe}
                    />
                </>
            )}
        </section>
    );
}
