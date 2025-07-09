import { Edit } from 'lucide-react'
import { useState, type FormEvent } from 'react'

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
import type { Project } from '@/interfaces/project'
import { editProject } from '@/api/edit-project'
import { toast } from 'sonner'
import { FormField } from '@/components/form-field'
import { Label } from '@/components/ui/label'

interface EditProjectDialogProps {
  data: Project
}

export function EditProjectDialog({ data }: EditProjectDialogProps) {
  const [description, setDescription] = useState(data.description)
  const [repositoryUrl, setRepositoryUrl] = useState(data.repositoryUrl)

  async function handleEditProject(event: FormEvent) {
    event.preventDefault()

    try {
      await editProject({ id: data.id, description, repositoryUrl })
      toast.success('Projeto atualizado com sucesso!')
    } catch (err) {
      toast.error('Ocorreu um erro. Verifique as informações e tente de novo!')
      console.log(err)
    }
  }

  return (
    <Dialog>
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

        <form className="grid gap-5" onSubmit={handleEditProject}>
          <FormField>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.currentTarget.value)}
            />
          </FormField>

          <FormField>
            <Label htmlFor="repositoryUrl">Link do Repositório</Label>
            <Input
              id="repositoryUrl"
              value={repositoryUrl}
              onChange={(event) => setRepositoryUrl(event.currentTarget.value)}
            />
          </FormField>

          <DialogFooter>
            <Button type="submit">Salvar</Button>

            <DialogClose asChild>
              <Button>Cancelar</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
