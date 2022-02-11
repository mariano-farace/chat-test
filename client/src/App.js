import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import React, { useEffect, useState } from "react"
import Navbar from "./components/layout/Navbar"
import Signup from "./components/auth/Signup"
import { UserContext } from "./UserContext"
import Home from "./components/home/Home"
import Login from "./components/auth/Login"
import Chat from "./components/chat/Chat"

function App() {
  const [user, setUser] = useState(null)

  return (
    <BrowserRouter>
      <div className="App">
        <UserContext.Provider value={{ user, setUser }}>
          <Navbar />
          <Routes>
            {/* TODO ver por que usa "element" en vez de "component" creo que es una cosa de versiones */}
            <Route exact path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat/:room_id/:room_name" element={<Chat />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  )
}

export default App
