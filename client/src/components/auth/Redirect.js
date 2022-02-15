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
    console.log("entra al navigate")
    return <Navigate to="/" />
  }

  return <div>Redirecting....</div>
}

export default Redirect

// useEffect(() => {
//   async function getMe() {
//     await fetch("http://localhost:5000/google-login-redirect", {
//       credentials: "include",
//     }).then((res) => setUser(res.data))
//   }

//   getMe()
// }, [])

// const res = await fetch("http://localhost:5000/google-login-redirect", {
//   method: "POST",
//   credentials: "include",
//   body: JSON.stringify({ name, email, password }),
//   headers: { "Content-Type": "application/json" },
// })
// const data = await res.json() // TODO por que necesita await???????????' https://developer.mozilla.org/en-US/docs/Web/API/Response/json
// console.log("data!!!!!!", data)
