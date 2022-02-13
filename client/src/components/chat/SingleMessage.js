import React from "react"
import "./SingleMessage.css"

function SingleMessage({ message: { room_id, text }, current_uid }) {
  return (
    <div className="row left-align">
      <div className="col s12 m8 16 left">
        <p className="opponent">
          {current_uid}: {text}
        </p>
      </div>
    </div>
  )
}

export default SingleMessage
