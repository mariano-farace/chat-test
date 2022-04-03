import React, { useContext, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../../UserContext"
import { API_BASE_URL } from "../../config"

function Redirect() {
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
   
    async function getMe() {
     
     

      const response = await fetch(`${API_BASE_URL}/google-login-redirect`, {
        credentials: "include",
      })
     

      const data = await response.json()
     

     
      setUser(data.user)
    }

    getMe()
  }, [])

  if (user) {
    localStorage.setItem("user", JSON.stringify(user))

   

   
    return <Navigate to="/" />
  }

  return <div>Redirecting....</div>
}

export default Redirect
