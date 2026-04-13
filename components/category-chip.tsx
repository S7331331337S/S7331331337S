'use client'

import { Icon, IconName } from './icons'
import { CategoryInfo } from '@/lib/types'
import { cn } from '@/lib/utils'

interface CategoryChipProps {
  category: CategoryInfo
  selected?: boolean
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
}

export function CategoryChip({ category, selected, onClick, size = 'md' }: CategoryChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 rounded-full border transition-all',
        selected
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-card text-foreground hover:border-primary/50 hover:bg-secondary',
        size === 'sm' && 'px-3 py-1.5 text-xs',
        size === 'md' && 'px-4 py-2 text-sm',
        size === 'lg' && 'px-5 py-2.5 text-base'
      )}
    >
      <Icon name={category.icon as IconName} className={cn(
        size === 'sm' && 'h-3.5 w-3.5',
        size === 'md' && 'h-4 w-4',
        size === 'lg' && 'h-5 w-5'
      )} />
      <span className="font-medium">{category.name}</span>
    </button>
  )
}

interface CategoryGridProps {
  categories: CategoryInfo[]
  selectedCategory?: string
  onSelect?: (category: CategoryInfo) => void
}

export function CategoryGrid({ categories, selectedCategory, onSelect }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect?.(category)}
          className={cn(
            'flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all',
            selectedCategory === category.id
              ? 'border-primary bg-primary/10'
              : 'border-border bg-card hover:border-primary/50 hover:bg-secondary'
          )}
        >
          <div className={cn(
            'flex h-12 w-12 items-center justify-center rounded-xl',
            category.color
          )}>
            <Icon 
              name={category.icon as IconName} 
              className="h-6 w-6 text-primary-foreground" 
            />
          </div>
          <span className="text-center text-sm font-medium text-foreground">
            {category.name}
          </span>
        </button>
      ))}
    </div>
  )
}
