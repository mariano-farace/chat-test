import React, { useContext } from "react"
import { UserContext } from "../../UserContext"

function Home() {
  const { user, setUser } = useContext(UserContext)
  return (
    <div>
      This is Home. El usuario logueado es: {user ? user.name : "Nadie"}
    </div>
  )
}

export default Home
