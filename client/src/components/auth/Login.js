/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react"
import { Navigate } from "react-router-dom"
import { GoogleLoginButton } from "react-social-login-buttons"
import { API_BASE_URL } from "../../config"
import { UserContext } from "../../UserContext"
import "./Login.css"

function Login() {
  const { user, setUser } = useContext(UserContext)
  const [name, setName] = useState("") // TODO borrar?
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nameError, setNameError] = useState("")
  const [loginError, setLoginError] = useState("")

  const submitHandler = async (e) => {
    e.preventDefault()
    setNameError("")
    setLoginError("")

    try {
      const la_urls = `${API_BASE_URL}/login`
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        credentials: "include", // TODO ver que coñoo es esta opcion
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      })
      const data = await res.json()

      if (data.errors) {
        setLoginError(data.errors.login)
        setNameError(data.errors.name)
      }
      if (data.user) {
        setUser(data.user)
        localStorage.setItem("user", JSON.stringify(data.user))
      }
    } catch (error) {
      /*  handle it */
    }
  }

  const createGoogleAuthLink = async () => {
    try {
      // cambiar la url de  "http://localhost:5000/auth/google/url" a "http://localhost:8080/createAuthLink"

      const response = await fetch(`${API_BASE_URL}/auth/google/url`)
      const fetchedURL = await response.json()

      window.location.href = fetchedURL
    } catch (error) {
      throw new Error("Issue with Login", error.message)
    }
  }

  if (user) {
    return <Navigate to="/" />
  }

  return (
    <div className="row">
      <h2>Welcome</h2>

      <form className="login-form" onSubmit={submitHandler}>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="email"
              type="email"
              className="validate"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <input
              id="password"
              type="password"
              className="validate"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="password error red-text">{loginError}</div>
            <label htmlFor="password">Password</label>
          </div>
        </div>

        <button className="btn row" style={{ width: "100%" }}>
          Login
        </button>
        <div className="text-center pt-3">Or</div>
        <GoogleLoginButton
          buttonText="Login"
          className="mt-3 mb-3 "
          onClick={createGoogleAuthLink}
        />
      </form>
    </div>
  )
}

export default Login
