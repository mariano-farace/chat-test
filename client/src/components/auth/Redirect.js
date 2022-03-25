import React, { useContext, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../../UserContext"

function Redirect() {
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    console.log("paso por el redirect")
    async function getMe() {
      const response = await fetch(
        "http://localhost:5000/google-login-redirect",
        {
          credentials: "include",
        }
      )
      const fetchedUser = await response.json(response)
      console.log(fetchedUser)
      setUser(fetchedUser)
    }

    getMe()
  }, [])

  if (user) {
    localStorage.setItem("user", JSON.stringify(user))

    console.log("[1;35m user", user)

    console.log("entra al navigate")
    return <Navigate to="/" />
  }

  return <div>Redirecting....</div>
}

export default Redirect
