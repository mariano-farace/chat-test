import React, {  useContext } from 'react'
import { UserContext } from "../../UserContext"


const Home = () => {
    const { user, setUser } = useContext(UserContext);
    return (
        <div>El usuario logueado es: { user? user.name : "Nadie"}</div>
    )
}

export default Home