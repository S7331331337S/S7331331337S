import {
  Leaf,
  Sprout,
  Shovel,
  Mountain,
  Fence,
  Lightbulb,
  MapPin,
  Home,
  Search,
  PlusCircle,
  Heart,
  User,
  MessageCircle,
  Share2,
  Bookmark,
  Star,
  Clock,
  ChevronRight,
  ChevronLeft,
  Camera,
  X,
  Filter,
  Bell,
  Settings,
  LogOut,
  Edit,
  Phone,
  Navigation,
  Store,
  Trees,
  ShoppingBag,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react'

export const Icons = {
  leaf: Leaf,
  sprout: Sprout,
  shovel: Shovel,
  mountain: Mountain,
  fence: Fence,
  lightbulb: Lightbulb,
  'map-pin': MapPin,
  home: Home,
  search: Search,
  plus: PlusCircle,
  heart: Heart,
  user: User,
  message: MessageCircle,
  share: Share2,
  bookmark: Bookmark,
  star: Star,
  clock: Clock,
  'chevron-right': ChevronRight,
  'chevron-left': ChevronLeft,
  camera: Camera,
  close: X,
  filter: Filter,
  bell: Bell,
  settings: Settings,
  logout: LogOut,
  edit: Edit,
  phone: Phone,
  navigation: Navigation,
  store: Store,
  trees: Trees,
  'shopping-bag': ShoppingBag,
  workshop: GraduationCap,
} as const

export type IconName = keyof typeof Icons

export function Icon({ 
  name, 
  className,
  ...props 
}: { 
  name: IconName
  className?: string
} & React.ComponentProps<LucideIcon>) {
  const IconComponent = Icons[name]
  return <IconComponent className={className} {...props} />
}
