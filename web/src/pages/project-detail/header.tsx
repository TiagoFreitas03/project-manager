import { Button } from '@/components/ui/button'
import { Edit, FileText, Plus } from 'lucide-react'

export function Header() {
  return (
    <header className="flex items-center justify-between border-b pb-3">
      <span className="flex items-center gap-3 font-bold text-lg uppercase tracking-widest">
        <FileText color="white" /> Projeto 1
      </span>

      <div className="flex gap-2">
        <Button>
          <Plus /> Nova Tarefa
        </Button>

        <Button>
          <Edit /> Editar Projeto
        </Button>
      </div>
    </header>
  )
}
