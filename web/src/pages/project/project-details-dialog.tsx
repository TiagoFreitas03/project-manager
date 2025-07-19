import { format } from 'date-fns'
import { Info } from 'lucide-react'
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
import { KeyValue } from '@/components/key-value'
import type { Project } from '@/interfaces/project'

interface ProjectDetailsDialogProps {
  data: Project
}

export function ProjectDetailsDialog({ data }: ProjectDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button title="Detalhes do Projeto">
          <Info />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-neutral-900">
        <DialogHeader>
          <DialogTitle>Detalhes do Projeto</DialogTitle>

          <DialogDescription className="sr-only" />
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <KeyValue keyName="Nome">{data.name}</KeyValue>

          <KeyValue keyName="Descrição">{data.description}</KeyValue>

          <KeyValue keyName="Link Repositório">
            <a
              href={data.repositoryUrl}
              className="text-orange-600"
              target="_blank"
              rel="noreferrer"
            >
              {data.repositoryUrl}
            </a>
          </KeyValue>

          <KeyValue keyName="Criado Em">
            {format(new Date(data.createdAt), 'dd MMM yyyy')}
          </KeyValue>

          <KeyValue keyName="Última Alteração">
            {format(new Date(data.updatedAt), 'dd MMM yyyy')}
          </KeyValue>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
