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
import { deleteTask } from '@/api/delete-task'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

interface DeleteTaskDialogProps {
  id: string
}

export function DeleteTaskDialog({ id }: DeleteTaskDialogProps) {
  const navigate = useNavigate()

  const { mutateAsync: deleteTaskFn } = useMutation({
    mutationFn: deleteTask,
  })

  async function handleConfirmDelete() {
    try {
      await deleteTaskFn(id)
      toast.success('Tarefa excluída!')
      navigate(-1)
    } catch (err) {
      toast.error('Ocorreu algum erro ao excluir a tarefa!')
      console.log(err)
    }
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
