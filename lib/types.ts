export interface User {
  id: string
  name: string
  username: string
  avatar: string
  location: string
  bio: string
  joinedDate: string
  plantsShared: number
  rating: number
  badges: string[]
}

export interface Listing {
  id: string
  title: string
  description: string
  price: number | null
  type: 'sale' | 'trade' | 'free' | 'tip'
  category: Category
  images: string[]
  user: User
  location: string
  createdAt: string
  likes: number
  comments: number
  isLiked?: boolean
  isSaved?: boolean
  condition?: 'excellent' | 'good' | 'fair'
  tags?: string[]
}

export type Category = 
  | 'plants'
  | 'seeds'
  | 'tools'
  | 'soil'
  | 'decor'
  | 'tips'
  | 'resources'

export interface CategoryInfo {
  id: Category
  name: string
  icon: string
  description: string
  color: string
}

export interface LocalResource {
  id: string
  name: string
  type: 'nursery' | 'garden-center' | 'community-garden' | 'farmers-market' | 'workshop'
  address: string
  distance: string
  rating: number
  image: string
  hours?: string
  phone?: string
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'plants', name: 'Plants', icon: 'leaf', description: 'Houseplants, outdoor plants, and more', color: 'bg-primary' },
  { id: 'seeds', name: 'Seeds & Cuttings', icon: 'sprout', description: 'Seeds, cuttings, and propagations', color: 'bg-chart-4' },
  { id: 'tools', name: 'Tools & Supplies', icon: 'shovel', description: 'Gardening tools and equipment', color: 'bg-chart-3' },
  { id: 'soil', name: 'Soil & Compost', icon: 'mountain', description: 'Soil, compost, and amendments', color: 'bg-chart-5' },
  { id: 'decor', name: 'Garden Decor', icon: 'fence', description: 'Pots, planters, and decorations', color: 'bg-accent' },
  { id: 'tips', name: 'Tips & Knowledge', icon: 'lightbulb', description: 'Growing tips and advice', color: 'bg-chart-2' },
  { id: 'resources', name: 'Local Resources', icon: 'map-pin', description: 'Nurseries, gardens, and more', color: 'bg-chart-1' },
]
