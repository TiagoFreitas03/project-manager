import { StatusBadge } from '@/components/status-badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { TaskCard, type Task } from './task-card'

interface TasksColumnProps {
  status: string
  tasks: Task[]
}

export function TasksColumn({ status, tasks }: TasksColumnProps) {
  return (
    <div className="p-2">
      <div className="flex gap-2 items-center">
        <StatusBadge status={status} size="sm" />

        <span className="text-sm text-neutral-500">{tasks.length}</span>
      </div>

      <ScrollArea className="h-[600px] pr-4 mt-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </ScrollArea>
    </div>
  )
}
