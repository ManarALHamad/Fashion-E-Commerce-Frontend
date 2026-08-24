import Nav from "./components/Nav"
import SignUpForm from "./pages/SignUpForm"
import './App.css'
import { Routes, Route } from "react-router"
import { useState } from "react"
import SignInForm from "./pages/SignInForm"
import Home from "./pages/Home"

const getUserFromToken = () => {
  const token = localStorage.getItem('token')

  if (!token) return null

  return JSON.parse(atob(token.split('.')[1])).payload
}

const App = () => {

  const [user, setUser] = useState(getUserFromToken())
  
  return (
    <div>
      <Nav user={user} setUser={setUser} />
      <main className="app-main">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/auth/sign-up' element={<SignUpForm setUser={setUser} />} />
        <Route path='/auth/sign-in' element={<SignInForm setUser={setUser} />} />
      </Routes>
      </main>
    </div>
  )
}

export default App