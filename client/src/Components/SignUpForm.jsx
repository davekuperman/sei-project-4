import { useState } from "react"
import { useAuth } from "../contexts/AuthProvider"
import { Navigate, useNavigate } from "react-router-dom"
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    FormErrorMessage,
} from "@chakra-ui/react"

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

    if (user) {
        return <Navigate to={"/home"} />
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <FormControl id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" name="email" placeholder="Enter Email" />
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" name="password" placeholder="Enter Password" />
                </FormControl>
                <FormControl id="confirmPassword" isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Re-enter Password"
                    />
                </FormControl>
                {passwordError && (
                    <Text color="red.500" mt={2} mb={4}>
                        {passwordError}
                    </Text>
                )}
                <FormControl id="first_name" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" name="first_name" placeholder="Enter First Name" />
                </FormControl>
                <FormControl id="last_name" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" name="last_name" placeholder="Enter Last Name" />
                </FormControl>
                <Button mt={4} colorScheme="teal" type="submit">
                    Sign Up
                </Button>
            </form>

        </>
    )
}

export default SignUpForm;
