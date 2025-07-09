import './lib/date-fns'
import { Toaster } from './components/ui/sonner'
import { Router } from './router'

export function App() {
  return (
    <>
      <Router />
      <Toaster />
    </>
  )
}
