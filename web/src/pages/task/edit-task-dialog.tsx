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

interface EditTaskDialogProps {
  data: TaskDetails
}

export function EditTaskDialog({ data }: EditTaskDialogProps) {
  const [name, setName] = useState(data.name)
  const [description, setDescription] = useState(data.description)
  const [priority, setPriority] = useState(data.priority)

  function handleEditTask(event: FormEvent) {
    alert(data.id)
    event.preventDefault()
  }

  return (
    <Dialog>
      <form onSubmit={handleEditTask}>
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

          <div className="grid gap-4">
            <Input
              placeholder="Nome"
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
            />

            <Textarea
              placeholder="Descrição"
              value={description}
              onChange={(event) => setDescription(event.currentTarget.value)}
            />

            <PrioritySelect
              value={priority.toString()}
              onValueChange={(value) => setPriority(Number(value))}
            />
          </div>

          <DialogFooter>
            <Button type="submit">Salvar</Button>

            <DialogClose asChild>
              <Button>Cancelar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
