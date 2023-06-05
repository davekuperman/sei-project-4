import 
import { useAuth } from "../contexts/AuthProvider";

const Home = () => {
    const { user } = useAuth()
    return (
        <div>
            <p>Welcome back {user?.first_name}</p>
        </div>
    )
}