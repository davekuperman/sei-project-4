import { Link, Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthProvider"
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
  } from "@chakra-ui/react"



const LoginForm = () => {

    const { login, user } = useAuth()

    const handleSubmit = async (event) => {
        event.preventDefault()
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
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="text" name="email" placeholder="Email" />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" placeholder="Password" />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Login
        </Button>
      </form>
      <Text mt={2}>
        Don't have an account?{" "}
        <Link to="/signup" color="teal.500">
          Register Here
        </Link>
      </Text>
        </>


    )
}
export default LoginForm