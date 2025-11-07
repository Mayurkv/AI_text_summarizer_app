import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Summary from './pages/Summary'
import AllSummaries from './pages/AllSummaries'

function App() {
  const [showHome, setShowHome] = useState<boolean>(true)
  const [showAllSummaries, setShowAllSummaries] = useState<boolean>(false);
  return (
    <div className="min-h-screen bg-gray-50 dark:border-gray-500 dark:bg-gray-800 flex items-center justify-center text-white text-2xl">
      {
        showHome
          ? <Home onShowHome = {() => setShowHome(false)} 
              onShowAllSummaries = {() => {
                setShowHome(false)
                setShowAllSummaries(true)
              }}
            />
          : (showAllSummaries
              ? <AllSummaries />
              : <Summary />
            )
      }
    </div>
  )
}

export default App