import React, { createContext, useState } from 'react';
import ingredientsData from '../data/ingredients.json';

export const IngredientsContext = createContext();

const IngredientsProvider = ({ children }) => {
    const [ingredients, setIngredients] = useState(ingredientsData);

    return (
        <IngredientsContext.Provider value={{ ingredients, setIngredients }}>
            {children}
        </IngredientsContext.Provider>
    );
};

export default IngredientsProvider;
