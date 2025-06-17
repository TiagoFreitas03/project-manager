import { Routes, Route } from 'react-router'
import { Home } from './pages/home'
import { ProjectDetail } from './pages/project-detail'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:slug" element={<ProjectDetail />} />
    </Routes>
  )
}
