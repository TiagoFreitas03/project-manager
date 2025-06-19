import { KanbanSquare } from 'lucide-react'

import { CreateTaskDialog } from './create-task-dialog'
import { DeleteProjectDialog } from './delete-project-dialog'
import { EditProjectDialog } from './edit-project-dialog'
import { ProjectDetailsDialog } from './project-details-dialog'

export function Header() {
  return (
    <header className="flex items-center justify-between border-b pb-3">
      <span className="flex items-center gap-3 font-bold text-lg uppercase tracking-widest">
        <KanbanSquare color="white" /> Projeto 1
      </span>

      <div className="flex gap-2">
        <CreateTaskDialog projectId="1" />

        <ProjectDetailsDialog
          name="Projeto 1"
          description="Descricao do projeto 1"
          repositoryUrl="http://www.github.com/TiagoFreitas03/project-manager"
          createdAt={new Date(2025, 1, 1)}
          updatedAt={new Date(2025, 1, 1)}
        />

        <EditProjectDialog
          id="1"
          description="Descricao"
          repositoryUrl="http://www.github.com/TiagoFreitas03/project-manager"
        />

        <DeleteProjectDialog id="1" />
      </div>
    </header>
  )
}
