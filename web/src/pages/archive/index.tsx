import { fetchProjectTasks } from '@/api/fetch-project-tasks'
import { Header } from '@/components/header'
import { PriorityBadge } from '@/components/priority-badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Archive as ArchiveIcon } from 'lucide-react'
import { Link, useParams } from 'react-router'

export function Archive() {
  const { projectId = '' } = useParams<{ projectId: string }>()

  const { data: tasks } = useQuery({
    queryKey: ['archived-tasks', projectId],
    queryFn: () => fetchProjectTasks(projectId, true),
  })

  if (!tasks) {
    return <></>
  }

  const archivedTasks = tasks.doneTasks

  return (
    <>
      <Header>
        <span className="flex items-center gap-3 font-bold text-lg uppercase tracking-widest py-1.5">
          <ArchiveIcon color="white" /> Arquivo
        </span>

        <span>{archivedTasks.length} tarefas arquivadas</span>
      </Header>

      {archivedTasks.length === 0 ? (
        <div className="flex justify-center items-center min-h-[92%] border rounded mt-4">
          <span>Nenhuma tarefa arquivada.</span>
        </div>
      ) : (
        <div className="mt-4 px-2">
          <div className="flex mr-4 font-bold border-b pb-3">
            <span className="flex-1">Nome</span>
            <span className="w-40">Prioridade</span>
            <span className="w-40">Criada em</span>
            <span className="w-60">Última atualização</span>
          </div>

          <ScrollArea className="h-[39rem]">
            {archivedTasks.map((task) => {
              return (
                <Link
                  key={task.id}
                  to={`/task/${task.id}`}
                  className="flex border-b py-3 mr-4"
                >
                  <span className="flex-1">{task.name}</span>

                  <span className="w-40">
                    <PriorityBadge value={task.priority} />
                  </span>

                  <span className="w-40">
                    {format(task.createdAt, 'dd MMM yyyy')}
                  </span>

                  <span className="w-60">
                    {format(task.updatedAt, 'dd MMM yyyy')}
                  </span>
                </Link>
              )
            })}
          </ScrollArea>
        </div>
      )}
    </>
  )
}
