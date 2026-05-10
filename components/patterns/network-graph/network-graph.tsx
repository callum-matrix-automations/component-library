// Dependencies: react-force-graph-2d, lucide-react
// Source: TTRPG (RelationshipGraphModal) — enhanced with premium canvas rendering

'use client'

import { useEffect, useRef, useState, useCallback, useMemo, lazy, Suspense } from 'react'
import { createPortal } from 'react-dom'
import { X, Network } from 'lucide-react'

const ForceGraph2D = lazy(() => import('react-force-graph-2d'))

export interface NetworkNode {
  id: string
  name: string
  group: string
  groupColor: string
  description: string
  portrait?: string | null
  strength?: number
}

export interface NetworkLink {
  source: string
  target: string
  type: string
  weight?: number
}

export interface NetworkGraphProps {
  nodes: NetworkNode[]
  links: NetworkLink[]
  title?: string
  onClose: () => void
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

function NodePopup({ node, pos, onClose }: { node: NetworkNode; pos: { x: number; y: number }; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose() }
    const timer = setTimeout(() => window.addEventListener('mousedown', handler), 50)
    return () => { clearTimeout(timer); window.removeEventListener('mousedown', handler) }
  }, [onClose])

  const left = Math.min(pos.x + 12, (typeof window !== 'undefined' ? window.innerWidth : 800) - 280)
  const top = Math.min(pos.y - 20, (typeof window !== 'undefined' ? window.innerHeight : 600) - 240)

  return (
    <div
      ref={ref}
      className="fixed overflow-hidden rounded-xl"
      style={{ left: `${left}px`, top: `${top}px`, zIndex: 10001, width: '260px', background: 'rgba(12,10,22,0.95)', border: `1px solid ${node.groupColor}55`, boxShadow: `0 16px 48px rgba(0,0,0,0.7), 0 0 24px ${node.groupColor}22`, backdropFilter: 'blur(16px)' }}
    >
      {/* Accent stripe */}
      <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${node.groupColor}, transparent)` }} />

      <div className="p-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full" style={{ border: `2px solid ${node.groupColor}`, background: '#0a0a14' }}>
            {node.portrait ? <img src={node.portrait} alt={node.name} className="h-full w-full object-cover" /> : <span className="text-base font-bold" style={{ color: node.groupColor }}>{node.name[0]}</span>}
            <div className="pointer-events-none absolute inset-0 rounded-full" style={{ boxShadow: `inset 0 0 12px ${node.groupColor}33` }} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-bold leading-tight text-white">{node.name}</h3>
            <div className="mt-0.5 flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full" style={{ background: node.groupColor, boxShadow: `0 0 4px ${node.groupColor}` }} />
              <span className="text-[0.6rem] font-medium" style={{ color: node.groupColor }}>{node.group}</span>
            </div>
          </div>
        </div>

        {node.strength !== undefined && (
          <div className="mb-3">
            <div className="mb-1 flex items-center justify-between text-[0.6rem]">
              <span style={{ color: '#64748b' }}>Relationship Strength</span>
              <span className="font-semibold tabular-nums" style={{ color: node.groupColor }}>{node.strength}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: '#1a1a2e' }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${node.strength}%`, background: `linear-gradient(90deg, ${node.groupColor}, ${hexToRgba(node.groupColor, 0.5)})`, boxShadow: `0 0 8px ${node.groupColor}44` }} />
            </div>
          </div>
        )}

        <p className="text-[0.65rem] leading-relaxed" style={{ color: '#94a3b8' }}>{node.description}</p>
      </div>
    </div>
  )
}

export default function NetworkGraph({ nodes, links, title = 'Relationship Network', onClose }: NetworkGraphProps) {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null)
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const graphRef = useRef<any>(undefined)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })

  useEffect(() => { requestAnimationFrame(() => setVisible(true)) }, [])

  useEffect(() => {
    if (!containerRef.current) return
    const obs = new ResizeObserver((entries) => { const { width, height } = entries[0].contentRect; setDimensions({ width, height }) })
    obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    let attempts = 0
    const configure = () => {
      const fg = graphRef.current
      if (!fg) { if (attempts < 20) { attempts++; return setTimeout(configure, 150) }; return }
      fg.d3Force('charge')?.strength(-500)
      fg.d3Force('link')?.distance(180)
      fg.d3ReheatSimulation()
    }
    const timer = setTimeout(configure, 200)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = useCallback(() => { setClosing(true); setTimeout(onClose, 200) }, [onClose])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { if (selectedNode) setSelectedNode(null); else handleClose() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleClose, selectedNode])

  const degreeCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    links.forEach((l) => {
      counts[l.source] = (counts[l.source] || 0) + 1
      counts[l.target] = (counts[l.target] || 0) + 1
    })
    return counts
  }, [links])

  const graphData = useMemo(() => {
    const gNodes = nodes.map((n) => ({
      ...n, _color: n.groupColor, _degree: degreeCounts[n.id] || 1,
    }))
    const gLinks = links.map((l) => ({
      ...l, _weight: l.weight ?? 1,
    }))
    return { nodes: gNodes, links: gLinks }
  }, [nodes, links, degreeCounts])

  const isOpen = visible && !closing

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nodeCanvasObject = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const x = node.x as number
    const y = node.y as number
    if (!isFinite(x) || !isFinite(y)) return

    const size = 10 + Math.sqrt(node._degree || 1) * 2.5
    const isHovered = node.id === hoveredNodeId
    const isSelected = selectedNode?.id === node.id

    ctx.save()

    // Glow halo
    ctx.shadowColor = node._color
    ctx.shadowBlur = isHovered || isSelected ? 24 : 12
    ctx.beginPath()
    ctx.arc(x, y, size + 2, 0, 2 * Math.PI)
    ctx.fillStyle = hexToRgba(node._color, isHovered ? 0.15 : 0.06)
    ctx.fill()
    ctx.shadowBlur = 0

    // Outer ring for hub nodes or selected
    if (node._degree >= 3 || isSelected) {
      ctx.beginPath()
      ctx.arc(x, y, size + 5, 0, 2 * Math.PI)
      ctx.strokeStyle = hexToRgba(node._color, isSelected ? 0.6 : 0.2)
      ctx.lineWidth = 1.2
      ctx.stroke()
    }

    // Main circle
    ctx.beginPath()
    ctx.arc(x, y, size, 0, 2 * Math.PI)
    const innerGrad = ctx.createRadialGradient(x - size * 0.3, y - size * 0.3, 0, x, y, size)
    innerGrad.addColorStop(0, '#1e1e36')
    innerGrad.addColorStop(1, '#0c0c1a')
    ctx.fillStyle = innerGrad
    ctx.fill()
    ctx.strokeStyle = node._color
    ctx.lineWidth = 2
    ctx.stroke()

    // Initial letter
    ctx.fillStyle = node._color
    const fontSize = Math.max(9, size * 0.8)
    ctx.font = `bold ${fontSize}px Inter, system-ui, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(node.name[0], x, y + 0.5)

    // Label with background pill — always show at reasonable zoom
    if (globalScale > 0.6) {
      const label = node.name
      const labelFontSize = Math.min(11, 10 / globalScale)
      ctx.font = `500 ${labelFontSize}px Inter, system-ui, sans-serif`
      const textWidth = ctx.measureText(label).width
      const pillPadX = 4
      const pillPadY = 2
      const pillY = y + size + 6

      // Pill background
      const pillW = textWidth + pillPadX * 2
      const pillH = labelFontSize + pillPadY * 2
      const pillX = x - pillW / 2
      const radius = pillH / 2
      ctx.beginPath()
      ctx.moveTo(pillX + radius, pillY)
      ctx.lineTo(pillX + pillW - radius, pillY)
      ctx.arcTo(pillX + pillW, pillY, pillX + pillW, pillY + radius, radius)
      ctx.arcTo(pillX + pillW, pillY + pillH, pillX + pillW - radius, pillY + pillH, radius)
      ctx.lineTo(pillX + radius, pillY + pillH)
      ctx.arcTo(pillX, pillY + pillH, pillX, pillY + radius, radius)
      ctx.arcTo(pillX, pillY, pillX + radius, pillY, radius)
      ctx.closePath()
      ctx.fillStyle = 'rgba(8,8,16,0.85)'
      ctx.fill()

      // Label text
      ctx.fillStyle = isHovered ? '#ffffff' : '#c8cdd5'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      ctx.fillText(label, x, pillY + pillPadY)
    } else {
      ctx.fillStyle = '#64748b'
      ctx.font = `9px Inter, system-ui, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      ctx.fillText(node.name, x, y + size + 4)
    }

    ctx.restore()
  }, [hoveredNodeId, selectedNode])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const linkCanvasObject = useCallback((link: any, ctx: CanvasRenderingContext2D) => {
    const source = link.source
    const target = link.target
    if (!isFinite(source.x) || !isFinite(source.y) || !isFinite(target.x) || !isFinite(target.y)) return

    ctx.save()

    // Gradient link from source color to target color
    const gradient = ctx.createLinearGradient(source.x, source.y, target.x, target.y)
    gradient.addColorStop(0, hexToRgba(source._color || '#C8A44E', 0.35))
    gradient.addColorStop(1, hexToRgba(target._color || '#C8A44E', 0.12))
    ctx.strokeStyle = gradient
    ctx.lineWidth = 0.8 + (link._weight || 1) * 0.7

    // Curved link
    const dx = target.x - source.x
    const dy = target.y - source.y
    const cx = (source.x + target.x) / 2 - dy * 0.08
    const cy = (source.y + target.y) / 2 + dx * 0.08

    ctx.beginPath()
    ctx.moveTo(source.x, source.y)
    ctx.quadraticCurveTo(cx, cy, target.x, target.y)
    ctx.stroke()

    // Label at midpoint
    if (link.type) {
      const labelFontSize = 7.5
      ctx.font = `500 ${labelFontSize}px Inter, system-ui, sans-serif`
      const textWidth = ctx.measureText(link.type).width

      // Background pill behind link label
      ctx.fillStyle = 'rgba(8,8,16,0.75)'
      const lx = cx - textWidth / 2 - 3
      const ly = cy - labelFontSize / 2 - 7
      const lw = textWidth + 6
      const lh = labelFontSize + 5
      ctx.beginPath()
      ctx.roundRect(lx, ly, lw, lh, 3)
      ctx.fill()

      ctx.fillStyle = 'rgba(148,163,184,0.7)'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(link.type, cx, cy - 5)
    }

    ctx.restore()
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNodeClick = useCallback((node: any, event: MouseEvent) => {
    const found = nodes.find((n) => n.id === node.id)
    if (found) { setSelectedNode(found); setPopupPos({ x: event.clientX, y: event.clientY }) }
  }, [nodes])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNodeHover = useCallback((node: any) => {
    setHoveredNodeId(node?.id ?? null)
  }, [])

  const groups = Array.from(new Set(nodes.map((n) => n.group)))

  return createPortal(
    <div
      className="fixed inset-0 flex flex-col"
      style={{ zIndex: 10000, background: isOpen ? 'rgba(4,4,10,0.92)' : 'rgba(0,0,0,0)', backdropFilter: isOpen ? 'blur(8px)' : 'blur(0px)', transition: 'background 300ms ease, backdrop-filter 300ms ease' }}
    >
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid #1e1e32', background: 'rgba(8,8,16,0.6)', opacity: isOpen ? 1 : 0, transition: 'opacity 200ms ease' }}>
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: 'rgba(200,164,78,0.12)', border: '1px solid rgba(200,164,78,0.2)' }}>
            <Network size={14} style={{ color: '#C8A44E' }} />
          </div>
          <h2 className="text-sm font-bold text-white">{title}</h2>
          <span className="rounded-full px-2.5 py-0.5 text-[0.6rem] font-semibold" style={{ background: 'rgba(200,164,78,0.1)', color: '#C8A44E', border: '1px solid rgba(200,164,78,0.15)' }}>
            {nodes.length} nodes
          </span>
        </div>
        <button onClick={handleClose} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-white/5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1e1e32', color: '#94a3b8' }} aria-label="Close">
          <X size={16} />
        </button>
      </div>

      {/* Graph */}
      <div ref={containerRef} className="relative flex-1 overflow-hidden" style={{ opacity: isOpen ? 1 : 0, transform: isOpen ? 'scale(1)' : 'scale(0.97)', transition: 'opacity 300ms ease, transform 300ms ease' }}>
        <Suspense fallback={<div className="flex h-full w-full items-center justify-center"><span className="text-sm" style={{ color: '#64748b' }}>Loading graph...</span></div>}>
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor="transparent"
          nodeCanvasObject={nodeCanvasObject}
          linkCanvasObject={linkCanvasObject}
          onNodeClick={handleNodeClick}
          onNodeHover={handleNodeHover}
          nodeRelSize={6}
          d3AlphaDecay={0.02}
          d3VelocityDecay={0.2}
          warmupTicks={100}
          cooldownTicks={200}
          enableNodeDrag={true}
          enableZoomInteraction={true}
          enablePanInteraction={true}
          minZoom={0.3}
          maxZoom={5}
        />
        </Suspense>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 overflow-hidden rounded-xl" style={{ background: 'rgba(8,8,16,0.9)', border: '1px solid #1e1e32', backdropFilter: 'blur(12px)' }}>
          <div className="px-3.5 py-2" style={{ borderBottom: '1px solid #1e1e32' }}>
            <span className="text-[0.55rem] font-semibold uppercase tracking-[0.15em]" style={{ color: '#4a4a6a' }}>Groups</span>
          </div>
          <div className="space-y-0.5 px-3.5 py-2">
            {groups.map((group) => {
              const node = nodes.find((n) => n.group === group)
              const count = nodes.filter((n) => n.group === group).length
              return (
                <div key={group} className="flex items-center gap-2.5 py-0.5">
                  <div className="h-2 w-2 rounded-full" style={{ background: node?.groupColor, boxShadow: `0 0 6px ${node?.groupColor}44` }} />
                  <span className="text-[0.6rem] font-medium" style={{ color: '#94a3b8' }}>{group}</span>
                  <span className="ml-auto text-[0.5rem] tabular-nums" style={{ color: '#4a4a6a' }}>{count}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Zoom hint */}
        <div className="absolute bottom-4 right-4 rounded-lg px-3 py-1.5" style={{ background: 'rgba(8,8,16,0.8)', border: '1px solid #1e1e32' }}>
          <span className="text-[0.55rem]" style={{ color: '#4a4a6a' }}>Scroll to zoom · Drag to pan · Click nodes for details</span>
        </div>
      </div>

      {selectedNode && <NodePopup node={selectedNode} pos={popupPos} onClose={() => setSelectedNode(null)} />}
    </div>,
    document.body,
  )
}
