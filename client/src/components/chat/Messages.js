import React from "react"
import STB from "react-scroll-to-bottom"
import SingleMessage from "./SingleMessage"
import "./Messages.css"

function Messages({ messageLog, user_id }) {
  return (
    <STB className="messages">
      {messageLog.map((message) => (
        <SingleMessage
          key={message._id}
          current_uid={user_id}
          message={message}
        />
      ))}
    </STB>
  )
}

export default Messages
