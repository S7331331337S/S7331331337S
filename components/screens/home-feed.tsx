'use client'

import Image from 'next/image'
import { Icon } from '@/components/icons'
import { ListingCard } from '@/components/listing-card'
import { CategoryChip } from '@/components/category-chip'
import { listings } from '@/lib/data'
import { CATEGORIES, Listing } from '@/lib/types'
import { useState } from 'react'

interface HomeFeedProps {
  onListingClick: (listing: Listing) => void
}

export function HomeFeed({ onListingClick }: HomeFeedProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  
  const filteredListings = selectedCategory
    ? listings.filter(l => l.category === selectedCategory)
    : listings

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Icon name="sprout" className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Sprout</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
              <Icon name="bell" className="h-5 w-5 text-foreground" />
              <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-destructive" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-48 overflow-hidden">
        <Image
          src="/images/hero-plants.jpg"
          alt="Beautiful plants"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-balance text-2xl font-bold text-foreground">
            Welcome to your plant community
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Discover plants, share knowledge, connect locally
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <CategoryChip
            category={{ id: 'all' as any, name: 'All', icon: 'sprout', description: '', color: '' }}
            selected={!selectedCategory}
            onClick={() => setSelectedCategory(null)}
            size="sm"
          />
          {CATEGORIES.slice(0, 5).map((category) => (
            <CategoryChip
              key={category.id}
              category={category}
              selected={selectedCategory === category.id}
              onClick={() => setSelectedCategory(
                selectedCategory === category.id ? null : category.id
              )}
              size="sm"
            />
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      <section className="px-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Near You</h2>
          <button className="flex items-center gap-1 text-sm font-medium text-primary">
            See all
            <Icon name="chevron-right" className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filteredListings.slice(0, 4).map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onClick={() => onListingClick(listing)}
            />
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="mt-6 px-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Recent Activity</h2>
        </div>
        <div className="flex flex-col gap-3">
          {filteredListings.slice(4).map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              variant="compact"
              onClick={() => onListingClick(listing)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
