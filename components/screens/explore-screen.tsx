'use client'

import { useState } from 'react'
import { Icon } from '@/components/icons'
import { ListingCard } from '@/components/listing-card'
import { CategoryGrid } from '@/components/category-chip'
import { Input } from '@/components/ui/input'
import { listings } from '@/lib/data'
import { CATEGORIES, Listing, CategoryInfo } from '@/lib/types'

interface ExploreScreenProps {
  onListingClick: (listing: Listing) => void
}

export function ExploreScreen({ onListingClick }: ExploreScreenProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showCategories, setShowCategories] = useState(true)

  const filteredListings = listings.filter((listing) => {
    const matchesSearch = searchQuery === '' || 
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || listing.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleCategorySelect = (category: CategoryInfo) => {
    setSelectedCategory(category.id)
    setShowCategories(false)
  }

  const clearFilters = () => {
    setSelectedCategory(null)
    setSearchQuery('')
    setShowCategories(true)
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <h1 className="mb-3 text-xl font-bold text-foreground">Explore</h1>
        <div className="relative">
          <Icon name="search" className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search plants, seeds, tools..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              if (e.target.value) setShowCategories(false)
            }}
            className="h-12 rounded-xl bg-secondary pl-10 pr-10"
          />
          {(searchQuery || selectedCategory) && (
            <button
              onClick={clearFilters}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <Icon name="close" className="h-5 w-5 text-muted-foreground" />
            </button>
          )}
        </div>
        {selectedCategory && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Filtering by:</span>
            <button
              onClick={() => {
                setSelectedCategory(null)
                setShowCategories(true)
              }}
              className="flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground"
            >
              {CATEGORIES.find(c => c.id === selectedCategory)?.name}
              <Icon name="close" className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </header>

      <div className="p-4">
        {/* Category Grid */}
        {showCategories && !searchQuery && (
          <section className="mb-6">
            <h2 className="mb-3 text-lg font-bold text-foreground">Browse Categories</h2>
            <CategoryGrid
              categories={CATEGORIES}
              selectedCategory={selectedCategory || undefined}
              onSelect={handleCategorySelect}
            />
          </section>
        )}

        {/* Search Results / Listings */}
        {(!showCategories || searchQuery) && (
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">
                {searchQuery ? 'Search Results' : selectedCategory ? CATEGORIES.find(c => c.id === selectedCategory)?.name : 'All Listings'}
              </h2>
              <span className="text-sm text-muted-foreground">
                {filteredListings.length} items
              </span>
            </div>
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {filteredListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    onClick={() => onListingClick(listing)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Icon name="search" className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-1 font-semibold text-foreground">No results found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </section>
        )}

        {/* Popular Tags */}
        {showCategories && !searchQuery && (
          <section className="mt-6">
            <h2 className="mb-3 text-lg font-bold text-foreground">Popular Tags</h2>
            <div className="flex flex-wrap gap-2">
              {['houseplant', 'tropical', 'succulents', 'herbs', 'organic', 'beginner-friendly', 'heirloom', 'cuttings'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary hover:bg-secondary"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
