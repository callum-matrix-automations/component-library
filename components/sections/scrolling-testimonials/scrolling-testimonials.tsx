// Dependencies: react-fast-marquee
// Source: cutting-edge-homes-landing-page (alternate-hero branch)

'use client'

import Marquee from 'react-fast-marquee'

export interface ScrollingTestimonial {
  name: string
  location?: string
  quote: string
  rating?: number
}

export interface ScrollingTestimonialsProps {
  reviews?: ScrollingTestimonial[]
  speed?: number
  pauseOnHover?: boolean
  accentColor?: string
  backgroundColor?: string
  cardBackgroundColor?: string
  gradientColor?: string
}

const defaultReviews: ScrollingTestimonial[] = [
  { name: 'Claire H.', location: 'Los Angeles, CA', quote: 'The entire team has been helpful, timely, and truly gone above and beyond, especially when navigating tricky county codes and permitting.' },
  { name: 'Valerie W.', location: 'Carlsbad, CA', quote: "We've never built a house before and they walked us through every step of the way. The engineers do great work and our plans were accepted on the first go!" },
  { name: 'William S.', location: 'Descanso, CA', quote: "We found them to be, without exception, honest and fair in their dealings with us. Excellent communication skills were key to overcoming the various challenges we faced." },
  { name: 'Hilary R.', location: 'Santa Cruz, CA', quote: 'They built us exactly the home that we wanted. Over 10 years later the same experienced and warm-hearted people are still there and remembered me instantly.' },
  { name: 'Donna', location: 'Bishop, CA', quote: 'They answered all hundreds of my emails with patience and often would call me to explain and give advice. Even after being in our new home for 3 months they are still making sure we are happy.' },
  { name: 'Jack H Thomas III', location: 'Los Angeles, CA', quote: 'Exceptional help through the design process. We are so excited to be on the way to having a home again and to be working with such a great team!' },
  { name: 'Will Eskridge', location: 'Los Angeles, CA', quote: "Friendly team. Stylish design options and customizability. Solid build. The quality of today's modular homes makes the prefab market more attractive than ever." },
  { name: 'Christine Poje', location: 'Los Angeles, CA', quote: 'As an amateur architect and home builder since 1987, I was elated to find this company. Every conversation I have with this team makes me happy I chose them.' },
  { name: 'Matt Wolfe', location: 'Sonoma County, CA', quote: 'The team made every deadline, always staying right at the budget. The process was explained completely and thoroughly, with no surprises. We love our new home!' },
]

function Stars({ count = 5, color }: { count?: number; color: string }) {
  return (
    <div className="mb-3 flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="h-3.5 w-3.5"
          style={{ color: i < count ? color : 'rgba(255,255,255,0.2)' }}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function ScrollingTestimonials({
  reviews = defaultReviews,
  speed = 35,
  pauseOnHover = true,
  accentColor = '#C8A44E',
  backgroundColor = '#1A1A1A',
  cardBackgroundColor = '#222222',
  gradientColor = '#1A1A1A',
}: ScrollingTestimonialsProps) {
  return (
    <div className="relative py-10" style={{ backgroundColor }}>
      <Marquee speed={speed} gradient gradientColor={gradientColor} gradientWidth={80} pauseOnHover={pauseOnHover}>
        {reviews.map((r, i) => (
          <div
            key={i}
            className="mx-3 flex w-80 shrink-0 flex-col rounded-xl border border-white/[0.08] p-5"
            style={{ backgroundColor: cardBackgroundColor }}
          >
            <Stars count={r.rating ?? 5} color={accentColor} />
            <blockquote className="flex-1 text-sm leading-relaxed text-white/80">
              &ldquo;{r.quote}&rdquo;
            </blockquote>
            <div className="mt-4 flex items-center gap-2">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold"
                style={{ backgroundColor: `${accentColor}26`, color: accentColor }}
                aria-hidden="true"
              >
                {r.name[0]}
              </div>
              <div>
                <div className="text-xs font-semibold text-white/85">{r.name}</div>
                {r.location && (
                  <div className="text-[10px] text-white/40">{r.location}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  )
}
