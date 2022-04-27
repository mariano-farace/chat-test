import React from "react"
import "./Input.css"
import { IconButton } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"

function Input({ message, setMessage, sendMessage }) {
  return (
    <form action="" onSubmit={sendMessage} className="form">
      <input
        id="input2"
        type="text"
        className="input"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
      />

      <IconButton
        onClick={sendMessage}
        variant="contained"
        color="primary"
        aria-label="upload picture"
        component="span"
        size="small"
      >
        <SendIcon
          style={{
            color: "white",
            background: "blue",
            borderRadius: "80% ",
            width: "40px",
            height: "40px",
          }}
          fontSize="large"
        />
      </IconButton>
    </form>
  )
}

export default Input
