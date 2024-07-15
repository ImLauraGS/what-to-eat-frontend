import React from 'react'
import ButtonCustom from './ButtonCustom'
import { useNavigate } from 'react-router-dom';

export default function RecipeCard({title, description, id}) {
    const navigate = useNavigate();

    const handleButtonClick = () => {
      navigate('/recipe/{id}')
      
    };
    return (
        <div className='bg-background-green flex flex-col items-center text-center p-5 m-5 rounded-xl gap-4 shadow-md'>
            <h3>{title}</h3>
            <p>{description}</p>

            <ButtonCustom
                text="Ver más"
                onClick={handleButtonClick} />


        </div>
    )
}
