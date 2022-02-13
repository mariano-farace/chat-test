import React from "react"
import "./SingleMessage.css"

function SingleMessage({ message: { name, user_id, text }, current_uid }) {
  return (
    <div className="row left-align">
      <div className="col s12 m8 16 left">
        <p className="opponent">
          {name}: {text}
        </p>
      </div>
    </div>
  )
}

export default SingleMessage
