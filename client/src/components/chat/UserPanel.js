import React, { useContext } from "react"
import "./UserPanel.css"
import { UserContext } from "../../UserContext"

export default function UserPanel({ usersList }) {
  const { user, setUser } = useContext(UserContext)

  // The userList has an object with no name, it looks like the room itself, this filter is intended to remove it a not cause error when iterating over it on map
  const filterUsers = usersList.filter(
    (
      connectedUser // TODO esta logica la podria pasar un nivel mas arriba, al use effect del chat y unirlo con el filter del room_id
    ) => connectedUser.name !== undefined && connectedUser.name !== user.name
  )

  const userNamesList = filterUsers.map((connectedUser) => (
    <li key={connectedUser.socket_id}>{connectedUser.name}</li>
  ))

  return (
    <div className="panelContainer">
      Online Users {"\n"}
      <ul>{userNamesList}</ul>,
    </div>
  )
}
