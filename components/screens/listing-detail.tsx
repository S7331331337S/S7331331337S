'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Icon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Listing } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ListingDetailProps {
  listing: Listing
  onClose: () => void
}

export function ListingDetail({ listing, onClose }: ListingDetailProps) {
  const [isLiked, setIsLiked] = useState(listing.isLiked || false)
  const [isSaved, setIsSaved] = useState(listing.isSaved || false)

  const typeLabels = {
    sale: 'For Sale',
    trade: 'Trade',
    free: 'Free',
    tip: 'Tip',
  }

  const typeColors = {
    sale: 'bg-primary text-primary-foreground',
    trade: 'bg-accent text-accent-foreground',
    free: 'bg-chart-4 text-foreground',
    tip: 'bg-chart-2 text-foreground',
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Image */}
      <div className="relative aspect-square">
        <Image
          src={listing.images[0]}
          alt={listing.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm"
          >
            <Icon name="chevron-left" className="h-6 w-6 text-foreground" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm"
            >
              <Icon
                name="bookmark"
                className={cn('h-5 w-5', isSaved ? 'fill-primary text-primary' : 'text-foreground')}
              />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm">
              <Icon name="share" className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-4 left-4">
          <Badge className={cn('text-sm', typeColors[listing.type])}>
            {typeLabels[listing.type]}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price and Title */}
        <div className="mb-4">
          {listing.price && (
            <p className="text-2xl font-bold text-primary">${listing.price}</p>
          )}
          <h1 className="mt-1 text-xl font-bold text-foreground">{listing.title}</h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="map-pin" className="h-4 w-4" />
            <span>{listing.location}</span>
            <span className="text-border">|</span>
            <Icon name="clock" className="h-4 w-4" />
            <span>{listing.createdAt}</span>
          </div>
        </div>

        {/* Seller */}
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-card p-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image
              src={listing.user.avatar}
              alt={listing.user.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground">{listing.user.name}</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Icon name="star" className="h-3.5 w-3.5 fill-accent text-accent" />
              <span>{listing.user.rating}</span>
              <span className="text-border">|</span>
              <span>{listing.user.plantsShared} plants shared</span>
            </div>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
            <Icon name="chevron-right" className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Description */}
        <div className="mb-4">
          <h2 className="mb-2 font-semibold text-foreground">Description</h2>
          <p className="leading-relaxed text-muted-foreground">{listing.description}</p>
        </div>

        {/* Condition */}
        {listing.condition && (
          <div className="mb-4">
            <h2 className="mb-2 font-semibold text-foreground">Condition</h2>
            <Badge variant="outline" className="capitalize">{listing.condition}</Badge>
          </div>
        )}

        {/* Tags */}
        {listing.tags && listing.tags.length > 0 && (
          <div className="mb-4">
            <h2 className="mb-2 font-semibold text-foreground">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {listing.tags.map((tag) => (
                <Badge key={tag} variant="secondary">#{tag}</Badge>
              ))}
            </div>
          </div>
        )}

        {/* Engagement */}
        <div className="flex items-center gap-4 border-t border-border pt-4">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="flex items-center gap-1.5 text-muted-foreground"
          >
            <Icon
              name="heart"
              className={cn('h-5 w-5', isLiked ? 'fill-destructive text-destructive' : '')}
            />
            <span>{listing.likes + (isLiked ? 1 : 0)}</span>
          </button>
          <button className="flex items-center gap-1.5 text-muted-foreground">
            <Icon name="message" className="h-5 w-5" />
            <span>{listing.comments} comments</span>
          </button>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card p-4 pb-safe">
        <div className="mx-auto flex max-w-lg gap-3">
          <Button variant="outline" className="h-14 flex-1 rounded-xl text-base font-semibold">
            <Icon name="message" className="mr-2 h-5 w-5" />
            Message
          </Button>
          <Button className="h-14 flex-1 rounded-xl text-base font-semibold">
            {listing.type === 'sale' ? 'Buy Now' : 
             listing.type === 'trade' ? 'Offer Trade' :
             listing.type === 'free' ? 'Request' : 'Say Thanks'}
          </Button>
        </div>
      </div>
    </div>
  )
}
