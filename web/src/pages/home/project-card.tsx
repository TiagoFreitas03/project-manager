import { format } from 'date-fns'
import { MoveRight } from 'lucide-react'
import { Link } from 'react-router'

import { StatusBadge } from '@/components/status-badge'
import { Progress } from '@/components/ui/progress'
import type { ProjectSummary } from '@/interfaces/project-summary'

interface ProjectCardProps {
  data: ProjectSummary
}

export function ProjectCard({ data }: ProjectCardProps) {
  return (
    <Link
      key={data.id}
      className="bg-neutral-800 p-3 rounded"
      to={`/project/${data.slug}`}
    >
      <h2 className="font-semibold mb-2">{data.name}</h2>

      <span className="flex text-xs gap-2 items-center mb-2">
        {format(data.createdAt, 'dd MMM yyyy')} <MoveRight size={14} />{' '}
        {format(data.updatedAt, 'dd MMM yyyy')}
      </span>

      <StatusBadge value={data.status} />

      <span className="flex gap-1 items-center text-xs mt-2 w-36">
        {data.progress}% <Progress value={data.progress} />
      </span>
    </Link>
  )
}
