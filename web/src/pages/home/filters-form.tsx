import { Search } from 'lucide-react'
import { useState, type FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSearchParams } from 'react-router'

export function FiltersForm() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [name, setName] = useState(searchParams.get('name') ?? undefined)
  const [order, setOrder] = useState(searchParams.get('order') ?? 'updatedAt')

  function handleFilterProjects(event: FormEvent) {
    event.preventDefault()

    setSearchParams((state) => {
      if (name) {
        state.set('name', name)
      } else {
        state.delete('name')
      }

      if (order) {
        state.set('order', order)
      } else {
        state.delete('order')
      }

      state.set('page', '1')

      return state
    })
  }

  return (
    <form className="my-4 flex gap-4" onSubmit={handleFilterProjects}>
      <Input
        placeholder="Nome do projeto"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />

      <Select value={order} onValueChange={(value) => setOrder(value)}>
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
