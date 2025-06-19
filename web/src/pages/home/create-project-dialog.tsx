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
import { Plus } from 'lucide-react'
import type { FormEvent } from 'react'

export function CreateProjectDialog() {
  function handleCreateProject(event: FormEvent) {
    event.preventDefault()
  }

  return (
    <Dialog>
      <form onSubmit={handleCreateProject}>
        <DialogTrigger asChild>
          <Button>
            <Plus /> Novo
          </Button>
        </DialogTrigger>

        <DialogContent className="bg-neutral-900">
          <DialogHeader>
            <DialogTitle>Novo Projeto</DialogTitle>

            <DialogDescription>
              Preencha os campos abaixo para criar um novo projeto.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <Input placeholder="Nome" />

            <Textarea placeholder="Descrição" />

            <Input placeholder="Link do Repositório" />
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
