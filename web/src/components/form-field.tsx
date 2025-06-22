import type { ReactNode } from 'react'

interface FormFieldProps {
  children: ReactNode
}

export function FormField({ children }: FormFieldProps) {
  return <div className="grid gap-2">{children}</div>
}
