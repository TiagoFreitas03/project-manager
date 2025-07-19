import { Routes, Route } from 'react-router'
import { Home } from './pages/home'
import { Project } from './pages/project'
import { Task } from './pages/task'
import { Archive } from './pages/archive'
import { DefaultLayout } from './layouts/default-layout'
import { CardLayout } from './layouts/card-layout'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/project/:slug" element={<Project />} />
        <Route path="/archive/:projectId" element={<Archive />} />
      </Route>

      <Route path="/" element={<CardLayout />}>
        <Route path="/task/:id" element={<Task />} />
      </Route>
    </Routes>
  )
}
