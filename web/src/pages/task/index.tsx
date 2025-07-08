import { Header } from '@/components/header'
import type { TaskDetails } from '@/interfaces/task-details'
import { FileText } from 'lucide-react'
import { DeleteTaskDialog } from './delete-task-dialog'
import { EditTaskDialog } from './edit-task-dialog'
import { KeyValue } from '@/components/key-value'
import { format } from 'date-fns'
import { Separator } from '@/components/ui/separator'
import { PriorityBadge } from '@/components/priority-badge'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { getTaskById } from '@/api/get-task-by-id'
import { updateTaskStatus } from '@/api/update-task-status'
import { toast } from 'sonner'

const statuses = ['TO_DO', 'DOING', 'DONE']

export function Task() {
  const { id } = useParams<{ id: string }>()

  const [task, setTask] = useState<TaskDetails>()

  useEffect(() => {
    if (id) {
      getTaskById(id).then(setTask)
    }
  }, [id])

  if (!task || !id) {
    return <h1>Tarefa não encontrada.</h1>
  }

  async function handleUpdateTaskStatus(status: string) {
    if (!id) {
      return
    }

    try {
      await updateTaskStatus({ id, status })
      window.location.reload()
    } catch (err) {
      toast.error('Ocorreu algum erro ao atualizar o status!')
      console.log(err)
    }
  }

  return (
    <>
      <Header>
        <span className="flex items-center gap-3 font-bold text-lg uppercase tracking-widest">
          <FileText color="white" /> {task.name}
        </span>

        <div className="flex gap-2">
          <EditTaskDialog data={task} />

          <DeleteTaskDialog id={task.id} />
        </div>
      </Header>

      <div className="py-4 px-2 flex justify-between h-[94%]">
        <div className="flex-1">
          <KeyValue keyName="Descrição">{task.description}</KeyValue>
        </div>

        <Separator orientation="vertical" />

        <div className="w-64 mx-4 flex flex-col gap-4">
          <KeyValue keyName="Status">
            <StatusBadge value={task.status} />
          </KeyValue>

          <span>Mover para:</span>

          <div className="flex justify-around">
            {statuses
              .filter((status) => status !== task.status)
              .map((status) => {
                return (
                  <Button
                    key={status}
                    variant="ghost"
                    className="dark:hover:bg-neutral-900 p-0"
                    type="button"
                    onClick={() => handleUpdateTaskStatus(status)}
                  >
                    <StatusBadge value={status} />
                  </Button>
                )
              })}
          </div>

          <KeyValue keyName="Prioridade">
            <PriorityBadge value={task.priority}></PriorityBadge>
          </KeyValue>

          <KeyValue keyName="Criado Em">
            {format(new Date(task.createdAt), 'dd MMM yyyy')}
          </KeyValue>

          <KeyValue keyName="Última Alteração">
            {format(new Date(task.updatedAt), 'dd MMM yyyy')}
          </KeyValue>
        </div>
      </div>
    </>
  )
}
