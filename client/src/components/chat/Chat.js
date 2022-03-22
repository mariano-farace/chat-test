import React, { useContext, useEffect, useState } from "react"
import io from "socket.io-client"
import { useParams, Navigate } from "react-router-dom"
import { UserContext } from "../../UserContext"
import Input from "./Input"
import Messages from "./Messages"
import "./Chat.css"
import UserPanel from "./UserPanel"

let socket

function Chat() {
  const ENDPT = "localhost:5000"
  const { user, setUser } = useContext(UserContext)
  const { room_id, room_name } = useParams()
  const [message, setMessage] = useState("")
  const [messageLog, setMessageLog] = useState([])
  //! Cual es el estado inicial???
  const [usersList, setUsersList] = useState([])

  useEffect(() => {
    socket = io(ENDPT)

    socket.emit("join", { name: user.name, room_id, user_id: user._id })
  }, [user]) //! Este es el ultimo cambio, verificar que este haciendo lo que corresponde! Creo que esta rompiendo lo del refresh

  useEffect(() => {
    //! Creo que no esta en uso, comprobar
    socket.on("users-list", (currentUsersList) => {
      const filteredUsersByRoom = currentUsersList.filter(
        (connectedUser) => connectedUser.room_id === room_id
      )

      setUsersList(filteredUsersByRoom)
    })
  }, []) //! Esta bien esto????

  const sendMessage = (e) => {
    e.preventDefault()
    if (message) {
      socket.emit("sendMessage", message, room_id, () => setMessage(""))
    }
  }

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      setMessageLog([...messageLog, newMessage])
    })
  })

  useEffect(() => {
    socket.emit("get-message-history", room_id)
    socket.on("message-history", (result) => {
      setMessageLog(result)
    })
  }, [])

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <div className="outerContainer">
      <div className="container">
        <Messages messageLog={messageLog} user_id={user._id} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
        <UserPanel usersList={usersList} />
      </div>
    </div>
  )
}

export default Chat
