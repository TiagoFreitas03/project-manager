import { StatusBadge } from '@/components/status-badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { TaskCard } from './task-card'
import type { Task } from '@/interfaces/task'
import type { Status } from '@/types/status'

interface TasksColumnProps {
  status: Status
  tasks: Task[]
}

export function TasksColumn({ status, tasks }: TasksColumnProps) {
  return (
    <div className="p-2">
      <div className="flex gap-2 items-center">
        <StatusBadge value={status} size="sm" />

        <span className="text-sm bg-neutral-800 px-2 py-1 rounded-md">
          {tasks.length}
        </span>
      </div>

      <ScrollArea className="h-[600px] pr-4 mt-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} data={task} />
        ))}
      </ScrollArea>
    </div>
  )
}
