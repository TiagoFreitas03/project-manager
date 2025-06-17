import { FileText } from 'lucide-react'
import { EditProjectDialog } from './edit-project-dialog'
import { CreateTaskDialog } from './create-task-dialog'

export function Header() {
  return (
    <header className="flex items-center justify-between border-b pb-3">
      <span className="flex items-center gap-3 font-bold text-lg uppercase tracking-widest">
        <FileText color="white" /> Projeto 1
      </span>

      <div className="flex gap-2">
        <CreateTaskDialog projectId="1" />

        <EditProjectDialog
          id="1"
          description="Descricao"
          repositoryUrl="http://www.github.com/user/example.git"
        />
      </div>
    </header>
  )
}
