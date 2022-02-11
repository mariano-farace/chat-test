import React from "react"
import "./Input.css"

function Input({ message, setMessage }) {
  return (
    <form className="form">
      <input
        type="text"
        className="input"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="sendButton">Send Message</button>
    </form>
  )
}

export default Input
