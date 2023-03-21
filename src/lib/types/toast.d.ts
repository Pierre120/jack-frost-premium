export interface Toast {
  id?: number,
  message: string,
  type: 'success' | 'error' | 'info' | 'warning' | 'loading',
  duration?: number,
}