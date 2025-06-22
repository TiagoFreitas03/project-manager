import { KanbanSquare } from 'lucide-react'

import { TasksColumn } from './tasks-column'
import { CreateTaskDialog } from './create-task-dialog'
import { ProjectDetailsDialog } from './project-details-dialog'
import { EditProjectDialog } from './edit-project-dialog'
import { DeleteProjectDialog } from './delete-project-dialog'
import type { Project as ProjectType } from '@/interfaces/project'
import type { Task } from '@/interfaces/task'
import { Header } from '@/components/header'
import { Status } from '@/enums/status'

const project: ProjectType = {
  id: 'p-1',
  name: 'Projeto 1',
  description: 'Descricao do projeto 1',
  repositoryUrl: 'http://www.github.com/TiagoFreitas03/project-manager',
  createdAt: new Date(),
  updatedAt: new Date(),
}

const tasks: Task[] = Array.from({ length: 21 })
  .map((_, index) => {
    return {
      id: index.toString(),
      name: `Task ${index + 1}`,
      status:
        index < 7 ? Status.TO_DO : index < 14 ? Status.DOING : Status.DONE,
      priority: (index % 3) + 1,
      createdAt: new Date(2025, index % 12, 1),
      updatedAt: new Date(2025, index % 12, (index % 30) + 1),
    }
  })
  .sort((a, b) => {
    if (a.priority > b.priority) {
      return 1
    }

    if (a.priority < b.priority) {
      return -1
    }

    return 0
  })

const todoTasks = tasks.filter((task) => task.status === 'TO_DO')
const doingTasks = tasks.filter((task) => task.status === 'DOING')
const doneTasks = tasks.filter((task) => task.status === 'DONE')

export function Project() {
  return (
    <>
      <Header>
        <span className="flex items-center gap-3 font-bold text-lg uppercase tracking-widest">
          <KanbanSquare color="white" /> {project.name}
        </span>

        <div className="flex gap-2">
          <CreateTaskDialog projectId={project.id} />

          <ProjectDetailsDialog data={project} />

          <EditProjectDialog data={project} />

          <DeleteProjectDialog id={project.id} />
        </div>
      </Header>

      <div className="grid grid-cols-3 mt-2 gap-2">
        <TasksColumn status={Status.TO_DO} tasks={todoTasks} />

        <TasksColumn status={Status.DOING} tasks={doingTasks} />

        <TasksColumn status={Status.DONE} tasks={doneTasks} />
      </div>
    </>
  )
}
