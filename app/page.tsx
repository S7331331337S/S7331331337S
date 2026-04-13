'use client'

import { useState } from 'react'
import { BottomNavigation } from '@/components/bottom-navigation'
import { HomeFeed } from '@/components/screens/home-feed'
import { ExploreScreen } from '@/components/screens/explore-screen'
import { CreatePostScreen } from '@/components/screens/create-post-screen'
import { SavedScreen } from '@/components/screens/saved-screen'
import { ProfileScreen } from '@/components/screens/profile-screen'
import { ListingDetail } from '@/components/screens/listing-detail'
import { LocalResourcesScreen } from '@/components/screens/local-resources-screen'
import { Listing } from '@/lib/types'

type Tab = 'home' | 'explore' | 'create' | 'saved' | 'profile'

export default function SproutApp() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null)
  const [showResources, setShowResources] = useState(false)

  // Handle listing click - show detail view
  const handleListingClick = (listing: Listing) => {
    // If clicking a resources category item, show resources screen
    if (listing.category === 'resources') {
      setShowResources(true)
    } else {
      setSelectedListing(listing)
    }
  }

  // Close listing detail
  const handleCloseDetail = () => {
    setSelectedListing(null)
  }

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab as Tab)
    setSelectedListing(null)
    setShowResources(false)
  }

  // If showing create screen (full screen overlay)
  if (activeTab === 'create') {
    return (
      <CreatePostScreen onClose={() => setActiveTab('home')} />
    )
  }

  // If showing listing detail
  if (selectedListing) {
    return (
      <ListingDetail
        listing={selectedListing}
        onClose={handleCloseDetail}
      />
    )
  }

  // If showing local resources
  if (showResources) {
    return (
      <>
        <LocalResourcesScreen onBack={() => setShowResources(false)} />
        <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      </>
    )
  }

  return (
    <main className="mx-auto max-w-lg">
      {/* Active Screen */}
      {activeTab === 'home' && (
        <HomeFeed onListingClick={handleListingClick} />
      )}
      {activeTab === 'explore' && (
        <ExploreScreen onListingClick={handleListingClick} />
      )}
      {activeTab === 'saved' && (
        <SavedScreen onListingClick={handleListingClick} />
      )}
      {activeTab === 'profile' && (
        <ProfileScreen onListingClick={handleListingClick} />
      )}

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </main>
  )
}
