import React from "react"

function SignedInMenu({ logout }) {
  return (
    <li onClick={logout}>
      <a href="#">Logout</a>
    </li>
  )
}

export default SignedInMenu
