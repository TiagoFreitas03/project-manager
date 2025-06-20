import { ChevronsDown, ChevronsUp, Equal } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import type { SelectProps } from '@radix-ui/react-select'

export function PrioritySelect({ ...props }: SelectProps) {
  return (
    <Select {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Prioridade" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="1">
          <ChevronsUp className="text-red-500" /> Alta
        </SelectItem>

        <SelectItem value="2">
          <Equal className="text-yellow-500" /> Média
        </SelectItem>

        <SelectItem value="3">
          <ChevronsDown className="text-green-500" /> Baixa
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
