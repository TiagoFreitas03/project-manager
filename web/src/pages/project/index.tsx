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
import { fetchProjectTasks } from '@/api/fetch-project-tasks'

interface ProjectTasks {
  toDoTasks: Task[]
  doingTasks: Task[]
  doneTasks: Task[]
}

export function Project() {
  const { slug } = useParams<{ slug: string }>()

  const [project, setProject] = useState<ProjectType>()
  const [tasks, setTasks] = useState<ProjectTasks>({
    toDoTasks: [],
    doingTasks: [],
    doneTasks: [],
  })

  useEffect(() => {
    if (slug) {
      getProjectBySlug(slug).then((data) => {
        setProject(data)

        fetchProjectTasks(data.id).then((data) => setTasks(data))
      })
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
        <TasksColumn status={'TO_DO'} tasks={tasks.toDoTasks} />

        <TasksColumn status={'DOING'} tasks={tasks.doingTasks} />

        <TasksColumn status={'DONE'} tasks={tasks.doneTasks} />
      </div>
    </>
  )
}
