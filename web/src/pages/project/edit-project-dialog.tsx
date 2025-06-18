import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Edit } from 'lucide-react'
import { useState, type FormEvent } from 'react'

interface EditProjectDialogProps {
  id: string
  description: string
  repositoryUrl: string
}

export function EditProjectDialog({ id, ...props }: EditProjectDialogProps) {
  const [description, setDescription] = useState(props.description)
  const [repositoryUrl, setRepositoryUrl] = useState(props.repositoryUrl)

  function handleEditProject(event: FormEvent) {
    alert(id)
    event.preventDefault()
  }

  return (
    <Dialog>
      <form onSubmit={handleEditProject}>
        <DialogTrigger asChild>
          <Button title="Editar Projeto">
            <Edit />
          </Button>
        </DialogTrigger>

        <DialogContent className="bg-neutral-900">
          <DialogHeader>
            <DialogTitle>Editar Projeto</DialogTitle>

            <DialogDescription>
              Altere abaixo as informações do projeto.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <Textarea
              placeholder="Descrição"
              value={description}
              onChange={(event) => setDescription(event.currentTarget.value)}
            />

            <Input
              placeholder="Link do Repositório"
              value={repositoryUrl}
              onChange={(event) => setRepositoryUrl(event.currentTarget.value)}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button>Cancelar</Button>
            </DialogClose>

            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
