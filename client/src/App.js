import './App.css';
import {  BrowserRouter,  Routes,  Route,} from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Signup from './components/auth/Signup';
import { UserContext } from './UserContext';
import React, { useEffect, useState } from 'react';

function App() {

  const [user, setUser] = useState(null)

  return (
    <BrowserRouter>
      <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
          <Navbar />
          <Routes>
            <Route path="/signup" element= {<Signup />} />
          </Routes>
          </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
