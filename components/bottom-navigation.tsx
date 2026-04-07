'use client'

import { Icon, IconName } from './icons'
import { cn } from '@/lib/utils'

interface NavItem {
  id: string
  label: string
  icon: IconName
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'explore', label: 'Explore', icon: 'search' },
  { id: 'create', label: 'Post', icon: 'plus' },
  { id: 'saved', label: 'Saved', icon: 'bookmark' },
  { id: 'profile', label: 'Profile', icon: 'user' },
]

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card pb-safe">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around">
        {navItems.map((item) => {
          const isActive = activeTab === item.id
          const isCreate = item.id === 'create'
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 px-4 py-2 transition-colors',
                isCreate && 'relative -mt-4',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {isCreate ? (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-lg">
                  <Icon name={item.icon} className="h-6 w-6 text-primary-foreground" />
                </div>
              ) : (
                <>
                  <Icon 
                    name={item.icon} 
                    className={cn(
                      'h-6 w-6 transition-transform',
                      isActive && 'scale-110'
                    )} 
                    fill={isActive ? 'currentColor' : 'none'}
                  />
                  <span className="text-xs font-medium">{item.label}</span>
                </>
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
