import { useAuth } from "../contexts/AuthProvider";
import { useState, useEffect, createContext, useContext } from "react"

import UsersRecipes from "../Components/UsersRecipes";

const RecipesPage = () => {
    const { user } = useAuth()
    return (
        <>
        <UsersRecipes/>
        </>
    )
}

export default RecipesPage