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

interface DeleteProjectDialogProps {
  id: string
}

export function DeleteProjectDialog({ id }: DeleteProjectDialogProps) {
  function handleConfirmDelete() {
    alert(id)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button title="Excluir Projeto">
          <Trash />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-neutral-900">
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja excluir este projeto?</AlertDialogTitle>

          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso irá excluir permanentemente
            todos os dados do projeto.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmDelete}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
