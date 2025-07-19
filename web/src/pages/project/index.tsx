import { Archive, KanbanSquare } from 'lucide-react'
import { CreateTaskDialog } from './create-task-dialog'
import { ProjectDetailsDialog } from './project-details-dialog'
import { EditProjectDialog } from './edit-project-dialog'
import { DeleteProjectDialog } from './delete-project-dialog'
import { Header } from '@/components/header'
import { Link, useParams } from 'react-router'
import { getProjectBySlug } from '@/api/get-project-by-slug'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { TasksBoard } from './tasks-board'

export function Project() {
  const { slug = '' } = useParams<{ slug: string }>()

  const { data: project } = useQuery({
    queryKey: ['project', slug],
    queryFn: () => getProjectBySlug(slug),
  })

  if (!project) {
    return <h1>Projeto não encontrado.</h1>
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

          <Link to={`/archive/${project.id}`} title="Tarefas arquivadas">
            <Button>
              <Archive />
            </Button>
          </Link>
        </div>
      </Header>

      <TasksBoard projectId={project.id}></TasksBoard>
    </>
  )
}
