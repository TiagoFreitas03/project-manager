import { Plus } from 'lucide-react'
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
import { Label } from '@/components/ui/label'
import { FormField } from '@/components/form-field'
import { createProject } from '@/api/create-project'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

export function CreateProjectDialog() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [repositoryUrl, setRepositoryUrl] = useState('')

  const { mutateAsync: createProjectFn } = useMutation({
    mutationFn: createProject,
  })

  const navigate = useNavigate()

  async function handleCreateProject(event: FormEvent) {
    event.preventDefault()

    try {
      const { project } = await createProjectFn({
        name,
        description,
        repositoryUrl,
      })
      toast.success('Projeto cadastrado!')
      navigate(`/project/${project.slug}`)
    } catch (err) {
      toast.error('Ocorreu um erro. Verifique as informações e tente de novo!')
      console.log(err)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-neutral-900">
        <DialogHeader>
          <DialogTitle>Novo Projeto</DialogTitle>

          <DialogDescription>
            Preencha os campos abaixo para criar um novo projeto.
          </DialogDescription>
        </DialogHeader>

        <form
          className="grid gap-5"
          onSubmit={handleCreateProject}
          autoComplete="off"
        >
          <FormField>
            <Label htmlFor="name">Nome</Label>

            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </FormField>

          <FormField>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
            />
          </FormField>

          <FormField>
            <Label htmlFor="repositoryUrl">Link do repositório</Label>
            <Input
              id="repositoryUrl"
              placeholder="ex.: https://github.com/user/project"
              value={repositoryUrl}
              onChange={(e) => setRepositoryUrl(e.currentTarget.value)}
            />
          </FormField>

          <DialogFooter>
            <Button type="submit">Confirmar</Button>

            <DialogClose asChild>
              <Button type="button">Cancelar</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
