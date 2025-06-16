import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'

interface PaginationProps {
  pages: number
  currentPage: number
  onPageChange: (page: number) => void
}

export function Pagination({
  pages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  function previousPage() {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  function nextPage() {
    if (currentPage < pages) {
      onPageChange(currentPage + 1)
    }
  }

  function changePage(page: number) {
    if (page > 0 && page <= pages) {
      onPageChange(page)
    }
  }

  return (
    <div className="flex gap-1">
      <Button onClick={previousPage}>
        <ChevronLeft />
      </Button>

      {Array.from({ length: pages }).map((_, index) => {
        return (
          <Button
            key={index}
            onClick={() => changePage(index + 1)}
            variant={index + 1 === currentPage ? 'default' : 'outline'}
          >
            {index + 1}
          </Button>
        )
      })}

      <Button onClick={nextPage}>
        <ChevronRight />
      </Button>
    </div>
  )
}
