import { useState } from "react"
import { useAuth } from "../contexts/AuthProvider"
import { Navigate, useNavigate } from "react-router-dom"

const SignUpForm = () => {
    const { signUp, user } = useAuth()
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const fields = Object.fromEntries(new FormData(e.target))

        if (fields.password !== fields.confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }
        try {
            await signUp(fields)
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }

    if (user){
        return <Navigate to={"/home"}/>
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" placeholder="Enter Email" />
                <input type="password" name="password" placeholder="Enter Password" />
                <input type="password" name="confirmPassword" placeholder="Re-enter Password" />
                {passwordError && <p>{passwordError}</p>}
                <input type="text" name="first_name" placeholder="Enter First Name" />
                <input type="text" name="last_name" placeholder="Enter Last Name" />
                <input type="submit" value="Sign Up" />
            </form>

        </>
    )
}

export default SignUpForm;
