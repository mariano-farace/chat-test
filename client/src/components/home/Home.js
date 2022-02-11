import React, { useContext, useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import io from "socket.io-client"
import { UserContext } from "../../UserContext"
import RoomList from "./RoomList"

let socket // TODO poner esta variable adentro del useEffect

function Home() {
  const { user, setUser } = useContext(UserContext)

  const ENDPT = "localhost:5000"
  useEffect(() => {
    socket = io(ENDPT)
    console.log("use effect de socket.io")
    return () => {
      socket.disconnect()
      socket.off()
    }
  }, [])

  const roomState = [
    { _id: "6202c4a8f8acc375159aea14", name: "Room 1", __v: 0 },
    { _id: "6202c4a8f8acc375159aea14", name: "Room 2", __v: 0 },
  ]

  const [rooms, setRooms] = useState(roomState)

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      <div className="row">
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">
                Welcome {user ? user.name : ""}
              </span>
              <form>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      placeholder="Enter a room name"
                      id="room"
                      type="text"
                      className="validate"
                    />
                    <label htmlFor="room">Room</label>
                  </div>
                </div>
                <button className="btn">Create Room</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col s6 m5 offset-1">
          <RoomList rooms={rooms} />
        </div>
      </div>
    </div>
  )
}

export default Home
