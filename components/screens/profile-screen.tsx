'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Icon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ListingCard } from '@/components/listing-card'
import { currentUser, listings } from '@/lib/data'
import { Listing } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ProfileScreenProps {
  onListingClick: (listing: Listing) => void
}

type Tab = 'listings' | 'activity'

export function ProfileScreen({ onListingClick }: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState<Tab>('listings')
  
  // Simulating user's listings
  const userListings = listings.slice(0, 2)

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <h1 className="text-xl font-bold text-foreground">Profile</h1>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
          <Icon name="settings" className="h-5 w-5 text-foreground" />
        </button>
      </header>

      {/* Profile Header */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20" />
        
        {/* Avatar */}
        <div className="absolute left-4 top-16">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-background">
            <Image
              src={currentUser.avatar}
              alt={currentUser.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Edit Button */}
        <div className="absolute right-4 top-36">
          <Button variant="outline" size="sm" className="rounded-full">
            <Icon name="edit" className="mr-1 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-14 px-4">
        <h2 className="text-xl font-bold text-foreground">{currentUser.name}</h2>
        <p className="text-muted-foreground">@{currentUser.username}</p>
        
        <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
          <Icon name="map-pin" className="h-4 w-4" />
          <span>{currentUser.location}</span>
        </div>

        <p className="mt-3 text-foreground">{currentUser.bio}</p>

        {/* Stats */}
        <div className="mt-4 flex gap-6">
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{currentUser.plantsShared}</p>
            <p className="text-sm text-muted-foreground">Shared</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{currentUser.rating}</p>
            <p className="text-sm text-muted-foreground">Rating</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{currentUser.badges.length}</p>
            <p className="text-sm text-muted-foreground">Badges</p>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-4 flex flex-wrap gap-2">
          {currentUser.badges.map((badge) => (
            <Badge key={badge} className="bg-primary/10 text-primary">
              {badge}
            </Badge>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 border-b border-border">
        <div className="flex">
          <button
            onClick={() => setActiveTab('listings')}
            className={cn(
              'flex-1 border-b-2 py-3 text-center text-sm font-medium transition-colors',
              activeTab === 'listings'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground'
            )}
          >
            My Listings
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={cn(
              'flex-1 border-b-2 py-3 text-center text-sm font-medium transition-colors',
              activeTab === 'activity'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground'
            )}
          >
            Activity
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'listings' && (
          userListings.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {userListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  onClick={() => onListingClick(listing)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <Icon name="sprout" className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">No listings yet</h3>
              <p className="mb-4 max-w-xs text-sm text-muted-foreground">
                Share your first plant or gardening item with the community
              </p>
              <Button className="rounded-full">
                <Icon name="plus" className="mr-2 h-4 w-4" />
                Create Listing
              </Button>
            </div>
          )
        )}

        {activeTab === 'activity' && (
          <div className="space-y-4">
            {/* Activity Items */}
            <div className="flex items-start gap-3 rounded-xl bg-card p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Icon name="heart" className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Sarah Chen</span> liked your Monstera listing
                </p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-card p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                <Icon name="message" className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Marcus Johnson</span> commented on your post
                </p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-card p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-4/20">
                <Icon name="star" className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <p className="text-sm text-foreground">
                  You earned the <span className="font-semibold">Green Thumb</span> badge!
                </p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
