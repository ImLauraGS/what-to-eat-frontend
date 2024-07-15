import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { UserProvider } from "./context/userContext";
import IngredientsProvider from "./context/ingredientsContext";
import { RecipeProvider } from "./context/recipeContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RecipeProvider>
      <IngredientsProvider>
        <RouterProvider router={router} />
      </IngredientsProvider>
      </RecipeProvider>
    </UserProvider>
  </React.StrictMode>,
);
