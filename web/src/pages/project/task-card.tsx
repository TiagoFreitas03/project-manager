import { DateInterval } from '@/components/date-interval'
import { PriorityBadge } from '@/components/priority-badge'
import type { Task } from '@/interfaces/task'
import { Link } from 'react-router'

interface TaskCardProps {
  data: Task
}

export function TaskCard({ data }: TaskCardProps) {
  return (
    <Link
      className="bg-neutral-800 my-3 p-4 rounded block border"
      to={`/task/${data.id}`}
    >
      <div className="flex justify-between items-start">
        <h2>{data.name}</h2>
      </div>

      <DateInterval
        from={new Date(data.createdAt)}
        to={new Date(data.updatedAt)}
      />

      <div className="flex items-center gap-1 text-xs">
        <span>Prioridade: </span>
        <PriorityBadge value={data.priority} />
      </div>
    </Link>
  )
}
