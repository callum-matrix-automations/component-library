// Dependencies: motion, lucide-react
// Source: TTRPG (ItemModal adapted for ecommerce)

'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'motion/react'
import { X, Sparkles, ShoppingCart, Trash2, Package } from 'lucide-react'

const tierColors: Record<string, { text: string; bg: string; border: string }> = {
  standard: { text: '#94a3b8', bg: '#1a1a2e', border: '#2a2a3e' },
  premium: { text: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: '#22c55e44' },
  professional: { text: '#60a5fa', bg: 'rgba(96,165,250,0.1)', border: '#60a5fa44' },
  enterprise: { text: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: '#a78bfa44' },
  exclusive: { text: '#daa520', bg: 'rgba(218,165,32,0.1)', border: '#daa52044' },
}

export interface ProductItem {
  id: string
  name: string
  image: string
  tier: string
  category: string
  price: string
  description: string
  highlights?: string[]
  specs?: Record<string, string>
  inStock?: boolean
  quantity?: number
}

export interface ProductModalProps {
  product: ProductItem
  onClose: () => void
  onAddToCart?: (id: string) => void
  onRemove?: (id: string) => void
}

export default function ProductModal({ product, onClose, onAddToCart, onRemove }: ProductModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null)
  const tier = tierColors[product.tier] ?? tierColors.standard
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => { requestAnimationFrame(() => setVisible(true)) }, [])
  const handleClose = useCallback(() => { setClosing(true); setTimeout(onClose, 200) }, [onClose])
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [handleClose])

  const isOpen = visible && !closing

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: isOpen ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0)',
        backdropFilter: isOpen ? 'blur(4px)' : 'blur(0px)',
        transition: 'background 200ms ease, backdrop-filter 200ms ease',
      }}
      onClick={(e) => { if (e.target === backdropRef.current) handleClose() }}
    >
      <div
        className="relative mx-4 w-full max-w-sm overflow-hidden rounded-xl"
        style={{
          background: '#0f0f1a',
          border: `1px solid ${tier.border}`,
          boxShadow: `0 24px 48px rgba(0,0,0,0.5), 0 0 20px ${tier.bg}`,
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(12px)',
          transition: 'opacity 200ms ease, transform 200ms ease',
        }}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
          <motion.img src={product.image} alt={product.name} className="h-full w-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} />

          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.tier !== 'standard' && (
              <span className="rounded-full px-2.5 py-0.5 text-[0.6rem] font-semibold capitalize" style={{ background: tier.bg, color: tier.text, backdropFilter: 'blur(8px)' }}>{product.tier}</span>
            )}
            {product.inStock === false && (
              <span className="rounded-full px-2.5 py-0.5 text-[0.6rem] font-semibold" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444', backdropFilter: 'blur(8px)' }}>Out of Stock</span>
            )}
            {product.quantity && product.quantity > 1 && (
              <span className="rounded-full px-2.5 py-0.5 text-[0.6rem] font-semibold" style={{ background: 'rgba(0,0,0,0.6)', color: '#e2e8f0', backdropFilter: 'blur(8px)' }}>x{product.quantity}</span>
            )}
          </div>

          <button onClick={handleClose} className="absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full" style={{ background: '#0f0f1a', border: '1px solid #2a2a3e', color: '#64748b' }}>
            <X size={14} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-3 p-4">
          <div>
            <h3 className="text-sm font-semibold text-white">{product.name}</h3>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xs capitalize" style={{ color: tier.text }}>{product.category}</span>
              <span className="ml-auto text-sm font-bold" style={{ color: tier.text }}>{product.price}</span>
            </div>
          </div>

          <p className="text-xs leading-relaxed" style={{ color: '#94a3b8' }}>{product.description}</p>

          {product.highlights && product.highlights.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[0.6rem]" style={{ color: '#64748b' }}>Highlights</span>
              <div className="flex flex-col gap-1.5">
                {product.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 rounded-lg px-3 py-2 text-xs" style={{ background: tier.bg, border: `1px solid ${tier.border}` }}>
                    <Sparkles size={12} className="mt-0.5 shrink-0" style={{ color: tier.text }} />
                    <span className="text-white">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[0.6rem]" style={{ color: '#64748b' }}>Specifications</span>
              <div className="flex flex-wrap gap-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs" style={{ background: '#1a1a2e', border: '1px solid #2a2a3e' }}>
                    <span className="capitalize" style={{ color: '#64748b' }}>{key}</span>
                    <span className="font-semibold text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 p-4 pt-0">
          <button
            className="flex h-9 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
            style={{ background: tier.text, color: '#0f0f1a' }}
            onClick={() => { onAddToCart?.(product.id); handleClose() }}
          >
            <ShoppingCart size={14} /> Add to Cart
          </button>
          {onRemove && (
            <button
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-all duration-150"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#ef4444' }}
              onClick={() => { onRemove(product.id); handleClose() }}
              title="Remove"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
