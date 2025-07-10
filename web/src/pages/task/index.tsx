import { Header } from '@/components/header'
import type { TaskDetails } from '@/interfaces/task-details'
import { FileText } from 'lucide-react'
import { DeleteTaskDialog } from './delete-task-dialog'
import { EditTaskDialog } from './edit-task-dialog'
import { KeyValue } from '@/components/key-value'
import { format } from 'date-fns'
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
    if (!id || !task) {
      return
    }

    try {
      await updateTaskStatus({ id, status })
      const taskWithNewStatus = { ...task, status }
      setTask(taskWithNewStatus)
    } catch (err) {
      toast.error('Ocorreu algum erro ao atualizar o status!')
      console.log(err)
    }
  }

  return (
    <>
      <Header>
        <span className="flex items-center gap-3 font-bold text-lg uppercase tracking-widest">
          <FileText color="white" /> Detalhes da tarefa
        </span>

        <div className="flex gap-2">
          <EditTaskDialog data={task} />

          <DeleteTaskDialog id={task.id} />
        </div>
      </Header>

      <div className="py-4 px-1 flex flex-col justify-between h-[94%]">
        <div className="grid gap-2">
          <KeyValue keyName="Nome">{task.name}</KeyValue>

          <KeyValue keyName="Descrição">{task.description}</KeyValue>
        </div>

        <div className="flex justify-between items-center">
          <KeyValue keyName="Status">
            <div className="flex justify-around items-center gap-1.5">
              {statuses.map((status) => {
                return (
                  <Button
                    key={status}
                    variant="ghost"
                    className="dark:hover:bg-neutral-900 p-0"
                    type="button"
                    onClick={() => handleUpdateTaskStatus(status)}
                  >
                    <StatusBadge
                      value={status}
                      active={status === task.status}
                    />
                  </Button>
                )
              })}
            </div>
          </KeyValue>

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
