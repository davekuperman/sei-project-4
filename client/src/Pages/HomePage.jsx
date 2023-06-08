import { useAuth } from "../contexts/AuthProvider";
import { useState, useEffect, createContext, useContext } from "react"
import IngredientInputForm from "../Components/IngredientInputForm";

const HomePage = () => {
    const { user } = useAuth()
    return (
        <div>
            <p>Welcome back {user?.first_name}</p>
            <IngredientInputForm/>
            
        </div>
    )
}

export default HomePage