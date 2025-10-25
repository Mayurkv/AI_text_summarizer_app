import { useState } from 'react'
import './App.css'
import Home from './pages/home'
import Summary from './pages/summary'

function App() {
  const [showHome, setShowHome] = useState<boolean>(true)
  return (
    <div className="min-h-screen bg-gray-50 dark:border-gray-500 dark:bg-gray-800 flex items-center justify-center text-white text-2xl">
      {
        showHome ?
          <Home onShowHome = {() => setShowHome(false)} /> :
          <Summary />
      }
    </div>
  )
}

export default App