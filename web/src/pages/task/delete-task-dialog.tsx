import { Trash } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface DeleteTaskDialogProps {
  id: string
}

export function DeleteTaskDialog({ id }: DeleteTaskDialogProps) {
  function handleConfirmDelete() {
    alert(id)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button title="Excluir Tarefa">
          <Trash />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-neutral-900">
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja excluir esta tarefa?</AlertDialogTitle>

          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso irá excluir permanentemente
            todos os dados da tarefa.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction onClick={handleConfirmDelete}>
            Confirmar
          </AlertDialogAction>

          <AlertDialogCancel>Cancelar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
