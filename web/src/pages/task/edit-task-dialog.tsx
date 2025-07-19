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
import type { TaskDetails } from '@/interfaces/task-details'
import { PrioritySelect } from '@/components/priority-select'
import { FormField } from '@/components/form-field'
import { Label } from '@/components/ui/label'
import { editTask } from '@/api/edit-task'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

interface EditTaskDialogProps {
  data: TaskDetails
}

export function EditTaskDialog({ data }: EditTaskDialogProps) {
  const [name, setName] = useState(data.name)
  const [description, setDescription] = useState(data.description)
  const [priority, setPriority] = useState(data.priority)

  const { mutateAsync: editTaskFn } = useMutation({
    mutationFn: editTask,
  })

  async function handleEditTask(event: FormEvent) {
    event.preventDefault()

    try {
      await editTaskFn({ id: data.id, name, description, priority })
      window.location.reload()
    } catch (err) {
      toast.error('Ocorreu algum erro ao editar a tarefa!')
      console.log(err)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button title="Editar Tarefa">
          <Edit />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-neutral-900">
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>

          <DialogDescription>
            Altere abaixo as informações da tarefa.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleEditTask} className="grid gap-5">
          <FormField>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
            />
          </FormField>

          <FormField>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.currentTarget.value)}
            />
          </FormField>

          <FormField>
            <Label>Prioridade</Label>
            <PrioritySelect
              value={priority.toString()}
              onValueChange={(value) => setPriority(Number(value))}
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
