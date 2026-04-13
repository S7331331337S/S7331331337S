'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Icon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { CategoryGrid } from '@/components/category-chip'
import { CATEGORIES, Category, CategoryInfo } from '@/lib/types'
import { cn } from '@/lib/utils'

type PostType = 'sale' | 'trade' | 'free' | 'tip'

interface CreatePostScreenProps {
  onClose: () => void
}

export function CreatePostScreen({ onClose }: CreatePostScreenProps) {
  const [step, setStep] = useState(1)
  const [postType, setPostType] = useState<PostType | null>(null)
  const [category, setCategory] = useState<Category | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [images, setImages] = useState<string[]>([])

  const postTypes = [
    { id: 'sale' as PostType, label: 'For Sale', description: 'Sell your plant or supplies', icon: 'shopping-bag' as const },
    { id: 'trade' as PostType, label: 'Trade', description: 'Trade with other gardeners', icon: 'share' as const },
    { id: 'free' as PostType, label: 'Free', description: 'Give away to a good home', icon: 'heart' as const },
    { id: 'tip' as PostType, label: 'Share Tip', description: 'Share gardening knowledge', icon: 'lightbulb' as const },
  ]

  const handleCategorySelect = (cat: CategoryInfo) => {
    setCategory(cat.id)
    setStep(3)
  }

  const handleImageAdd = () => {
    // Simulate adding an image
    const demoImages = [
      '/images/plant-monstera.jpg',
      '/images/plant-succulents.jpg',
      '/images/plant-herbs.jpg',
    ]
    if (images.length < 4) {
      setImages([...images, demoImages[images.length % 3]])
    }
  }

  const handleSubmit = () => {
    // In a real app, this would submit to an API
    onClose()
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background px-4 py-3">
        <button onClick={step > 1 ? () => setStep(step - 1) : onClose}>
          <Icon name={step > 1 ? 'chevron-left' : 'close'} className="h-6 w-6 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Create Post</h1>
        <div className="w-6" />
      </header>

      {/* Progress Indicator */}
      <div className="flex gap-1 px-4 py-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={cn(
              'h-1 flex-1 rounded-full transition-colors',
              s <= step ? 'bg-primary' : 'bg-border'
            )}
          />
        ))}
      </div>

      <div className="p-4">
        {/* Step 1: Post Type */}
        {step === 1 && (
          <div>
            <h2 className="mb-2 text-xl font-bold text-foreground">What would you like to share?</h2>
            <p className="mb-6 text-muted-foreground">Choose the type of post you want to create</p>
            <div className="grid grid-cols-2 gap-3">
              {postTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setPostType(type.id)
                    setStep(2)
                  }}
                  className={cn(
                    'flex flex-col items-center gap-2 rounded-2xl border p-6 transition-all',
                    postType === type.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-card hover:border-primary/50'
                  )}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                    <Icon name={type.icon} className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <span className="font-semibold text-foreground">{type.label}</span>
                  <span className="text-center text-xs text-muted-foreground">{type.description}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Category */}
        {step === 2 && (
          <div>
            <h2 className="mb-2 text-xl font-bold text-foreground">Choose a category</h2>
            <p className="mb-6 text-muted-foreground">Help others find your post easily</p>
            <CategoryGrid
              categories={CATEGORIES.filter(c => c.id !== 'resources')}
              selectedCategory={category || undefined}
              onSelect={handleCategorySelect}
            />
          </div>
        )}

        {/* Step 3: Details */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="mb-2 text-xl font-bold text-foreground">Add details</h2>
              <p className="mb-6 text-muted-foreground">Tell others about what you are sharing</p>
            </div>

            {/* Image Upload */}
            <div>
              <Label className="mb-2 block text-foreground">Photos</Label>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <div key={idx} className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl">
                    <Image src={img} alt={`Photo ${idx + 1}`} fill className="object-cover" />
                    <button
                      onClick={() => setImages(images.filter((_, i) => i !== idx))}
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-foreground/80"
                    >
                      <Icon name="close" className="h-4 w-4 text-background" />
                    </button>
                  </div>
                ))}
                {images.length < 4 && (
                  <button
                    onClick={handleImageAdd}
                    className="flex h-24 w-24 flex-shrink-0 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border bg-secondary"
                  >
                    <Icon name="camera" className="h-6 w-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Add photo</span>
                  </button>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <Label htmlFor="title" className="mb-2 block text-foreground">Title</Label>
              <Input
                id="title"
                placeholder="What are you sharing?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-12 rounded-xl bg-secondary"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="mb-2 block text-foreground">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your item, plant care tips, condition, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-32 rounded-xl bg-secondary"
              />
            </div>

            {/* Price (for sale only) */}
            {postType === 'sale' && (
              <div>
                <Label htmlFor="price" className="mb-2 block text-foreground">Price</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="h-12 rounded-xl bg-secondary pl-7"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!title || !description || images.length === 0}
              className="h-14 w-full rounded-xl text-lg font-semibold"
            >
              Post to Sprout
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
