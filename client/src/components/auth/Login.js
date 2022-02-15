import React, { useState, useContext, useEffect } from "react"
import { Navigate } from "react-router-dom"
import GoogleButton from "react-google-button"
import { UserContext } from "../../UserContext"

function Login() {
  const { user, setUser } = useContext(UserContext)
  const [name, setName] = useState("") // TODO borrar?
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [googleAuthURL, setGoogleAuthURL] = useState("")

  const submitHandler = async (e) => {
    e.preventDefault()
    setEmailError("")
    setNameError("")
    setPasswordError("")
    console.log(name, email, password)

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        credentials: "include", // TODO ver que coñoo es esta opcion
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      })
      const data = await res.json()
      console.log("data!!!!!!", data)

      if (data.errors) {
        setEmailError(data.errors.email)
        setNameError(data.errors.name)
        setPasswordError(data.errors.password)
      }
      if (data.user) {
        setUser(data.user)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // TODO try catch?
    async function fetchGoogleAuthUrl() {
      // You can await here
      const response = await fetch("http://localhost:5000/auth/google/url", {
        credentials: "include",
      })
      const fetchedURL = await response.json(response)
      console.log("al menos para por el fetch")
      console.log("googleAuthURL", fetchedURL)

      setGoogleAuthURL(fetchedURL)
    }
    fetchGoogleAuthUrl()
  }, [])

  if (user) {
    console.log("entra al navigate")
    return <Navigate to="/" />
  }

  return (
    <div className="row">
      <h2>Login</h2>

      <form className="col s12" onSubmit={submitHandler}>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="email"
              type="email"
              className="validate"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="email error red-text">{emailError}</div>
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

            <div className="password error red-text">{passwordError}</div>
            <label htmlFor="password">Password</label>
          </div>
        </div>

        <button className="btn">Login</button>
        <GoogleButton
          onClick={() => {
            window.location.href = googleAuthURL
          }}
        />
      </form>
    </div>
  )
}

export default Login
