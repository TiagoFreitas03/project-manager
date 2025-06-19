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
import { KeyValueText } from '@/components/key-value-text'

interface ProjectDetailsDialogProps {
  name: string
  description: string
  repositoryUrl: string
  createdAt: Date
  updatedAt: Date
}

export function ProjectDetailsDialog(data: ProjectDetailsDialogProps) {
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
          <KeyValueText keyName="Nome">{data.name}</KeyValueText>

          <KeyValueText keyName="Descrição">{data.description}</KeyValueText>

          <KeyValueText keyName="Link Repositório">
            <a
              href={data.repositoryUrl}
              className="text-orange-600"
              target="_blank"
              rel="noreferrer"
            >
              {data.repositoryUrl}
            </a>
          </KeyValueText>

          <KeyValueText keyName="Criado Em">
            {format(data.createdAt.toDateString(), 'dd MMM yyyy')}
          </KeyValueText>

          <KeyValueText keyName="Última Alteração">
            {format(data.updatedAt.toDateString(), 'dd MMM yyyy')}
          </KeyValueText>
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
