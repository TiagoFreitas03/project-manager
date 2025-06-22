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

const task: TaskDetails = {
  id: 'task-1',
  name: 'Tarefa 1',
  description: 'Descricao da Tarefa 01...',
  status: 'DOING',
  priority: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const statuses = ['TO_DO', 'DOING', 'DONE'] as const

export function Task() {
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
            {format(task.createdAt.toDateString(), 'dd MMM yyyy')}
          </KeyValue>

          <KeyValue keyName="Última Alteração">
            {format(task.updatedAt.toDateString(), 'dd MMM yyyy')}
          </KeyValue>
        </div>
      </div>
    </>
  )
}
