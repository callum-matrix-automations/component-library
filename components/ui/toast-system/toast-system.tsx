// Dependencies: lucide-react
// Source: TTRPG

'use client'

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X, CheckCircle2, AlertTriangle, XCircle, Info, Bell } from 'lucide-react'

export type ToastType = 'success' | 'warning' | 'error' | 'info' | 'notification'

type Toast = {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

type ToastContextType = {
  addToast: (toast: Omit<Toast, 'id'>) => void
}

const ToastContext = createContext<ToastContextType>({ addToast: () => {} })

export const useToast = () => useContext(ToastContext)

const toastConfig: Record<ToastType, { icon: typeof Info; color: string; bg: string; border: string }> = {
  success: { icon: CheckCircle2, color: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.3)' },
  warning: { icon: AlertTriangle, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.3)' },
  error: { icon: XCircle, color: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.3)' },
  info: { icon: Info, color: '#60a5fa', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.3)' },
  notification: { icon: Bell, color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.3)' },
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)
  const config = toastConfig[toast.type]
  const Icon = config.icon

  useEffect(() => { requestAnimationFrame(() => setVisible(true)) }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true)
      setTimeout(() => onDismiss(toast.id), 200)
    }, toast.duration ?? 4000)
    return () => clearTimeout(timer)
  }, [toast, onDismiss])

  const handleDismiss = () => { setExiting(true); setTimeout(() => onDismiss(toast.id), 200) }
  const isOpen = visible && !exiting

  return (
    <div
      className="mb-2 flex cursor-pointer items-start gap-3 rounded-lg px-4 py-3"
      style={{
        width: '320px',
        background: '#1a1a2e',
        border: `1px solid ${config.border}`,
        boxShadow: `0 8px 24px rgba(0,0,0,0.5), 0 0 8px ${config.border}`,
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
        transition: 'opacity 200ms ease, transform 200ms ease',
      }}
      onClick={handleDismiss}
    >
      <Icon size={16} style={{ color: config.color }} className="mt-0.5 shrink-0" />
      <div className="min-w-0 flex-1">
        <span className="block text-xs font-semibold" style={{ color: config.color }}>{toast.title}</span>
        {toast.message && <p className="mt-0.5 text-[0.65rem] leading-relaxed" style={{ color: '#94a3b8' }}>{toast.message}</p>}
      </div>
      <X size={12} className="mt-0.5 shrink-0" style={{ color: '#64748b' }} />
    </div>
  )
}

let toastCounter = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `toast-${++toastCounter}-${Date.now()}`
    setToasts((prev) => [...prev, { ...toast, id }])
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {mounted && createPortal(
        <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end" style={{ pointerEvents: 'none' }}>
          <div style={{ pointerEvents: 'auto' }}>
            {toasts.map((toast) => (<ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />))}
          </div>
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  )
}

export function ToastTriggerPanel() {
  const { addToast } = useToast()

  const triggers: { type: ToastType; title: string; message: string }[] = [
    { type: 'success', title: 'Payment Received', message: 'Invoice #1042 — $2,400 from Acme Corp' },
    { type: 'warning', title: 'Quota Warning', message: 'API usage at 85% of monthly limit' },
    { type: 'error', title: 'Sync Failed', message: 'Unable to connect to CRM. Retrying in 30s.' },
    { type: 'info', title: 'New Lead Assigned', message: 'Sarah Chen added to your pipeline' },
    { type: 'notification', title: 'Report Ready', message: 'Q4 performance report is available for download.' },
  ]

  return (
    <div className="rounded-lg p-3" style={{ background: '#1a1a2e', border: '1px solid #2a2a3e', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
      <span className="mb-2 block text-[0.6rem] font-semibold uppercase tracking-wider" style={{ color: '#64748b' }}>
        Toast Triggers
      </span>
      <div className="flex flex-col gap-1">
        {triggers.map((t) => {
          const Icon = toastConfig[t.type].icon
          return (
            <button
              key={t.type}
              onClick={() => addToast(t)}
              className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-left text-[0.65rem] transition-all duration-150"
              style={{ background: '#0f0f1a', border: '1px solid #2a2a3e', color: toastConfig[t.type].color }}
            >
              <Icon size={11} />
              {t.title}
            </button>
          )
        })}
      </div>
    </div>
  )
}
