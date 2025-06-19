import { format } from 'date-fns'
import { MoveRight } from 'lucide-react'

interface DateIntervalProps {
  from: Date
  to: Date
}

export function DateInterval({ from, to }: DateIntervalProps) {
  return (
    <span className="flex text-xs gap-2 items-center my-2">
      <span>{format(from, 'dd MMM yyyy')}</span>

      <MoveRight size={14} />

      <span>{format(to, 'dd MMM yyyy')}</span>
    </span>
  )
}
