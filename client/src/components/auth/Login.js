import React, { useState, useContext } from "react"
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
      const data = await res.json() // TODO por que necesita await???????????' https://developer.mozilla.org/en-US/docs/Web/API/Response/json
      console.log("data!!!!!!", data)

      if (data.errors) {
        setEmailError(data.errors.email)
        setNameError(data.errors.name) // TODO borrar esto, porque no se esta usando
        setPasswordError(data.errors.password)
      }
      if (data.user) {
        setUser(data.user)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   // TODO try catch?
  //   async function fetchGoogleAuthUrl() {
  //     // You can await here
  //     const googleAuthUrl = await fetch(
  //       "http://localhost:5000/auth/google/url",
  //       {
  //         credentials: "include",
  //       }
  //     )
  //     // ...
  //   }
  //   fetchGoogleAuthUrl()
  // }, [])

  const onClickGoogle = async () => {
    try {
      const googleAuthUrl = await fetch(
        "http://localhost:5000/auth/google/url",
        {
          credentials: "include",
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

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
            onClickGoogle()
          }}
        />
        <div className="App">
          <a href="https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?access_type=offline&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&response_type=code&client_id=906814864212-1crt34p93h43uc9f70jl6sdqkldvkaer.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Flogin%2Fgoogle-auth&flowName=GeneralOAuthFlow">
            LOGIN WITH GOOGLE
          </a>
        </div>
      </form>
    </div>
  )
}

export default Login
