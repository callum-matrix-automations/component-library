// Dependencies: motion, lucide-react, @headlessui/react, @heroicons/react
// Source: dirt-to-keys

'use client'

import { useState, useEffect, useRef, Fragment, useMemo } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { Dialog, Transition, Tab } from '@headlessui/react'
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CatalogItem {
  id: string
  name: string
  image: string
  images?: string[]
  description: string
  specs: Record<string, string | number>
  features?: string[]
  category?: string
}

export interface CatalogCardProps {
  item: CatalogItem
  allItems?: CatalogItem[]
  priceKey?: string
}

// ─── Card Component ──────────────────────────────────────────────────────────

export default function CatalogCard({ item, allItems = [], priceKey }: CatalogCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const images = item.images || [item.image]
  const hasMultipleImages = images.length > 1

  useEffect(() => {
    const element = descriptionRef.current
    if (element) {
      setIsTruncated(element.scrollHeight > element.clientHeight)
    }
  }, [item.description])

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setDirection(-1)
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setDirection(1)
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%' }),
    center: { x: 0, transition: { type: 'spring', stiffness: 500, damping: 40 } },
    exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', transition: { type: 'spring', stiffness: 500, damping: 40 } }),
  }

  const kenBurnsVariants = {
    initial: { scale: 1 },
    animate: { scale: 1.05, transition: { duration: 10, repeat: Infinity, repeatType: 'reverse' as const, ease: 'easeInOut' } },
  }

  return (
    <>
      <div
        className="flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
        style={{ padding: 24 }}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Image Carousel */}
        <div className="group relative mb-4 h-64 overflow-hidden rounded-lg">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentImageIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <motion.div variants={kenBurnsVariants} initial="initial" animate="animate" className="h-full w-full">
                <img
                  src={images[currentImageIndex]}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {hasMultipleImages && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 transition-opacity hover:bg-white group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} className="text-gray-800" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 transition-opacity hover:bg-white group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight size={20} className="text-gray-800" />
              </button>
              <div className="absolute bottom-2 right-2 z-10 rounded bg-black/50 px-2 py-1 text-xs text-white">
                {currentImageIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-3 text-lg font-bold text-gray-900">{item.name}</h3>

        {/* Description */}
        <div className="mb-4 grow">
          <div className="mb-3 text-sm text-gray-700">
            <div ref={descriptionRef} className={!isDescriptionExpanded ? 'line-clamp-3' : ''}>
              {item.description}
            </div>
            {isTruncated && (
              <button
                onClick={(e) => { e.stopPropagation(); setIsDescriptionExpanded(!isDescriptionExpanded) }}
                className="mt-1 text-xs font-semibold text-blue-600 hover:underline"
              >
                {isDescriptionExpanded ? 'Read less' : 'Read more'}
              </button>
            )}
          </div>

          {/* Specs */}
          <div className="space-y-2 text-sm text-gray-600">
            {Object.entries(item.specs).map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <span className="font-semibold text-gray-900">{label}:</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800">
          View Details
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Detail Modal */}
      <CatalogDetailModal
        item={item}
        allItems={allItems}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

// ─── Detail Modal ────────────────────────────────────────────────────────────

interface CatalogDetailModalProps {
  item: CatalogItem
  allItems: CatalogItem[]
  isOpen: boolean
  onClose: () => void
}

function CatalogDetailModal({ item, allItems, isOpen, onClose }: CatalogDetailModalProps) {
  const images = item.images || [item.image]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const comparableItems = allItems.filter((i) => i.id !== item.id)

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-0 md:p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-400"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-250"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="h-full w-full transform overflow-y-auto bg-white shadow-2xl transition-all md:h-auto md:max-h-[90vh] md:max-w-5xl md:rounded-2xl">
                {/* Close Button */}
                <motion.button
                  onClick={onClose}
                  className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 shadow-lg transition-colors hover:bg-white"
                  aria-label="Close modal"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <XMarkIcon className="h-6 w-6 text-gray-700" />
                </motion.button>

                {/* Hero Image */}
                <div className="relative h-64 w-full bg-gray-100 md:h-96">
                  <img
                    src={images[currentImageIndex]}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex((p) => (p - 1 + images.length) % images.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:scale-110 hover:bg-white"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={24} className="text-gray-700" />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((p) => (p + 1) % images.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:scale-110 hover:bg-white"
                        aria-label="Next image"
                      >
                        <ChevronRight size={24} className="text-gray-700" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-sm text-white backdrop-blur-sm">
                        {currentImageIndex + 1} / {images.length}
                      </div>
                      {/* Thumbnails */}
                      <div className="absolute bottom-0 left-0 right-0 hidden gap-2 bg-linear-to-t from-black/60 to-transparent p-4 md:flex">
                        {images.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`h-16 w-16 shrink-0 overflow-hidden rounded transition-all ${idx === currentImageIndex ? 'scale-110 ring-2 ring-white' : 'opacity-60 hover:opacity-100'}`}
                          >
                            <img src={img} alt={`Thumbnail ${idx + 1}`} className="h-full w-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Tabs */}
                <Tab.Group>
                  <div className="sticky top-0 z-10 border-b border-gray-200 bg-white">
                    <Tab.List className="flex overflow-x-auto">
                      {['Overview', 'Specifications', ...(comparableItems.length > 0 ? ['Compare'] : [])].map((tab) => (
                        <Tab
                          key={tab}
                          className={({ selected }) =>
                            `whitespace-nowrap px-6 py-4 text-sm font-medium transition-all focus:outline-none ${selected ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`
                          }
                        >
                          {tab}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>

                  <Tab.Panels className="p-4 md:p-8">
                    {/* Overview */}
                    <Tab.Panel className="focus:outline-none">
                      <OverviewPanel item={item} />
                    </Tab.Panel>

                    {/* Specifications */}
                    <Tab.Panel className="focus:outline-none">
                      <SpecificationsPanel item={item} />
                    </Tab.Panel>

                    {/* Compare */}
                    {comparableItems.length > 0 && (
                      <Tab.Panel className="focus:outline-none">
                        <ComparePanel currentItem={item} allItems={comparableItems} />
                      </Tab.Panel>
                    )}
                  </Tab.Panels>
                </Tab.Group>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

// ─── Overview Panel ──────────────────────────────────────────────────────────

function OverviewPanel({ item }: { item: CatalogItem }) {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h2 className="mb-2 text-3xl font-bold text-gray-900">{item.name}</h2>
        {item.category && <p className="text-lg text-gray-600">{item.category}</p>}
      </div>

      <div>
        <h3 className="mb-4 text-xl font-bold text-gray-900">About</h3>
        <p className="leading-relaxed text-gray-700">{item.description}</p>
      </div>

      {item.features && item.features.length > 0 && (
        <div>
          <h3 className="mb-4 text-xl font-bold text-gray-900">Features</h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {item.features.map((feat) => (
              <div key={feat} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm text-gray-700">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Specifications Panel ────────────────────────────────────────────────────

function SpecificationsPanel({ item }: { item: CatalogItem }) {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h2 className="mb-2 text-3xl font-bold text-gray-900">Specifications</h2>
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <div className="divide-y divide-gray-200">
          {Object.entries(item.specs).map(([label, value]) => (
            <div key={label} className="grid grid-cols-2 gap-4 px-6 py-4 transition hover:bg-gray-50">
              <dt className="text-sm font-medium text-gray-600">{label}</dt>
              <dd className="text-sm font-semibold text-gray-900">{value}</dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Compare Panel ───────────────────────────────────────────────────────────

function ComparePanel({ currentItem, allItems }: { currentItem: CatalogItem; allItems: CatalogItem[] }) {
  const [selectedId, setSelectedId] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const filteredItems = useMemo(() => {
    if (!searchQuery) return allItems
    const q = searchQuery.toLowerCase()
    return allItems.filter((i) => i.name.toLowerCase().includes(q) || (i.category || '').toLowerCase().includes(q))
  }, [allItems, searchQuery])

  const comparisonItem = allItems.find((i) => i.id === selectedId)

  const allSpecKeys = useMemo(() => {
    if (!comparisonItem) return Object.keys(currentItem.specs)
    return [...new Set([...Object.keys(currentItem.specs), ...Object.keys(comparisonItem.specs)])]
  }, [currentItem, comparisonItem])

  const allFeatures = useMemo(() => {
    if (!comparisonItem) return currentItem.features || []
    return [...new Set([...(currentItem.features || []), ...(comparisonItem.features || [])])].sort()
  }, [currentItem, comparisonItem])

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-8">
      <div>
        <h2 className="mb-2 text-3xl font-bold text-gray-900">Compare</h2>
        <p className="text-gray-600">Select an item to compare side-by-side with {currentItem.name}</p>
      </div>

      {/* Dropdown */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <label className="mb-2 block text-sm font-medium text-gray-700">Select Item to Compare</label>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-left focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="text-gray-900">{comparisonItem ? comparisonItem.name : 'Choose an item...'}</span>
            <svg className={`h-5 w-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute z-10 mt-2 max-h-96 w-full overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg">
              <div className="sticky top-0 border-b border-gray-200 bg-white p-3">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="p-2">
                {filteredItems.length === 0 ? (
                  <div className="px-4 py-8 text-center text-gray-500">No items found</div>
                ) : (
                  filteredItems.map((i) => (
                    <button
                      key={i.id}
                      onClick={() => { setSelectedId(i.id); setIsDropdownOpen(false); setSearchQuery('') }}
                      className={`w-full rounded-lg px-4 py-3 text-left transition-colors hover:bg-blue-50 ${selectedId === i.id ? 'bg-blue-100' : ''}`}
                    >
                      <div className="font-medium text-gray-900">{i.name}</div>
                      {i.category && <div className="text-sm text-gray-500">{i.category}</div>}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Comparison */}
      {!comparisonItem ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-blue-200 bg-linear-to-br from-blue-50 to-indigo-50 py-16">
          <svg className="mb-4 h-20 w-20 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
          <h3 className="mb-2 text-2xl font-bold text-gray-900">Select an Item to Compare</h3>
          <p className="max-w-md text-center text-gray-600">
            Use the dropdown above to select an item and compare it side-by-side with {currentItem.name}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Visual comparison */}
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900">Side by Side</h3>
            </div>
            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
              <div className="space-y-3">
                <div className="aspect-video overflow-hidden rounded-lg bg-gray-100">
                  <img src={currentItem.images?.[0] || currentItem.image} alt={currentItem.name} className="h-full w-full object-cover" />
                </div>
                <div className="text-xl font-bold text-gray-900">{currentItem.name}</div>
              </div>
              <div className="space-y-3">
                <div className="aspect-video overflow-hidden rounded-lg bg-gray-100">
                  <img src={comparisonItem.images?.[0] || comparisonItem.image} alt={comparisonItem.name} className="h-full w-full object-cover" />
                </div>
                <div className="text-xl font-bold text-gray-900">{comparisonItem.name}</div>
              </div>
            </div>
          </div>

          {/* Specs comparison */}
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900">Specifications</h3>
            </div>
            <div className="p-6 space-y-1">
              {allSpecKeys.map((key) => {
                const v1 = currentItem.specs[key] ?? 'N/A'
                const v2 = comparisonItem.specs[key] ?? 'N/A'
                return (
                  <div key={key} className="grid grid-cols-1 gap-4 border-b border-gray-200 py-3 last:border-b-0 md:grid-cols-3">
                    <div className="text-sm font-medium text-gray-700">{key}</div>
                    <div className="rounded bg-white px-4 py-2 text-center text-sm text-gray-900 md:text-left">{v1}</div>
                    <div className="rounded bg-white px-4 py-2 text-center text-sm text-gray-900 md:text-left">{v2}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Features comparison */}
          {allFeatures.length > 0 && (
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-3">
                <h3 className="text-lg font-semibold text-gray-900">Features</h3>
              </div>
              <div className="p-6 space-y-1">
                {allFeatures.map((feat) => {
                  const has1 = (currentItem.features || []).includes(feat)
                  const has2 = (comparisonItem.features || []).includes(feat)
                  return (
                    <div key={feat} className="grid grid-cols-1 gap-4 border-b border-gray-200 py-3 last:border-b-0 md:grid-cols-3">
                      <div className="text-sm font-medium text-gray-700">{feat}</div>
                      <div className="flex items-center justify-center md:justify-start">
                        {has1 ? <CheckIcon className="h-5 w-5 text-green-600" /> : <XMarkIcon className="h-5 w-5 text-gray-300" />}
                      </div>
                      <div className="flex items-center justify-center md:justify-start">
                        {has2 ? <CheckIcon className="h-5 w-5 text-green-600" /> : <XMarkIcon className="h-5 w-5 text-gray-300" />}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
