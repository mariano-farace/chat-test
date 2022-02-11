import React, { useContext, useEffect, useState } from "react"

import { UserContext } from "../../UserContext"
import Input from "./Input"
import Messages from "./Messages"

function Chat() {
  const [message, setMessage] = useState("")

  return (
    <div className="outerContainer">
      <div className="container">
        {/* <Messages /> */}
        <Input message={message} setMessage={setMessage} />
      </div>
    </div>
  )
}

export default Chat
