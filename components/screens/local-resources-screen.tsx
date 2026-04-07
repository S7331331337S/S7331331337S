'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Icon, IconName } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { localResources } from '@/lib/data'
import { LocalResource } from '@/lib/types'
import { cn } from '@/lib/utils'

type ResourceType = 'all' | 'nursery' | 'garden-center' | 'community-garden' | 'farmers-market' | 'workshop'

const resourceTypeIcons: Record<string, IconName> = {
  nursery: 'sprout',
  'garden-center': 'store',
  'community-garden': 'trees',
  'farmers-market': 'shopping-bag',
  workshop: 'workshop',
}

const resourceTypeLabels: Record<string, string> = {
  nursery: 'Nursery',
  'garden-center': 'Garden Center',
  'community-garden': 'Community Garden',
  'farmers-market': 'Farmers Market',
  workshop: 'Workshop',
}

interface LocalResourcesScreenProps {
  onBack?: () => void
}

export function LocalResourcesScreen({ onBack }: LocalResourcesScreenProps) {
  const [selectedType, setSelectedType] = useState<ResourceType>('all')
  const [selectedResource, setSelectedResource] = useState<LocalResource | null>(null)

  const types: { id: ResourceType; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'nursery', label: 'Nurseries' },
    { id: 'community-garden', label: 'Gardens' },
    { id: 'farmers-market', label: 'Markets' },
    { id: 'workshop', label: 'Workshops' },
  ]

  const filteredResources = selectedType === 'all'
    ? localResources
    : localResources.filter(r => r.type === selectedType)

  if (selectedResource) {
    return (
      <ResourceDetail 
        resource={selectedResource} 
        onBack={() => setSelectedResource(null)} 
      />
    )
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-3">
          {onBack && (
            <button onClick={onBack}>
              <Icon name="chevron-left" className="h-6 w-6 text-foreground" />
            </button>
          )}
          <h1 className="text-xl font-bold text-foreground">Local Resources</h1>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="border-b border-border px-4 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {types.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={cn(
                'flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                selectedType === type.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              )}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Resources List */}
      <div className="p-4">
        <p className="mb-4 text-sm text-muted-foreground">
          {filteredResources.length} resources near you
        </p>
        <div className="space-y-3">
          {filteredResources.map((resource) => (
            <button
              key={resource.id}
              onClick={() => setSelectedResource(resource)}
              className="flex w-full gap-3 rounded-xl bg-card p-3 text-left shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={resource.image}
                  alt={resource.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between overflow-hidden">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="truncate font-semibold text-foreground">{resource.name}</p>
                  </div>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    <Icon name={resourceTypeIcons[resource.type]} className="mr-1 h-3 w-3" />
                    {resourceTypeLabels[resource.type]}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Icon name="navigation" className="h-3.5 w-3.5" />
                    <span>{resource.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="star" className="h-3.5 w-3.5 fill-accent text-accent" />
                    <span>{resource.rating}</span>
                  </div>
                </div>
              </div>
              <Icon name="chevron-right" className="h-5 w-5 self-center text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function ResourceDetail({ resource, onBack }: { resource: LocalResource; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Image */}
      <div className="relative h-56">
        <Image
          src={resource.image}
          alt={resource.name}
          fill
          className="object-cover"
        />
        <button
          onClick={onBack}
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm"
        >
          <Icon name="chevron-left" className="h-6 w-6 text-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <Badge variant="secondary" className="mb-2">
          <Icon name={resourceTypeIcons[resource.type]} className="mr-1 h-3.5 w-3.5" />
          {resourceTypeLabels[resource.type]}
        </Badge>
        
        <h1 className="text-2xl font-bold text-foreground">{resource.name}</h1>
        
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-1 text-accent">
            <Icon name="star" className="h-4 w-4 fill-current" />
            <span className="font-semibold">{resource.rating}</span>
          </div>
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">{resource.distance} away</span>
        </div>

        {/* Details */}
        <div className="mt-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
              <Icon name="map-pin" className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground">Address</p>
              <p className="text-sm text-muted-foreground">{resource.address}</p>
            </div>
          </div>

          {resource.hours && (
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <Icon name="clock" className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">Hours</p>
                <p className="text-sm text-muted-foreground">{resource.hours}</p>
              </div>
            </div>
          )}

          {resource.phone && (
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <Icon name="phone" className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">Phone</p>
                <p className="text-sm text-muted-foreground">{resource.phone}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card p-4 pb-safe">
        <div className="mx-auto flex max-w-lg gap-3">
          <Button variant="outline" className="h-14 flex-1 rounded-xl text-base font-semibold">
            <Icon name="navigation" className="mr-2 h-5 w-5" />
            Directions
          </Button>
          {resource.phone && (
            <Button className="h-14 flex-1 rounded-xl text-base font-semibold">
              <Icon name="phone" className="mr-2 h-5 w-5" />
              Call
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
