export interface Input<V> {
  title?: string
  name: string
  errors?: ErrorDetails[]
  value: V
  onChange: ({ name: value }: { [name: string]: V }) => void
}

export type ErrorDetails = {
  status: number
  message: string
}

export type FieldError = {
  field: string
  details: ErrorDetails[]
}
