import { Plus } from 'lucide-react'
import type { FormEvent } from 'react'

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
import { PrioritySelect } from '@/components/priority-select'

interface CreateTaskDialogProps {
  projectId: string
}

export function CreateTaskDialog({ projectId }: CreateTaskDialogProps) {
  function handleCreateTask(event: FormEvent) {
    alert(projectId)
    event.preventDefault()
  }

  return (
    <Dialog>
      <form onSubmit={handleCreateTask}>
        <DialogTrigger asChild>
          <Button title="Nova tarefa">
            <Plus />
          </Button>
        </DialogTrigger>

        <DialogContent className="bg-neutral-900">
          <DialogHeader>
            <DialogTitle>Nova Tarefa</DialogTitle>

            <DialogDescription>
              Preencha os campos abaixo para criar uma nova tarefa.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <Input placeholder="Nome" />

            <Textarea placeholder="Descrição" />

            <PrioritySelect />
          </div>

          <DialogFooter>
            <Button type="submit">Confirmar</Button>

            <DialogClose asChild>
              <Button>Cancelar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
