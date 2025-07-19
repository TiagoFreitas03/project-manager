import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from './components/ui/sonner'
import { Router } from './router'
import './lib/date-fns'
import { queryClient } from './lib/react-query'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  )
}
