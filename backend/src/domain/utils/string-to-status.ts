import { Status } from '../entities/value-objects/status'

export function stringToStatus(value: string): Status | undefined {
  const key = Object.keys(Status).find((key) => key === value)

  if (!key) {
    return undefined
  }

  return Status[key as keyof typeof Status]
}
