import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'

interface PaginationProps {
  pages: number
  currentPage: number
}

export function Pagination({ pages, currentPage }: PaginationProps) {
  return (
    <div className="flex gap-1">
      <Button onClick={() => {}}>
        <ChevronLeft />
      </Button>

      {Array.from({ length: pages }).map((_, index) => {
        return (
          <Button
            key={index}
            onClick={() => {}}
            variant={index + 1 === currentPage ? 'default' : 'outline'}
          >
            {index + 1}
          </Button>
        )
      })}

      <Button onClick={() => {}}>
        <ChevronRight />
      </Button>
    </div>
  )
}
