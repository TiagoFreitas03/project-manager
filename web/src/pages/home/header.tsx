import { Layers } from 'lucide-react'
import { CreateProjectDialog } from './create-project-dialog'

export function Header() {
  return (
    <header className="flex items-center justify-between border-b pb-3">
      <span className="flex items-center gap-3 font-bold text-lg uppercase tracking-widest">
        <Layers color="white" /> Projetos
      </span>

      <CreateProjectDialog />
    </header>
  )
}
