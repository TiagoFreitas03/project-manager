import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DialogDescription } from '@radix-ui/react-dialog'
import { Info } from 'lucide-react'
import { DetailField } from './detail-field'
import { format, setDefaultOptions } from 'date-fns'
import { ptBR } from 'date-fns/locale'

setDefaultOptions({ locale: ptBR })

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
          <DetailField title="Nome">{data.name}</DetailField>

          <DetailField title="Descrição">{data.description}</DetailField>

          <DetailField title="Link Repositório">
            <a
              href={data.repositoryUrl}
              className="text-orange-600"
              target="_blank"
              rel="noreferrer"
            >
              {data.repositoryUrl}
            </a>
          </DetailField>

          <DetailField title="Criado Em">
            {format(data.createdAt.toDateString(), 'dd MMM yyyy')}
          </DetailField>

          <DetailField title="Última Alteração">
            {format(data.updatedAt.toDateString(), 'dd MMM yyyy')}
          </DetailField>
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
