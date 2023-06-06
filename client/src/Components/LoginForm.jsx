import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const LoginForm = () => {

    const { login, user } = useAuth()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const fields = Object.fromEntries(new FormData(event.target))
        try {
            await login(fields)
        } catch (err) {
            console.log(err)
        }
    }
    if (user) {
        return <Navigate to={"/"} />
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <input type="text" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="password" />
            <input type="submit" value="Login" />
        </form>
        <Link to="/signup">Register Here</Link>
        </>


    )
}
export default LoginForm