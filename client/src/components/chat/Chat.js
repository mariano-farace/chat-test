import React, { useContext, useEffect, useState } from "react"
import io from "socket.io-client"
import { useParams } from "react-router-dom"
import { UserContext } from "../../UserContext"
import Input from "./Input"
import Messages from "./Messages"

let socket

function Chat() {
  const ENDPT = "localhost:5000"
  const { user, setUser } = useContext(UserContext)
  const { room_id, room_name } = useParams()
  const [message, setMessage] = useState("")

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
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
        {/* <Messages /> */}
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
