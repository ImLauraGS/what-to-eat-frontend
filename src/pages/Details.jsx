import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecipe } from '../context/recipeContext';
import ButtonCustom from '../components/ButtonCustom';
import AlertConfirmation from '../components/AlertConfirmation';


export default function Details() {
    const { id } = useParams();
    const { fetchRecipe, addFavorites, isFavorite, favorites } = useRecipe();
    const [recipe, setRecipe] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

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
    }, [id, fetchRecipe]);

    if (!recipe) {
        return <div>Cargando...</div>;
    }


    const handleAddToFavorites = async () => {
        try {
            await addFavorites(id);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);
        } catch (error) {
            console.error('Error adding recipe to favorites:', error);
        }
    };

    console.log(recipe.id)
    console.log(favorites)

    return (
        <section className='p-5 flex flex-col gap-4'>
            {showAlert && <AlertConfirmation text="Receta añadida a favoritos" status="success" />}
            <h1 className='text-3xl text-center text-bold'>{recipe.title}</h1>
            <div className='bg-bg-dark-green px-4 py-7'>
                <p className='text-lg mb-4 font-semibold'>Ingredientes y cantidades</p>
                <p>{recipe.ingredients}</p>
            </div>
            <div>
                <p className='text-lg mt-4'>{recipe.description}</p>
            </div>

            <ul className='flex flex-col gap-2'>
                <li className='flex gap-2'><img src="/tiktok.svg" alt="Tiktok" /><a href={recipe.tiktok}>Ver receta en Tiktok</a></li>
                <li className='flex gap-2'><img src="/teenyicons_youtube-solid.svg" alt="" /><a href={recipe.tiktok}>Ver receta en Youtube</a></li>
            </ul>
            
            {!isFavorite(recipe.id) && (
                <ButtonCustom
                    text="Añadir a favoritos"
                    onClick={handleAddToFavorites}
                />
            )}

        </section>
    );
}
