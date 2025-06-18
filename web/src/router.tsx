import { Routes, Route } from 'react-router'
import { Home } from './pages/home'
import { Project } from './pages/project'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:slug" element={<Project />} />
    </Routes>
  )
}
