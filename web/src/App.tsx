import './lib/date-fns'
import { Toaster } from './components/ui/sonner'
import { Router } from './router'

export function App() {
  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="max-w-7xl w-full max-h-[48rem] h-full border-2 rounded m-4 bg-neutral-900 p-4">
          <Router />
        </div>
      </div>

      <Toaster />
    </>
  )
}
