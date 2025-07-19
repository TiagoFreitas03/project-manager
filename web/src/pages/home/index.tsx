import { FiltersForm } from './filters-form'
import { ProjectCard } from './project-card'
import { Pagination } from '@/components/pagination'
import { Layers } from 'lucide-react'
import { CreateProjectDialog } from './create-project-dialog'
import { Header } from '@/components/header'
import { searchProjects } from '@/api/search-projects'
import { useSearchParams } from 'react-router'
import { z } from 'zod'
import { useQuery } from '@tanstack/react-query'

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams()

  const name = searchParams.get('name') ?? undefined
  const orderBy = searchParams.get('order') ?? 'updatedAt'
  const page = z.coerce.number().parse(searchParams.get('page') ?? '1')

  function handlePaginate(page: number) {
    setSearchParams((state) => {
      state.set('page', page.toString())

      return state
    })
  }

  const { data: result } = useQuery({
    queryKey: ['projects', name, page, orderBy],
    queryFn: () => searchProjects({ name, page, orderBy }),
  })

  if (!result) {
    return <></>
  }

  const { projects, pages } = result

  return (
    <>
      <Header>
        <span className="flex items-center gap-3 font-bold text-lg uppercase tracking-widest">
          <Layers color="white" /> Projetos
        </span>

        <CreateProjectDialog />
      </Header>

      <FiltersForm />

      {projects.length === 0 ? (
        <div className="flex justify-center items-center min-h-[82%] border rounded">
          <span>Nenhum projeto encontrado.</span>
        </div>
      ) : (
        <div className="flex flex-col justify-between min-h-[82%]">
          <div className="grid grid-cols-3 gap-3">
            {projects.map((project, index) => (
              <ProjectCard key={index} data={project} />
            ))}
          </div>

          <div className="flex justify-between items-center">
            <Pagination
              pages={pages}
              currentPage={page}
              onPageChange={handlePaginate}
            />
          </div>
        </div>
      )}
    </>
  )
}
