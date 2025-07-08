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
import { PrioritySelect } from '@/components/priority-select'
import { FormField } from '@/components/form-field'
import { Label } from '@/components/ui/label'
import { createTask } from '@/api/create-task'
import { toast } from 'sonner'

interface CreateTaskDialogProps {
  projectId: string
}

export function CreateTaskDialog({ projectId }: CreateTaskDialogProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState(2)

  async function handleCreateTask(event: FormEvent) {
    event.preventDefault()

    try {
      await createTask({ name, description, priority, projectId })
      toast.success('Tarefa cadastrada')
      setName('')
      setDescription('')
      setPriority(2)
    } catch (err) {
      toast.error('Ocorreu um erro. Verifique as informações e tente de novo!')
      console.log(err)
    }
  }

  return (
    <Dialog>
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

        <form onSubmit={handleCreateTask} className="grid gap-5">
          <div className="grid gap-4">
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
              <Label>Prioridade</Label>
              <PrioritySelect
                value={String(priority)}
                onValueChange={(value) => setPriority(Number(value))}
              />
            </FormField>
          </div>

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
