'use client'

import { Icon } from '@/components/icons'
import { ListingCard } from '@/components/listing-card'
import { listings } from '@/lib/data'
import { Listing } from '@/lib/types'

interface SavedScreenProps {
  onListingClick: (listing: Listing) => void
}

export function SavedScreen({ onListingClick }: SavedScreenProps) {
  // Simulating saved listings (first 3 for demo)
  const savedListings = listings.slice(0, 3)

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <h1 className="text-xl font-bold text-foreground">Saved</h1>
      </header>

      <div className="p-4">
        {savedListings.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {savedListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onClick={() => onListingClick(listing)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <Icon name="bookmark" className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-lg font-semibold text-foreground">No saved items yet</h2>
            <p className="max-w-xs text-sm text-muted-foreground">
              Tap the bookmark icon on listings to save them for later
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
