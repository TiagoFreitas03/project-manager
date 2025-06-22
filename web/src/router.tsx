import { Routes, Route } from 'react-router'

import { Home } from './pages/home'
import { Project } from './pages/project'
import { Task } from './pages/task'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:slug" element={<Project />} />
      <Route path="/task/:id" element={<Task />} />
    </Routes>
  )
}
