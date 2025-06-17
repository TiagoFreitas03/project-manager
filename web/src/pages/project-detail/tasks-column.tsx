import { StatusBadge } from '@/components/status-badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { format } from 'date-fns'
import { MoveRight } from 'lucide-react'

interface Task {
  name: string
  status: string
  priority: number
  createdAt: Date
  updatedAt: Date
}

interface TasksColumnProps {
  status: string
  tasks: Task[]
}

const priorityNames = ['Alta', 'Média', 'Baixa']

export function TasksColumn({ status, tasks }: TasksColumnProps) {
  return (
    <div className="p-2">
      <div className="flex gap-2 items-center">
        <StatusBadge status={status} size="sm" />

        <span className="text-sm text-neutral-500">{tasks.length}</span>
      </div>

      <ScrollArea className="h-[600px] pr-4 mt-2">
        {tasks.map((task) => {
          return (
            <div key={task.name} className="bg-neutral-800 my-3 p-4 rounded">
              <h2>{task.name}</h2>

              <span className="text-sm my-4">
                Prioridade: {priorityNames[task.priority - 1]}
              </span>

              <span className="flex gap-2 text-xs mt-2">
                {format(task.createdAt, 'dd MMM yyyy')} <MoveRight size={14} />{' '}
                {format(task.updatedAt, 'dd MMM yyyy')}
              </span>
            </div>
          )
        })}
      </ScrollArea>
    </div>
  )
}
