import React from "react"
import STB from "react-scroll-to-bottom"
import SingleMessage from "./SingleMessage"
import "./Messages.css"

function Messages({ messages, user_id }) {
  return (
    <STB className="messages">
      {messages.map((message) => (
        <SingleMessage />
      ))}
    </STB>
  )
}

export default Messages
