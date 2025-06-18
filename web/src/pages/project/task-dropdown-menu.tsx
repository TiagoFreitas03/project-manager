import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Dot, Edit, Ellipsis, Info, Trash } from 'lucide-react'

export function TaskDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Info /> Detalhes
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Edit /> Editar
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Trash /> Excluir
          </DropdownMenuItem>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Mover para</DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Dot color="#ffffff" className="size-6" /> Pendente
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Dot color="#f54900" className="size-6" /> Em andamento
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Dot color="#e60076" className="size-6" /> Finalizado
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
