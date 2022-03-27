import React, { useContext } from "react"
import { UserContext } from "../../UserContext"
import SignedOutMenu from "./SignedOutMenu"
import SignedInMenu from "./SignedInMenu"
import { API_BASE_URL } from "../../config"

function Navbar() {
  const { user, setUser } = useContext(UserContext)

  const logout = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/logout`, {
        credentials: "include",
      })
      const data = res.json()
      console.log("logout data", data)
      localStorage.clear()
      setUser(null)
    } catch (error) {
      console.log(error)
    }
  }

  const menu = user ? <SignedInMenu logout={logout} /> : <SignedOutMenu />
  return (
    <>
      <nav className="green">
        <div className="nav-wrapper">
          {/* TODO por que href=# ?? */}
          {/* TODO por que usa href en vez del objeto de router Link? debe ser porque tiene que hacer llamada al back */}

          <a href="/" className="brand-logo">
            Chat
          </a>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>

          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {menu}
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-demo">
        {menu}
      </ul>
    </>
  )
}

export default Navbar
