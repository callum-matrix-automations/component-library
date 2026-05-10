// Dependencies: (none)
// Source: dirt-to-keys

import { memo } from 'react'
import { useIntersectionObserver } from '../../../hooks/use-intersection-observer'

export interface ServiceAreaCardProps {
  name: string
  image: string
  href?: string
  index?: number
}

const ServiceAreaCard = memo(function ServiceAreaCard({
  name,
  image,
  href = '#',
  index = 0,
}: ServiceAreaCardProps) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 })

  return (
    <a
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={href}
      className="group relative block min-w-[280px] overflow-hidden rounded-lg shadow-lg transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-xl"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/20 to-transparent">
        <h3 className="p-6 text-xl font-bold text-white transition-colors group-hover:text-white/90">
          {name}
        </h3>
      </div>
    </a>
  )
})

export default ServiceAreaCard
