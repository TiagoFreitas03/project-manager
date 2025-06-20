import type { ReactNode } from 'react'

interface HeaderProps {
  children: ReactNode
}

export function Header({ children }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b pb-3">
      {children}
    </header>
  )
}
