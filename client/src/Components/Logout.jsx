import { useAuth } from "../contexts/AuthProvider"
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.target))
    try {
      await logout(fields)
      navigate("/")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="submit" value="Logout" />
    </form>
  );
};

export default Logout