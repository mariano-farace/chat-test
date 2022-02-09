import React, { useState, useContext } from "react"
import { Navigate } from "react-router-dom"

function Login() {
  const { user, setUser } = useContext(UserContext)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  if (user) {
    return <Navigate to="/" />
  }

  return (
    <div className="row">
      <h2>Login</h2>
    </div>
  )
}

export default Login
