import { Search } from 'lucide-react'
import type { FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function FiltersForm() {
  function handleFilterProjects(event: FormEvent) {
    event.preventDefault()
  }

  return (
    <form className="my-4 flex gap-4" onSubmit={handleFilterProjects}>
      <Input placeholder="Nome do projeto" />

      <Select>
        <SelectTrigger className="w-96">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="todo">Não iniciado</SelectItem>
          <SelectItem value="doing">Em progresso</SelectItem>
          <SelectItem value="done">Finalizado</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-96">
          <SelectValue placeholder="Ordem" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="name">Nome</SelectItem>
          <SelectItem value="createdAt">Data de criação</SelectItem>
          <SelectItem value="updatedAt">Data de atualização</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" title="Aplicar filtros">
        <Search />
      </Button>
    </form>
  )
}
