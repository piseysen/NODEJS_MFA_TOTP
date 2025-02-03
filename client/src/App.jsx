import { useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { SessionProvider } from './context/SessionContext'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
     <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-purple-900 flex items-center justify-center w-full">
      <SessionProvider>
        <RouterProvider router={router} />
      </SessionProvider>
    </div>
   </>
  )
}

export default App
