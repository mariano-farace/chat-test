import React from "react"
import STB from "react-scroll-to-bottom"
import SingleMessage from "./SingleMessage"
import "./Messages.css"

function Messages({ messageLog, user_id }) {
  return (
    <STB className="messages">
      {messageLog.map((message) => (
        <SingleMessage message={message} current_uid={user_id} />
      ))}
    </STB>
  )
}

export default Messages
