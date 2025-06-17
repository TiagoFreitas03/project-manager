import { MoveRight } from 'lucide-react'
import { format, setDefaultOptions } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { StatusBadge } from '@/components/status-badge'
import { Progress } from '@/components/ui/progress'
import { Header } from './header'
import { FiltersForm } from './filters-form'
import { Pagination } from '@/components/pagination'
import { useState } from 'react'
import { Link } from 'react-router'

setDefaultOptions({ locale: ptBR })

const projects = Array.from({ length: 12 }).map((_, index) => {
  const progress = index === 0 ? 0 : ((index % 5) + 1) * 20
  const status = progress === 0 ? 'todo' : progress === 100 ? 'done' : 'doing'

  return {
    id: index,
    name: `Project ${index + 1}`,
    createdAt: new Date(2023, index, 1),
    updatedAt: new Date(2024, index, 1),
    status,
    slug: `project-${index + 1}`,
    progress,
  }
})

export function Home() {
  const [page, setPage] = useState(1)

  return (
    <>
      <Header />

      <FiltersForm />

      <div className="my-4 grid grid-cols-3 gap-3">
        {projects.map((project) => {
          return (
            <Link
              key={project.id}
              className="bg-neutral-800 p-3 rounded"
              to={`/project/${project.slug}`}
            >
              <h2 className="font-semibold mb-2">{project.name}</h2>

              <span className="flex text-xs gap-2 items-center mb-2">
                {format(project.createdAt, 'dd MMM yyyy')}{' '}
                <MoveRight size={14} />{' '}
                {format(project.updatedAt, 'dd MMM yyyy')}
              </span>

              <StatusBadge status={project.status} />

              <span className="flex gap-1 items-center text-xs mt-2 w-36">
                {project.progress}% <Progress value={project.progress} />
              </span>
            </Link>
          )
        })}
      </div>

      <div className="flex justify-between items-center">
        <Pagination pages={3} currentPage={page} onPageChange={setPage} />
      </div>
    </>
  )
}
