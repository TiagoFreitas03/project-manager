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
import { deleteProject } from '@/api/delete-project'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

interface DeleteProjectDialogProps {
  id: string
}

export function DeleteProjectDialog({ id }: DeleteProjectDialogProps) {
  const navigate = useNavigate()

  const { mutateAsync: deleteProjectFn } = useMutation({
    mutationFn: deleteProject,
  })

  async function handleConfirmDelete() {
    try {
      await deleteProjectFn(id)
      toast.success('Projeto excluído!')
      navigate('/')
    } catch (err) {
      toast.error('Ocorreu algum erro ao excluir o projeto!')
      console.log(err)
    }
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
          <AlertDialogAction onClick={handleConfirmDelete}>
            Confirmar
          </AlertDialogAction>

          <AlertDialogCancel>Cancelar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
