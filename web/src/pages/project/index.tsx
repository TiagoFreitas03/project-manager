import { KanbanSquare } from 'lucide-react'
import { TasksColumn } from './tasks-column'
import { CreateTaskDialog } from './create-task-dialog'
import { ProjectDetailsDialog } from './project-details-dialog'
import { EditProjectDialog } from './edit-project-dialog'
import { DeleteProjectDialog } from './delete-project-dialog'
import type { Project as ProjectType } from '@/interfaces/project'
import type { Task } from '@/interfaces/task'
import { Header } from '@/components/header'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { getProjectBySlug } from '@/api/get-project-by-slug'

const tasks: Task[] = Array.from({ length: 21 })
  .map((_, index) => {
    return {
      id: index.toString(),
      name: `Task ${index + 1}`,
      status: index < 7 ? 'TO_DO' : index < 14 ? 'DOING' : 'DONE',
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
  const { slug } = useParams<{ slug: string }>()

  const [project, setProject] = useState<ProjectType>()

  useEffect(() => {
    if (slug) {
      getProjectBySlug(slug).then((data) => setProject(data))
    }
  }, [slug])

  if (!project) {
    return <></>
  }

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
        <TasksColumn status={'TO_DO'} tasks={todoTasks} />

        <TasksColumn status={'DOING'} tasks={doingTasks} />

        <TasksColumn status={'DONE'} tasks={doneTasks} />
      </div>
    </>
  )
}
