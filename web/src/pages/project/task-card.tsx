import { format } from 'date-fns'
import { MoveRight } from 'lucide-react'

export interface Task {
  id: string
  name: string
  status: string
  priority: number
  createdAt: Date
  updatedAt: Date
}

interface TaskCardProps {
  task: Task
}

const priorityNames = ['Alta', 'Média', 'Baixa']

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="bg-neutral-800 my-3 p-4 rounded">
      <div className="flex justify-between items-start">
        <h2>{task.name}</h2>
      </div>

      <span className="text-sm">
        Prioridade: {priorityNames[task.priority - 1]}
      </span>

      <span className="flex gap-2 text-xs mt-2">
        {format(task.createdAt, 'dd MMM yyyy')} <MoveRight size={14} />{' '}
        {format(task.updatedAt, 'dd MMM yyyy')}
      </span>
    </div>
  )
}
