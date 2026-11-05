export type ToastKind = 'success' | 'error' | 'info'

export interface Toast {
  id: number
  kind: ToastKind
  message: string
}

let seq = 0

export function useToast() {
  const toasts = useState<Toast[]>('toasts', () => [])

  function dismiss(id: number) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  function show(message: string, kind: ToastKind = 'info', durationMs = 5000) {
    const id = ++seq
    toasts.value = [...toasts.value, { id, kind, message }]
    if (import.meta.client) setTimeout(() => dismiss(id), durationMs)
    return id
  }

  return { toasts, show, dismiss }
}
