import { useEffect } from "react";

import SignUpForm from "../Components/SignUpForm";

const SignUp = () => {
    useEffect(()=>{
        document.title = "Register Page"
    },[]);
    return(
        <div>
            <h1>Register</h1>
            <SignUpForm/>
        </div>
    )
}

export default SignUp