import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../../UserContext"

function Home() {
  const { user, setUser } = useContext(UserContext)

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
          {/* <RoomList rooms={rooms} /> */}
        </div>
      </div>
    </div>
  )
}

export default Home
