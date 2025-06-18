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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Plus } from 'lucide-react'
import type { FormEvent } from 'react'

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
              Preencha os campos abaixo para criar uma tarefa.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <Input placeholder="Nome" />

            <Textarea placeholder="Descrição" />

            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="1">Alta</SelectItem>
                <SelectItem value="2">Média</SelectItem>
                <SelectItem value="3">Baixa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button>Cancelar</Button>
            </DialogClose>

            <Button type="submit">Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
