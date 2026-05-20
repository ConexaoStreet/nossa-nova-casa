import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import './App.css'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = localStorage.getItem('nossaCasaAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-purple-light text-xl font-display">Nossa Nova Casa</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      {isAuthenticated ? (
        <Dashboard onLogout={() => {
          setIsAuthenticated(false)
          localStorage.removeItem('nossaCasaAuth')
        }} />
      ) : (
        <Login onLogin={() => setIsAuthenticated(true)} />
      )}
    </div>
  )
}
