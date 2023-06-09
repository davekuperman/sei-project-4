import { useAuth } from "../contexts/AuthProvider";
import { useState } from "react";
import Home from "../Components/Home";
//import logout from "logout"

const HomePage = () =>{
    const { user, isLoadingUser } = useAuth()

    return(
        <>
        <Home/>
          
        </>
    )
}

export default HomePage