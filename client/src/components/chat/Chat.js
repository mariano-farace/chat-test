import React, { useContext, useEffect, useState } from "react"
import io from "socket.io-client"
import { useParams, Navigate } from "react-router-dom"
import { UserContext } from "../../UserContext"
import Input from "./Input"
import Messages from "./Messages"
import "./Chat.css"

let socket

function Chat() {
  const ENDPT = "localhost:5000"
  const { user, setUser } = useContext(UserContext)
  const { room_id, room_name } = useParams()
  const [message, setMessage] = useState("")
  const [messageLog, setMessageLog] = useState([])

  useEffect(() => {
    socket = io(ENDPT)
    console.log('Se dispara el evento emit "join"')
    socket.emit("join", { name: user.name, room_id, user_id: user._id })
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()
    if (message) {
      console.log(message)
      socket.emit("sendMessage", message, room_id, () => setMessage(""))
      setMessage("")
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
      </div>
    </div>
  )
}

export default Chat
