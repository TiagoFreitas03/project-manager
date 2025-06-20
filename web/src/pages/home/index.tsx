import { useState } from 'react'

import { FiltersForm } from './filters-form'
import { ProjectCard } from './project-card'
import { Pagination } from '@/components/pagination'
import type { ProjectSummary } from '@/interfaces/project-summary'
import { Layers } from 'lucide-react'
import { CreateProjectDialog } from './create-project-dialog'
import { Header } from '@/components/header'

const projects: ProjectSummary[] = Array.from({ length: 12 }).map(
  (_, index) => {
    const progress = index === 0 ? 0 : ((index % 5) + 1) * 20
    const status = progress === 0 ? 'TO_DO' : progress < 100 ? 'DOING' : 'DONE'

    return {
      id: `${index}`,
      name: `Project ${index + 1}`,
      createdAt: new Date(2023, index, 1),
      updatedAt: new Date(2024, index, 1),
      status,
      slug: `project-${index + 1}`,
      progress,
    }
  },
)

export function Home() {
  const [page, setPage] = useState(1)

  return (
    <>
      <Header>
        <span className="flex items-center gap-3 font-bold text-lg uppercase tracking-widest">
          <Layers color="white" /> Projetos
        </span>

        <CreateProjectDialog />
      </Header>

      <FiltersForm />

      <div className="my-4 grid grid-cols-3 gap-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} data={project} />
        ))}
      </div>

      <div className="flex justify-between items-center">
        <Pagination pages={3} currentPage={page} onPageChange={setPage} />
      </div>
    </>
  )
}
