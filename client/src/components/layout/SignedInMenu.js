/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react"

function SignedInMenu({ logout }) {
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li onClick={logout}>
      <a href="#">Logout</a>
    </li>
  )
}

export default SignedInMenu
