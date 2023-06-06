import { useAuth } from "../contexts/AuthProvider";
import { useState, useEffect, createContext, useContext } from "react"

const HomePage = () => {
    const { user } = useAuth()
    return (
        <div>
            <p>Welcome back {user?.first_name}</p>
            
        </div>
    )
}

export default HomePage