import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

const AuthContext = createContext({})

export const useAuth = () => {
    return useContext(AuthContext)
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoadingUser, setIsLoadingUser] = useState(true)
    const navigate = useNavigate()

    // when a component is mounted, check that the user is logged in. If they are set the user as logged in
    useEffect(() => {

        const loginCheck = async () => {
            const res = await fetch("/api/session")
            const user = await res.json()
            if (res.status === 200) setUser(user)
        }
        setIsLoadingUser(true)
        loginCheck()
        setIsLoadingUser(false)
    }, [])

    //function that logs in a user
    const login = async (fields) => {
        const res = await fetch("/api/session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(fields),
        });
        const data = await res.json()
        if (res.status !== 200) {
            throw {
                status: res.status,
                message: data.message,
            };
        }
        setUser(data);
        console.log("you are logged in:", data)
    };

    //function that logs out the user
    const logout = async () => {
        const res = await fetch("/api/session", {
            method: "DELETE",
        })
        setUser(null)
    }

    //function that signs up a user
    const signUp = async (fields) => {
        const res = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(fields),
        })
    }



    return (
        <AuthContext.Provider value={{ user, login, logout, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}