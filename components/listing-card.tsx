'use client'

import Image from 'next/image'
import { Icon } from './icons'
import { Badge } from '@/components/ui/badge'
import { Listing } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ListingCardProps {
  listing: Listing
  variant?: 'default' | 'compact'
  onClick?: () => void
}

export function ListingCard({ listing, variant = 'default', onClick }: ListingCardProps) {
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

  if (variant === 'compact') {
    return (
      <button
        onClick={onClick}
        className="group flex w-full gap-3 rounded-xl bg-card p-3 text-left shadow-sm transition-shadow hover:shadow-md"
      >
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={listing.images[0]}
            alt={listing.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between overflow-hidden">
          <div>
            <p className="truncate font-semibold text-foreground">{listing.title}</p>
            <p className="text-sm text-muted-foreground">{listing.location}</p>
          </div>
          <div className="flex items-center justify-between">
            <Badge className={cn('text-xs', typeColors[listing.type])}>
              {typeLabels[listing.type]}
            </Badge>
            {listing.price && (
              <span className="font-bold text-primary">${listing.price}</span>
            )}
          </div>
        </div>
      </button>
    )
  }

  return (
    <article
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-card shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={listing.images[0]}
          alt={listing.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <Badge className={cn('shadow-sm', typeColors[listing.type])}>
            {typeLabels[listing.type]}
          </Badge>
        </div>
        {listing.price && (
          <div className="absolute bottom-3 right-3">
            <span className="rounded-full bg-card/90 px-3 py-1 text-sm font-bold text-foreground backdrop-blur-sm">
              ${listing.price}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <div className="relative h-6 w-6 overflow-hidden rounded-full">
            <Image
              src={listing.user.avatar}
              alt={listing.user.name}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-sm text-muted-foreground">{listing.user.name}</span>
        </div>
        <h3 className="mb-1 line-clamp-2 font-semibold text-foreground">{listing.title}</h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="map-pin" className="h-3.5 w-3.5" />
            <span>{listing.location}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Icon name="heart" className="h-3.5 w-3.5" />
              {listing.likes}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="message" className="h-3.5 w-3.5" />
              {listing.comments}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
