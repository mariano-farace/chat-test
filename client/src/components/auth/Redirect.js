import React, { useContext, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../../UserContext"

function Redirect() {
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    async function getMe() {
      const response = await fetch(
        "http://localhost:5000/google-login-redirect",
        {
          credentials: "include",
        }
      )
      const fetchedUser = await response.json(response)
      setUser(fetchedUser)
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
