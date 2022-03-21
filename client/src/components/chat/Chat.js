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
    console.log('Se dispara el evento emit "join"')
    console.log("[1;31m EL PUTO USER", user)
    console.log("[1;31m user.name", user.name)

    socket.emit("join", { name: user.name, room_id, user_id: user._id })
    console.log("[1;31m emitio el join con esta data", {
      name: user.name,
      room_id,
      user_id: user._id,
    })
  }, [user]) //! Este es el ultimo cambio, verificar que este haciendo lo que corresponde!

  useEffect(() => {
    //! Creo que no esta en uso, comprobar
    socket.on("users-list", (currentUsersList) => {
      console.log("[1;33m -------------------------")
      const filteredUsersByRoom = currentUsersList.filter(
        (connectedUser) => connectedUser.room_id === room_id
      )
      console.log('[1;33m "users-list" Emitio')
      console.log("[1;33m -------------------------")

      setUsersList(filteredUsersByRoom)
    })
  }, []) //! Esta bien esto????

  const sendMessage = (e) => {
    e.preventDefault()
    if (message) {
      console.log(message)
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
